import { useState, useEffect } from 'react';
/* 
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    fetch('public/data/icons.json') // Asegúrate de que esté en /public/data/
      .then(res => res.json())
      .then(data => setIcons(data))
      .catch(() => setIcons([]));
  }, []);

  if (icons.length === 0) return null;

  // Duplicamos los íconos para el loop infinito
  const marqueeIcons = [...icons, ...icons];

  return (
    <div className="overflow-hidden w-full bg-white py-4">
        <h1>hola ainmacion</h1>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {marqueeIcons.map((item, index) => (
          <img
            key={index}
            src={item.icono}
            alt={item.alt}
            className="h-10 inline-block"
            draggable={false}
          />
        ))}
      </div>
    </div>
  ); */

export default function Marquee() {
return (
 <div>
    <h1>hola animacions</h1>
    
    <img src="/public/svg/Banner.svg" alt="Banner" id="img" />
    <img src="/public/svg/Luminoso.svg" alt="Luminoso" id="img" />
    <img src="/public/svg/Tarjeta.svg" alt="Neon" id="img" />
    <img src="/public/svg/Talonario.svg" alt="bastidor" id="img" />
    <img src="/public/svg/Neon.svg" alt="Banner" id="img" />
    <img src="/public/svg/Stikers.svg" alt="Banner" id="img" />
 </div>
)
}
