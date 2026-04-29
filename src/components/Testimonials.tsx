"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const Testimonials = () => {
  const { content, loading } = useContent();

  if (loading || !content) return null;

  return (
    <section id="depoimentos" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black uppercase mb-4"
          >
            {content.testimonials.title}
          </motion.h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials.items.map((testi: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 relative group"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-primary opacity-10 group-hover:opacity-20 transition-opacity" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testi.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                "{testi.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {testi.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testi.name}</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">{testi.city}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                 <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Compra Verificada</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
