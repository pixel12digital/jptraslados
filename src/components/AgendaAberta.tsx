'use client';

import { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AgendaAberta() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const origemRef = useRef<HTMLInputElement>(null);
  const [today, setToday] = useState<Date | null>(null);

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowTimeSelect(true);
  };

  const handleSchedule = () => {
    setShowModal(true);
  };

  const handleSendWhatsapp = () => {
    if (selectedDate && selectedTime && origem && destino) {
      const formattedDate = format(selectedDate, 'dd/MM/yyyy', { locale: ptBR });
      const message = `Olá! Gostaria de verificar valores e disponibilidade para:\nData: ${formattedDate}\nHorário: ${selectedTime}h\nOrigem: ${origem}\nDestino: ${destino}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/5511965221349?text=${encodedMessage}`, '_blank');
      setShowModal(false);
      setOrigem('');
      setDestino('');
      setSelectedTime('');
      setSelectedDate(null);
      setShowTimeSelect(false);
    }
  };

  useEffect(() => {
    setToday(new Date());
  }, []);

  // Atualiza automaticamente o mês exibido quando o mês do sistema muda
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (
        now.getFullYear() !== currentDate.getFullYear() ||
        now.getMonth() !== currentDate.getMonth()
      ) {
        setCurrentDate(new Date());
      }
    }, 60 * 1000); // verifica a cada minuto
    return () => clearInterval(interval);
  }, [currentDate]);

  return (
    <section id="agenda" className="relative py-20 bg-black min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 w-full h-full"
        aria-hidden="true"
      >
        <img 
          src="/images/fundo.png" 
          alt="Fundo JP Traslados" 
          className="w-full h-full object-cover opacity-20 md:opacity-10" 
          draggable="false"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl md:text-6xl font-bold font-serif text-center mb-8 md:mb-16 text-white leading-tight">
          Agenda Aberta
        </h2>
        
        <div className="max-w-3xl mx-auto bg-[#f5f5f5] rounded-3xl shadow-2xl p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:gap-8">
            {/* Calendário */}
            <div className="w-full md:w-1/2">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Mês anterior"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-xl md:text-2xl font-semibold capitalize text-gray-800">
                  {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Próximo mês"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2 md:mb-4">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                  <div key={index} className="text-center font-semibold py-1 text-gray-600 text-xs md:text-base">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2 md:p-3" />
                ))}
                {days.map((day, dayIdx) => {
                  const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                  const isClientToday = today && day.toDateString() === today.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => handleDateClick(day)}
                      className={`
                        p-2 md:p-3 text-center text-base md:text-lg font-medium rounded-full transition-colors
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8860B]
                        ${isSelected ? 'bg-[#B8860B] text-white hover:bg-[#B8860B]' : 'hover:bg-gray-200'}
                        ${isClientToday ? 'border-2 border-[#B8860B]' : ''}
                        ${!isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-800'}
                      `}
                      aria-label={format(day, "d 'de' MMMM", { locale: ptBR })}
                      aria-pressed={!!isSelected}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Horários */}
            {showTimeSelect && selectedDate && (
              <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:ml-4 flex flex-col justify-center">
                <h4 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
                  Selecione um horário para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}:
                </h4>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        p-2 md:p-3 text-center rounded-xl border-2 transition-colors text-base md:text-lg
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8860B]
                        ${selectedTime === time 
                          ? 'bg-[#B8860B] text-white border-[#B8860B]' 
                          : 'border-gray-300 text-gray-700 hover:border-[#B8860B]'}
                      `}
                      aria-pressed={!!(selectedTime === time)}
                    >
                      {time}h
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSchedule}
                  disabled={!selectedTime}
                  className={`
                    w-full mt-6 py-3 md:py-4 px-4 md:px-6 rounded-xl text-white font-semibold text-base md:text-lg transition-colors
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8860B]
                    ${selectedTime ? 'bg-[#B8860B] hover:bg-[#906d09]' : 'bg-gray-400 cursor-not-allowed'}
                  `}
                  aria-disabled={!selectedTime}
                >
                  Verificar Disponibilidade
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                onClick={() => setShowModal(false)}
                aria-label="Fechar"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-6 text-center text-[#B8860B]">Solicitar valores e disponibilidade</h3>
              <form onSubmit={e => { e.preventDefault(); handleSendWhatsapp(); }}>
                <label className="block mb-4">
                  <span className="block text-gray-700 font-semibold mb-2">Origem</span>
                  <input
                    ref={origemRef}
                    type="text"
                    value={origem}
                    onChange={e => setOrigem(e.target.value)}
                    className="w-full p-3 rounded-lg border border-[#B8860B] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B] outline-none text-gray-800 placeholder-gray-400"
                    placeholder="Digite o local de origem"
                    required
                  />
                </label>
                <label className="block mb-6">
                  <span className="block text-gray-700 font-semibold mb-2">Destino</span>
                  <input
                    type="text"
                    value={destino}
                    onChange={e => setDestino(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B] outline-none text-gray-800 placeholder-gray-400"
                    placeholder="Digite o destino"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#B8860B] text-white font-semibold text-lg hover:bg-[#906d09] transition-colors"
                >
                  Solicitar valores e disponibilidade
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 