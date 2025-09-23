'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [showManualButton, setShowManualButton] = useState(false)

  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registrado: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW falhou: ', registrationError)
        })
    }

    // Detectar evento de instalação do PWA
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Detectar se já foi instalado
    window.addEventListener('appinstalled', () => {
      console.log('PWA foi instalado')
      setShowInstallButton(false)
      setShowManualButton(false)
      setDeferredPrompt(null)
    })

    // Mostrar botão manual após 3 segundos se não houver prompt automático
    const timer = setTimeout(() => {
      if (!showInstallButton) {
        setShowManualButton(true)
      }
    }, 3000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      clearTimeout(timer)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Instalação automática
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('Usuário aceitou instalar o PWA')
      } else {
        console.log('Usuário rejeitou instalar o PWA')
      }
      
      setDeferredPrompt(null)
      setShowInstallButton(false)
    } else {
      // Instalação manual - mostrar instruções
      alert('Para instalar o Cartão Digital:\n\nAndroid: Menu (3 pontos) → "Adicionar à tela inicial"\niPhone: Compartilhar → "Adicionar à Tela de Início"')
    }
  }

  if (!showInstallButton && !showManualButton) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      background: '#B8860B',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      maxWidth: '200px',
      textAlign: 'center'
    }} onClick={handleInstallClick}>
      Instalar Cartão Digital
    </div>
  )
}
