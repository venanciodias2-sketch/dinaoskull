"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Flame, Zap, Target, Activity } from "lucide-react";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const Hero = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  if (loading || !content) return <div className="h-screen bg-black" />;
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Background Particles/Smoke Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 via-transparent to-black" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl">
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-primary/50 bg-primary/10 text-primary font-bold text-xs md:text-sm mb-6 tracking-widest uppercase">
              Ultra Concentrado 1000mg
            </span>
          </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[0.95] md:leading-[0.9] tracking-tighter mb-6 uppercase"
            >
              {content.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-400 mb-8 max-w-lg font-body leading-relaxed"
            >
              {content.hero.subtitle}
            </motion.p>

          {/* Quick Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 text-left"
          >
            {[
              { icon: <Flame className="w-5 h-5" />, text: "Metabolismo Turbo" },
              { icon: <Zap className="w-5 h-5" />, text: "Energia Explosiva" },
              { icon: <Activity className="w-5 h-5" />, text: "Queima Real" },
              { icon: <Target className="w-5 h-5" />, text: "Foco Total" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <span className="text-primary">{item.icon}</span>
                <span className="text-sm font-bold uppercase tracking-tight">{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={openPopup}
              className="btn-primary px-8 cursor-pointer"
            >
              {content.hero.cta_primary}
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href="#beneficios" className="btn-outline px-8">
              {content.hero.cta_secondary}
            </a>
          </motion.div>
        </div>

        {/* Right Content - Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="relative z-10 w-full max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-float">
            <Image
              src={content.hero.image}
              alt="Dinão Skull Thermo"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Badge */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center p-4 text-center text-[10px] font-bold leading-tight border-4 border-black/50 shadow-xl z-20"
          >
            FÓRMULA ULTRA CONCENTRADA
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 text-gray-500 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
