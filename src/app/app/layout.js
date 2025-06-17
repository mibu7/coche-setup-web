
import './globals.css'

export const metadata = {
  title: 'Coche Setup Racing',
  description: 'Genera setups óptimos con IA para circuitos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
