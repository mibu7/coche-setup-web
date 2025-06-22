export async function POST(req) {
  const body = await req.json();
  const { car, circuit, game, style, pr } = body;

  const prompt = `
Eres un experto en Gran Turismo 7. Genera un setup completo y realista para el coche "${car}", en el circuito "${circuit}", con estilo de conducción "${style}". ${
    pr ? `El coche no debe superar un PR de ${pr}, ajusta con limitador de potencia o lastre.` : 'No hay límite de PR, maximiza el rendimiento con todas las mejores piezas disponibles.'
  }

Organiza el resultado en 3 secciones claras con estos títulos:
MODIFICACIONES RECOMENDADAS
SETUP TÉCNICO CON VALORES
NOTAS Y CONSEJOS DE CONDUCCIÓN

No uses asteriscos, ni markdown. Cada título debe ir en mayúsculas y en una línea aparte. Formato limpio y claro, sin repeticiones.
`;

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4', // ✅ Aquí está el cambio importante
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('❌ Error en la API de OpenAI:', data);
    return new Response(JSON.stringify({ result: 'Error: ' + (data.error?.message || 'desconocido') }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  const result = data.choices?.[0]?.message?.content || 'Sin respuesta válida.';
  console.log('📄 RESPUESTA COMPLETA:', result);

  return new Response(JSON.stringify({ result }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
