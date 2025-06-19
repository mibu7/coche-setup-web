
import './globals.css'

export const metadata = {
  title: 'Coche Setup Web',
  description: 'Generador de Setups con IA estilo Racing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
