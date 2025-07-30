import React from 'react';

function Hero() {
  return (
    <div className="bg-black flex flex-col md:flex-row gap-10  items-center">
      <img 
        src="https://www.tubeguruji.com/_next/image?url=%2Fpanda.png&w=128&q=75" 
        alt="panda" 
        className="w-40 h-40 bg-transparent" 
      />
      <div>
        <h2 className="font-bold text-[32px] text-white pb-1">
          Welcome to <span className="text-primary">Projectfy</span>
        </h2>
        <h2 className="text-gray-500">
          Explore, Learn and Build All Real Life Projects
        </h2>
      </div>
    </div>
  );
}

export default Hero;
