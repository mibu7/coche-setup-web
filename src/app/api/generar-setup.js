export async function POST(req) {
  const { car, circuit } = await req.json()

  const prompt = `Eres un experto en simulación de carreras. Dame un ajuste detallado para el coche "${car}" en el circuito "${circuit}". Incluye configuraciones de suspensión, marchas, frenos, neumáticos, aerodinámica y cualquier otro ajuste relevante. Sé claro y conciso.`

  const apiKey = process.env.OPENAI_API_KEY

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  })

  const data = await response.json()

console.log(data)  // 👈 esto mostrará en la terminal la respuesta completa
const result = data.choices?.[0]?.message?.content || JSON.stringify(data)

  return new Response(JSON.stringify({ result }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
