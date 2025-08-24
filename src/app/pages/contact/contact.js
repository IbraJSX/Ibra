import React from "react";
import Image from "next/image";


const Contact = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center bg-[rgb(73,87,95)] m-5 border-transparent bg-auto p-5 rounded-2xl">

            <div className="screen flex justify-center items-center flex-col gap-5" id="contact" rel="contact">

                <section className="flex justify-center items-center flex-col gap-5">
                    <div className=" p-10 bg-blue-400 rounded-2xl flex justify-center items-center flex-col gap-5 backdrop-blur-lg shadow-lg shadow-blue-500/50">
                         <h1 className="text-2xl font-bold text-white">Contact</h1>
                        <link href="https://www.discord.com/" className="text-blue-500 hover:text-blue-700">
                            <button className="h-fit w-fit px-4 py-2 border-2 rounded-full flex justify-center items-center gap-2 overflow-hidden group hover:translate-y-1 duration-200 backdrop-blur-lg" content="Discord">
                                <imgage src="/public/discord.svg" alt="Discord Icon" className="w-6 h-6" />
                            </button>
                        </link>

                    </div>
                       
                    
                </section>
                

            </div>
        </div>
    );


}