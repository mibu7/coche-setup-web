'use client'

import { Orbitron } from 'next/font/google'
const orbitron = Orbitron({ subsets: ['latin'], weight: '600' })

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGamepad, FaCarSide, FaFlagCheckered, FaTachometerAlt } from 'react-icons/fa'

export default function Home() {
  const [game, setGame] = useState('GT7')
  const [car, setCar] = useState('')
  const [circuit, setCircuit] = useState('')
  const [style, setStyle] = useState('grip')
  const [setup, setSetup] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!car || !circuit) return
    setLoading(true)
    setSetup('')

    const res = await fetch('/api/generar-setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ car, circuit, game, style }),
    })

    const data = await res.json()
    setSetup(data.result)
    setLoading(false)
  }

  return (
    <main className={`${orbitron.className} min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 flex flex-col items-center`}>
      <div className="text-5xl flex items-center gap-4 font-bold mb-6 text-blue-400">
        <FaTachometerAlt className="text-blue-500 text-6xl" />
        Generador de Setup para Coches
      </div>
      <div className="mb-6">
  {game === 'GT7' && <img src="/img/gt7.jpeg" alt="GT7" className="h-16 mx-auto" />}
  {game === 'Forza Horizon 5' && <img src="/img/forza.jpeg" alt="Forza Horizon 5" className="h-16 mx-auto" />}
  {game === 'Assetto Corsa' && <img src="/img/assetto.jpeg" alt="Assetto Corsa" className="h-16 mx-auto" />}
</div>

      <div className="w-full max-w-2xl bg-[#1a1a2e]/80 backdrop-blur p-6 rounded-2xl shadow-[0_0_20px_#00f2ff40] border border-cyan-500 space-y-4">
        <div>
          <label className="block font-semibold mb-1 text-blue-300 flex items-center gap-2">
            <FaGamepad /> Videojuego
          </label>
          <select
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-blue-600"
          >
            <option>GT7</option>
            <option>Assetto Corsa</option>
            <option>Forza Horizon 5</option>
            <option>iRacing</option>
            <option>Project Cars 2</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-blue-300 flex items-center gap-2">
            <FaCarSide /> Coche
          </label>
          <input
            type="text"
            placeholder="Ej: Mazda RX-7"
            value={car}
            onChange={(e) => setCar(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-blue-600"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-blue-300 flex items-center gap-2">
            <FaFlagCheckered /> Circuito
          </label>
          <input
            type="text"
            placeholder="Ej: Nürburgring"
            value={circuit}
            onChange={(e) => setCircuit(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-blue-600"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-blue-300 flex items-center gap-2">
            <FaTachometerAlt /> Tipo de ajuste
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-blue-600"
          >
            <option value="grip">Grip (asfalto seco)</option>
            <option value="drift">Drift</option>
            <option value="lluvia">Lluvia</option>
            <option value="resistencia">Resistencia</option>
            <option value="drag">Drag</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-3 rounded-xl text-xl font-bold transition shadow-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white"
          disabled={loading}
        >
          {loading ? 'Generando...' : '¡Generar Setup!'}
        </button>
      </div>

{setup && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mt-10 w-full max-w-2xl space-y-4"
  >
    {setup.split('\n\n').map((section, index) => {
      const lines = section.trim().split('\n')
      const title = lines[0]?.replace(/\*\*/g, '').replace(':', '')
      const values = lines.slice(1)

      return (
        <div
          key={index}
          className="bg-gray-800 border border-cyan-500 rounded-2xl p-4 shadow-[0_0_20px_#00f2ff40]"
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-2 drop-shadow-[0_0_6px_#00f2ff]">
            {title}
          </h3>
          <ul className="space-y-1 text-white list-disc list-inside">
            {values.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )
    })}
  </motion.div>
)}
    </main>
  )
}