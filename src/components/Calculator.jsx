import { useState } from 'react';
import BastidorForm from './Banner.jsx';

export default function Calculator() {
  const [tipo, setTipo] = useState('bastidor');
  const [dimensiones, setDimensiones] = useState({ alto: '', largo: '' });

  return (
    <div className="bg-blue-500 p-6 rounded-xl shadow-md w-full max-w-xl">
      <label htmlFor="tipo" className="block mb-2 font-medium">Selecciona el tipo de trabajo:</label>
      <select
        id="tipo"
        className="w-full mb-4 p-2 border rounded"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="bastidor">Bastidor</option>
        <option value="banner">Banner</option>
        <option value="adhesivo">Adhesivo</option>
        <option value="luminoso">Luminoso</option>
      </select>

      {tipo === 'bastidor' && (
        <BastidorForm dimensiones={dimensiones} setDimensiones={setDimensiones} />
      )}
      {/* Agregar más formularios aquí */}
    </div>
  );
}
