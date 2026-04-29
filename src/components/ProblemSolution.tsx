"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, Zap } from "lucide-react";
import { useLeadPopup } from "@/context/LeadContext";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

const ProblemSolution = () => {
  const { openPopup } = useLeadPopup();
  const { content, loading } = useContent();

  if (loading || !content) return null;

  return (
    <section id="beneficios" className="pt-24 md:pt-32 pb-16 md:pb-24 bg-dark-soft relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-black mb-4 uppercase"
          >
            {content.problem_solution.title}
          </motion.h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Problem Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-black/40 p-8 rounded-2xl border border-white/5">
              <h3 className="text-2xl font-bold text-gray-400 mb-8 uppercase tracking-tight">O Cenário Atual:</h3>
              <ul className="space-y-6">
                {content.problem_solution.problems.map((problem: string, index: number) => (
                  <li key={index} className="flex items-center gap-4 text-lg text-gray-300">
                    <XCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-xl font-medium text-white/80 italic">
              "Você não precisa de mais um placebo. Você precisa de potência real."
            </p>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
            <div className="relative glass-card p-10 border-primary/20">
              <h3 className="text-2xl font-bold text-primary mb-6 uppercase tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-8 h-8" />
                {content.problem_solution.solution_title}
              </h3>
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {content.problem_solution.solution_text}
              </p>
              <div className="space-y-4">
                {content.problem_solution.highlights.map((h: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <span className="font-bold text-primary">{h.label}</span>
                    <span className="text-gray-300 text-sm">{h.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          >
            <div className="bg-black px-12 py-6 rounded-sm flex flex-col items-center gap-6">
              <h4 className="text-2xl font-display font-black uppercase tracking-tighter">
                Chegou a hora de conhecer o <span className="text-primary">Dinão Skull Thermo</span>
              </h4>
              <button onClick={openPopup} className="btn-primary cursor-pointer">
                <Zap className="w-5 h-5" />
                QUERO TRANSFORMAR MEU CORPO
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
