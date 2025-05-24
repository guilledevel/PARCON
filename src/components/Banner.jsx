export default function BannerForm({ dimensiones, setDimensiones }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div>
        <label className="block">Alto (m):</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={dimensiones.alto}
          onChange={(e) => setDimensiones({ ...dimensiones, alto: e.target.value })}
        />
      </div>

      <div>
        <label className="block">Largo (m):</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={dimensiones.largo}
          onChange={(e) => setDimensiones({ ...dimensiones, largo: e.target.value })}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Calcular</button>
    </form>
  );
}
