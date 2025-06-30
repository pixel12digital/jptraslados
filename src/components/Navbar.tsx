"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Função para scroll suave para a seção
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Fecha o menu mobile se estiver aberto
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-black backdrop-blur-none">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo e Frase */}
          <div className="flex items-center gap-4">
            <Link href="/" className="relative w-40 h-12">
              <Image
                src="/images/logo.png"
                alt="JP Traslados"
                fill
                className="object-contain"
              />
            </Link>
            <span className="hidden md:inline-block font-serif text-xl text-white font-semibold leading-tight">Transporte Executivo</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#services" className="text-white hover:text-accent">
              Serviços
            </Link>
            <Link href="/#about" className="text-white hover:text-accent">
              Sobre
            </Link>
            <Link href="/#contact" className="text-white hover:text-accent">
              Contato
            </Link>
            <li>
              <button
                onClick={() => scrollToSection('agenda')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Agenda
              </button>
            </li>
            <a 
              href="https://wa.me/5511965221349"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Solicitar Orçamento
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border border-white rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#services"
                className="text-white hover:text-accent px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link
                href="/#about"
                className="text-white hover:text-accent px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/#contact"
                className="text-white hover:text-accent px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <li>
                <button
                  onClick={() => scrollToSection('agenda')}
                  className="text-gray-300 hover:text-white transition-colors px-4"
                >
                  Agenda
                </button>
              </li>
              <a 
                href="https://wa.me/5511965221349"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 