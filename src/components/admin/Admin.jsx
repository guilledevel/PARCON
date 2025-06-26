import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import TrabajoCard from "./TrabajoCard";

export default function Admin() {
  const [trabajos, setTrabajos] = useState([]);

  useEffect(() => {
    supabase.from("trabajos").select("*").then(({ data }) => setTrabajos(data));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trabajos.map((t) => (
        <TrabajoCard key={t.id} trabajo={t} onUpdate={setTrabajos} />
      ))}
    </div>
  );
}
