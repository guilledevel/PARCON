import { useEffect, useState } from 'react';

export default function Navbar() {
  const [path, setPath] = useState('/');

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const linkClass = (href) =>
    path === href ? 'text-cyan-400 font-bold' : 'text-white hover:text-cyan-300';

  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-white">Parcon</div>
      <ul className="flex gap-6">
        <li><a href="/" className={linkClass('/')}>Inicio</a></li>
        <li><a href="/cotizar" className={linkClass('/cotizar')}>Cotizar</a></li>
        <li><a href="/contacto" className={linkClass('/contacto')}>Contacto</a></li>
      </ul>
    </nav>
  );
}
