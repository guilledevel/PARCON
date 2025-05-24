export default function ContactForm() {
  return (
    <form className="space-y-4 max-w-lg mx-auto">
      <input type="text" placeholder="Nombre" className="w-full p-2 border rounded" />
      <input type="email" placeholder="Correo" className="w-full p-2 border rounded" />
      <textarea placeholder="Mensaje" className="w-full p-2 border rounded"></textarea>
      <button className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded">Enviar</button>
    </form>
  );
}
