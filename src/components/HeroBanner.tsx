"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  { src: '/images/civic.png', alt: 'Honda Civic Black' },
  { src: '/images/corolla.png', alt: 'Toyota Corolla Black' },
  { src: '/images/van.png', alt: 'Van Executiva Black' },
  { src: '/images/virtus.png', alt: 'Volkswagen Virtus Black' },
]

export default function HeroBanner() {
  const [index, setIndex] = useState(0)

  // Troca automática de imagem a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full bg-[#191617]">
      {/* Carrossel de imagens */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-[#191617]">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index].src}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className="object-contain mix-blend-normal"
                style={{ backgroundColor: 'transparent' }}
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Botões de navegação do carrossel */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white text-3xl bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-accent transition"
          onClick={() => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          aria-label="Imagem anterior"
        >‹</button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white text-3xl bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-accent transition"
          onClick={() => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          aria-label="Próxima imagem"
        >›</button>
        {/* Indicadores de slides */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((img, i) => (
            <span
              key={img.src}
              className={`w-3 h-3 rounded-full border border-white ${i === index ? 'bg-accent' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Bloco de texto e botões */}
      <div className="py-12 text-white text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-serif mb-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Soluções em Transporte Executivo
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Rota segura, monitorada e planejada.<br />
          Veículos com blindagem e bem conservados.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a href="https://wa.me/5511965221349" className="btn-primary">WhatsApp</a>
          <a href="tel:+5511965221349" className="btn-primary">Ligar Agora</a>
        </motion.div>
      </div>
    </section>
  )
} 