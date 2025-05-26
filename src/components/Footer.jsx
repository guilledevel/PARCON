export default function Footer() {
  return (
    <div className="w-screen bg-black flex justify-center items-center">
      <footer className="text-center p-4 text-white">
      Todos los derechos reservados © {new Date().getFullYear()} Parcon Publicidad Digital e impresa.
    </footer>
    </div>
  );
}
