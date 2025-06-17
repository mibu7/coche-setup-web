'use client'
import { motion } from 'framer-motion'

export default function Resultado({ setup }) {
  if (!setup) return null

  // Separa secciones por títulos en formato Markdown (**TÍTULO**)
  const secciones = setup.split(/\n(?=\*\*[A-Z\s]+\*\*)/g)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto mt-14 space-y-8 text-white"
    >
      {secciones.map((section, index) => {
        const lines = section.trim().split('\n')
        const title = lines[0]?.replace(/\*\*/g, '').replace(':', '').trim().toUpperCase()
        const values = lines.slice(1)

        return (
          <div
            key={index}
            className="bg-gray-900 border border-cyan-500 rounded-2xl p-6 shadow-[0_0_20px_#00f2ff40] transition hover:scale-[1.02] hover:shadow-[0_0_30px_#0ff]"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 uppercase drop-shadow-[0_0_6px_#0ff]">
              {title}
            </h3>
            <ul className="space-y-1 text-white list-disc list-inside text-base sm:text-lg">
              {values.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </motion.div>
  )
}
