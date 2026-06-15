"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Zap, ShieldCheck, ChevronRight, Image as ImageIcon, MessageSquare,
  HelpCircle, Link as LinkIcon, Lock, Save, Loader2, LogIn, LogOut, Plus,
  Trash2, Upload, Megaphone, PanelTop, Presentation, MessageCircle, Footprints
} from "lucide-react";
import Image from "next/image";
import { mergeContent } from "@/lib/contentDefaults";
import type {
  BenefitItem,
  ContentConfig,
  FaqItem,
  IngredientItem,
  LabelTextItem,
  NavLink,
  PresentationSlide,
  ResultItem,
  SocialLink,
  StepItem,
  TestimonialItem,
  TextItem,
  TrustItem,
} from "@/types/content";

type TabId =
  | "hero"
  | "navbar"
  | "problem"
  | "benefits"
  | "ingredients"
  | "process"
  | "results"
  | "testimonials"
  | "faq"
  | "final"
  | "footer"
  | "popup"
  | "presentation"
  | "config"
  | "security";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "hero", label: "Hero", icon: <Home className="w-4 h-4" /> },
  { id: "navbar", label: "Menu", icon: <PanelTop className="w-4 h-4" /> },
  { id: "problem", label: "Problema", icon: <Megaphone className="w-4 h-4" /> },
  { id: "benefits", label: "Benefícios", icon: <Zap className="w-4 h-4" /> },
  { id: "ingredients", label: "Ingredientes", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: "process", label: "Processo", icon: <ChevronRight className="w-4 h-4" /> },
  { id: "results", label: "Resultados", icon: <ImageIcon className="w-4 h-4" /> },
  { id: "testimonials", label: "Depoimentos", icon: <MessageSquare className="w-4 h-4" /> },
  { id: "faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4" /> },
  { id: "final", label: "CTA Final", icon: <Footprints className="w-4 h-4" /> },
  { id: "footer", label: "Rodapé", icon: <LinkIcon className="w-4 h-4" /> },
  { id: "popup", label: "Popup", icon: <MessageCircle className="w-4 h-4" /> },
  { id: "presentation", label: "Apresentação", icon: <Presentation className="w-4 h-4" /> },
  { id: "config", label: "Global", icon: <LinkIcon className="w-4 h-4" /> },
  { id: "security", label: "Segurança", icon: <Lock className="w-4 h-4" /> },
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<ContentConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setContent(mergeContent(data)))
      .finally(() => setIsLoading(false));
  }, []);

  const updateContent = (recipe: (draft: ContentConfig) => ContentConfig) => {
    setContent((current) => current ? recipe(current) : current);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (content && password === content.admin.password) {
      setIsLoggedIn(true);
      setStatus("");
    } else {
      setStatus("Senha incorreta.");
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    setStatus("Salvando alterações...");

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Erro ao salvar conteúdo.");
      }

      window.dispatchEvent(new Event("content-updated"));
      setStatus("Alterações salvas. O site atualiza automaticamente em alguns segundos.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao salvar.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!content) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Erro ao carregar conteúdo.</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="glass-card p-8 md:p-10 w-full max-w-md border border-white/5">
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-20">
              <Image src={content.hero.logo || "/logo.png"} alt={content.hero.image_alt} fill className="object-contain" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-center mb-2 uppercase font-display">Painel Admin</h1>
          <p className="text-gray-500 text-center mb-8 text-sm">Acesse para editar todo o site Dinão Skull.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Senha de segurança"
              value={password}
              onChange={setPassword}
              placeholder="Digite a senha"
              type="password"
            />
            {status && <p className="text-sm text-primary text-center">{status}</p>}
            <button type="submit" className="w-full btn-primary py-5 text-lg font-bold">
              <LogIn className="w-5 h-5" />
              ENTRAR NO SISTEMA
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row font-sans">
      <aside className="w-full lg:w-80 bg-black/50 border-b lg:border-b-0 lg:border-r border-white/5 p-4 md:p-6 lg:p-8 lg:min-h-screen">
        <div className="flex items-center gap-4 mb-6 lg:mb-10">
          <div className="relative w-12 h-12 bg-white/5 rounded-xl border border-white/10 p-2 shrink-0">
            <Image src={content.hero.logo || "/logo.png"} alt={content.hero.image_alt} fill className="object-contain p-2" />
          </div>
          <div className="min-w-0">
            <h2 className="font-black uppercase tracking-tighter text-lg leading-none truncate">Dinão Skull</h2>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Editor conectado</p>
          </div>
        </div>

        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-3 md:p-4 rounded-xl transition-all group ${
                activeTab === tab.id
                  ? "bg-primary text-white font-bold shadow-[0_10px_20px_-10px_rgba(255,0,0,0.5)]"
                  : "text-gray-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                {tab.icon}
                <span className="text-xs md:text-sm tracking-tight truncate">{tab.label}</span>
              </span>
              {activeTab === tab.id && <motion.span layoutId="active-tab" className="hidden lg:block w-1 h-4 bg-white/50 rounded-full" />}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="mt-6 w-full flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 transition-all rounded-xl hover:bg-red-500/5"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-bold uppercase tracking-tight">Sair do Painel</span>
        </button>
      </aside>

      <main className="flex-1 p-4 md:p-8 xl:p-14 overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
            <div>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                Edição Ativa / {tabs.find((tab) => tab.id === activeTab)?.label}
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase font-display tracking-tighter mt-3">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h1>
              <p className="text-gray-500 text-sm mt-2">Salve no admin e a landing em outras abas atualiza automaticamente.</p>
            </div>
            <div className="w-full xl:w-auto flex flex-col items-stretch xl:items-end gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all active:scale-[0.97] disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                SALVAR ALTERAÇÕES
              </button>
              {status && <p className="text-xs text-gray-400 max-w-sm xl:text-right">{status}</p>}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 pb-24"
            >
              {activeTab === "hero" && (
                <Panel title="Hero principal">
                  <Grid>
                    <Input label="Selo superior" value={content.hero.badge} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, badge: v } }))} />
                    <Input label="Texto do badge giratório" value={content.hero.formula_badge} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, formula_badge: v } }))} />
                  </Grid>
                  <Input label="Título principal" value={content.hero.title} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, title: v } }))} />
                  <Textarea label="Subtítulo" value={content.hero.subtitle} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, subtitle: v } }))} />
                  <Grid>
                    <Input label="CTA primário" value={content.hero.cta_primary} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, cta_primary: v } }))} />
                    <Input label="CTA secundário" value={content.hero.cta_secondary} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, cta_secondary: v } }))} />
                  </Grid>
                  <Grid>
                    <Input label="URL imagem produto" value={content.hero.image} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, image: v } }))} />
                    <Input label="Texto alternativo da imagem" value={content.hero.image_alt} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, image_alt: v } }))} />
                    <Input label="URL logo" value={content.hero.logo} onChange={(v) => updateContent((c) => ({ ...c, hero: { ...c.hero, logo: v } }))} />
                    <ImageUpload label="Upload produto/logo" onUpload={(url) => updateContent((c) => ({ ...c, hero: { ...c.hero, image: url } }))} />
                  </Grid>
                  <TextItemEditor
                    title="Benefícios rápidos"
                    items={content.hero.quick_benefits}
                    newItem={{ text: "Novo benefício" }}
                    onChange={(items) => updateContent((c) => ({ ...c, hero: { ...c.hero, quick_benefits: items } }))}
                  />
                </Panel>
              )}

              {activeTab === "navbar" && (
                <Panel title="Menu e navegação">
                  <Grid>
                    <Input label="Botão desktop" value={content.navbar.cta_text} onChange={(v) => updateContent((c) => ({ ...c, navbar: { ...c.navbar, cta_text: v } }))} />
                    <Input label="Botão mobile" value={content.navbar.mobile_cta_text} onChange={(v) => updateContent((c) => ({ ...c, navbar: { ...c.navbar, mobile_cta_text: v } }))} />
                  </Grid>
                  <LinkEditor title="Links do menu" items={content.navbar.links} onChange={(links) => updateContent((c) => ({ ...c, navbar: { ...c.navbar, links } }))} />
                </Panel>
              )}

              {activeTab === "problem" && (
                <Panel title="Problema e solução">
                  <Input label="Título" value={content.problem_solution.title} onChange={(v) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, title: v } }))} />
                  <Input label="Título dos problemas" value={content.problem_solution.problem_heading} onChange={(v) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, problem_heading: v } }))} />
                  <LinesTextarea label="Problemas, um por linha" items={content.problem_solution.problems} onChange={(problems) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, problems } }))} />
                  <Input label="Frase destacada" value={content.problem_solution.quote} onChange={(v) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, quote: v } }))} />
                  <Input label="Título da solução" value={content.problem_solution.solution_title} onChange={(v) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, solution_title: v } }))} />
                  <Textarea label="Texto da solução" value={content.problem_solution.solution_text} onChange={(v) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, solution_text: v } }))} />
                  <LabelTextEditor title="Destaques" items={content.problem_solution.highlights} onChange={(highlights) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, highlights } }))} />
                  <Grid>
                    <Input label="Chamada final da seção" value={content.problem_solution.cta_heading} onChange={(v) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, cta_heading: v } }))} />
                    <Input label="Botão da seção" value={content.problem_solution.cta_text} onChange={(v) => updateContent((c) => ({ ...c, problem_solution: { ...c.problem_solution, cta_text: v } }))} />
                  </Grid>
                </Panel>
              )}

              {activeTab === "benefits" && (
                <Panel title="Benefícios">
                  <Input label="Título" value={content.benefits.title} onChange={(v) => updateContent((c) => ({ ...c, benefits: { ...c.benefits, title: v } }))} />
                  <Textarea label="Subtítulo" value={content.benefits.subtitle} onChange={(v) => updateContent((c) => ({ ...c, benefits: { ...c.benefits, subtitle: v } }))} />
                  <Input label="Texto do botão" value={content.benefits.cta_text} onChange={(v) => updateContent((c) => ({ ...c, benefits: { ...c.benefits, cta_text: v } }))} />
                  <BenefitEditor items={content.benefits.items} onChange={(items) => updateContent((c) => ({ ...c, benefits: { ...c.benefits, items } }))} />
                </Panel>
              )}

              {activeTab === "ingredients" && (
                <Panel title="Ingredientes">
                  <Input label="Título" value={content.ingredients.title} onChange={(v) => updateContent((c) => ({ ...c, ingredients: { ...c.ingredients, title: v } }))} />
                  <Textarea label="Subtítulo" value={content.ingredients.subtitle} onChange={(v) => updateContent((c) => ({ ...c, ingredients: { ...c.ingredients, subtitle: v } }))} />
                  <Grid>
                    <Input label="Valor do selo" value={content.ingredients.active_badge_value} onChange={(v) => updateContent((c) => ({ ...c, ingredients: { ...c.ingredients, active_badge_value: v } }))} />
                    <Input label="Texto do selo" value={content.ingredients.active_badge_label} onChange={(v) => updateContent((c) => ({ ...c, ingredients: { ...c.ingredients, active_badge_label: v } }))} />
                    <Input label="Texto do botão" value={content.ingredients.cta_text} onChange={(v) => updateContent((c) => ({ ...c, ingredients: { ...c.ingredients, cta_text: v } }))} />
                  </Grid>
                  <IngredientEditor items={content.ingredients.items} onChange={(items) => updateContent((c) => ({ ...c, ingredients: { ...c.ingredients, items } }))} />
                </Panel>
              )}

              {activeTab === "process" && (
                <Panel title="Como funciona">
                  <Input label="Título" value={content.how_it_works.title} onChange={(v) => updateContent((c) => ({ ...c, how_it_works: { ...c.how_it_works, title: v } }))} />
                  <Input label="Texto do botão" value={content.how_it_works.cta_text} onChange={(v) => updateContent((c) => ({ ...c, how_it_works: { ...c.how_it_works, cta_text: v } }))} />
                  <StepEditor items={content.how_it_works.steps} onChange={(steps) => updateContent((c) => ({ ...c, how_it_works: { ...c.how_it_works, steps } }))} />
                </Panel>
              )}

              {activeTab === "results" && (
                <Panel title="Resultados">
                  <Input label="Título" value={content.results.title} onChange={(v) => updateContent((c) => ({ ...c, results: { ...c.results, title: v } }))} />
                  <Textarea label="Subtítulo" value={content.results.subtitle} onChange={(v) => updateContent((c) => ({ ...c, results: { ...c.results, subtitle: v } }))} />
                  <Grid>
                    <Input label="Placeholder de imagem" value={content.results.placeholder_text} onChange={(v) => updateContent((c) => ({ ...c, results: { ...c.results, placeholder_text: v } }))} />
                    <Input label="Texto do botão" value={content.results.cta_text} onChange={(v) => updateContent((c) => ({ ...c, results: { ...c.results, cta_text: v } }))} />
                  </Grid>
                  <ResultEditor items={content.results.items} onChange={(items) => updateContent((c) => ({ ...c, results: { ...c.results, items } }))} />
                </Panel>
              )}

              {activeTab === "testimonials" && (
                <Panel title="Depoimentos">
                  <Grid>
                    <Input label="Título" value={content.testimonials.title} onChange={(v) => updateContent((c) => ({ ...c, testimonials: { ...c.testimonials, title: v } }))} />
                    <Input label="Selo verificado" value={content.testimonials.verified_label} onChange={(v) => updateContent((c) => ({ ...c, testimonials: { ...c.testimonials, verified_label: v } }))} />
                  </Grid>
                  <TestimonialEditor items={content.testimonials.items} onChange={(items) => updateContent((c) => ({ ...c, testimonials: { ...c.testimonials, items } }))} />
                </Panel>
              )}

              {activeTab === "faq" && (
                <Panel title="FAQ">
                  <Input label="Título" value={content.faq.title} onChange={(v) => updateContent((c) => ({ ...c, faq: { ...c.faq, title: v } }))} />
                  <Textarea label="Subtítulo" value={content.faq.subtitle} onChange={(v) => updateContent((c) => ({ ...c, faq: { ...c.faq, subtitle: v } }))} />
                  <FaqEditor items={content.faq.items} onChange={(items) => updateContent((c) => ({ ...c, faq: { ...c.faq, items } }))} />
                </Panel>
              )}

              {activeTab === "final" && (
                <Panel title="CTA final">
                  <Grid>
                    <Input label="Título antes" value={content.final_cta.title_before} onChange={(v) => updateContent((c) => ({ ...c, final_cta: { ...c.final_cta, title_before: v } }))} />
                    <Input label="Título destacado" value={content.final_cta.title_highlight} onChange={(v) => updateContent((c) => ({ ...c, final_cta: { ...c.final_cta, title_highlight: v } }))} />
                    <Input label="Título depois" value={content.final_cta.title_after} onChange={(v) => updateContent((c) => ({ ...c, final_cta: { ...c.final_cta, title_after: v } }))} />
                    <Input label="Botão VIP" value={content.final_cta.vip_cta} onChange={(v) => updateContent((c) => ({ ...c, final_cta: { ...c.final_cta, vip_cta: v } }))} />
                  </Grid>
                  <Textarea label="Texto" value={content.final_cta.text} onChange={(v) => updateContent((c) => ({ ...c, final_cta: { ...c.final_cta, text: v } }))} />
                  <Input label="Selo de urgência" value={content.final_cta.urgency_badge} onChange={(v) => updateContent((c) => ({ ...c, final_cta: { ...c.final_cta, urgency_badge: v } }))} />
                  <TrustEditor items={content.final_cta.trust_items} onChange={(trust_items) => updateContent((c) => ({ ...c, final_cta: { ...c.final_cta, trust_items } }))} />
                </Panel>
              )}

              {activeTab === "footer" && (
                <Panel title="Rodapé">
                  <Textarea label="Texto institucional" value={content.footer.brand_text} onChange={(v) => updateContent((c) => ({ ...c, footer: { ...c.footer, brand_text: v } }))} />
                  <Grid>
                    <Input label="Título navegação" value={content.footer.navigation_title} onChange={(v) => updateContent((c) => ({ ...c, footer: { ...c.footer, navigation_title: v } }))} />
                    <Input label="Título suporte" value={content.footer.support_title} onChange={(v) => updateContent((c) => ({ ...c, footer: { ...c.footer, support_title: v } }))} />
                    <Input label="Título redes" value={content.footer.social_title} onChange={(v) => updateContent((c) => ({ ...c, footer: { ...c.footer, social_title: v } }))} />
                    <Input label="Imagem CTA final" value={content.footer.product_image} onChange={(v) => updateContent((c) => ({ ...c, footer: { ...c.footer, product_image: v } }))} />
                  </Grid>
                  <Input label="Copyright" value={content.footer.copyright} onChange={(v) => updateContent((c) => ({ ...c, footer: { ...c.footer, copyright: v } }))} />
                  <Textarea label="Aviso legal" value={content.footer.disclaimer} onChange={(v) => updateContent((c) => ({ ...c, footer: { ...c.footer, disclaimer: v } }))} />
                  <LinkEditor title="Links de suporte" items={content.footer.support_links} onChange={(support_links) => updateContent((c) => ({ ...c, footer: { ...c.footer, support_links } }))} />
                  <SocialEditor items={content.footer.social_links} onChange={(social_links) => updateContent((c) => ({ ...c, footer: { ...c.footer, social_links } }))} />
                </Panel>
              )}

              {activeTab === "popup" && (
                <Panel title="Popup de captura">
                  <Grid>
                    <Input label="Título passo 1" value={content.lead_popup.step1_title} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, step1_title: v } }))} />
                    <Input label="Botão próximo" value={content.lead_popup.next_button} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, next_button: v } }))} />
                  </Grid>
                  <Textarea label="Texto passo 1" value={content.lead_popup.step1_text} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, step1_text: v } }))} />
                  <Grid>
                    <Input label="Placeholder nome" value={content.lead_popup.fields.name} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, fields: { ...c.lead_popup.fields, name: v } } }))} />
                    <Input label="Placeholder e-mail" value={content.lead_popup.fields.email} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, fields: { ...c.lead_popup.fields, email: v } } }))} />
                    <Input label="Placeholder telefone" value={content.lead_popup.fields.phone} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, fields: { ...c.lead_popup.fields, phone: v } } }))} />
                    <Input label="Título passo 2" value={content.lead_popup.step2_title} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, step2_title: v } }))} />
                    <Input label="Destaque passo 2" value={content.lead_popup.step2_highlight} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, step2_highlight: v } }))} />
                    <Input label="Título final" value={content.lead_popup.step3_title} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, step3_title: v } }))} />
                  </Grid>
                  <LinesTextarea label="Motivações, uma por linha" items={content.lead_popup.motivations} onChange={(motivations) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, motivations } }))} />
                  <Textarea label="Texto final" value={content.lead_popup.step3_text} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, step3_text: v } }))} />
                  <Input label="Botão final" value={content.lead_popup.submit_button} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, submit_button: v } }))} />
                  <Textarea label="Mensagem WhatsApp ({name}, {email}, {phone}, {motivation})" value={content.lead_popup.whatsapp_message} onChange={(v) => updateContent((c) => ({ ...c, lead_popup: { ...c.lead_popup, whatsapp_message: v } }))} />
                </Panel>
              )}

              {activeTab === "presentation" && (
                <Panel title="Apresentação">
                  <Grid>
                    <Input label="Marca no topo" value={content.presentation.brand} onChange={(v) => updateContent((c) => ({ ...c, presentation: { ...c.presentation, brand: v } }))} />
                    <Input label="Dica de teclado" value={content.presentation.keyboard_hint} onChange={(v) => updateContent((c) => ({ ...c, presentation: { ...c.presentation, keyboard_hint: v } }))} />
                  </Grid>
                  <PresentationEditor items={content.presentation.slides} onChange={(slides) => updateContent((c) => ({ ...c, presentation: { ...c.presentation, slides } }))} />
                </Panel>
              )}

              {activeTab === "config" && (
                <Panel title="Configurações globais">
                  <Grid>
                    <Input label="WhatsApp de vendas" value={content.whatsapp} onChange={(v) => updateContent((c) => ({ ...c, whatsapp: v }))} />
                    <Input label="Link Grupo VIP" value={content.group_vip} onChange={(v) => updateContent((c) => ({ ...c, group_vip: v }))} />
                  </Grid>
                </Panel>
              )}

              {activeTab === "security" && (
                <Panel title="Segurança">
                  <Input label="Senha de acesso" value={content.admin.password} onChange={(v) => updateContent((c) => ({ ...c, admin: { ...c.admin, password: v } }))} />
                </Panel>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-card p-5 md:p-8 lg:p-10 space-y-8 border border-white/5 bg-white/[0.02]">
      <h2 className="text-2xl font-black uppercase tracking-tighter">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>;
}

function Input({ label, value, onChange, placeholder = "", type = "text" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="space-y-2 block">
      <span className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 md:p-5 text-white placeholder:text-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="space-y-2 block">
      <span className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 md:p-5 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium h-36 resize-y leading-relaxed"
      />
    </label>
  );
}

function LinesTextarea({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
  return <Textarea label={label} value={items.join("\n")} onChange={(value) => onChange(value.split("\n").filter(Boolean))} />;
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 p-2 bg-white/5 rounded-lg transition-all">
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full p-6 border-2 border-dashed border-white/10 rounded-3xl text-gray-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs">
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}

function ItemCard({ children }: { children: React.ReactNode }) {
  return <div className="relative bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-3xl space-y-5">{children}</div>;
}

function TextItemEditor({ title, items, newItem, onChange }: { title: string; items: TextItem[]; newItem: TextItem; onChange: (items: TextItem[]) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-black uppercase text-sm tracking-widest text-gray-400">{title}</h3>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Input label={`Item ${index + 1}`} value={item.text} onChange={(text) => onChange(items.map((current, i) => i === index ? { text } : current))} />
        </ItemCard>
      ))}
      <AddButton label="Adicionar item" onClick={() => onChange([...items, newItem])} />
    </div>
  );
}

function LinkEditor({ title, items, onChange }: { title: string; items: NavLink[]; onChange: (items: NavLink[]) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-black uppercase text-sm tracking-widest text-gray-400">{title}</h3>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Grid>
            <Input label="Nome" value={item.name} onChange={(name) => onChange(items.map((current, i) => i === index ? { ...current, name } : current))} />
            <Input label="Link" value={item.href} onChange={(href) => onChange(items.map((current, i) => i === index ? { ...current, href } : current))} />
          </Grid>
        </ItemCard>
      ))}
      <AddButton label="Adicionar link" onClick={() => onChange([...items, { name: "Novo link", href: "#" }])} />
    </div>
  );
}

function LabelTextEditor({ title, items, onChange }: { title: string; items: LabelTextItem[]; onChange: (items: LabelTextItem[]) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-black uppercase text-sm tracking-widest text-gray-400">{title}</h3>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Grid>
            <Input label="Rótulo" value={item.label} onChange={(label) => onChange(items.map((current, i) => i === index ? { ...current, label } : current))} />
            <Input label="Texto" value={item.text} onChange={(text) => onChange(items.map((current, i) => i === index ? { ...current, text } : current))} />
          </Grid>
        </ItemCard>
      ))}
      <AddButton label="Adicionar destaque" onClick={() => onChange([...items, { label: "Novo", text: "Descrição" }])} />
    </div>
  );
}

function BenefitEditor({ items, onChange }: { items: BenefitItem[]; onChange: (items: BenefitItem[]) => void }) {
  return (
    <EditorList title="Cards de benefício" addLabel="Adicionar benefício" onAdd={() => onChange([...items, { title: "Novo benefício", description: "Descrição" }])}>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Input label="Título" value={item.title} onChange={(title) => onChange(items.map((current, i) => i === index ? { ...current, title } : current))} />
          <Textarea label="Descrição" value={item.description} onChange={(description) => onChange(items.map((current, i) => i === index ? { ...current, description } : current))} />
        </ItemCard>
      ))}
    </EditorList>
  );
}

function IngredientEditor({ items, onChange }: { items: IngredientItem[]; onChange: (items: IngredientItem[]) => void }) {
  return (
    <EditorList title="Lista de ingredientes" addLabel="Adicionar ingrediente" onAdd={() => onChange([...items, { name: "Novo ingrediente", dose: "100mg", benefits: [] }])}>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Grid>
            <Input label="Nome" value={item.name} onChange={(name) => onChange(items.map((current, i) => i === index ? { ...current, name } : current))} />
            <Input label="Dose" value={item.dose} onChange={(dose) => onChange(items.map((current, i) => i === index ? { ...current, dose } : current))} />
          </Grid>
          <LinesTextarea label="Benefícios, um por linha" items={item.benefits} onChange={(benefits) => onChange(items.map((current, i) => i === index ? { ...current, benefits } : current))} />
        </ItemCard>
      ))}
    </EditorList>
  );
}

function StepEditor({ items, onChange }: { items: StepItem[]; onChange: (items: StepItem[]) => void }) {
  return (
    <EditorList title="Passos" addLabel="Adicionar passo" onAdd={() => onChange([...items, { title: "Novo passo", text: "Descrição" }])}>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Input label="Título" value={item.title} onChange={(title) => onChange(items.map((current, i) => i === index ? { ...current, title } : current))} />
          <Textarea label="Texto" value={item.text} onChange={(text) => onChange(items.map((current, i) => i === index ? { ...current, text } : current))} />
        </ItemCard>
      ))}
    </EditorList>
  );
}

function ResultEditor({ items, onChange }: { items: ResultItem[]; onChange: (items: ResultItem[]) => void }) {
  return (
    <EditorList title="Casos de resultado" addLabel="Adicionar resultado" onAdd={() => onChange([...items, { name: "Nome", time: "30 dias", loss: "-5kg", text: "", image: "" }])}>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Grid>
            <Input label="Nome" value={item.name} onChange={(name) => onChange(items.map((current, i) => i === index ? { ...current, name } : current))} />
            <Input label="Tempo" value={item.time} onChange={(time) => onChange(items.map((current, i) => i === index ? { ...current, time } : current))} />
            <Input label="Resultado" value={item.loss} onChange={(loss) => onChange(items.map((current, i) => i === index ? { ...current, loss } : current))} />
            <Input label="Imagem" value={item.image || ""} onChange={(image) => onChange(items.map((current, i) => i === index ? { ...current, image } : current))} />
          </Grid>
          <Textarea label="Texto" value={item.text} onChange={(text) => onChange(items.map((current, i) => i === index ? { ...current, text } : current))} />
        </ItemCard>
      ))}
    </EditorList>
  );
}

function TestimonialEditor({ items, onChange }: { items: TestimonialItem[]; onChange: (items: TestimonialItem[]) => void }) {
  return (
    <EditorList title="Depoimentos" addLabel="Adicionar depoimento" onAdd={() => onChange([...items, { name: "Novo cliente", city: "Cidade, UF", text: "", rating: 5 }])}>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Grid>
            <Input label="Nome" value={item.name} onChange={(name) => onChange(items.map((current, i) => i === index ? { ...current, name } : current))} />
            <Input label="Cidade" value={item.city} onChange={(city) => onChange(items.map((current, i) => i === index ? { ...current, city } : current))} />
            <Input label="Nota 1-5" value={String(item.rating)} onChange={(rating) => onChange(items.map((current, i) => i === index ? { ...current, rating: Number(rating) || 5 } : current))} />
          </Grid>
          <Textarea label="Texto" value={item.text} onChange={(text) => onChange(items.map((current, i) => i === index ? { ...current, text } : current))} />
        </ItemCard>
      ))}
    </EditorList>
  );
}

function FaqEditor({ items, onChange }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  return (
    <EditorList title="Perguntas" addLabel="Adicionar pergunta" onAdd={() => onChange([...items, { q: "Pergunta?", a: "Resposta..." }])}>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Input label="Pergunta" value={item.q} onChange={(q) => onChange(items.map((current, i) => i === index ? { ...current, q } : current))} />
          <Textarea label="Resposta" value={item.a} onChange={(a) => onChange(items.map((current, i) => i === index ? { ...current, a } : current))} />
        </ItemCard>
      ))}
    </EditorList>
  );
}

function TrustEditor({ items, onChange }: { items: TrustItem[]; onChange: (items: TrustItem[]) => void }) {
  return (
    <EditorList title="Selos de confiança" addLabel="Adicionar selo" onAdd={() => onChange([...items, { icon: "shield", text: "Novo selo" }])}>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Grid>
            <Select label="Ícone" value={item.icon} options={["shield", "truck", "star"]} onChange={(icon) => onChange(items.map((current, i) => i === index ? { ...current, icon: icon as TrustItem["icon"] } : current))} />
            <Input label="Texto" value={item.text} onChange={(text) => onChange(items.map((current, i) => i === index ? { ...current, text } : current))} />
          </Grid>
        </ItemCard>
      ))}
    </EditorList>
  );
}

function SocialEditor({ items, onChange }: { items: SocialLink[]; onChange: (items: SocialLink[]) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-black uppercase text-sm tracking-widest text-gray-400">Redes sociais</h3>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Grid>
            <Input label="Nome" value={item.name} onChange={(name) => onChange(items.map((current, i) => i === index ? { ...current, name } : current))} />
            <Input label="URL" value={item.href} onChange={(href) => onChange(items.map((current, i) => i === index ? { ...current, href } : current))} />
          </Grid>
        </ItemCard>
      ))}
      <AddButton label="Adicionar rede" onClick={() => onChange([...items, { name: "Nova rede", href: "#" }])} />
    </div>
  );
}

function PresentationEditor({ items, onChange }: { items: PresentationSlide[]; onChange: (items: PresentationSlide[]) => void }) {
  return (
    <EditorList title="Slides" addLabel="Adicionar slide" onAdd={() => onChange([...items, { title: "Novo slide", subtitle: "Subtítulo", content: "Conteúdo", icon: "*" }])}>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <RemoveButton onClick={() => onChange(items.filter((_, i) => i !== index))} />
          <Grid>
            <Input label="Título menor" value={item.title} onChange={(title) => onChange(items.map((current, i) => i === index ? { ...current, title } : current))} />
            <Input label="Título principal" value={item.subtitle} onChange={(subtitle) => onChange(items.map((current, i) => i === index ? { ...current, subtitle } : current))} />
            <Input label="Imagem" value={item.image || ""} onChange={(image) => onChange(items.map((current, i) => i === index ? { ...current, image } : current))} />
            <Input label="Ícone fallback" value={item.icon || ""} onChange={(icon) => onChange(items.map((current, i) => i === index ? { ...current, icon } : current))} />
          </Grid>
          <Textarea label="Conteúdo" value={item.content} onChange={(content) => onChange(items.map((current, i) => i === index ? { ...current, content } : current))} />
        </ItemCard>
      ))}
    </EditorList>
  );
}

function EditorList({ title, addLabel, onAdd, children }: { title: string; addLabel: string; onAdd: () => void; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="font-black uppercase text-sm tracking-widest text-gray-400">{title}</h3>
      {children}
      <AddButton label={addLabel} onClick={onAdd} />
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="space-y-2 block">
      <span className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 md:p-5 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
      >
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ImageUpload({ label, onUpload }: { label: string; onUpload: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (typeof data.url === "string") {
        onUpload(data.url);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const inputId = `file-upload-${label.replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      <span className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</span>
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id={inputId} />
      <label
        htmlFor={inputId}
        className={`flex items-center justify-center gap-3 w-full bg-white/5 border border-dashed border-white/10 rounded-2xl p-5 text-gray-400 cursor-pointer hover:bg-white/10 hover:border-primary/50 transition-all ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Upload className="w-5 h-5 text-gray-500" />}
        <span className="text-xs font-black uppercase tracking-widest">{isUploading ? "ENVIANDO..." : "ESCOLHER ARQUIVO"}</span>
      </label>
    </div>
  );
}
