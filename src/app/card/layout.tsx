import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'JP Traslados - Cartão Digital | Transporte Executivo SP',
  description: 'Acesso rápido ao WhatsApp, telefone e serviços da JP Traslados. Transporte executivo seguro e confortável em São Paulo.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'JP Card',
  },
  openGraph: {
    title: 'JP Traslados - Cartão Digital',
    description: 'Acesso rápido ao WhatsApp, telefone e serviços da JP Traslados. Transporte executivo seguro e confortável em São Paulo.',
    url: 'https://jptraslados.com.br/card',
    siteName: 'JP Traslados',
    images: [
      {
        url: '/images/share-card.png',
        width: 1200,
        height: 630,
        alt: 'JP Traslados - Cartão Digital',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JP Traslados - Cartão Digital',
    description: 'Acesso rápido ao WhatsApp, telefone e serviços da JP Traslados. Transporte executivo seguro e confortável em São Paulo.',
    images: ['/images/share-card.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#B8860B',
}

export default function CardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
