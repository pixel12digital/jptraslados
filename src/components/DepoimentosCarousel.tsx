"use client";
import React, { useState, useRef } from "react";

const depoimentos = [
  {
    texto:
      "O serviço de transporte para nossa confraternização foi excelente! A equipe foi super atenciosa e flexível, garantindo que tudo corresse bem, mesmo com ajustes de última hora. Profissionalismo e simpatia nota 10! Recomendo demais!",
    hora: "14:55",
  },
  {
    texto:
      "Quero expressar minha satisfação com o excelente serviço de motorista particular que recebi! Fui levado ao aeroporto de Congonhas com pontualidade e conforto, e ao chegar no Rio de Janeiro, outro motorista já estava à minha espera no aeroporto, garantindo uma transição tranquila. Na volta para São Paulo, o atendimento continuou impecável. Profissionais atenciosos, educados e comprometidos com a qualidade do serviço. Recomendo muito!",
    hora: "12:43",
  },
  {
    texto:
      "Todos as localizações via aplicativo, monitoramento dos voos, tudo isso foi uma grande surpresa pra mim, muito obrigado JP Traslado.",
    hora: "12:43",
  },
  {
    texto:
      "Gostaria de dizer que estou usando o serviço da JP Traslado pela primeira vez nesta semana com o motorista Nicelio, um profissional sem igual, que demonstrou muita confiança, atenção e dedicação ao trabalho, com ele sempre posso confiar para chegar aos meus compromissos no horário. Queria parabenizar o serviço de vocês e indico fortemente para demais clientes que a JP Traslado é de confiança!",
    hora: "17:07",
  },
  {
    texto:
      "Adorei a viagem! Segurança e qualidade. Muito obrigada mesmo! 👏🏼",
    hora: "16:32",
  },
  {
    texto:
      "Oi Nicelio, tudo bom? Desculpa responder só agora mas aproveitei que estava em SP para ir em um Meeting Internacional. Com a confusão da guerra o espaço aéreo de Israel está fechado e minha viagem está cancelada. Mas muito obrigada por sua lembrança e parabéns pela proatividade. Isso sim que é um tratamento ao cliente de forma diferencial. Parabéns mesmo!!!",
    hora: "23:07",
  },
];

export default function DepoimentosCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prev = () => setIndex((i) => (i === 0 ? depoimentos.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === depoimentos.length - 1 ? 0 : i + 1));

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX.current > 50) next();
    if (touchEndX.current - touchStartX.current > 50) prev();
  };

  return (
    <section className="w-full py-16 bg-black flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#B8860B] mb-10 text-center">Depoimentos de Clientes</h2>
      <div className="relative w-full max-w-xl px-4">
        {/* Card */}
        <div
          className="bg-[#181818] rounded-2xl shadow-lg p-8 min-h-[180px] flex flex-col justify-between items-center transition-all duration-500 ease-in-out"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <svg className="w-8 h-8 text-[#B8860B] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7a4 4 0 014-4h4a4 4 0 014 4v10a4 4 0 01-4 4h-4a4 4 0 01-4-4z" />
          </svg>
          <p className="text-lg md:text-xl text-gray-100 text-center font-serif mb-6">{depoimentos[index].texto}</p>
          <div className="w-full flex justify-end">
            <span className="text-xs text-gray-500">{depoimentos[index].hora}</span>
          </div>
        </div>
        {/* Setas */}
        <button
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#B8860B] hover:bg-[#96700A] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          aria-label="Próximo"
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#B8860B] hover:bg-[#96700A] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {depoimentos.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-[#B8860B]' : 'bg-gray-600'} transition-colors duration-300`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 