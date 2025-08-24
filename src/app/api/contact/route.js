import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function parseRequestBody(req) {
    try {
        const contentType = (req.headers.get?.("content-type") || "").toLowerCase();
        const text = await req.text(); // leer una sola vez evita "Body has already been read"
        if (!text) return { parsed: {}, raw: "" };

        // Si claramente es JSON, intentar parsear
        if (
            contentType.includes("application/json") ||
            text.trim().startsWith("{") ||
            text.trim().startsWith("[")
        ) {
            try {
                return { parsed: JSON.parse(text), raw: text };
            } catch (e) {
                throw new Error("JSON inválido: error en parseo");
            }
        }

        // Soportar x-www-form-urlencoded
        if (contentType.includes("application/x-www-form-urlencoded")) {
            const params = new URLSearchParams(text);
            return { parsed: Object.fromEntries(params.entries()), raw: text };
        }

        // Otros tipos (multipart/form-data) no soportados aquí
        throw new Error(
            `Formato de body no soportado. content-type: ${contentType || "n/a"}`
        );
    } catch (err) {
        throw err;
    }
}

async function trySendEmail({ name, email, message }) {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO || user;

    if (!host || !port || !user || !pass || !contactTo) {
        console.warn("SMTP no configurado. Fallback a console.log.");
        console.log("Contacto (fallback):", { name, email, message });
        return { sent: false, info: "fallback-no-smtp" };
    }

    let nodemailer;
    try {
        nodemailer = (await import("nodemailer")).default;
    } catch (impErr) {
        console.warn("nodemailer no instalado. Fallback a console.log.", impErr);
        console.log("Contacto (fallback):", { name, email, message });
        return { sent: false, info: "fallback-no-nodemailer" };
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: contactTo,
        subject: `Nuevo mensaje de contacto de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(
            /\n/g,
            "<br/>"
        )}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return { sent: true, info };
}

// Handler principal
export async function POST(req) {
    try {
        // Parsear body
        let parsed;
        try {
            const result = await parseRequestBody(req);
            parsed = result.parsed;
            if (process.env.NODE_ENV !== "production") {
                console.log("Raw body recibido:", result.raw || "[vacio]");
            }
        } catch (parseErr) {
            console.error("Error parseando body:", parseErr.message);
            return NextResponse.json(
                {
                    error: "JSON inválido o formato no soportado",
                    details: parseErr.message,
                },
                { status: 400 }
            );
        }

        // Validar campos
        const data = parsed || {};
        const name = (data?.name || "").toString().trim();
        const email = (data?.email || "").toString().trim();
        const message = (data?.message || "").toString().trim();

        if (!name || !email || !message) {
            const missing = [];
            if (!name) missing.push("name");
            if (!email) missing.push("email");
            if (!message) missing.push("message");
            console.log("Faltan campos:", missing);
            return NextResponse.json(
                { error: "Faltan campos obligatorios", missing },
                { status: 400 }
            );
        }

        if (!EMAIL_RE.test(email)) {
            return NextResponse.json({ error: "Email inválido" }, { status: 400 });
        }

        // Límite razonable para mensaje
        const MAX_MESSAGE_LENGTH = 2000;
        if (message.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json(
                { error: "Mensaje demasiado largo" },
                { status: 400 }
            );
        }

        const sanitized = { name, email, message };
        console.log("Contacto recibido (sanitized):", sanitized);

        try {
            const result = await trySendEmail(sanitized);
            if (result.sent) {
                return NextResponse.json(
                    {
                        ok: true,
                        sent: true,
                        messageId: result.info?.messageId || null,
                    },
                    { status: 200 }
                );
            }
            return NextResponse.json(
                { ok: false, sent: false, note: result.info || "fallback" },
                { status: 200 }
            );
        } catch (sendErr) {
            console.error("Error enviando email:", sendErr);
            const details =
                process.env.NODE_ENV !== "production"
                    ? String(sendErr?.message || sendErr)
                    : undefined;
            return NextResponse.json(
                {
                    ok: false,
                    sent: false,
                    error: "No se pudo enviar el mensaje",
                    details,
                },
                { status: 200 }
            );
        }
    } catch (err) {
        console.error("Error inesperado en API /api/contact:", err);
        return NextResponse.json(
            { error: "Error del servidor" },
            { status: 500 }
        );
    }
}
