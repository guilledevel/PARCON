import EstadoSelector from "./EstadoSelector";
import { supabase } from "../lib/supabaseClient";

export default function TrabajoCard({ trabajo, onUpdate }) {
  const cambiarEstado = async (nuevoEstado) => {
    await supabase.from("trabajos").update({ estado: nuevoEstado }).eq("id", trabajo.id);
    const { data } = await supabase.from("trabajos").select("*");
    onUpdate(data);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="font-bold text-xl">{trabajo.titulo}</h3>
      <p>Cliente: {trabajo.cliente}</p>
      <p>Estado actual: <strong>{trabajo.estado}</strong></p>
      <EstadoSelector actual={trabajo.estado} onChange={cambiarEstado} />
    </div>
  );
}
