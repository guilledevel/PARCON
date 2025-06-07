export function costoArea(alto, ancho, costoBase) {
    // Convierte los valores a enteros (no redeclaramos las variables)
    alto = parseInt(alto);
    ancho = parseInt(ancho);

    const costo = costoBase;
    const area = (alto * ancho) / 10000; // Área en metros cuadrados
    const precio = costo * area;

    return precio;
}

export function redondear(precio) {
    return Math.ceil(precio / 10) * 10;
  }