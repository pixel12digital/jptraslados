"use client"
import { useState, useEffect } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import PWAInstaller from '@/components/PWAInstaller'
import './card.css'

export default function CardPage() {
  // Links com UTMs para rastreamento
  const whatsappUrl = "https://wa.me/5511965221349?text=Olá%2C+gostaria+de+um+orçamento+de+traslado.&utm_source=linkinbio&utm_medium=whatsapp&utm_campaign=jptraslados"
  const telefoneUrl = "tel:+5511965221349"
  const siteUrl = "https://www.jptraslados.com.br/?utm_source=linkinbio&utm_medium=site&utm_campaign=jptraslados"
  const instagramUrl = "https://instagram.com/jp_traslados/"
  const linkedinUrl = "#" // Adicionar quando disponível

  // Array de carros para fundo dinâmico
  const carImages = ['virtus.png', 'corolla.png', 'civic.png', 'corolla-cross.png']
  const [selectedCar, setSelectedCar] = useState<string>('virtus.png')

  // Estados do calendário (igual ao da home)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [showTimeSelect, setShowTimeSelect] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')
  const [today, setToday] = useState<Date | null>(null)

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ]

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setShowTimeSelect(true)
  }

  const handleSchedule = () => {
    setShowModal(true)
  }

  const handleSendWhatsapp = () => {
    if (selectedDate && selectedTime && origem && destino) {
      const formattedDate = format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })
      const message = `Olá! Gostaria de verificar valores e disponibilidade para:\nData: ${formattedDate}\nHorário: ${selectedTime}h\nOrigem: ${origem}\nDestino: ${destino}`
      const encodedMessage = encodeURIComponent(message)
      window.open(`https://wa.me/5511965221349?text=${encodedMessage}`, '_blank')
      setShowModal(false)
      setOrigem('')
      setDestino('')
      setSelectedTime('')
      setSelectedDate(null)
      setShowTimeSelect(false)
    }
  }

  useEffect(() => {
    setToday(new Date())
    // Selecionar carro aleatório apenas no cliente
    setSelectedCar(carImages[Math.floor(Math.random() * carImages.length)])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      if (
        now.getFullYear() !== currentDate.getFullYear() ||
        now.getMonth() !== currentDate.getMonth()
      ) {
        setCurrentDate(new Date())
      }
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [currentDate])

  return (
    <div id="jp-card">
      {/* Background com overlay */}
      <div 
        className="background-overlay"
        style={{
          backgroundImage: `url('/images/${selectedCar}')`
        }}
      ></div>

      {/* Conteúdo principal */}
      <div className="card-container">
        
        {/* Avatar/Hero */}
        <div className="avatar-section">
          <div className="avatar-container">
            <img
              src="/images/logo.png"
              alt="JP Traslados"
              width={80}
              height={80}
            />
          </div>
          <h1 className="brand-title">JP Traslados</h1>
          <p className="brand-subtitle">Transporte Executivo</p>
        </div>

        {/* Botões empilhados - apenas os que existem no site */}
        <div className="buttons-container">
          
          {/* WhatsApp - Solicitar Orçamento */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button primary"
          >
            <div className="button-icon">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span>Solicitar Orçamento</span>
          </a>

          {/* Ligar agora */}
          <a
            href={telefoneUrl}
            className="link-button gold-border"
          >
            <div className="button-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span>Ligar Agora</span>
          </a>

          {/* Site institucional */}
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button secondary"
          >
            <div className="button-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
            <span>Site JP Traslados</span>
          </a>

          {/* Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button secondary"
          >
            <div className="button-icon">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <span>Instagram</span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button secondary"
          >
            <div className="button-icon">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span>LinkedIn</span>
          </a>

          {/* Instruções PWA */}
          <a
            href="/pwa-instructions.html"
            target="_blank"
            rel="noopener noreferrer"
            className="link-button secondary"
          >
            <div className="button-icon">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
              </svg>
            </div>
            <span>Como Instalar no Celular</span>
          </a>

        </div>

        {/* Calendário para agendamento - igual ao da home */}
        <div className="calendar-section">
          <h3 className="calendar-title">Agenda Aberta</h3>
          <div className="calendar-container">
            {/* Calendar Header */}
            <div className="calendar-header">
              <button
                onClick={prevMonth}
                className="calendar-nav"
                aria-label="Mês anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="calendar-month">
                {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              </div>
              <button
                onClick={nextMonth}
                className="calendar-nav"
                aria-label="Próximo mês"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                <div key={index} className="calendar-day-header">
                  {day}
                </div>
              ))}
              {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="calendar-day"></div>
              ))}
              {days.map((day, dayIdx) => {
                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                const isClientToday = today && day.toDateString() === today.toDateString();
                const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
                const isCurrentMonth = isSameMonth(day, currentDate);

                return (
                  <button
                    key={dayIdx}
                    onClick={() => handleDateClick(day)}
                    disabled={isPast || !isCurrentMonth}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isClientToday ? 'today' : ''} ${isPast ? 'past' : ''} ${!isCurrentMonth ? 'other-month' : ''}`}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            {/* Time Selection */}
            {showTimeSelect && selectedDate && (
              <div className="time-selection">
                <h4 className="time-title">Selecione o horário:</h4>
                <div className="time-grid">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleSchedule}
                  disabled={!selectedTime}
                  className="schedule-button"
                >
                  {selectedTime 
                    ? `Agendar para ${format(selectedDate, 'dd/MM/yyyy')} às ${selectedTime}` 
                    : 'Selecione um horário'
                  }
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal de detalhes */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Detalhes do Agendamento</h3>
              <div className="modal-form">
                <div className="form-group">
                  <label>Origem:</label>
                  <input
                    type="text"
                    value={origem}
                    onChange={(e) => setOrigem(e.target.value)}
                    placeholder="De onde você vai partir?"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Destino:</label>
                  <input
                    type="text"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    placeholder="Para onde você vai?"
                    className="form-input"
                  />
                </div>
                <div className="modal-buttons">
                  <button
                    onClick={() => setShowModal(false)}
                    className="modal-button cancel"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSendWhatsapp}
                    disabled={!origem || !destino}
                    className="modal-button confirm"
                  >
                    Enviar WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      
      {/* PWA Installer */}
      <PWAInstaller />
    </div>
  )
}
