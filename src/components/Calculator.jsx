/* El componente Calculator.jsx es un formulario dinámico que permite cotizar distintos tipos de trabajos 

Se adapta automáticamente mostrando opciones específicas según el tipo de trabajo seleccionado, sin borrar los datos ingresados previamente (como dimensiones).

los datos se se recuperan del archivo json de la carpeta public, price.json
{
  "banner": {
    "sin_barilla": 120,
    "con_barilla": 130
  },
 
  "bastidor": {
    "una_cara": 180,
    "dos_caras": 290,
    "patas": 120,
    "cambio_lona": 150
  }
} */

// Importamos useState desde React para manejar el estado del componente
import { useState } from 'react';

// Definimos el componente Calculator
export default function Calculator() {

  // Estado para el tipo de trabajo ingresado por el usuario (texto libre)
  const [tipoTrabajo, setTipoTrabajo] = useState('Banner');

  // Estado para las dimensiones del trabajo: alto y largo
  const [dimensiones, setDimensiones] = useState({ alto: '', largo: '' });

  // Estados booleanos para saber si se requiere barilla y/o anillas
  const [conBarilla, setConBarilla] = useState(false);
  const [conAnillas, setConAnillas] = useState(false);

  // Estado para guardar el precio calculado
  const [precio, setPrecio] = useState(0);

  // Función para calcular el precio en base a las dimensiones y extras
  const calcularPrecio = () => {
    // Convertimos alto y largo a números (si no hay valor, se usa 0)
    const alto = parseFloat(dimensiones.alto) || 0;
    const largo = parseFloat(dimensiones.largo) || 0;
    const metroCuadrado = alto * largo; // Dimension en m²
    const tamaño = metroCuadrado / 10000; // Convertimos a m² (asumiendo que las dimensiones están en cm)

    // Precio base por m² (puedes cambiar este valor o cargarlo desde JSON)
    let precioBase = tamaño * 120;

    // Si hay barilla o anillas, sumamos costos adicionales
    if (conBarilla) precioBase += 10;
    if (conAnillas) precioBase += 3;

    // Guardamos el precio final con dos decimales
    setPrecio(precioBase.toFixed(2));
  };

  // Renderizado del componente
  return (
    <div className="bg-gradient-to-r from-[#201053] to-[#1E5097] p-6 rounded-xl shadow-md w-full max-w-md text-white">
      {/* Contenedor general */}
      <section className="flex flex-col gap-4">

        {/* Input para el tipo de trabajo */}
        <div>
          <label htmlFor="tipo" className="block mb-1 font-semibold">Trabajo:</label>
          <input
            type="text"
            id="tipo"
            className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white"
            value={tipoTrabajo}
            onChange={(e) => setTipoTrabajo(e.target.value)} // Actualizamos estado
          />
        </div>

        {/* Inputs para las dimensiones */}
        <div>
          <label className="block mb-1 font-semibold">Dimensiones (m):</label>
          <div className="flex gap-2">
            {/* Input para el alto */}
            <input
              type="number"
              placeholder="Alto"
              className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white"
              value={dimensiones.alto}
              onChange={(e) =>
                setDimensiones({ ...dimensiones, alto: e.target.value })
              }
            />
            {/* Input para el largo */}
            <input
              type="number"
              placeholder="Largo"
              className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white"
              value={dimensiones.largo}
              onChange={(e) =>
                setDimensiones({ ...dimensiones, largo: e.target.value })
              }
            />
          </div>
        </div>

        {/* Checkboxes para opciones adicionales */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={conBarilla}
              onChange={(e) => setConBarilla(e.target.checked)} // Actualiza estado
            />
            Con barilla
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={conAnillas}
              onChange={(e) => setConAnillas(e.target.checked)}
            />
            Con anillas
          </label>
        </div>

        {/* Botón para calcular el precio */}
        <button
          onClick={calcularPrecio}
          className="bg-[#00EEEA] text-black font-bold uppercase py-2 rounded-2xl hover:bg-[#00c9c6] transition"
        >
          Calcular
        </button>

        {/* Campo de salida con el precio total (solo lectura) */}
        <div>
          <label className="block mb-1 font-semibold">Precio total:</label>
          <input
            type="text"
            readOnly
            className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white"
            value={`Bs.   ${precio}  `}
          />
        </div>
      </section>
    </div>
  );
}
