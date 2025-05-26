import { useEffect, useState } from 'react';

export default function Navbar() {
  const [path, setPath] = useState('/');

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const linkClass = (href) =>
    path === href
      ? 'text-cyan-400 font-bold'
      : 'text-white hover:text-cyan-300 active:text-cyan-500';

  const logoClass =
    path === '/'
      ? 'text-cyan-400 font-bold text-2xl'
      : 'text-white hover:text-cyan-300 active:text-cyan-500 font-bold text-2xl';

  return (
    <div className="w-screen bg-black flex justify-center items-center">
      <nav className="w-[90%] p-4 flex justify-between items-center">
        <a href="/" className={logoClass}>
          Parcon
        </a>
        <ul className="flex gap-6">
          <li>
            <a href="/" className={linkClass('/')}>
              Inicio
            </a>
          </li>
          <li>
            <a href="/contacto" className={linkClass('/contacto')}>
              Contacto
            </a>
          </li>
          <li>
            <a href="/cotizar" className={linkClass('/cotizar')}>
              Cotizar
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}