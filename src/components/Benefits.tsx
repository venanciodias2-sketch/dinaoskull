"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Droplets, UtensilsCrossed, ShieldCheck, Microscope } from "lucide-react";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const Benefits = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  const iconMap: any = {
    "Termogênese Potente": <Flame className="w-10 h-10" />,
    "Energia e Foco": <Zap className="w-10 h-10" />,
    "Efeito Diurético": <Droplets className="w-10 h-10" />,
    "Controle de Apetite": <UtensilsCrossed className="w-10 h-10" />,
    "Fórmula Científica": <Microscope className="w-10 h-10" />,
    "Natural e Seguro": <ShieldCheck className="w-10 h-10" />,
  };

  if (loading || !content) return null;

  return (
    <section id="beneficios" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black uppercase mb-4"
          >
            {content.benefits.title}
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-body">
            {content.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.benefits.items.map((benefit: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card p-10 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:text-glow">
                  {iconMap[benefit.title] || <Zap className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom Line Decoration */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button onClick={openPopup} className="btn-primary cursor-pointer">
            COMEÇAR MINHA TRANSFORMAÇÃO
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
