"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Droplets, UtensilsCrossed, ShieldCheck, Microscope, type LucideIcon } from "lucide-react";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const iconMap: Record<string, LucideIcon> = {
  "Termogênese Potente": Flame,
  "Energia e Foco": Zap,
  "Efeito Diurético": Droplets,
  "Controle de Apetite": UtensilsCrossed,
  "Fórmula Científica": Microscope,
  "Natural e Seguro": ShieldCheck,
};

const Benefits = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

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
          {content.benefits.items.map((benefit, index) => {
            const Icon = iconMap[benefit.title] || Zap;

            return (
              <motion.div
                key={`${benefit.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-card p-10 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:text-glow">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <button onClick={openPopup} className="btn-primary cursor-pointer">
            {content.benefits.cta_text}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
