import { useState, useEffect } from "react";
import priceData from "../data/price.json";
import { PricingService } from "../utils/PricingService.js";

const { configuracionGlobal, productos } = priceData;

export default function Calculator() {
  const [tipo, setTipo] = useState("");
  const [alto, setAlto] = useState("");
  const [largo, setLargo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [opciones, setOpciones] = useState({});
  const [error, setError] = useState("");

  // Al cambiar el producto, inicializamos las opciones
  useEffect(() => {
    if (!tipo) return;

    const producto = productos[tipo];
    const nuevasOpciones = {};

    // Inicializar complementos compatibles
    if (producto.complementosCompatibles) {
      producto.complementosCompatibles.forEach((compKey) => {
        nuevasOpciones[compKey] = false;
      });
    }

    // Inicializar opciones específicas
    if (producto.opcionesEspecificas) {
      producto.opcionesEspecificas.forEach((opt) => {
        nuevasOpciones[opt.id] = opt.tipoControl === "checkbox" ? false : "";
      });
    }

    setOpciones(nuevasOpciones);
    setPrecio(0);
    setError("");
  }, [tipo]);

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleOpcionChange = (campo, valor) => {
    setOpciones((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = PricingService.calcular(tipo, alto, largo, opciones);

    if (result.error) {
      setError(result.error);
      setPrecio(0);
    } else {
      setError("");
      setPrecio(result.precio);
    }
  };

  const productoActual = productos[tipo];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-[#201053] to-[#1E5097] p-6 rounded-xl shadow-md w-full max-w-md text-white">
      <section className="flex flex-col gap-4">
        <header>
          <h2 className="text-xl font-bold mb-4">Cotiza tu trabajo</h2>
        </header>

        <div className="space-y-4">
          {/* Selección de Producto */}
          <div>
            <label htmlFor="tipo" className="sr-only">
              Tipo de trabajo
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={handleTipoChange}
              className="w-full p-2 border border-[#00EEEA] rounded-2xl bg-transparent text-white focus:ring-2 focus:ring-[#00EEEA] outline-none"
              required>
              <option value="" className="bg-[#090A32]">
                Seleccionar tipo de trabajo
              </option>
              {Object.entries(productos).map(([key, value]) => (
                <option key={key} value={key} className="bg-[#090A32]">
                  {value.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Dimensiones */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Dimensiones (cm):</span>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Alto (cm)"
                value={alto}
                onChange={(e) => setAlto(e.target.value)}
                className="w-1/2 p-2 border border-[#00EEEA] rounded-2xl bg-transparent text-center focus:ring-2 focus:ring-[#00EEEA] outline-none"
                min="1"
                step="1"
                required
              />
              <input
                type="number"
                placeholder="Largo (cm)"
                value={largo}
                onChange={(e) => setLargo(e.target.value)}
                className="w-1/2 p-2 border border-[#00EEEA] rounded-2xl bg-transparent text-center focus:ring-2 focus:ring-[#00EEEA] outline-none"
                min="1"
                step="1"
                required
              />
            </div>
          </div>

          {/* Opciones Dinámicas */}
          {productoActual && (
            <div className="flex flex-col gap-3">
              <span className="font-semibold">Opciones:</span>
              <div className="flex flex-wrap gap-4">
                {/* Complementos Globales */}
                {productoActual.complementosCompatibles?.map((compKey) => {
                  const comp = configuracionGlobal.complementos[compKey];
                  return (
                    <label
                      key={compKey}
                      className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!opciones[compKey]}
                        onChange={(e) =>
                          handleOpcionChange(compKey, e.target.checked)
                        }
                        className="accent-[#00EEEA]"
                      />
                      {comp.nombre}
                    </label>
                  );
                })}

                {/* Opciones Específicas */}
                {productoActual.opcionesEspecificas?.map((opt) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    {opt.tipoControl === "checkbox" ? (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!opciones[opt.id]}
                          onChange={(e) =>
                            handleOpcionChange(opt.id, e.target.checked)
                          }
                          className="accent-[#00EEEA]"
                        />
                        {opt.label}
                      </label>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <label className="text-sm">{opt.label}:</label>
                        <input
                          type="number"
                          value={opciones[opt.id] || ""}
                          onChange={(e) =>
                            handleOpcionChange(opt.id, e.target.value)
                          }
                          className="w-20 p-1 border border-[#00EEEA] rounded-xl bg-transparent text-center outline-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Errores */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-xl text-sm animate-pulse">
              ⚠️ {error}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#00EEEA] hover:bg-[#00c9c6] text-slate-900 font-bold py-3 rounded-2xl transition-all shadow-lg active:scale-95">
            CALCULAR PRECIO
          </button>

          {/* Resultado */}
          {precio > 0 && !error && (
            <div className="mt-4 text-center border-t border-[#00EEEA]/30 pt-4">
              <p className="text-sm text-[#00EEEA] uppercase tracking-wider">
                Precio estimado
              </p>
              <p className="text-5xl font-black mt-1">
                Bs. {precio.toLocaleString("es-BO")}
              </p>
              <p className="text-xs text-slate-300 mt-2 opacity-70">
                * El precio puede variar según la complejidad del diseño.
              </p>
            </div>
          )}
        </div>
      </section>
    </form>
  );
}
