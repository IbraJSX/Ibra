"use client";
import React from "react";

function Card({ title, description, link, tech = [], theme }) {
	return (
		<article
			className={
				theme === "light"
					? "bg-white border border-gray-200 rounded-lg p-6 shadow-md flex flex-col justify-between"
					: "bg-[rgba(255,255,255,0.03)] border border-gray-700 rounded-lg p-6 shadow-lg flex flex-col justify-between"
			}
		>
			<div>
				<h3
					className={
						theme === "light"
							? "text-lg font-semibold text-gray-900"
							: "text-lg font-semibold text-white"
					}
				>
					{title}
				</h3>
				<p
					className={
						theme === "light"
							? "mt-3 text-sm text-gray-600"
							: "mt-3 text-sm text-gray-300"
					}
				>
					{description}
				</p>
			</div>

			<div className="mt-4 flex items-center justify-between">
				<div className="flex flex-wrap gap-2">
					{tech.map((t) => (
						<span
							key={t}
							className={
								theme === "light"
									? "text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
									: "text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-200"
							}
						>
							{t}
						</span>
					))}
				</div>
				{link && (
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="ml-4 inline-block text-sm font-medium text-cyan-700 hover:underline"
					>
						Ver
					</a>
				)}
			</div>
		</article>
	);
}

function Contact({ theme }) {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [status, setStatus] = React.useState(null);
	const [error, setError] = React.useState(null);

	async function handleSubmit(e) {
		e.preventDefault();
		// La lógica de envío de formularios del lado del servidor no funcionará en GitHub Pages.
		// Deberás usar un servicio de terceros como Formspree, Getform, o una función serverless.
		// Por ahora, mostraremos un mensaje de éxito para fines de demostración.
		setStatus("sent");
		setError(null);

		// Limpiar el formulario después de un envío simulado
		setTimeout(() => {
			setStatus(null);
			setName("");
			setEmail("");
			setMessage("");
		}, 3000);
	}

	const inputClass =
		theme === "light"
			? "w-full p-3 rounded-md border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-cyan-300"
			: "w-full p-3 rounded-md border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-cyan-400";

	return (
		<section
			id="contact"
			className={
				theme === "light"
					? "m-6 p-8 bg-white rounded-2xl shadow-lg"
					: "m-6 p-8 bg-[rgba(255,255,255,0.02)] rounded-2xl shadow-lg"
			}
		>
			<h3
				className={
					theme === "light"
						? "text-2xl font-semibold text-gray-900 mb-2"
						: "text-2xl font-semibold text-white mb-2"
				}
			>
				Contacto
			</h3>
			<p
				className={
					theme === "light"
						? "text-sm text-gray-600 mb-4"
						: "text-sm text-gray-300 mb-4"
				}
			>
				¿Tienes un proyecto o idea? Hablemos.
			</p>

			<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 max-w-xl">
				<input
					aria-label="Nombre"
					className={inputClass}
					placeholder="Nombre"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					aria-label="Email"
					className={inputClass}
					placeholder="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<textarea
					aria-label="Mensaje"
					className={inputClass + " min-h-[120px] resize-y"}
					placeholder="Mensaje"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				/>

				<div className="flex items-center gap-3">
					<button
						type="submit"
						disabled={status === "sending"}
						className="px-4 py-2 rounded-md bg-cyan-600 text-white font-medium disabled:opacity-60"
					>
						{status === "sending" ? "Enviando..." : "Enviar mensaje"}
					</button>
					{status === "sent" && (
						<span className="text-green-500">Enviado. Gracias.</span>
					)}
					{status === "error" && (
						<span className="text-red-500">Error: {error}</span>
					)}
				</div>
			</form>
		</section>
	);
}

function Footer({ theme }) {
	return (
		<footer
			className={
				theme === "light"
					? "mt-auto p-6 bg-white text-gray-700 border-t border-gray-200"
					: "mt-auto p-6 bg-transparent text-gray-400 border-t border-gray-800"
			}
		>
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} Ibrahim — Todos los derechos
					reservados.
				</p>
				<div className="flex gap-4">
					<a href="#" className="text-sm hover:underline">
						GitHub
					</a>
					<a href="#" className="text-sm hover:underline">
						LinkedIn
					</a>
					<a href="#" className="text-sm hover:underline">
						Twitter
					</a>
				</div>
			</div>
		</footer>
	);
}

export default function Home() {
	const [theme, setTheme] = React.useState(() => {
		if (typeof window !== "undefined")
			return localStorage.getItem("theme") || "dark";
		return "dark";
	});
	React.useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.classList.toggle("light", theme === "light");
	}, [theme]);
	const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

	const projects = [
		{
			title: "Portfolio",
			description: "Portfolio profesional construido con React y Tailwind.",
			link: "#",
			tech: ["React", "Tailwind", "Vercel"],
		},
		{
			title: "App de tareas",
			description: "App full-stack con autenticación y API REST.",
			link: "#",
			tech: ["Node.js", "Postgres", "Next"],
		},
		{
			title: "E-commerce (demo)",
			description: "Demo de tienda con pasarela de pagos.",
			link: "#",
			tech: ["Stripe", "React", "Express"],
		},
	];

	const skills = [
		"React",
		"Next.js",
		"Node.js",
		"TypeScript",
		"Tailwind",
		"SQL",
		"Docker",
	];

	return (
		<main
			className={
				theme === "light"
					? "min-h-screen bg-gray-50 text-gray-900"
					: "min-h-screen bg-[#071014] text-white"
			}
		>
			<header className={theme === "light" ? "bg-white shadow-sm" : "bg-transparent"}>
				<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-cyan-600 rounded-md flex items-center justify-center font-bold">
							I
						</div>
						<span
							className={
								theme === "light"
									? "font-semibold text-gray-900"
									: "font-semibold text-white"
							}
						>
							Ibrahim
						</span>
					</div>

					<nav className="flex items-center gap-4">
						<a
							href="#projects"
							className={
								theme === "light"
									? "text-gray-700 hover:underline"
									: "text-gray-200 hover:underline"
							}
						>
							Proyectos
						</a>
						<a
							href="#about"
							className={
								theme === "light"
									? "text-gray-700 hover:underline"
									: "text-gray-200 hover:underline"
							}
						>
							Sobre mí
						</a>
						<a
							href="#contact"
							className={
								theme === "light"
									? "text-gray-700 hover:underline"
									: "text-gray-200 hover:underline"
							}
						>
							Contacto
						</a>

						{/* Toggle switch con ☀️ y 🌙 */}
						<div className="ml-3 flex items-center">
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={theme === "light"}
									onChange={toggleTheme}
									className="sr-only peer"
								/>
								{/* Fondo */}
								<div className="w-12 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-cyan-600 transition-colors flex items-center justify-between px-1">
									<span className="text-yellow-400 text-xs">☀️</span>
									<span className="text-white text-xs">🌙</span>
								</div>
								{/* Circulito */}
								<div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-6"></div>
							</label>
						</div>
					</nav>
				</div>
			</header>

			{/* Hero */}
			<section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8">
				<div className="md:w-1/2">
					<h1
						className={
							theme === "light"
								? "text-4xl font-bold text-gray-900"
								: "text-4xl font-bold text-white"
						}
					>
						Desarrollo web profesional y soluciones a medida
					</h1>
					<p
						className={
							theme === "light"
								? "mt-4 text-gray-600"
								: "mt-4 text-gray-300"
						}
					>
						Soy Ibrahim, ingeniero en formación y desarrollador full-stack.
						Diseño y construyo aplicaciones escalables y experiencias atractivas.
					</p>
					<div className="mt-6 flex gap-3">
						<a
							href="#contact"
							className="inline-block px-5 py-3 bg-cyan-600 text-white rounded-md shadow"
						>
							Contactar
						</a>
						<a
							href="#projects"
							className={
								theme === "light"
									? "inline-block px-5 py-3 border border-gray-200 rounded-md text-gray-800"
									: "inline-block px-5 py-3 border border-gray-700 rounded-md text-white"
							}
						>
							Ver proyectos
						</a>
					</div>
				</div>
				<div className="md:w-1/2 flex justify-center">
					<div
						className={
							theme === "light"
								? "w-64 h-64 bg-gray-100 rounded-xl shadow-lg flex items-center justify-center"
								: "w-64 h-64 bg-gradient-to-br from-cyan-700 to-indigo-700 rounded-xl shadow-2xl flex items-center justify-center"
						}
					>
						<span className="text-3xl font-bold text-white">I</span>
					</div>
				</div>
			</section>

			{/* Habilidades */}
			<section className="max-w-6xl mx-auto px-6 py-8">
				<h2
					className={
						theme === "light"
							? "text-2xl font-semibold text-gray-900 mb-4"
							: "text-2xl font-semibold text-white mb-4"
					}
				>
					Habilidades
				</h2>
				<div className="flex flex-wrap gap-3">
					{skills.map((s) => (
						<span
							key={s}
							className={
								theme === "light"
									? "px-3 py-1 bg-gray-100 rounded-full text-gray-800"
									: "px-3 py-1 bg-gray-800 rounded-full text-gray-200"
							}
						>
							{s}
						</span>
					))}
				</div>
			</section>

			{/* Proyectos */}
			<section id="projects" className="max-w-6xl mx-auto px-6 py-8">
				<h2
					className={
						theme === "light"
							? "text-2xl font-semibold text-gray-900 mb-6"
							: "text-2xl font-semibold text-white mb-6"
					}
				>
					Proyectos destacados
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{projects.map((p) => (
						<Card
							key={p.title}
							title={p.title}
							description={p.description}
							link={p.link}
							tech={p.tech}
							theme={theme}
						/>
					))}
				</div>
			</section>

			{/* Sobre mí */}
			<section id="about" className="max-w-6xl mx-auto px-6 py-8">
				<h2
					className={
						theme === "light"
							? "text-2xl font-semibold text-gray-900 mb-4"
							: "text-2xl font-semibold text-white mb-4"
					}
				>
					Sobre mí
				</h2>
				<p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
					Estudiante de ingeniería informática con interés en desarrollo web
					full-stack, experiencia en proyectos personales y trabajo en equipo.
					Busco oportunidades para aportar en productos reales y seguir
					aprendiendo.
				</p>
			</section>

			<div className="max-w-6xl mx-auto px-6 py-8">
				<Contact theme={theme} />
			</div>

			<Footer theme={theme} />

			<style>{`
				@keyframes enter {
					from { opacity: 0; transform: translateY(8px); }
					to { opacity:1; transform: none; }
				}
				section, header { animation: enter 420ms ease both; }
				@media (prefers-reduced-motion: reduce) {
					section, header { animation: none !important; }
				}
			`}</style>
		</main>
	);
}
