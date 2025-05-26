/* un card para cotizar los proyectos */

import { useState } from 'react';

const opcionesPorTrabajo = {
  banner: ['varilla', 'plastificado', 'argollas'],
  luminoso: ['plastificado', 'instalacion']
};

export default function Cotizador() {
  const [form, setForm] = useState({
    trabajo: 'banner',
    dimensiones: { alto: '', largo: '' },
    extras: {
      varilla: false,
      plastificado: false,
      argollas: { usar: false, cantidad: '' }, // Cambiado a string para el input
      instalacion: { usar: false, lugar: '' }
    }
  });

  const handleTrabajoChange = (e) => {
    const nuevoTrabajo = e.target.value;
    // Resetear extras al cambiar de trabajo
    setForm({
      trabajo: nuevoTrabajo,
      dimensiones: { alto: '', largo: '' },
      extras: {
        varilla: false,
        plastificado: false,
        argollas: { usar: false, cantidad: '' },
        instalacion: { usar: false, lugar: '' }
      }
    });
  };

  const toggleExtra = (key, value) => {
    setForm({
      ...form,
      extras: {
        ...form.extras,
        [key]: typeof value === 'object' ? { ...form.extras[key], ...value } : value
      }
    });
  };

  const handleDimensionChange = (dimension, value) => {
    setForm({
      ...form,
      dimensiones: {
        ...form.dimensiones,
        [dimension]: value
      }
    });
  };

  return (
    <form>
      <select value={form.trabajo} onChange={handleTrabajoChange}>
        <option value="banner">Banner</option>
        <option value="luminoso">Luminoso</option>
      </select>

      <input 
        type="number" 
        placeholder="Alto" 
        value={form.dimensiones.alto}
        onChange={(e) => handleDimensionChange('alto', e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Largo" 
        value={form.dimensiones.largo}
        onChange={(e) => handleDimensionChange('largo', e.target.value)} 
      />

      {/* Opciones extra dinámicas */}
      {form.trabajo === 'banner' && (
        <>
          <label>
            <input 
              type="checkbox" 
              checked={form.extras.varilla}
              onChange={() => toggleExtra('varilla', !form.extras.varilla)} 
            /> Con varilla
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={form.extras.plastificado}
              onChange={() => toggleExtra('plastificado', !form.extras.plastificado)} 
            /> Plastificado
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={form.extras.argollas.usar}
              onChange={() => toggleExtra('argollas', { usar: !form.extras.argollas.usar })} 
            /> Con argollas
          </label>
          {form.extras.argollas.usar && (
            <input 
              type="number" 
              value={form.extras.argollas.cantidad}
              onChange={(e) => toggleExtra('argollas', { cantidad: e.target.value })}
              placeholder="Cantidad de argollas" 
              min="0"
            />
          )}
        </>
      )}

      {form.trabajo === 'luminoso' && (
        <>
          <label>
            <input 
              type="checkbox" 
              checked={form.extras.plastificado}
              onChange={() => toggleExtra('plastificado', !form.extras.plastificado)} 
            /> Plastificado
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={form.extras.instalacion.usar}
              onChange={() => toggleExtra('instalacion', { usar: !form.extras.instalacion.usar })} 
            /> Instalación
          </label>
          {form.extras.instalacion.usar && (
            <select 
              value={form.extras.instalacion.lugar}
              onChange={(e) => toggleExtra('instalacion', { lugar: e.target.value })}
            >
              <option value="">Seleccionar lugar</option>
              <option value="Shinahota">Shinahota</option>
              <option value="Chimore">Chimore</option>
              <option value="Villa Tunari">Villa Tunari</option>
            </select>
          )}
        </>
      )}
    </form>
  );
}