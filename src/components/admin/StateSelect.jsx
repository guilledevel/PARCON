import estados from "../data/estados";

export default function EstadoSelector({ actual, onChange }) {
  return (
    <select
      className="mt-2 border p-1 rounded"
      value={actual}
      onChange={(e) => onChange(e.target.value)}
    >
      {estados.map((estado) => (
        <option key={estado} value={estado}>{estado}</option>
      ))}
    </select>
  );
}
