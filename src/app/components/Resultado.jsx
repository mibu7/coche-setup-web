'use client'
import { motion } from 'framer-motion'

export default function Resultado({ setup }) {
  if (!setup) return null

  const matchSecciones = setup.match(/MODIFICACIONES RECOMENDADAS[\s\r\n]+([\s\S]*?)SETUP TÉCNICO CON VALORES[\s\r\n]+([\s\S]*?)NOTAS Y CONSEJOS DE CONDUCCIÓN[\s\r\n]+([\s\S]*)/i)

  if (!matchSecciones) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: No se pudieron separar las secciones del resultado.
      </div>
    )
  }

  const [_, componentes, tecnico, notas] = matchSecciones

  // 🔧 Detecta si una línea es subtítulo en mayúsculas (sin ":" al final)
  const isSubtitulo = (line) => /^[A-ZÁÉÍÓÚÜÑ ]{4,}$/.test(line.trim())

  const renderSeccion = (titulo, contenido) => (
    <div className="bg-[#111] border border-cyan-500 rounded-2xl p-6 shadow-[0_0_20px_#00f2ff40] transition hover:scale-[1.02] hover:shadow-[0_0_30px_#0ff]">
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6 uppercase drop-shadow-[0_0_6px_#0ff]">
        {titulo}
      </h2>
      <div className="space-y-2 text-white text-base sm:text-lg whitespace-pre-line">
        {contenido
          .trim()
          .split('\n')
          .filter((line) => line.trim() !== '')
          .map((line, i) =>
            isSubtitulo(line) ? (
              <div key={i} className="pt-4 text-cyan-300 text-lg sm:text-xl font-bold uppercase">
                {line.trim()}
              </div>
            ) : (
              <div key={i} className="ml-4 list-item list-disc">
                {line.trim()}
              </div>
            )
          )}
      </div>
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
