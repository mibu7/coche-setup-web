
'use client'
import { useState } from 'react'

export default function Formulario({ onGenerate }) {
  const [car, setCar] = useState('')
  const [circuit, setCircuit] = useState('')
  const [game, setGame] = useState('GT7')
  const [style, setStyle] = useState('grip')
  const [loading, setLoading] = useState(false)
  const [pr, setPr] = useState('')

  const handleSubmit = async () => {
    if (!car || !circuit) return
    setLoading(true)
    const res = await fetch('/api/generar-setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ car, circuit, game, style, pr }),
    })
    const data = await res.json()
    onGenerate(data.result)
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center text-center mt-10 space-y-8">
      <h1 className="text-4xl sm:text-5xl font-bold uppercase text-cyan-400 drop-shadow-[0_0_10px_#00f2ff]">
        Generador de Setup para Coches
      </h1>

      <div className="w-full max-w-md space-y-4">
        <select value={game} onChange={(e) => setGame(e.target.value)} className="w-full">
          <option>GT7</option>
          <option>Forza Horizon 5</option>
          <option>Assetto Corsa</option>
        </select>
        <input type="text" placeholder="Coche (ej: Mazda RX-7)" value={car} onChange={(e) => setCar(e.target.value)} className="w-full" />
        <input type="text" placeholder="Circuito (ej: Nürburgring)" value={circuit} onChange={(e) => setCircuit(e.target.value)} className="w-full" />
        <input type="number" placeholder="Límite de PR (opcional)" value={pr} onChange={(e) => setPr(e.target.value)} className="w-full" />
        <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full">
          <option value="grip">Grip (asfalto seco)</option>
          <option value="lluvia">Lluvia</option>
          <option value="drift">Drift</option>
          <option value="resistencia">Resistencia</option>
        </select>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white text-3xl sm:text-4xl font-extrabold uppercase tracking-widest px-10 py-6 rounded-3xl shadow-[0_0_25px_#ff0000aa] transition-all duration-300 active:scale-95"
        >
          {loading ? 'GENERANDO...' : '¡GENERAR SETUP!'}
        </button>
      </div>
    </div>
  )
}
