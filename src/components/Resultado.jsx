'use client'
import { motion } from 'framer-motion'

export default function Resultado({ setup }) {
  if (!setup) return null

  // 🧠 Separa por secciones bien formateadas
  const secciones = setup.split(/\n(?=\*\*[A-Z\s]+\*\*)/g)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto mt-14 space-y-8 text-white"
    >
      {secciones.map((section, i) => {
        const lines = section.trim().split('\n')
        const title = lines[0].replace(/\*\*/g, '').toUpperCase()
        const content = lines.slice(1)

        return (
          <div
            key={i}
            className="bg-[#111] border border-cyan-500 rounded-xl p-6 shadow-[0_0_20px_#00f2ff40]"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-3 uppercase drop-shadow-[0_0_6px_#0ff]">
              {title}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-white">
              {content.map((line, j) => (
                <li key={j}>{line}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </motion.div>
  )
}
