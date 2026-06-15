"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { content, loading } = useContent();

  if (loading || !content) {
    return <div className="min-h-screen bg-black" />;
  }

  const slides = content.presentation.slides;
  const current = slides[currentSlide] || slides[0];
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-display">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[200px] rounded-full z-0" />

      <div className="relative z-10 min-h-screen flex flex-col p-6 md:p-12 lg:p-20">
        <div className="flex justify-between items-center gap-4 mb-10 md:mb-12">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold shrink-0">D</div>
            <span className="font-black text-lg md:text-xl tracking-tighter truncate">{content.presentation.brand}</span>
          </div>
          <div className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest">
            Slide {currentSlide + 1} / {slides.length}
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="text-primary text-lg md:text-2xl font-bold mb-4 uppercase tracking-[0.2em]">{current.title}</h2>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight uppercase">{current.subtitle}</h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl">{current.content}</p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`media-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex justify-center"
            >
              {current.image ? (
                <Image
                  src={current.image}
                  alt={current.title}
                  width={400}
                  height={600}
                  className="drop-shadow-[0_0_50px_rgba(255,0,0,0.3)] object-contain h-[320px] md:h-[600px]"
                />
              ) : (
                <div className="text-[160px] md:text-[300px] drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                  {current.icon}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-10 md:mt-12">
          <button onClick={prevSlide} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
            <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === currentSlide ? "w-12 bg-primary" : "w-4 bg-white/10"}`} />
            ))}
          </div>
          <button onClick={nextSlide} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-all shadow-lg shadow-primary/20">
            <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 text-[10px] text-gray-700 uppercase tracking-widest hidden md:block">
        {content.presentation.keyboard_hint}
      </div>
    </div>
  );
}
