import { useState } from "react";
import price from "../data/price.json";

// Definimos el componente Calculator
export default function Calculator() {
  const [tipo, setTipo] = useState("");
  const [alto, setAlto] = useState("");
  const [largo, setLargo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [opciones, setOpciones] = useState({});

  // Cuando cambia el tipo resetea las opciones menos alto y largo
  const handleTipoChange = (e) => {
    const nuevoTipo = e.target.value;
    setTipo(nuevoTipo);
    //inicializa las opciones en false
    const opcionesIniciales = {};
    price[nuevoTipo]?.opciones_ui?.forEach((opt) => {
      opcionesIniciales[opt.campo] = false;
    });
    setOpciones(opcionesIniciales);
  };

  //maneja el camnbio de cada checkbox
  function handleOpcionChange(campo) {
    setOpciones((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  }

  function redondear(precio) {
    return Math.ceil(precio / 10) * 10;
  }

  function calcularPrecio() {
    const altoNum = parseFloat(alto) || 0;
    const largoNum = parseFloat(largo) || 0;
    const areaM2 = (altoNum * largoNum) / 10000;
    if (!tipo || (tipo !== "sticker" && areaM2 === 0)) {
      setPrecio(0);
      return;
    }

    const item = price[tipo];
    let precioFinal = 0;

    // Lógica dinámica según las opciones seleccionadas
    // para "banner"
    if (tipo === "banner") {
      let precioBase;

      if (opciones["varilla"]) {
        precioBase = areaM2 * item.precios.conVarilla;
      } else {
        precioBase = areaM2 * item.precios.impreso;
      }
      precioFinal = redondear(precioBase);
    }

    //  "adhesivo"
    else if (tipo === "adhesivo") {
      let precioBase;

      if (opciones["plastificado"] && opciones["instalacion"]) {
        precioBase = areaM2 * item.precios.plastificado_instalado;
      } else if (opciones["plastificado"]) {
        precioBase = areaM2 * item.precios.plastificado;
      } else if (opciones["instalacion"]) {
        precioBase = areaM2 * item.precios.instalacion;
      } else {
        precioBase = areaM2 * item.precios.impreso;
      }

      precioFinal = redondear(precioBase);
    }

    // trabajo stikers
    else if (tipo === "sticker") {
      let precioBase;

      const cantidad = parseInt(opciones["cantidad"]) || 0;
      const precioUnitario = areaM2 * item.precios.impreso;

      if (cantidad >= 50) {
        precioBase = precioUnitario * cantidad;
      } else {
        alert("La cantidad mínima para stickers es 50 unidades.");
        return;
      }

      precioFinal = redondear(precioBase);
    }

    // Trabajo "bastidor"
    else if (tipo === "bastidor") {
      let precioBase;

      let unaCara = areaM2 * item.precios.una_cara;
      let dosCaras = areaM2 * item.precios.dos_caras;
      let plastificado = areaM2 * item.precios.plastificado;
      let precioPatas = item.precios.patas || 0;

      if (
        opciones["dos_caras"] &&
        opciones["plastificado"] &&
        opciones["patas"]
      ) {
        precioBase = dosCaras + plastificado * 2 + precioPatas;
      } else if (opciones["plastificado"] && opciones["patas"]) {
        precioBase = unaCara + plastificado + precioPatas;
      } else if (opciones["dos_caras"] && opciones["patas"]) {
        precioBase = dosCaras + precioPatas;
      } else if (opciones["patas"]) {
        precioBase = unaCara + precioPatas;
      } else if (opciones["dos_caras"] && opciones["plastificado"]) {
        precioBase = dosCaras + plastificado * 2;
      } else if (opciones["dos_caras"]) {
        precioBase = dosCaras;
      } else if (opciones["plastificado"]) {
        precioBase = unaCara + plastificado;
      } else {
        precioBase = unaCara;
      }

      precioFinal = redondear(precioBase);
    }
    //trabajo "luminoso"
    else if (tipo === "luminoso") {
      let precioBase;

      let unaCara = areaM2 * item.precios.una_cara;
      let dosCaras = areaM2 * item.precios.dos_caras;
      let plastificado = areaM2 * item.precios.plastificado;
      let precioPatas = item.precios.patas || 0;

      if (
        opciones["dos_caras"] &&
        opciones["plastificado"] &&
        opciones["patas"]
      ) {
        precioBase = dosCaras + plastificado * 2 + precioPatas;
      } else if (opciones["plastificado"] && opciones["patas"]) {
        precioBase = unaCara + plastificado + precioPatas;
      } else if (opciones["dos_caras"] && opciones["patas"]) {
        precioBase = dosCaras + precioPatas;
      } else if (opciones["patas"]) {
        precioBase = unaCara + precioPatas;
      } else if (opciones["dos_caras"] && opciones["plastificado"]) {
        precioBase = dosCaras + plastificado * 2;
      } else if (opciones["dos_caras"]) {
        precioBase = dosCaras;
      } else if (opciones["plastificado"]) {
        precioBase = unaCara + plastificado;
      } else {
        precioBase = unaCara;
      }

      precioFinal = redondear(precioBase);
    }

    // cambio panaflex
    else if (tipo === "cambioPanaflex") {
      let precioBase;

      let precioPlastificado = areaM2 * item.precios.plastificado;
      let precioUnaCara = areaM2 * item.precios.cambio_panaflex;

      let cantidadFocos = parseInt(opciones["focos"]) || 0;
      let precioFocos = cantidadFocos * item.precios.cambio_focos;

      if (opciones["plastificado"] && opciones["dos_caras"]) {
        let precioDosCarasPlastificado =
          (precioPlastificado + precioUnaCara) * 2;
        precioBase = precioDosCarasPlastificado + precioFocos;
      } else if (opciones["dos_caras"]) {
        precioBase = precioUnaCara * 2 + precioFocos;
      } else if (opciones["plastificado"]) {
        precioBase = precioPlastificado + precioUnaCara + precioFocos;
      } else if (opciones["plastificado"]) {
        precioBase =
          areaM2 * item.precios.cambio_panaflex +
          precioPlastificado +
          precioFocos;
      } else {
        precioBase = areaM2 * item.precios.cambio_panaflex + precioFocos;
      }
      precioFinal = redondear(precioBase);
    }

    // cambio de lona
    else if (tipo === "cambio_lona") {
      let precioBase;

      let precioUnaCara = areaM2 * item.precios.cambio_lona;
      let precioPlastificado = areaM2 * item.precios.plastificado;

      if (opciones["plastificado"] && opciones["dos_caras"]) {
        let precioDosCarasPlastificado =
          (precioPlastificado + precioUnaCara) * 2;

        precioBase = precioDosCarasPlastificado;
      } else if (opciones["dos_caras"]) {
        precioBase = precioUnaCara * 2;
      } else if (opciones["plastificado"]) {
        precioBase = precioPlastificado + precioUnaCara;
      } else {
        precioBase = precioUnaCara;
      }
      precioFinal = redondear(precioBase);
    }

    setPrecio(Math.round(precioFinal).toLocaleString("es-BO"));
  }

  // Render dinámico de checkboxes
  const opcionesUI = price[tipo]?.opciones_ui || [];

  // Renderizado del componente
  return (
    <div className="bg-gradient-to-r from-[#201053] to-[#1E5097] p-6 rounded-xl shadow-md w-full max-w-md text-white">
      <section className="flex flex-col gap-4">
        <div>
          <label htmlFor="tipo" className="block mb-1 font-medium uppercase">
            Cotiza el tipo de Trabajo:
          </label>
          <select
            value={tipo}
            onChange={handleTipoChange}
            className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white
            focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
              hover:bg-[#090A32] transition duration-300 ease-in-out
            ">
            <option value="">Seleccionar tipo de trabajo</option>
            {Object.entries(price).map(([key, value]) => (
              <option
                key={key}
                value={key}
                className="bg-[#090A32] text-white hover:bg-(--complement)">
                {value.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Dimensiones (Cm):</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Alto (Cm.)"
              className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white text-center
              focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
              hover:bg-[#090A32] transition duration-300 ease-in-out appearance-none
              "
              value={alto}
              onChange={(e) => setAlto(e.target.value)}
              min="0"
            />
            <input
              type="number"
              placeholder="Largo (Cm.)"
              className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white text-center
              focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
              hover:bg-[#090A32] transition duration-300 ease-in-out appearance-none
              "
              value={largo}
              onChange={(e) => setLargo(e.target.value)}
              min="0"
            />
          </div>
        </div>

        {/* Opciones dinámicas */}
        {opcionesUI.length > 0 && (
          <div className="flex items-center gap-4 flex-wrap">
            {opcionesUI.map((opt) => (
              <label key={opt.campo} className="flex items-center gap-2">
                {opt.tipo === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={!!opciones[opt.campo]}
                    onChange={() => handleOpcionChange(opt.campo)}
                  />
                ) : (
                  <input
                    type="number"
                    min="1"
                    value={opciones[opt.campo] || ""}
                    onChange={(e) =>
                      setOpciones((prev) => ({
                        ...prev,
                        [opt.campo]: e.target.value,
                      }))
                    }
                    className=" text-center w-16 p-1 border border-[#00EEEA] rounded-2xl  text-white focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
              hover:bg-[#090A32] transition duration-300 ease-in-out appearance-none"
                  />
                )}
                {opt.label}
              </label>
            ))}
          </div>
        )}

        {/* boton para calcular el precio */}
        <button
          onClick={calcularPrecio}
          className="bg-[#00EEEA] text-black font-bold uppercase py-2 rounded-2xl hover:bg-[#00c9c6] transition-colors active:bg-(--complement)
          duration-300 ease-in-out w-full
          ">
          Cotizar precio
        </button>

        {/* muestra el precio total */}
        <div>
          <label className="block mb-1 font-semibold">Precio total: Bs.</label>
          <input
            type="text"
            readOnly
            className="text-center text-4xl font-medium w-full p-2 border border-(--secundary) rounded-2xl text-white   focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
              hover:bg-[#090A32] transition duration-300 ease-in-out appearance-none"
            value={`Bs. ${precio}`}
          />
        </div>
      </section>
    </div>
  );
}
