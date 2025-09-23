'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Se for a página /card, não renderizar header/footer
  if (pathname === '/card') {
    return <>{children}</>
  }
  
  // Para outras páginas, renderizar com header e footer
  return (
    <div className="main-content">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
