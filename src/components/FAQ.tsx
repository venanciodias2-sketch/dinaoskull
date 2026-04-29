"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { content, loading } = useContent();

  if (loading || !content) return null;

  return (
    <section id="faq" className="py-24 bg-black">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black uppercase mb-4"
          >
            {content.faq.title}
          </motion.h2>
          <p className="text-gray-500">{content.faq.subtitle}</p>
        </div>

        <div className="space-y-4">
          {content.faq.items.map((faq: any, index: number) => (
            <div key={index} className="border border-white/10 rounded-2xl overflow-hidden bg-dark-soft">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center group transition-all hover:bg-white/5"
              >
                <span className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">
                  {faq.q}
                </span>
                <span className="text-primary">
                  {openIndex === index ? <Minus /> : <Plus />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 border-t border-white/5 bg-black/20">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
