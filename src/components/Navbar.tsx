"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading || !content) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <a href="#inicio" className="relative block h-10 w-48 md:h-12 md:w-56">
          <Image
            src={content.hero.logo || "/logo.png"}
            alt="Dinão Skull"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {content.navbar.links.map((link: any) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-primary font-medium text-sm transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={openPopup}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 cursor-pointer"
          >
            QUERO COMPRAR
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {content.navbar.links.map((link: any) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-primary font-medium text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => { setIsMobileMenuOpen(false); openPopup(); }}
                className="bg-primary text-white py-4 rounded-lg font-bold text-center mt-4 cursor-pointer"
              >
                COMPRAR AGORA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
