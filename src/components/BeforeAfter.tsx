"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useLeadPopup } from "@/context/LeadContext";
import { useContent } from "@/context/ContentContext";

const BeforeAfter = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  if (loading || !content) return null;

  return (
    <section id="resultados" className="py-16 md:py-24 bg-dark-soft relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black uppercase mb-4"
          >
            {content.results.title}
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {content.results.subtitle}
          </p>
        </div>

        <div className="relative px-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="pb-16"
          >
            {content.results.items.map((result: any, index: number) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-black p-8 rounded-2xl border border-white/5 relative group h-full flex flex-col"
                >
                  <div className="absolute top-4 right-4 bg-red-600 text-white font-black px-4 py-1 rounded-full text-xl shadow-2xl z-20">
                    {result.loss}
                  </div>
                  
                  {/* Image Showcase */}
                  <div className="w-full h-64 bg-dark-card rounded-xl mb-6 overflow-hidden relative border border-white/5 shadow-inner">
                    {result.image ? (
                      <Image 
                        src={result.image} 
                        fill 
                        alt={result.name} 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-black text-4xl opacity-20 uppercase rotate-12">
                        Resultado Real
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{result.name}</h3>
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">{result.time} de uso</p>
                    <p className="text-gray-400 italic">"{result.text}"</p>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 text-center">
          <button onClick={openPopup} className="btn-primary cursor-pointer mx-auto">
            <ShoppingCart className="w-5 h-5" />
            QUERO ESSES RESULTADOS TAMBÉM
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
