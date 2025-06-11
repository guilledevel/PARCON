export function costoArea(alto, ancho, costoBase) {
    // Convierte los valores a enteros (no redeclaramos las variables)
    alto = parseInt(alto);
    ancho = parseInt(ancho);

    const costo = costoBase;
    const area = (alto * ancho) / 10000; // Área en metros cuadrados
    const precio = costo * area;

    return {precio, area};
}

export function redondear(precio) {
    return Math.ceil(precio / 10) * 10;
  }


  // Función para obtener el precio base según el área
export function obtenerPrecioBase(areaValor) {
  for (let i = 0; i < tablaAdhesivo.length; i++) {
    if (areaValor <= tablaAdhesivo[i].m2) {
      return tablaAdhesivo[i].base;
    }
  }
  // Si supera el mayor rango, usamos el último valor
  return tablaAdhesivo.at(-1).base;
}

// Función para calcular el precio total del adhesivo
export function calcularPrecioAdhesivo({ alto, largo, precios, opciones }) {
  const area = costoArea(alto, largo);
  const areaValor = area.area;

  // Obtener precio base correspondiente al rango
  const base = obtenerPrecioBase(areaValor);

  precios.base = base;
  precios.plastificado = base / 2;

  const costoBase = costoArea(alto, largo, base).precio;
  const costoPlastificado = costoArea(alto, largo, precios.plastificado).precio;
  const costoInstalacion = areaValor * precios.instalacion;

  let precio = costoBase;
  if (opciones["plastificado"]) precio += costoPlastificado;
  if (opciones["instalacion"]) precio += costoInstalacion;

  return redondear(precio);
}
