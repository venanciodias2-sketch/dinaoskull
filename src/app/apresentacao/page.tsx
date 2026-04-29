"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react";
import Image from "next/image";

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "DINÃO SKULL THERMO",
      subtitle: "A Nova Era da Queima de Gordura",
      content: "Fórmula Ultra Concentrada de 1000mg em cápsulas.",
      image: "/pote_preto.png",
    },
    {
      title: "O PROBLEMA",
      subtitle: "Platô de Emagrecimento",
      content: "Metabolismo lento, falta de energia e gordura localizada que não sai com dietas comuns.",
      icon: "⚠️",
    },
    {
      title: "A SOLUÇÃO",
      subtitle: "Termogênese Ativa",
      content: "Combinação de 6 ingredientes poderosos que forçam o corpo a usar gordura como combustível.",
      image: "/pote_preto.png",
    },
    {
      title: "BENEFÍCIOS CHAVE",
      subtitle: "Potência em cada mg",
      content: "Queima calórica 24h, energia explosiva, foco mental e redução de inchaço.",
      icon: "🔥",
    },
    {
      title: "INGREDIENTES",
      subtitle: "Transparência Total",
      content: "Cafeína, Hibisco, Picolinato de Cromo, Ioimbina, Dente-de-Leão e Trimetilamino.",
      icon: "🧪",
    },
    {
      title: "COMO USAR",
      subtitle: "Simplicidade e Eficácia",
      content: "Apenas 1 cápsula ao dia. Preferencialmente pela manhã ou antes do treino.",
      icon: "💊",
    },
    {
      title: "OFERTA IRRESISTÍVEL",
      subtitle: "Transformação Garantida",
      content: "Comece agora sua jornada para o corpo dos seus sonhos.",
      image: "/pote_preto.png",
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-display">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[200px] rounded-full z-0" />

      <div className="relative z-10 h-screen flex flex-col p-8 md:p-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">D</div>
            <span className="font-black text-xl tracking-tighter">DINÃO SKULL</span>
          </div>
          <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
            Slide {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="text-primary text-2xl font-bold mb-4 uppercase tracking-[0.2em]">{slides[currentSlide].title}</h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight uppercase">{slides[currentSlide].subtitle}</h1>
              <p className="text-2xl text-gray-400 max-w-2xl">{slides[currentSlide].content}</p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex justify-center"
            >
              {slides[currentSlide].image ? (
                <Image
                  src={slides[currentSlide].image}
                  alt="Slide Image"
                  width={400}
                  height={600}
                  className="drop-shadow-[0_0_50px_rgba(255,0,0,0.3)] object-contain h-[400px] md:h-[600px]"
                />
              ) : (
                <div className="text-[200px] md:text-[300px] drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                  {slides[currentSlide].icon}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-12">
          <button onClick={prevSlide} className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === currentSlide ? "w-12 bg-primary" : "w-4 bg-white/10"}`} />
            ))}
          </div>
          <button onClick={nextSlide} className="w-16 h-16 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-all shadow-lg shadow-primary/20">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="fixed bottom-4 right-4 text-[10px] text-gray-700 uppercase tracking-widest hidden md:block">
        Use as setas do teclado para navegar
      </div>
    </div>
  );
}
