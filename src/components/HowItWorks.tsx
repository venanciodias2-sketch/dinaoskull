"use client";

import { motion } from "framer-motion";
import { Pill, Zap, Trophy } from "lucide-react";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const iconMap: Record<string, any> = {
  Pill: <Pill className="w-12 h-12" />,
  Zap: <Zap className="w-12 h-12" />,
  Trophy: <Trophy className="w-12 h-12" />,
};

const HowItWorks = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  if (loading || !content) return null;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black uppercase mb-4"
          >
            {content.how_it_works.title}
          </motion.h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {content.how_it_works.steps.map((step: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-dark-soft border-4 border-white/10 flex items-center justify-center text-primary mb-8 group-hover:border-primary group-hover:scale-110 transition-all duration-500 shadow-2xl relative">
                  {iconMap[index === 0 ? "Pill" : index === 1 ? "Zap" : "Trophy"] || <Zap className="w-12 h-12" />}
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-gray-400 max-w-xs">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <button onClick={openPopup} className="btn-primary cursor-pointer">
              COMEÇAR MINHA TRANSFORMAÇÃO AGORA
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
