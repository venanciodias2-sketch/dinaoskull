"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingCart, ShieldCheck, Truck, Star, Activity, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const trustIcons: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  truck: Truck,
  star: Star,
};

const FinalCTA = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  if (loading || !content) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[150px] rounded-full z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card p-8 md:p-12 lg:p-20 border-primary/30 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-6 leading-tight">
              {content.final_cta.title_before} <span className="text-primary">{content.final_cta.title_highlight}</span> {content.final_cta.title_after}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0">
              {content.final_cta.text}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
              <button
                onClick={openPopup}
                className="btn-primary py-5 md:py-6 px-8 md:px-10 text-lg md:text-xl cursor-pointer"
              >
                <ShoppingCart className="w-6 h-6" />
                {content.hero.cta_primary}
              </button>
              <a href={content.group_vip} className="btn-outline py-5 md:py-6 px-8 md:px-10 text-lg md:text-xl border-green-500 hover:bg-green-500/10 text-green-500">
                <MessageCircle className="w-6 h-6" />
                {content.final_cta.vip_cta}
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
              {content.final_cta.trust_items.map((item, index) => {
                const Icon = trustIcons[item.icon] || ShieldCheck;

                return (
                  <div key={`${item.text}-${index}`} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-sm lg:w-1/3"
          >
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
            <Image
              src={content.footer.product_image || "/pote_preto.jpg"}
              alt={content.hero.image_alt}
              width={400}
              height={500}
              className="relative z-10 drop-shadow-[0_0_40px_rgba(255,0,0,0.5)] object-contain"
            />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-lg font-black uppercase text-sm tracking-tighter whitespace-nowrap animate-pulse shadow-[0_0_20px_rgba(255,0,0,0.5)]">
              {content.final_cta.urgency_badge}
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
          <div className="space-y-6">
            <div className="relative h-10 w-40">
              <Image
                src={content.hero.logo || "/logo.png"}
                alt={content.hero.image_alt}
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {content.footer.brand_text}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">{content.footer.navigation_title}</h4>
            <ul className="space-y-4">
              {content.navbar.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-500 hover:text-primary transition-colors text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">{content.footer.support_title}</h4>
            <ul className="space-y-4">
              {content.footer.support_links.map((link) => (
                <li key={`${link.name}-${link.href}`}>
                  <a href={link.href} className="text-gray-500 hover:text-primary transition-colors text-sm">{link.name}</a>
                </li>
              ))}
              <li>
                <a href={`https://wa.me/${content.whatsapp}`} className="text-gray-500 hover:text-primary transition-colors text-sm">Contato WhatsApp</a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">{content.footer.social_title}</h4>
            <div className="flex gap-4">
              {content.footer.social_links.map((social) => (
                <a key={social.name} href={social.href} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <span className="sr-only">{social.name}</span>
                  <Activity className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            {content.footer.copyright}
          </p>
          <p className="text-[10px] text-gray-700 max-w-md">
            {content.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export { FinalCTA, Footer };
