"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Phone, Flame } from "lucide-react";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const LeadPopup = () => {
  const { isOpen, closePopup } = useLeadPopup();
  const { content } = useContent();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    motivation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMotivationSelect = (option: string) => {
    setFormData({ ...formData, motivation: option });
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Olá! Meu nome é ${formData.name}. Gostaria de mais informações sobre o Dinão Skull Thermo. Meu objetivo é: ${formData.motivation}.`;
    const whatsappUrl = `https://wa.me/${content?.whatsapp || "5521999999999"}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
    closePopup();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-dark-card border border-primary/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.2)]"
        >
          <button
            onClick={closePopup}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 md:p-10">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Flame className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-2">
                    QUASE LÁ!
                  </h2>
                  <p className="text-gray-400">
                    Preencha os dados abaixo para falar com um especialista no WhatsApp.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Seu nome completo"
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Seu melhor e-mail"
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="WhatsApp (com DDD)"
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-5 text-lg">
                    PROSSEGUIR
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4">
                  VOCÊ QUER MESMO <span className="text-primary">PERDER PESO?</span>
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "SIM, quero emagrecer rápido!",
                    "QUERO transformar meu corpo agora",
                    "PRECISO de mais energia e foco",
                    "CHEGA de promessas, quero resultados",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleMotivationSelect(option)}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:border-primary hover:text-white hover:bg-primary/5 transition-all text-left font-bold"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 text-center py-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Flame className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>
                <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white">
                  TUDO PRONTO!
                </h2>
                <p className="text-gray-400">
                  Clique no botão abaixo para ser redirecionado ao WhatsApp e garantir sua oferta exclusiva.
                </p>
                <button 
                  onClick={handleSubmit}
                  className="btn-primary w-full py-6 text-xl animate-bounce-slow"
                >
                  FALAR COM ESPECIALISTA AGORA
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeadPopup;
