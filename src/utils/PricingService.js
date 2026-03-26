import priceData from "../data/price.json";

const { configuracionGlobal, productos } = priceData;

/**
 * Calcula el área en metros cuadrados.
 * @param {number} alto - Alto en cm.
 * @param {number} largo - Largo en cm.
 * @returns {number} Área en m2.
 */
export function calcularArea(alto, largo) {
  return (parseFloat(alto) * parseFloat(largo)) / 10000;
}

/**
 * Redondea el precio al múltiplo de 10 superior.
 * @param {number} precio - Precio a redondear.
 * @returns {number} Precio redondeado.
 */
export function redondearPrecio(precio) {
  return Math.ceil(precio / 10) * 10;
}

/**
 * Servicio centralizado para calcular el precio de los productos.
 */
export const PricingService = {
  calcular(tipo, alto, largo, opciones) {
    const producto = productos[tipo];
    if (!producto) return { error: "Producto no encontrado" };

    const altoNum = parseFloat(alto) || 0;
    const largoNum = parseFloat(largo) || 0;

    if (altoNum <= 0 || largoNum <= 0) {
      return { error: "Las dimensiones deben ser mayores a 0 cm." };
    }

    const area = calcularArea(altoNum, largoNum);

    let precioFinal = 0;
    let error = null;

    // Lógica por tipo de producto
    switch (tipo) {
      case "banner":
        if (area < 0.1521) {
          error = "El tamaño mínimo para banner es de 39x39 cm (aprox 0.15 m2)";
        } else {
          const precioBase = opciones["conVarilla"]
            ? producto.opcionesEspecificas.find((o) => o.id === "conVarilla")
                .precio
            : producto.precioBase;

          if (area <= 0.36) {
            precioFinal = area >= 0.3 ? 60 : 50;
          } else {
            precioFinal = area * precioBase;
          }
        }
        break;

      case "sticker":
        const cantidad = parseInt(opciones["cantidad"]) || 0;
        if (cantidad < 5) {
          error = "La cantidad mínima para stickers es 5 unidades.";
        } else if (area < 0.0025) {
          error = "El tamaño mínimo para stickers es 5x5 cm.";
        } else {
          precioFinal = area * producto.precioBase * cantidad;
        }
        break;

      case "adhesivo":
        if (area <= 0.0081) {
          precioFinal = 15;
        } else {
          const costoBase = area * producto.precioBase;
          precioFinal = costoBase;

          if (opciones["plastificado"]) {
            precioFinal += area * (producto.precioBase / 2);
          }
          if (opciones["instalacion"]) {
            precioFinal +=
              area * configuracionGlobal.complementos.instalacion.precio;
          }
        }
        break;

      case "bastidor":
      case "luminoso":
        if (area <= 0.25) {
          error = "El tamaño mínimo es de 50x50 cm.";
        } else {
          const pBase = opciones["dosCaras"]
            ? producto.precioDosCaras
            : producto.precioBase;
          precioFinal = area * pBase;

          if (opciones["plastificado"]) {
            const factor = opciones["dosCaras"] ? 2 : 1;
            precioFinal +=
              area *
              configuracionGlobal.complementos.plastificado.precio *
              factor;
          }
          if (opciones["conPatas"]) {
            precioFinal += configuracionGlobal.complementos.conPatas.precio;
          }
        }
        break;

      case "cambioPanaflex":
        if (altoNum < 60 || largoNum < 60) {
          error = "Las dimensiones mínimas son 60x60 cm.";
        } else {
          const factorCaras = opciones["dosCaras"] ? 2 : 1;
          const precioM2 = producto.precioBase * area * factorCaras;
          precioFinal = precioM2;

          if (opciones["plastificado"]) {
            precioFinal +=
              configuracionGlobal.complementos.plastificado.precio *
              area *
              factorCaras;
          }

          const focos = parseInt(opciones["focos"]) || 0;
          const precioFocos = producto.opcionesEspecificas.find(
            (o) => o.id === "focos",
          ).precioPorUnidad;
          precioFinal += focos * precioFocos;
        }
        break;

      case "cambioLona":
        const carasLona = opciones["dobleCara"] ? 2 : 1;
        precioFinal = area * producto.precioBase * carasLona;
        if (opciones["plastificado"]) {
          precioFinal +=
            area *
            configuracionGlobal.complementos.plastificado.precio *
            carasLona;
        }
        break;

      default:
        error = "Producto no soportado";
    }

    if (error) return { error };

    // El original sumaba 30 y redondeaba
    const precioConMargen = precioFinal + 30;
    return {
      precio: redondearPrecio(precioConMargen),
      area,
      detalles: {
        base: precioFinal,
      },
    };
  },
};
