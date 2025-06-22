export async function POST(req) {
  const body = await req.json();
  console.log('📥 Petición recibida con:', body);

  const { car, circuit, game, style, pr } = body;

  const prompt = `
Eres un experto en Gran Turismo 7. Genera un setup completo, profesional y realista para el coche "${car}", en el circuito "${circuit}", con estilo de conducción "${style}". ${pr ? `El coche no debe superar un PR de ${pr}, ajusta con limitador de potencia o lastre.` : 'No hay límite de PR, maximiza el rendimiento con todas las mejores piezas disponibles.'}

Organiza el resultado en 3 secciones claras con títulos normales (sin asteriscos ni Markdown). Cada sección debe ser limpia, legible y fiel a los datos reales de GT7.

---

MODIFICACIONES RECOMENDADAS

Incluye solo las piezas realmente instaladas, seleccionadas entre todas las siguientes:

- sistema informático personalizable
- filtro de aire (deportivo o de carrera)
- silenciador (deportivo o de competición)
- pastillas de freno (deportivas o de competición)
- suspensión totalmente personalizable
- reducción de peso (etapa 1 a 5)
- neumáticos (comodos, deportivos, competición, tierra, nieve, intermedios, mojados)
- arbol de levas, pistones, mayor diámetro
- kit de frenos (deportivo, de carreras, cerámico)
- embrague y volante motor (deportivo, semi o competición)
- diferencial (una vía, dos vías, personalizable)
- transmisión totalmente personalizable
- limitador de potencia, lastre
- cigüeñal, ECU personalizable
- turbocompresor (baja, media, alta, ultraalta)
- sobrealimentador (par bajo, alto, altas RPM)
- radiador (deportivo o competición)
- rigidez carrocería, mayor carrera, equilibrado, puertos
- sistema anti-lag, colector escape, controlador diferencial, nitroso
- freno de mano hidráulico, ángulo dirección, dirección 4 ruedas
- nuevo motor, nueva carrocería, ensanchamiento S, piezas definitivas

---

SETUP TÉCNICO CON VALORES

NEUMÁTICOS
- Tipo delante:
- Tipo detrás:

SUSPENSIÓN
- Tipo:
- Altura (delante / detrás):
- Barra estabilizadora:
- Amortiguación compresión (%):
- Amortiguación expansión (%):
- Frecuencia natural (Hz):
- Caída (delante / detrás):
- Convergencia (delante / detrás):

DIFERENCIAL
- Tipo:
- Torsión inicial:
- Sensibilidad aceleración:
- Sensibilidad frenada:
- Vectorización par:
- Distribución torsión (F/R):

AERODINÁMICA
- Carga delantera / trasera:

UNIDAD DE CONTROL MOTOR
- Tipo:
- Salida (%):

RENDIMIENTO
- Limitador de potencia (%):
- Lastre (kg):
- Posición del lastre:

TRANSMISIÓN
- Tipo:
- Velocidad punta (km/h):
- Marchas personalizadas:
  - 1ª:
  - 2ª:
  - 3ª:
  - 4ª:
  - 5ª:
  - 6ª:
  - 7ª:
  - Final:

NITRO / TURBO / ANTILAG
- Estado y tipo:

ADMISIÓN Y ESCAPE
- Filtro de aire:
- Silenciador:
- Colector de escape:

FRENOS
- Tipo:
- Pastillas:
- Freno de mano:
- Fuerza freno de mano:
- Equilibrio frenos (delante / detrás):

DIRECCIÓN
- Kit ángulo:
- Dirección 4 ruedas:
- Ángulo trasero:

TREN DE TRACCIÓN
- Embrague y volante motor:
- Eje de transmisión:

---

NOTAS Y CONSEJOS DE CONDUCCIÓN

Explica cómo aprovechar este setup. Cómo frenar, tomar curvas, traccionar, etc. No repitas títulos ni pongas introducciones. Solo los datos y explicaciones bien ordenadas.
`;

  const apiKey = process.env.OPENAI_API_KEY;

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
