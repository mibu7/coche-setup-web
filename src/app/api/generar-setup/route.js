export async function POST(req) {
  const body = await req.json()
  console.log('📥 Petición recibida con:', body)

  const { car, circuit, game, style, pr } = body

  const prompt = `Eres un experto en ajustes de coches para el videojuego Gran Turismo 7. Genera un setup completo y detallado para el coche "${car}", en el circuito "${circuit}", con un estilo de conducción "${style}".${pr ? ` El coche no debe superar un PR de ${pr}, usa limitador de potencia o lastre si es necesario.` : ''}

El resultado debe tener estas dos secciones principales, con títulos en mayúsculas y en Markdown con doble asterisco (**):

---

**MODIFICACIONES RECOMENDADAS**

Selecciona entre todas las modificaciones posibles de Gran Turismo 7 (de cualquier categoría)
Solo muestra una lista de las piezas concretas que deberías instalar en este coche.
Incluye solo las piezas realmente instaladas. Usa esta lista de referencia:

→ (sistema informatico personalizable, filtro de aire (deportivo o de carrera), silenciador (deportivo o de competicion), pastillas de freno (deportivas o de competicion), suspension totalmente personalizable,
reduccion de peso (etapa 1, 2, 3, 4 o 5), neumaticos (comodos: duros, medios o blandos, deportivos: duros,medios o blandos, de competicion: duros,medios o blandos, de nieve, de tierra, intermedios o mojados),
mayor diametro, arbol de levas, pistones, kit de frenos deportivos, de carreras o ceramicos de carbono,
embrague y volante motor (deportivos, de semicompeticion o de competicion), diferencial (autoblocante de una via, de 2 vias o personalizable),
transmision (totalmente personalizable), limitador de potencia, lastre, cigüeñal de competicion, ordenador totalmente personalizable, turbocompresor de revolucion (baja, media, alta o ultraaltas), sobrealimentador (par bajo, par alto o de altas r.p.m. S),
radiador (deportivo o de competicion), aumentar rigidez de la carroceria, mayor carrera, ajuste de equilibrado del motor, pulido de puertos, sistema anti-lag, colector de escape de competicion,
controlador de equilibrio de frenos, controlador de diferencial autoblocante activo, sistema nitroso, freno de mano hidraulicos, adaptador de angulo de la direccion,
controlador de direccion a las cuatro ruedas, nuevo motor, nueva carroceria, ensanchamiento S, incremento de carrera S, varillas de conexion y pistones de titanio, arbol de levas de elevacion alta S,
arbol de transmision de carbono)

---

**SETUP TÉCNICO CON VALORES**

Organiza exactamente como en GT7, indicando valores para parte DELANTERA y TRASERA cuando aplique:

- **NEUMÁTICOS**
  - Tipo delante:
  - Tipo detrás:

- **SUSPENSIÓN**
  - Tipo:
  - Altura (delante / detrás) en mm:
  - Barra estabilizadora (1 a 10):
  - Amortiguación compresión (%):
  - Amortiguación expansión (%):
  - Frecuencia natural (Hz):
  - Caída (delante / detrás en grados):
  - Convergencia (delante / detrás en grados):

- **DIFERENCIAL**
  - Tipo:
  - Torsión inicial (valores de 5 a 60): 
  - Sensibilidad aceleración (valores de 5 a 60): 
  - Sensibilidad frenada (valores de 5 a 60):
  - Vectorización de par (si aplica):
  - Distribución torsión F/R (valores de 5:95 a 50:50 en %): 

- **AERODINÁMICA**
  - Carga aerodinámica (delante / detrás):

- **UNIDAD DE CONTROL DEL MOTOR**
  - Tipo:
  - Salida (valores de 70 a 100 en %): 

- **RENDIMIENTO**
  - Limitador potencia (valores de 70 a 100 en %): 
  - Lastre (valores de 0 a 200 en kg): 
  - Posición del lastre (valores de -50 a 50): 

- **TRANSMISIÓN**
  - Tipo:
  - Velocidad punta (km/h):
  - Marchas personalizadas (si aplica):

- **NITRO / TURBO / ANTILAG**
  - Estado y tipo:

- **ADMISIÓN Y ESCAPE**
  - Filtro de aire:
  - Silenciador:
  - Colector de escape:

- **FRENOS**
  - Tipo:
  - Pastillas:
  - Freno de mano:
  - Fuerza del freno de mano:
  - Equilibrio delantero / trasero (valores de -5 a 5): 

- **DIRECCIÓN**
  - Kit ángulo dirección:
  - Dirección 4 ruedas:
  - Ángulo trasero:

- **TREN DE TRACCIÓN**
  - Embrague y volante:
  - Eje de transmisión:

---

**NOTAS Y CONSEJOS DE CONDUCCIÓN**
Explica cómo aprovechar el setup, cómo frenar, entrar en curvas, traccionar, etc.

No incluyas repeticiones ni introducciones. Solo los datos bajo cada sección.
`

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