'use client'
import { useState } from 'react'
import { Orbitron } from 'next/font/google'
import Formulario from '../components/Formulario'
import Resultado from '../components/Resultado'

const orbitron = Orbitron({ subsets: ['latin'], weight: '600' })

export default function Home() {
  const [setup, setSetup] = useState('')

  return (
    <main className={`${orbitron.className} min-h-screen bg-black text-white px-4 pb-20`}>
      <Formulario onGenerate={setSetup} />
      <Resultado setup={setup} />
    </main>
  )
}
