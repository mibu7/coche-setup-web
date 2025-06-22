
import './globals.css'

export const metadata = {
  title: 'SetupSpeed - Generador de setups para coches',
  description: 'Crea setups realistas y optimizados para Gran Turismo 7, Forza Horizon y más.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
