export async function POST(req) {
  const body = await req.json()
  console.log('📥 Petición recibida con:', body)

  const { car, circuit, game, style } = body

  const prompt = `Eres un experto en preparación de coches para videojuegos de conducción. Tu tarea es crear un **setup detallado y específico** para el coche "${car}", en el circuito "${circuit}", dentro del juego "${game}". El estilo de conducción es "${style}".

Sigue este formato y ... usa SIEMPRE títulos en negrita Markdown (con doble asterisco **) ... para separar secciones. No pongas explicaciones ni repitas texto.

**COMPONENTES RECOMENDADOS**
- Neumáticos: tipo exacto (ej. slick suaves)
- Suspensión: tipo detallado (ej. ajustable de competición)
- Frenos: tipo detallado
- Diferencial: tipo exacto
- Transmisión: tipo exacto
- Otros: turbo, ECU, embrague...

**SETUP TÉCNICO CON VALORES**
- Suspensión delantera / trasera (kg/mm o N/mm)
- Caída (en grados)
- Altura del coche (mm)
- Relación de marchas (de 1ª a 6ª/7ª)
- Relación final (ej. 4.10)
- Presión de neumáticos (Bar o PSI)
- Aerodinámica (carga delantera y trasera)
- Reparto de frenos (ej. 60/40)
- Potencia y peso final

**NOTAS Y CONSEJOS DE CONDUCCIÓN**
- Cómo aprovechar este setup en este circuito
- Cómo tomar curvas, traccionar, frenar o acelerar con este estilo

El resultado debe estar perfectamente ordenado, sin explicaciones ni repeticiones, solo datos y títulos por sección.`

  const apiKey = process.env.OPENAI_API_KEY
  console.log('🔑 Clave API usada:', apiKey)

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('❌ Error en la API de OpenAI:', data)
    return new Response(JSON.stringify({ result: 'Error: ' + (data.error?.message || 'desconocido') }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  const result = data.choices?.[0]?.message?.content || 'Sin respuesta válida.'
  return new Response(JSON.stringify({ result }), {
    headers: { 'Content-Type': 'application/json' },
  })
}