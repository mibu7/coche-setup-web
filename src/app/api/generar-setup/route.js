export async function POST(req) {
  const body = await req.json()
  console.log('📥 Petición recibida con:', body)

  const { car, circuit, game, style } = body

 const prompt = `Eres un experto en preparación de coches para videojuegos de conducción. Tu tarea es crear un **setup detallado y específico** para el coche "${car}", en el circuito "${circuit}", dentro del juego "${game}". El estilo de conducción es "${style}".

Adáptate al juego elegido. Si es Gran Turismo 7, usa valores y secciones reales de GT7. Si es Forza Horizon 5, hazlo con las opciones reales de ese juego.

El setup debe incluir:

1. 🧩 **Componentes recomendados**:
   - Tipo de neumáticos (slick, sport, offroad, etc.)
   - Frenos (disco ventilado, cerámicos, competición...)
   - Suspensión (ajustable, de competición...)
   - Diferencial (abierto, autoblocante, controlado electrónicamente)
   - Transmisión (manual, secuencial, etc.)
   - Turbo, embrague, ECU, etc.

2. 🔧 **Setup técnico con valores**:
   - Suspensión delantera / trasera
   - Caídas y convergencia (en grados)
   - Altura libre al suelo
   - Marchas (1ª a 6ª o 7ª)
   - Relación final
   - Presión de neumáticos (en PSI o Bar)
   - Aerodinámica (alas, splitters)
   - Frenos (potencia y reparto)

3. 📌 Notas y consejos de conducción:
   - Cómo aprovechar este setup
   - Cómo manejarlo en salidas, curvas, etc.

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