export async function POST(req) {
  const body = await req.json();
  const { car, circuit, game, style, pr } = body;

  const prompt = `
Eres un experto en ajustes para Gran Turismo 7. Tu tarea es generar un setup completo, **realista y profesional** para el coche "${car}", en el circuito "${circuit}", con un estilo de conducción "${style}". ${
  pr ? `El coche no debe superar un PR de ${pr}, así que utiliza limitador de potencia o lastre si es necesario.` : 'No hay límite de PR. Usa las mejores modificaciones disponibles.'
}

Genera el resultado en 3 secciones SEPARADAS Y CLARAS, sin símbolos ni markdown, solo texto plano:

---

MODIFICACIONES RECOMENDADAS

Especifica solo las piezas realmente instaladas en este coche entre estas (no uses etiquetas como "Nivel" o "Categoría"):

- ECU personalizada
- filtro de aire (deportivo o de carrera)
- silenciador (deportivo o de competición)
- pastillas de freno (deportivas o de competición)
- suspensión totalmente personalizable
- reducción de peso (etapa 1 a 5)
- neumáticos (tipo exacto)
- kit de frenos (deportivo, carreras o cerámicos)
- embrague y volante motor (deportivo, semi o competición)
- diferencial autoblocante personalizable
- transmisión de competición personalizada
- limitador de potencia, lastre y posición del lastre
- cigüeñal de competición, árbol de levas, pistones, rigidez de carrocería
- turbo (bajo, medio, alto, ultraalto), sobrealimentador (par bajo, par alto, altas RPM)
- sistema anti-lag, controlador de frenos, vectorización de par
- nitroso, freno de mano hidráulico, ángulo de dirección, dirección 4 ruedas

---

SETUP TÉCNICO CON VALORES

Especifica exactamente como aparece en GT7, sin títulos duplicados ni explicaciones, solo valores:

NEUMÁTICOS
- Delante:
- Detrás:

SUSPENSIÓN
- Altura delantera (mm):
- Altura trasera (mm):
- Barra estabilizadora (delante / detrás):
- Amortiguación compresión (%):
- Amortiguación expansión (%):
- Frecuencia natural (Hz):
- Caída delantera (°):
- Caída trasera (°):
- Convergencia delantera (°):
- Convergencia trasera (°):

DIFERENCIAL
- Tipo:
- Torsión inicial:
- Aceleración:
- Frenada:
- Vectorización (si aplica):
- Distribución torsión (ej. 40:60):

AERODINÁMICA
- Delante:
- Detrás:

TRANSMISIÓN
- Tipo:
- Velocidad punta (km/h):
- Marchas:
  - 1ª:
  - 2ª:
  - 3ª:
  - 4ª:
  - 5ª:
  - 6ª:
  - 7ª:
  - Final:

POTENCIA Y PESO
- ECU (%):
- Limitador de potencia (%):
- Lastre (kg):
- Posición del lastre:

FRENOS
- Tipo:
- Pastillas:
- Reparto frenos (ej. 5/5):

DIRECCIÓN
- Ángulo dirección trasera:
- Dirección 4 ruedas: sí / no

---

NOTAS Y CONSEJOS DE CONDUCCIÓN

Explica cómo frenar, traccionar, tomar curvas y qué estilo de conducción es óptimo para este setup.
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
