"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingCart, ShieldCheck, Truck, Star, Activity } from "lucide-react";
import Image from "next/image";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const FinalCTA = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  if (loading || !content) return null;
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Red Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[150px] rounded-full z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card p-12 lg:p-20 border-primary/30 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-6 leading-tight">
              PRONTO PARA <span className="text-primary">TRANSFORMAR</span> SEU CORPO?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0">
              Não deixe para amanhã a queima de gordura que você pode começar hoje. Junte-se a milhares de pessoas satisfeitas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
              <button 
                onClick={openPopup}
                className="btn-primary py-6 px-10 text-xl cursor-pointer"
              >
                <ShoppingCart className="w-6 h-6" />
                {content.hero.cta_primary}
              </button>
              <a href={content.group_vip} className="btn-outline py-6 px-10 text-xl border-green-500 hover:bg-green-500/10 text-green-500">
                <MessageCircle className="w-6 h-6" />
                GRUPO VIP WHATSAPP
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Compra Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Resultados Garantidos</span>
              </div>
            </div>
          </div>

          {/* Product Showcase */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative lg:w-1/3"
          >
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
            <Image
              src={content.footer.product_image || "/pote_preto.jpg"}
              alt="Dinão Skull"
              width={400}
              height={500}
              className="relative z-10 drop-shadow-[0_0_40px_rgba(255,0,0,0.5)] object-contain"
            />
            {/* Urgency Badge */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-lg font-black uppercase text-sm tracking-tighter whitespace-nowrap animate-pulse shadow-[0_0_20px_rgba(255,0,0,0.5)]">
              Últimas Unidades Disponíveis
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { content, loading } = useContent();

  if (loading || !content) return null;
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
             <div className="relative h-10 w-40">
                <Image
                  src={content.hero.logo || "/logo.png"}
                  alt="Dinão Skull"
                  fill
                  className="object-contain object-left"
                />
              </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dinão Skull Thermo é o suplemento ultra concentrado líder em queima de gordura e energia explosiva no Brasil. Performance sem limites.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Navegação</h4>
            <ul className="space-y-4">
              <li><a href="#inicio" className="text-gray-500 hover:text-primary transition-colors text-sm">Início</a></li>
              <li><a href="#beneficios" className="text-gray-500 hover:text-primary transition-colors text-sm">Benefícios</a></li>
              <li><a href="#ingredientes" className="text-gray-500 hover:text-primary transition-colors text-sm">Ingredientes</a></li>
              <li><a href="#resultados" className="text-gray-500 hover:text-primary transition-colors text-sm">Resultados</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Suporte</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Privacidade</a></li>
              <li><a href="#faq" className="text-gray-500 hover:text-primary transition-colors text-sm">Dúvidas Frequentes</a></li>
              <li><a href={`https://wa.me/${content.whatsapp}`} className="text-gray-500 hover:text-primary transition-colors text-sm">Contato WhatsApp</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Siga-nos</h4>
            <div className="flex gap-4">
              {["Instagram", "Facebook", "TikTok"].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <Activity className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">
              {content.footer.copyright}
            </p>
          </div>
          <p className="text-[10px] text-gray-700 max-w-md">
            {content.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export { FinalCTA, Footer };
