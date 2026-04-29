"use client";

import { motion } from "framer-motion";
import { Coffee, Sprout, TestTube, Wind, Layers, Brain, ArrowRight } from "lucide-react";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const Ingredients = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  const iconMap: any = {
    "Cafeína": <Coffee />,
    "Hibiscus": <Sprout />,
    "Cromo": <Layers />,
    "Yohimbe": <Wind />,
    "Taraxacum": <TestTube />,
    "L-Carnitina": <Brain />,
  };

  if (loading || !content) return null;

  return (
    <section id="ingredientes" className="py-24 bg-dark-soft relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-end mb-20">
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black uppercase mb-4"
            >
              {content.ingredients.title}
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-xl">
              {content.ingredients.subtitle}
            </p>
          </div>
          <div className="bg-primary/20 p-6 rounded-lg border border-primary/30 flex items-center gap-4">
            <span className="text-5xl font-black text-primary">100%</span>
            <span className="text-white font-bold leading-tight uppercase">Ingredientes <br /> Ativos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.ingredients.items.map((ing: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-8 bg-black rounded-2xl border border-white/10 hover:border-primary/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {iconMap[ing.name] || <TestTube />}
                </div>
                <div className="text-right">
                  <span className="text-primary font-black text-2xl font-display">{ing.dose}</span>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Por dose</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">{ing.name}</h3>
              
              <ul className="space-y-3">
                {ing.benefits.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button onClick={openPopup} className="btn-primary cursor-pointer mx-auto">
            QUERO ESSA POTÊNCIA NO MEU TREINO
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
