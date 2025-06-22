
import './globals.css'

export const metadata = {
  title: 'SetupSpeed - Generador de setups para Gran Turismo 7 y más',
  description: 'Crea el mejor setup técnico y realista para tu coche en Gran Turismo 7, Forza Horizon 5 y Assetto Corsa. Ajustes detallados con IA en segundos.',
  keywords: ['Gran Turismo 7', 'GT7', 'Forza Horizon 5', 'Assetto Corsa', 'setup coches', 'ajustes de coches', 'configuración GT7', 'tuning GT7'],
  openGraph: {
    title: 'SetupSpeed - Generador de setups de coches',
    description: 'Crea setups profesionales y técnicos para tus coches en videojuegos de conducción.',
    url: 'https://www.setupspeed.com',
    siteName: 'SetupSpeed',
    images: [
      {
        url: 'https://www.setupspeed.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SetupSpeed - Setup coches GT7',
      },
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
