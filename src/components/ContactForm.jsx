export default function ContactForm() {
  return (
    <form className="space-y-4 max-w-lg mx-auto" aria-label="Formulario de contacto">
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-700">Contáctanos</legend>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Mensaje"
            className="w-full p-2 border rounded"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </fieldset>
    </form>
  );
}
