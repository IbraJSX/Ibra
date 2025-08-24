import React from 'react';

const Card = () => {
  return (
    <div className="h-[16em] w-[18em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#314479] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]">
      <div>
        <h1 className="text-[2em] font-medium">Hola.</h1>
        <p className="text-[0.85em]">
          Soy Ibrahim. Un joven desarrollador web y estudiante de ingeniería informática. Me encanta aprender nuevas tecnologías y crear proyectos interesantes.
        </p>
      </div>
      <button className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]" >
        <a href='https://www.discord.com/'>Contactar</a>
        <svg className="w-6 h-6 group-hover:translate-x-[10%] duration-300" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default Card;
// This component renders a card with a heading, description, and a button.
// The card has a gradient background, rounded corners, and a blur effect.
// The button has a hover effect that moves it slightly up and the icon moves to the right when hovered.