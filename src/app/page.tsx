import Image from 'next/image'
import HeroBanner from '@/components/HeroBanner'
import TypewriterText from '@/components/TypewriterText'
import DepoimentosCarousel from '@/components/DepoimentosCarousel'
import AgendaAberta from '@/components/AgendaAberta'

const diferenciais = [
  'Rota segura, monitorada e planejada',
  'Veículos com blindagem',
  'Agendamento prévio',
  'Veículos bem conservados',
  'Pontualidade garantida',
  'Atendimento profissional',
  'Valor previsível, sem surpresas',
  'Sigilo garantido em todas as corridas',
  'Motoristas experientes e treinados',
];

const servicos = [
  'Turismo',
  'City Tour',
  'Aeroporto e Hotéis',
  'Traslados',
  'Empresas e Viagens',
  'Trajetos Longos e Curtos',
  'Eventos Corporativos',
  'Litoral e Interior de SP',
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <HeroBanner />
      <AgendaAberta />

      {/* Sobre Nós - Seção com design moderno */}
      <section className="py-24 bg-black relative overflow-hidden" id="sobre">
        <div className="absolute inset-0 bg-[#111] opacity-50 pattern-grid"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">
              <span className="text-white">Sobre a </span>
              <span className="text-[#B8860B]">JP Traslados</span>
            </h2>
            <div className="space-y-8 text-lg md:text-xl">
              <p className="text-gray-300 leading-relaxed">
                Somos uma empresa especializada em oferecer serviços de 
                <span className="text-[#B8860B] font-semibold"> traslados rápidos, seguros e confortáveis </span> 
                na cidade de São Paulo.
              </p>
              <p className="text-gray-400 leading-relaxed font-light">
                Com um compromisso inabalável com a 
                <span className="text-white font-medium"> pontualidade, qualidade e atendimento personalizado</span>, 
                trabalhamos para garantir que cada trajeto seja tranquilo e agradável para nossos clientes.
              </p>
              <blockquote className="border-l-4 border-[#B8860B] pl-6 my-8">
                <TypewriterText text='"Transformando cada trajeto em uma experiência única"' />
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais - Cards Dinâmicos */}
      <section className="py-16 bg-black" id="diferenciais">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-serif text-[#B8860B] mb-4 text-center font-bold">
            Nossos Diferenciais
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12 font-light">
            Conheça o que nos torna únicos no mercado
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {diferenciais.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-6 rounded-xl shadow-lg bg-[#111] text-white min-h-[90px] transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl border border-[#222]"
              >
                <svg className="w-7 h-7 text-[#B8860B] flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrossel de Depoimentos */}
      <DepoimentosCarousel />

      {/* Serviços Especializados */}
      <section className="py-20 bg-[#111]" id="servicos">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Serviços Especializados
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Soluções personalizadas para suas necessidades
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {servicos.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium border border-[#222] hover:border-[#B8860B] transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato - Seção Final */}
      <section className="py-20 bg-black" id="contact">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-[#B8860B]">Entre em </span>
            <span className="text-white">Contato</span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12 font-light">
            +55 11 96522-1349
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a 
              href="https://wa.me/5511965221349"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-[#B8860B] hover:bg-[#96700A] text-white px-8 py-4 rounded-full text-lg font-medium flex items-center justify-center gap-3 transition-colors duration-300"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Solicitar Orçamento
            </a>
            <a 
              href="tel:+5511965221349"
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium flex items-center justify-center gap-3 border-2 border-[#B8860B] hover:bg-[#B8860B] transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Agendar Agora
            </a>
          </div>
        </div>
      </section>
    </main>
  )
} 