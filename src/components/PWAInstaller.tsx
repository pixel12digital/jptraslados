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
  const [isInstalled, setIsInstalled] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [showShareOnly, setShowShareOnly] = useState(false)
  const [showUpdateNotification, setShowUpdateNotification] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Verificar se o app já foi instalado
    const checkIfInstalled = () => {
      // Verificar se está rodando como PWA
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
        setShowShareOnly(true)
        return true
      }
      
      // Verificar se está em modo fullscreen (iOS)
      if (window.matchMedia('(display-mode: fullscreen)').matches) {
        setIsInstalled(true)
        setShowShareOnly(true)
        return true
      }
      
      // Verificar se foi instalado anteriormente (localStorage)
      const wasInstalled = localStorage.getItem('pwa-installed')
      if (wasInstalled === 'true') {
        setIsInstalled(true)
        setShowShareOnly(true)
        return true
      }
      
      return false
    }

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registrado: ', registration)
          
          // Verificar atualizações
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nova versão disponível
                  handleShowUpdateNotification()
                }
              })
            }
          })

          // Verificar se já existe uma atualização esperando
          if (registration.waiting) {
            handleShowUpdateNotification()
          }
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

    // Detectar se já foi instalado
    const handleAppInstalled = () => {
      console.log('PWA foi instalado')
      setIsInstalled(true)
      setShowInstallButton(false)
      setShowManualButton(false)
      setDeferredPrompt(null)
      localStorage.setItem('pwa-installed', 'true')
      setIsNotificationVisible(false)
    }

    // Verificar se já foi instalado
    const alreadyInstalled = checkIfInstalled()
    
    if (!alreadyInstalled) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.addEventListener('appinstalled', handleAppInstalled)

      // Mostrar notificação após 2 segundos se não houver prompt automático
      const timer = setTimeout(() => {
        if (!showInstallButton && !isInstalled) {
          setShowManualButton(true)
          setIsNotificationVisible(true)
        }
      }, 2000)
    } else {
      // Se já instalado, mostrar apenas compartilhar
      setShowShareOnly(true)
      setIsNotificationVisible(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [showInstallButton, isInstalled])

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
      // Instalação manual - mostrar instruções específicas
      showInstallInstructions()
    }
  }

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'JP Traslados - Cartão Digital',
          text: 'Acesse o cartão digital da JP Traslados',
          url: window.location.href
        })
      } catch (err) {
        // Fallback para copiar URL
        navigator.clipboard.writeText(window.location.href)
        alert('Link copiado! Compartilhe com seus contatos.')
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado! Compartilhe com seus contatos.')
    }
  }

  const handleCloseNotification = () => {
    setIsNotificationVisible(false)
  }

  const handleShowUpdateNotification = () => {
    setShowUpdateNotification(true)
  }

  const handleUpdateApp = () => {
    setIsUpdating(true)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          // Recarregar após um pequeno delay para garantir que a atualização seja aplicada
          setTimeout(() => {
            window.location.reload()
          }, 100)
        }
      })
    }
  }

  const handleCloseUpdateNotification = () => {
    setShowUpdateNotification(false)
  }

  const showInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    let instructions = ''
    
    if (userAgent.includes('android')) {
      instructions = `📱 Para instalar no Android:
      
1. Toque no menu (⋮) no navegador
2. Selecione "Adicionar à tela inicial"
3. Toque em "Adicionar"
4. O app aparecerá na sua tela inicial`
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      instructions = `📱 Para instalar no iPhone/iPad:
      
1. Toque no botão de compartilhar (□↗)
2. Role para baixo e toque em "Adicionar à Tela de Início"
3. Toque em "Adicionar"
4. O app aparecerá na sua tela inicial`
    } else {
      instructions = `💻 Para instalar no computador:
      
1. Clique no ícone de instalação na barra de endereços
2. Ou use o menu do navegador (⋮) → "Instalar app"
3. Confirme a instalação`
    }
    
    alert(instructions)
  }

  if (!isNotificationVisible && !showUpdateNotification && !isUpdating) return null

  return (
    <>
      {/* Tela de Loading durante Atualização */}
      {isUpdating && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          color: 'white'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #4CAF50',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <h3 style={{
              color: '#4CAF50',
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 10px 0'
            }}>
              Atualizando App...
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '14px',
              margin: '0',
              lineHeight: '1.4'
            }}>
              Aguarde enquanto aplicamos as melhorias
            </p>
          </div>
        </div>
      )}

      {/* Notificação de Atualização */}
      {showUpdateNotification && !isUpdating && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1001,
          background: 'rgba(0, 0, 0, 0.95)',
          border: '2px solid #4CAF50',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          maxWidth: '320px',
          width: '90%',
          animation: 'slideDown 0.3s ease-out'
        }}>
          {/* Botão de Fechar */}
          <button
            onClick={handleCloseUpdateNotification}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              color: '#4CAF50',
              fontSize: '18px',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(76, 175, 80, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none'
            }}
          >
            ×
          </button>

          {/* Conteúdo da Notificação de Atualização */}
          <div style={{
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            <h3 style={{
              color: '#4CAF50',
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              🔄 Atualização Disponível
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '14px',
              margin: '0',
              lineHeight: '1.4'
            }}>
              Uma nova versão está disponível com melhorias e correções. Clique em "Atualizar Agora" para aplicar.
            </p>
          </div>

          {/* Botões de Ação */}
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <button
              onClick={handleUpdateApp}
              disabled={isUpdating}
              style={{
                background: isUpdating ? '#666' : '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: isUpdating ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                flex: '1',
                opacity: isUpdating ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isUpdating) {
                  e.currentTarget.style.background = '#45a049'
                }
              }}
              onMouseLeave={(e) => {
                if (!isUpdating) {
                  e.currentTarget.style.background = '#4CAF50'
                }
              }}
            >
              {isUpdating ? 'Atualizando...' : 'Atualizar Agora'}
            </button>
          </div>
        </div>
      )}

      {/* Notificação de Instalação/Compartilhamento */}
      {isNotificationVisible && (
        <div style={{
          position: 'fixed',
          top: showUpdateNotification ? '120px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.95)',
          border: '1px solid #B8860B',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          maxWidth: '320px',
          width: '90%',
          animation: 'slideDown 0.3s ease-out'
        }}>
          {/* Botão de Fechar */}
          <button
            onClick={handleCloseNotification}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              color: '#B8860B',
              fontSize: '18px',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(184, 134, 11, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none'
            }}
          >
            ×
          </button>

          {/* Conteúdo da Notificação */}
          <div style={{
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            <h3 style={{
              color: '#B8860B',
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              {showShareOnly ? 'Compartilhe o Cartão Digital' : 'Instale o Cartão Digital'}
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '14px',
              margin: '0',
              lineHeight: '1.4'
            }}>
              {showShareOnly 
                ? 'Compartilhe com seus contatos' 
                : 'Instale para acesso rápido na tela inicial'
              }
            </p>
          </div>

          {/* Botões de Ação */}
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center'
          }}>
            {/* Botão de Compartilhar - sempre visível */}
            <button
              onClick={handleShareClick}
              style={{
                background: '#2a2a2a',
                color: 'white',
                border: '1px solid #B8860B',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flex: '1'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#B8860B'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2a2a2a'
              }}
            >
              Compartilhar
            </button>
            
            {/* Botão de Instalar - apenas se não estiver instalado */}
            {!showShareOnly && (showInstallButton || showManualButton) && (
              <button
                onClick={handleInstallClick}
                style={{
                  background: '#B8860B',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  flex: '1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4AF37'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#B8860B'
                }}
              >
                Instalar
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}