
'use client'
import { useState } from 'react'
import Formulario from '@/components/Formulario'
import Resultado from '@/components/Resultado'

export default function Home() {
  const [setup, setSetup] = useState('')
  return (
    <main className="min-h-screen bg-black text-white px-4 pb-20">
      <Formulario onGenerate={setSetup} />
      <Resultado setup={setup} />
    </main>
  )
}
