'use client'
import { useState } from 'react'

export default function Formulario({ onGenerate }) {
  const [car, setCar] = useState('')
  const [circuit, setCircuit] = useState('')
  const [game, setGame] = useState('GT7')
  const [style, setStyle] = useState('grip')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
  if (!car || !circuit) return
  setLoading(true)
  const res = await fetch('/api/generar-setup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ car, circuit, game, style }),
  })
  const data = await res.json()
  onGenerate(data.result)
  setLoading(false)
}

  return (
    <div className="flex flex-col items-center space-y-6 mt-10">
      <h1 className="text-4xl md:text-5xl font-bold uppercase text-white text-center">🎮 Generador de Setup para Coches</h1>
      <img src={`/img/${game === 'GT7' ? 'gt7' : game === 'Forza Horizon 5' ? 'forza' : 'assetto'}.jpeg`} className="h-20" alt={game} />
      <div className="flex flex-col gap-4 w-full max-w-md">
        <select value={game} onChange={(e) => setGame(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-blue-600 text-white">
          <option>GT7</option>
          <option>Forza Horizon 5</option>
          <option>Assetto Corsa</option>
        </select>
        <input placeholder="Coche" value={car} onChange={(e) => setCar(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-blue-600 text-white" />
        <input placeholder="Circuito" value={circuit} onChange={(e) => setCircuit(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-blue-600 text-white" />
        <select value={style} onChange={(e) => setStyle(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-blue-600 text-white">
          <option value="grip">Grip (asfalto seco)</option>
          <option value="lluvia">Lluvia</option>
          <option value="drift">Drift</option>
          <option value="resistencia">Resistencia</option>
        </select>
        <button
  onClick={handleSubmit}
  className="bg-red-600 text-white font-bold uppercase py-3 rounded-xl text-lg hover:bg-red-700 transition"
  disabled={loading}
>
  {loading ? 'Generando...' : '¡Generar Setup!'}
</button>
      </div>
    </div>
  )
}
