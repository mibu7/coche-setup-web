
import './globals.css'

export const metadata = {
  title: 'SetupSpeed - Generador de setups para coches',
  description: 'Crea setups realistas con IA para Gran Turismo 7, Forza Horizon y más.',
  openGraph: {
    title: 'SetupSpeed - Generador de setups para coches',
    description: 'Crea setups realistas con IA para Gran Turismo 7, Forza Horizon y más.',
    url: 'https://www.setupspeed.com',
    siteName: 'SetupSpeed',
    images: [
      {
        url: 'https://www.setupspeed.com/favicon.ico', // O sube otra imagen más grande si tienes
        width: 512,
        height: 512,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SetupSpeed - Generador de setups para coches',
    description: 'Crea setups realistas con IA para Gran Turismo 7, Forza Horizon y más.',
    images: ['https://www.setupspeed.com/favicon.ico'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
