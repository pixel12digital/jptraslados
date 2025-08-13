import '@/styles/globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MaintenanceMode from '@/components/MaintenanceMode'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata = {
  title: 'JP Traslados | Transporte Executivo',
  description: 'Serviços de transporte executivo com excelência, conforto e segurança em São Paulo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <MaintenanceMode />
        {/* Header e Footer só aparecem quando NÃO estiver em manutenção */}
        <div className="main-content">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
} 