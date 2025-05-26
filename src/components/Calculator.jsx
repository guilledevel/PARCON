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

  // convertir las dimenciones de cm2 a m2
  const areaM2 = (alto * largo) / 10000;

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
    // Ejemplo para "banner"
    if (tipo === "banner") {
  const conVarilla = opciones["varilla"];
  const precioBase = areaM2 * (conVarilla ? item.precios.conBarilla : item.precios.sinBarilla);
  precioFinal = Math.ceil(precioBase / 10) * 10;
}
    //  "adhesivo"
    else if (tipo === "adhesivo") {
      if (opciones["plastificado"] && opciones["instalacion"]) {
        precioFinal = areaM2 * item.precios.plastificado_instalado;
      } else if (opciones["plastificado"]) {
        precioFinal = areaM2 * item.precios.plastificado;
      } else if (tipo === "adhesivo") {
        if (opciones["plastificado"] && opciones["instalacion"]) {
          precioFinal = areaM2 * item.precios.plastificado_instalado;
        } else if (opciones["plastificado"]) {
          precioFinal = areaM2 * item.precios.plastificado;
        } else {
          precioFinal = areaM2 * item.precios.impreso;
        }
      }

      
    } 
    
    // trabajo stikers
    else if (tipo === "sticker") {
      const cantidad = parseInt(opciones["cantidad"]) || 0;
      const precioUnitario = areaM2 * item.precios.impreso;
      const precioCorte = item.precios.cortado;
      precioFinal = (precioUnitario + precioCorte) * cantidad;
    }

    // Trabajo "bastidor"
    else if (tipo === "bastidor") {
      let unaCara = areaM2 * item.precios.una_cara;
      let dosCaras = areaM2 * item.precios.dos_caras;
      let plastificado = areaM2 * item.precios.plastificado;
      let precioPatas = item.precios.patas || 0;

     if (opciones["dos_caras"] && opciones["plastificado"] && opciones["patas"]){
      precioFinal = dosCaras + (plastificado *2) + precioPatas;
     } 
     else if (opciones["dos_caras"] && opciones["plastificado"]) {
      precioFinal = dosCaras + (plastificado * 2) + precioPatas;
     }
     else if (opciones["dos_caras"]){
      precioFinal = dosCaras + precioPatas;
     }
     else if (opciones["plastificado"]){
      precioFinal = unaCara + plastificado + precioPatas;
     }
     else{
      precioFinal = unaCara + precioPatas;
     }




    }
    //trabajo "luminoso"
    
    else if (tipo === "luminoso") {
      //if (opciones["plastificado"] && opciones["instalacion"])
      

      if(opciones["dos_caras"]  && opciones["plastificado"]){
        let precioPlastificado = (areaM2 * item.precios.plastificado) *2;
        let precioDosCaras = areaM2 * item.precios.dos_caras;
        precioFinal = precioPlastificado + precioDosCaras;
      } else if (opciones["dos_caras"]){
        precioFinal = areaM2 * item.precios.dos_caras;
      }
      else if (opciones["plastificado"]){
        let precioPlastificado = areaM2 * item.precios.plastificado;
        let precioUnaCara = areaM2 * item.precios.una_cara;
        precioFinal = precioPlastificado + precioUnaCara;
      }
      else {
        precioFinal = areaM2 * item.precios.una_cara;
      }
    }

    // cambio panaflex
    else if(tipo === "cambioPanaflex"){
      let precioPlastificado = areaM2 * item.precios.plastificado;
      let precioUnaCara = areaM2 * item.precios.cambio_panaflex;

      let cantidadFocos = parseInt(opciones["focos"]) || 0;
      let precioFocos= cantidadFocos * item.precios.cambio_focos;

      if (opciones["plastificado"] && opciones["dos_caras"]) {
        let precioDosCarasPlastificado = (precioPlastificado + precioUnaCara) * 2;
        precioFinal = precioDosCarasPlastificado + precioFocos;

      }else if (opciones["dos_caras"]){
        precioFinal = (precioUnaCara * 2) + precioFocos;
      }


      else if (opciones["plastificado"]){
        precioFinal = precioPlastificado + precioUnaCara + precioFocos;
      } 
      else if (opciones["plastificado"]) {
        precioFinal = areaM2 * item.precios.cambio_panaflex + precioPlastificado + precioFocos;
      } 
      else{
        precioFinal = areaM2 * item.precios.cambio_panaflex + precioFocos;
      }

    }

    // cambio de lona
    else if(tipo === "cambio_lona"){
      let precioUnaCara = areaM2 * item.precios.cambio_lona;
      let precioPlastificado = areaM2 * item.precios.plastificado;
      

      if (opciones["plastificado"] && opciones["dos_caras"]){

        let precioDosCarasPlastificado = (precioPlastificado + precioUnaCara) * 2;

        precioFinal = precioDosCarasPlastificado;
      }else if(opciones["dos_caras"]) {
        precioFinal = precioUnaCara * 2;
      } else if (opciones["plastificado"]){
        precioFinal = precioPlastificado + precioUnaCara;
      } else {
        precioFinal = precioUnaCara;
      }

    }

    setPrecio(Math.round(precioFinal).toLocaleString('es-BO'));

  }

  // Render dinámico de checkboxes
  const opcionesUI = price[tipo]?.opciones_ui || [];



  // Renderizado del componente
  return (
    <div className="bg-gradient-to-r from-[#201053] to-[#1E5097] p-6 rounded-xl shadow-md w-full max-w-md text-white">
      <section className="flex flex-col gap-4">
        <div>
          <label htmlFor="tipo" className="block mb-1 font-semibold">
            Trabajo:
          </label>
          <select
            value={tipo}
            onChange={handleTipoChange}
            className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white">
            <option value="">Seleccionar tipo de trabajo</option>
            {Object.entries(price).map(([key, value]) => (
              <option key={key} value={key} className="bg-[#090A32] text-white">
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
              placeholder="Alto"
              className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white"
              value={alto}
              onChange={(e) => setAlto(e.target.value)}
              min="0"
            />
            <input
              type="number"
              placeholder="Largo"
              className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white"
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
                    className="w-16 p-1 border border-[#00EEEA] rounded-2xl  text-white"
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
          className="bg-[#00EEEA] text-black font-bold uppercase py-2 rounded-2xl hover:bg-[#00c9c6] transition">
          Calcular
        </button>

        {/* muestra el precio total */}
        <div>
          <label className="block mb-1 font-semibold">Precio total: Bs.</label>
          <input
            type="text"
            readOnly
            className="w-full p-2 border border-[#00EEEA] rounded-2xl text-white"
            value={`Bs. ${precio}`}
          />
        </div>
      </section>
    </div>
  );
}
