import { useState } from "react";
import { costoArea, redondear } from "../utils/CostoArea.js";
import price from "../data/price.json";

// Definimos el componente Calculator
export default function Calculator() {
  const [tipo, setTipo] = useState("");
  const [alto, setAlto] = useState("");
  const [largo, setLargo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [opciones, setOpciones] = useState({});

  //tabla de precios adsivo
  const tablaAdhesivo = [
    { m2: 0.01, base: 1500 },
    { m2: 0.04, base: 725 },
    { m2: 0.09, base: 478 },
    { m2: 0.16, base: 356 },
    { m2: 0.25, base: 284 },
    { m2: 0.36, base: 233 },
    { m2: 0.49, base: 200 },
    { m2: 0.64, base: 175 },
    { m2: 0.81, base: 156 },
    { m2: 1.0, base: 140 },
  ];

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

  function calcularPrecio() {
    const altoNum = parseFloat(alto) || 0;
    const largoNum = parseFloat(largo) || 0;
    // const areaM2 = (altoNum * largoNum) / 10000;

    const item = price[tipo];
    let precioFinal = 0;

    // Lógica dinámica según las opciones seleccionadas
    // para "banner"
    if (tipo === "banner") {
      const costoUnitario = opciones["varilla"]
        ? item.precios.varilla
        : item.precios.base;
      const precioBase = costoArea(altoNum, largoNum, costoUnitario);
      precioFinal = redondear(precioBase.precio);
    }
    // trabajo stikers
    else if (tipo === "sticker") {
      let precioBase;

      const cantidad = parseInt(opciones["cantidad"]) || 0;
      const precioUnitario = costoArea(
        altoNum,
        largoNum,
        item.precios.base
      ).precio;

      if (cantidad >= 50) {
        precioBase = precioUnitario * cantidad;
      } else {
        alert("La cantidad mínima para stickers es 50 unidades.");
        return;
      }

      precioFinal = redondear(precioBase);
    }

    //  "adhesivo"
    else if (tipo === "adhesivo") {
      //recuperamos el tamaño  de area☑️☑️
      const area = costoArea(altoNum, largoNum);
      //devuelve el precio BASE por tamaño ☑️☑️
      let base = tablaAdhesivo.find((entry) => entry.m2 >= area.area);
      //declaramos la variable de precio☑️☑️
      let precioBase;

      if (area.area <= 0.0081) {
        precioBase = 15;
        console.log(precioBase);
      } else {
        let basePlastificado = (item.precios.plastificado = base.base / 2);

        let costoBase = costoArea(altoNum, largoNum, base.base).precio;
        let costoPlastificado = costoArea(
          altoNum,
          largoNum,
          basePlastificado
        ).precio;
        let precioInstalacion = area.area * item.precios.instalacion;

        if (opciones["plastificado"] && opciones["instalacion"]) {
          precioBase = costoBase + costoPlastificado + precioInstalacion;
        } else if (opciones["plastificado"]) {
          precioBase = costoBase + costoPlastificado;
        } else if (opciones["instalacion"]) {
          precioBase = costoBase + precioInstalacion;
        } else {
          precioBase = costoBase;
        }
      }

      precioFinal = redondear(precioBase);
    }

    // Trabajo "bastidor"
    else if (tipo === "bastidor") {
      let precioBase;

      let unaCara = costoArea(altoNum, largoNum, item.precios.base).precio;
      let dosCaras = costoArea(altoNum, largoNum, item.precios.dosCaras).precio;
      let plastificado = costoArea(
        altoNum,
        largoNum,
        item.precios.plastificado
      ).precio;
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

      let unaCara = costoArea(altoNum, largoNum, item.precios.base).precio;
      let dosCaras = costoArea(altoNum, largoNum, item.precios.dosCaras).precio;
      let plastificado = costoArea(
        altoNum,
        largoNum,
        item.precios.plastificado
      ).precio;
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

      let precioPlastificado = costoArea(
        altoNum,
        largoNum,
        item.precios.plastificado
      ).precio;
      let precioUnaCara = costoArea(
        altoNum,
        largoNum,
        item.precios.base
      ).precio;

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
        precioBase =
          costoArea(altoNum, largoNum, item.precios.base).precio + precioFocos;
      }
      precioFinal = redondear(precioBase);
    }

    // cambio de lona
    else if (tipo === "cambioLona") {
      let precioBase;

      let precioUnaCara = costoArea(
        altoNum,
        largoNum,
        item.precios.base
      ).precio;
      let precioPlastificado = costoArea(
        altoNum,
        largoNum,
        item.precios.plastificado
      ).precio;

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        calcularPrecio();
      }}
      className="bg-gradient-to-r from-[#201053] to-[#1E5097] p-6 rounded-xl shadow-md w-full max-w-md text-white"
      aria-labelledby="form-title">
      <section
        className="flex flex-col gap-4"
        role="group"
        aria-label="Formulario de cotización">
        <fieldset className="space-y-2">
          <legend id="form-title" className="text-lg font-bold mb-2">
            Cotiza tu trabajo
          </legend>

          <div>
            <label htmlFor="tipo" className="block mb-1 font-medium uppercase">
              Cotiza el tipo de Trabajo:
            </label>
            <select
              id="tipo"
              name="tipo"
              value={tipo}
              onChange={handleTipoChange}
              className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white
              focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
              hover:bg-[#090A32] transition duration-300 ease-in-out"
              required>
              <option value="">Seleccionar tipo de trabajo</option>
              {Object.entries(price).map(([key, value]) => (
                <option
                  key={key}
                  value={key}
                  className="bg-[#090A32] text-white">
                  {value.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Dimensiones (Cm):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="alto"
                name="alto"
                placeholder="Alto (Cm.)"
                className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white text-center
                focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
                hover:bg-[#090A32] transition duration-300 ease-in-out appearance-none"
                value={alto}
                onChange={(e) => setAlto(e.target.value)}
                min="0"
                required
              />
              <input
                type="number"
                id="largo"
                name="largo"
                placeholder="Largo (Cm.)"
                className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white text-center
                focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
                hover:bg-[#090A32] transition duration-300 ease-in-out appearance-none"
                value={largo}
                onChange={(e) => setLargo(e.target.value)}
                min="0"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Opciones dinámicas */}
        {opcionesUI.length > 0 && (
          <fieldset className="flex items-center gap-4 flex-wrap">
            <legend className="sr-only">Opciones adicionales</legend>
            {opcionesUI.map((opt) => (
              <label key={opt.campo} className="flex items-center gap-2">
                {opt.tipo === "checkbox" ? (
                  <input
                    type="checkbox"
                    name={opt.campo}
                    checked={!!opciones[opt.campo]}
                    onChange={() => handleOpcionChange(opt.campo)}
                  />
                ) : (
                  <input
                    type="number"
                    name={opt.campo}
                    min="1"
                    value={opciones[opt.campo] || ""}
                    onChange={(e) =>
                      setOpciones((prev) => ({
                        ...prev,
                        [opt.campo]: e.target.value,
                      }))
                    }
                    className="text-center w-16 p-1 border border-[#00EEEA] rounded-2xl text-white
                    focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
                    hover:bg-[#090A32] transition duration-300 ease-in-out appearance-none"
                  />
                )}
                {opt.label}
              </label>
            ))}
          </fieldset>
        )}

        {/* Botón para calcular precio */}
        <button
          type="submit"
          className="bg-[#00EEEA] text-black font-bold uppercase py-2 rounded-2xl hover:bg-[#00c9c6] transition-colors active:bg-(--complement)
          duration-300 ease-in-out w-full">
          Cotizar precio
        </button>

        {/* Mostrar el precio total */}
        <div>
          <label htmlFor="precio" className="block mb-1 font-semibold">
            Precio total: Bs.
          </label>
          <input
            type="text"
            id="precio"
            name="precio"
            readOnly
            className="text-center text-4xl font-medium w-full p-2 border border-(--secundary) rounded-2xl text-white
            focus:outline-none focus:ring-1 focus:ring-(--complement) focus:border-transparent
            hover:bg-[#090A32] transition duration-300 ease-in-out appearance-none"
            value={`Bs. ${precio}`}
          />
        </div>
      </section>
    </form>
  );
}