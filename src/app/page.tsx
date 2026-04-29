import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Benefits from "@/components/Benefits";
import Ingredients from "@/components/Ingredients";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { FinalCTA, Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <div className="space-y-0">
        <ProblemSolution />
        <Benefits />
        <Ingredients />
        <HowItWorks />
        <BeforeAfter />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </div>
      <Footer />
    </main>
  );
}
