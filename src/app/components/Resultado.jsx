
'use client'
import { motion } from 'framer-motion'

export default function Resultado({ setup }) {
  if (!setup) return null

  const matchSecciones = setup.match(/\*\*MODIFICACIONES RECOMENDADAS\*\*([\s\S]*?)\*\*SETUP TÉCNICO CON VALORES\*\*([\s\S]*?)\*\*NOTAS Y CONSEJOS DE CONDUCCIÓN\*\*([\s\S]*)/)

  if (!matchSecciones) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: No se pudieron separar las secciones del resultado.
      </div>
    )
  }

  const [_, componentes, tecnico, notas] = matchSecciones

  const renderSeccion = (titulo, contenido) => (
  <div className="bg-[#111] border border-cyan-500 rounded-2xl p-6 shadow-[0_0_20px_#00f2ff40] transition hover:scale-[1.02] hover:shadow-[0_0_30px_#0ff]">
    <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 uppercase drop-shadow-[0_0_6px_#0ff]">
      {titulo.replace(/\*\*/g, '')}
    </h2>
    <ul className="list-disc list-inside space-y-1 text-white text-base sm:text-lg">
      {contenido
        .trim()
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line, i) => (
          <li key={i}>{line.replace(/\*\*/g, '').trim()}</li>
        ))}
    </ul>
  </div>
)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto mt-14 space-y-10 text-white"
    >
      {renderSeccion('MODIFICACIONES RECOMENDADAS', componentes)}
      {renderSeccion('SETUP TÉCNICO CON VALORES', tecnico)}
      {renderSeccion('NOTAS Y CONSEJOS DE CONDUCCIÓN', notas)}
    </motion.div>
  )
}
