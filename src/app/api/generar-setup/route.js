export async function POST(req) {
  const body = await req.json()
  console.log('📥 Petición recibida con:', body)

  const { car, circuit, game, style } = body

  const prompt = `Eres un experto en configuración de coches dentro del juego Gran Turismo 7. Tu tarea es generar un **setup realista y detallado** para el coche "${car}" en el circuito "${circuit}", con un estilo de conducción "${style}".${pr ? ` El coche debe estar ajustado para no superar un PR de ${pr}. Usa lastre, limitador o piezas adecuadas para lograrlo.` : ''}

Sigue este formato exactamente y usa títulos en negrita Markdown con doble asterisco (**):

**MODIFICACIONES RECOMENDADAS**
Divide esta sección en las siguientes categorías (solo incluye las relevantes para el coche actual):

- Deportivo
- Club Deportivo
- Semicompetición
- Competición
- Extremo
- Definitivo

Bajo cada categoría, muestra las modificaciones instaladas de entre estas:
(→ aquí puedes copiar la lista completa que tú me diste: filtro de aire deportivo, sistema nitroso, etc.)

**SETUP TÉCNICO CON VALORES**
Organiza esta sección así:

- Neumáticos (delante/detrás): tipo exacto

- Suspensión:
  - Tipo de suspensión
  - Altura de carrocería (mm)
  - Barra estabilizadora (1-10)
  - Amortiguación compresión (%)
  - Amortiguación expansión (%)
  - Frecuencia natural (Hz)
  - Caída (grados)
  - Convergencia (grados)

- Diferencial:
  - Tipo
  - Torsión inicial
  - Sensibilidad de aceleración
  - Sensibilidad de frenada
  - Distribución de par (si aplica)

- Aerodinámica:
  - Carga delantera / trasera (si lleva alerón)

- Unidad de control del motor:
  - Tipo
  - Ajuste de salida (%)

- Ajuste de rendimiento:
  - Limitador de potencia (%)
  - Lastre (kg)
  - Posición del lastre

- Transmisión:
  - Tipo
  - Velocidad punta (km/h)
  - Ajuste de marchas (si es manual)

- Nitro / turbo / sobrealimentación:
  - Estado y tipo

- Frenos:
  - Sistema, pastillas
  - Fuerza freno de mano, equilibrio

- Dirección:
  - Kit de ángulo, dirección trasera

- Tren de tracción:
  - Embrague, volante motor, eje

**NOTAS Y CONSEJOS DE CONDUCCIÓN**
Indica cómo aprovechar este setup en el circuito, cómo tomar curvas, frenar, etc.

El resultado debe estar ordenado, sin explicaciones adicionales, solo datos bajo cada título.`

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
  console.log('📄 RESPUETA COMPLETA:', result)
  return new Response(JSON.stringify({ result }), {
    headers: { 'Content-Type': 'application/json' },
  })
}