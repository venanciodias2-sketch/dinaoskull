"use client";

import { useState, useEffect } from "react";
import { 
  Save, Loader2, LogIn, LayoutDashboard, 
  Type, Image as ImageIcon, Link as LinkIcon, 
  List, ShieldCheck, Zap, MessageSquare, 
  HelpCircle, Home, LogOut, Plus, Trash2, Lock,
  ChevronRight, ArrowRight, XCircle as XCircleIcon, Upload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (content && password === content.admin.password) {
      setIsLoggedIn(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        alert("Alterações salvas com sucesso!");
      } else {
        alert("Erro ao salvar");
      }
    } catch (error) {
      alert("Erro na conexão");
    }
    setIsSaving(false);
  };

  const addItem = (section: string, defaultItem: any) => {
    const newContent = { ...content };
    if (!newContent[section].items) newContent[section].items = [];
    newContent[section].items.push(defaultItem);
    setContent(newContent);
  };

  const removeItem = (section: string, index: number) => {
    const newContent = { ...content };
    newContent[section].items.splice(index, 1);
    setContent(newContent);
  };

  const updateItem = (section: string, index: number, field: string, value: any) => {
    const newContent = { ...content };
    newContent[section].items[index][field] = value;
    setContent(newContent);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="glass-card p-10 w-full max-w-md border border-white/5">
          <div className="flex justify-center mb-8">
             <div className="relative w-20 h-20">
                <Image 
                  src={content?.hero?.logo || "/logo.png"} 
                  alt="Logo" 
                  fill 
                  className="object-contain"
                />
             </div>
          </div>
          <h1 className="text-3xl font-black text-center mb-2 uppercase font-display">Painel Admin</h1>
          <p className="text-gray-500 text-center mb-8 text-sm">Acesse para editar o Dinão Skull Thermo</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Senha de Segurança</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white focus:border-primary outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full btn-primary py-5 text-lg font-bold">
              <LogIn className="w-5 h-5" />
              ENTRAR NO SISTEMA
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Capa & Hero", icon: <Home className="w-4 h-4" /> },
    { id: "benefits", label: "Benefícios", icon: <Zap className="w-4 h-4" /> },
    { id: "ingredients", label: "Ingredientes", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: "process", label: "Processo", icon: <ChevronRight className="w-4 h-4" /> },
    { id: "results", label: "Resultados", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "testimonials", label: "Depoimentos", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "faq", label: "Dúvidas", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "config", label: "Global", icon: <LinkIcon className="w-4 h-4" /> },
    { id: "security", label: "Segurança", icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-sans selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-black/40 backdrop-blur-xl border-r border-white/5 p-8 space-y-10 flex-shrink-0 flex flex-col">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 bg-white/5 rounded-xl border border-white/10 p-2 shadow-inner">
            <Image 
              src={content?.hero?.logo || "/logo.png"} 
              alt="Logo" 
              fill 
              className="object-contain p-2"
            />
          </div>
          <div>
            <h2 className="font-black uppercase tracking-tighter text-lg leading-none">Dinão Skull</h2>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">SISTEMA DE GESTÃO</p>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4 px-4">Menu de Edição</div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 active:scale-[0.98] group ${
                activeTab === tab.id 
                ? "bg-primary text-white font-bold shadow-[0_10px_20px_-10px_rgba(255,0,0,0.5)] ring-1 ring-white/20" 
                : "text-gray-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`transition-colors ${activeTab === tab.id ? "text-white" : "text-gray-600 group-hover:text-primary"}`}>
                  {tab.icon}
                </div>
                <span className="text-sm tracking-tight">{tab.label}</span>
              </div>
              {activeTab === tab.id && <motion.div layoutId="active" className="w-1 h-4 bg-white/50 rounded-full" />}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Modo Editor</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Conectado</p>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 transition-all rounded-xl hover:bg-red-500/5 active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-tight">Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-16 overflow-y-auto max-h-screen custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Edição Ativa</span>
                <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">/ {tabs.find(t => t.id === activeTab)?.label}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase font-display tracking-tighter mb-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-gray-500 text-sm font-medium">As alterações refletem instantaneamente no site após salvar.</p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-[0_15px_30px_-10px_rgba(255,0,0,0.5)] transition-all hover:translate-y-[-2px] hover:shadow-[0_20px_40px_-10px_rgba(255,0,0,0.6)] active:scale-[0.95] disabled:opacity-50 disabled:translate-y-0"
            >
              {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              SALVAR ALTERAÇÕES
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 pb-32"
            >
              {activeTab === "hero" && (
                <div className="space-y-8">
                  <SectionHeader title="Conteúdo da Hero" icon={<Home />} />
                  <div className="grid grid-cols-1 gap-6">
                    <div className="glass-card p-10 space-y-8 border border-white/5 ring-1 ring-white/5 bg-white/[0.02]">
                      <Input 
                        label="Headline Principal" 
                        value={content.hero.title} 
                        onChange={(v: string) => setContent({ ...content, hero: { ...content.hero, title: v } })}
                        placeholder="Ex: QUEIME GORDURA COMO NUNCA"
                      />
                      <Textarea 
                        label="Subheadline" 
                        value={content.hero.subtitle} 
                        onChange={(v: string) => setContent({ ...content, hero: { ...content.hero, subtitle: v } })}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Texto Botão Primário" value={content.hero.cta_primary} onChange={(v: string) => setContent({ ...content, hero: { ...content.hero, cta_primary: v } })} />
                        <Input label="Texto Botão Secundário" value={content.hero.cta_secondary} onChange={(v: string) => setContent({ ...content, hero: { ...content.hero, cta_secondary: v } })} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                        <div className="space-y-4">
                          <Input label="URL da Imagem do Produto" value={content.hero.image} onChange={(v: string) => setContent({ ...content, hero: { ...content.hero, image: v } })} icon={<ImageIcon className="w-4 h-4" />} />
                          <ImageUpload 
                            label="Upload do Produto" 
                            onUpload={(url: string) => setContent({ ...content, hero: { ...content.hero, image: url } })} 
                          />
                        </div>
                        <div className="space-y-4">
                          <Input label="URL da Logo" value={content.hero.logo || ""} onChange={(v: string) => setContent({ ...content, hero: { ...content.hero, logo: v } })} icon={<LinkIcon className="w-4 h-4" />} />
                          <ImageUpload 
                            label="Upload da Logo" 
                            onUpload={(url: string) => setContent({ ...content, hero: { ...content.hero, logo: url } })} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="space-y-8">
                  <SectionHeader title="Seção de Benefícios" icon={<Zap />} />
                  <div className="glass-card p-10 space-y-8 border border-white/5 mb-8 bg-white/[0.02]">
                    <Input label="Título da Seção" value={content.benefits.title} onChange={(v: string) => setContent({ ...content, benefits: { ...content.benefits, title: v } })} />
                    <Textarea label="Descrição de Apoio" value={content.benefits.subtitle} onChange={(v: string) => setContent({ ...content, benefits: { ...content.benefits, subtitle: v } })} />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {content.benefits.items.map((item: any, idx: number) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={idx} 
                        className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl flex flex-col gap-6 relative group ring-1 ring-white/5"
                      >
                        <button 
                          onClick={() => removeItem("benefits", idx)} 
                          className="absolute top-6 right-6 text-gray-600 hover:text-red-500 p-2 bg-white/5 rounded-lg transition-all active:scale-90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-xs">{idx + 1}</div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Item de Benefício</span>
                        </div>
                        <Input label="Título do Card" value={item.title} onChange={(v: string) => updateItem("benefits", idx, "title", v)} />
                        <Textarea label="Descrição Detalhada" value={item.description} onChange={(v: string) => updateItem("benefits", idx, "description", v)} />
                      </motion.div>
                    ))}
                    <button 
                      onClick={() => addItem("benefits", { title: "Novo Benefício", description: "Descrição aqui..." })}
                      className="p-10 border-2 border-dashed border-white/10 rounded-3xl text-gray-600 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 active:scale-[0.99] group"
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Plus className="w-6 h-6" />
                      </div>
                      <span className="font-black uppercase tracking-widest text-xs">Adicionar Novo Benefício</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div className="space-y-8">
                  <SectionHeader title="Ingredientes & Dosagens" icon={<ShieldCheck />} />
                  <div className="grid grid-cols-1 gap-6">
                    {content.ingredients.items.map((item: any, idx: number) => (
                      <div key={idx} className="glass-card p-10 relative ring-1 ring-white/5 bg-white/[0.02]">
                        <button onClick={() => removeItem("ingredients", idx)} className="absolute top-6 right-6 text-gray-600 hover:text-red-500 p-2 bg-white/5 rounded-lg active:scale-90"><Trash2 className="w-4 h-4" /></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <Input label="Nome Científico / Comum" value={item.name} onChange={(v: string) => updateItem("ingredients", idx, "name", v)} />
                          <Input label="Dosagem (Ex: 500mg)" value={item.dose} onChange={(v: string) => updateItem("ingredients", idx, "dose", v)} />
                        </div>
                        <Input label="Benefícios (separar por vírgula)" value={item.benefits.join(", ")} onChange={(v: string) => updateItem("ingredients", idx, "benefits", v.split(",").map((s: string) => s.trim()))} />
                        <p className="mt-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest italic">* Os ícones são atribuídos automaticamente baseados no nome.</p>
                      </div>
                    ))}
                    <button onClick={() => addItem("ingredients", { name: "Novo Ingrediente", dose: "100mg", benefits: [] })} className="p-8 border-2 border-dashed border-white/10 rounded-3xl text-gray-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs">
                      <Plus className="w-4 h-4" /> NOVO INGREDIENTE
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "process" && (
                <div className="space-y-8">
                  <SectionHeader title="Como Funciona" icon={<ChevronRight />} />
                  <div className="glass-card p-10 space-y-8 ring-1 ring-white/5 bg-white/[0.02]">
                    <Input label="Título do Processo" value={content.how_it_works.title} onChange={(v: string) => setContent({ ...content, how_it_works: { ...content.how_it_works, title: v } })} />
                    {content.how_it_works.steps.map((step: any, idx: number) => (
                      <div key={idx} className="bg-white/5 p-6 rounded-2xl space-y-4">
                        <Input label={`Passo ${idx + 1} - Título`} value={step.title} onChange={(v: string) => {
                          const steps = [...content.how_it_works.steps];
                          steps[idx].title = v;
                          setContent({ ...content, how_it_works: { ...content.how_it_works, steps } });
                        }} />
                        <Textarea label={`Passo ${idx + 1} - Descrição`} value={step.text} onChange={(v: string) => {
                          const steps = [...content.how_it_works.steps];
                          steps[idx].text = v;
                          setContent({ ...content, how_it_works: { ...content.how_it_works, steps } });
                        }} />
                      </div>
                    ))}
                  </div>

                  <SectionHeader title="Problema & Solução" icon={<XCircleIcon />} />
                  <div className="glass-card p-10 space-y-8 ring-1 ring-white/5 bg-white/[0.02]">
                    <Input label="Título da Seção" value={content.problem_solution.title} onChange={(v: string) => setContent({ ...content, problem_solution: { ...content.problem_solution, title: v } })} />
                    <Input label="Subtítulo / Solução" value={content.problem_solution.solution_title} onChange={(v: string) => setContent({ ...content, problem_solution: { ...content.problem_solution, solution_title: v } })} />
                    <Textarea label="Texto da Solução" value={content.problem_solution.solution_text} onChange={(v: string) => setContent({ ...content, problem_solution: { ...content.problem_solution, solution_text: v } })} />
                    
                    <div className="space-y-4">
                       <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Problemas (um por linha)</label>
                       <textarea 
                         value={content.problem_solution.problems.join("\n")}
                         onChange={(e) => setContent({ ...content, problem_solution: { ...content.problem_solution, problems: e.target.value.split("\n") } })}
                         className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white h-32 resize-none text-sm font-medium ring-1 ring-white/5"
                       />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "testimonials" && (
                <div className="space-y-8">
                  <SectionHeader title="Depoimentos de Clientes" icon={<MessageSquare />} />
                  <div className="glass-card p-10 space-y-8 ring-1 ring-white/5 bg-white/[0.02] mb-8">
                     <Input label="Título da Seção" value={content.testimonials.title} onChange={(v: string) => setContent({ ...content, testimonials: { ...content.testimonials, title: v } })} />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {content.testimonials.items.map((item: any, idx: number) => (
                      <div key={idx} className="glass-card p-10 relative space-y-6 ring-1 ring-white/5 bg-white/[0.02]">
                        <button onClick={() => removeItem("testimonials", idx)} className="absolute top-6 right-6 text-gray-600 hover:text-red-500 p-2 bg-white/5 rounded-lg active:scale-90"><Trash2 className="w-4 h-4" /></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input label="Nome do Cliente" value={item.name} onChange={(v: string) => updateItem("testimonials", idx, "name", v)} />
                          <Input label="Cidade/Estado" value={item.city} onChange={(v: string) => updateItem("testimonials", idx, "city", v)} />
                        </div>
                        <Textarea label="Depoimento" value={item.text} onChange={(v: string) => updateItem("testimonials", idx, "text", v)} />
                        <Input label="Nota (1-5)" value={item.rating.toString()} onChange={(v: string) => updateItem("testimonials", idx, "rating", parseInt(v) || 5)} />
                      </div>
                    ))}
                    <button onClick={() => addItem("testimonials", { name: "Novo Cliente", city: "Cidade, UF", text: "", rating: 5 })} className="p-8 border-2 border-dashed border-white/10 rounded-3xl text-gray-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs">
                      <Plus className="w-4 h-4" /> ADICIONAR DEPOIMENTO
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "results" && (
                <div className="space-y-8">
                  <SectionHeader title="Prova Social (Antes e Depois)" icon={<ImageIcon />} />
                  <div className="grid grid-cols-1 gap-6">
                    {content.results.items.map((item: any, idx: number) => (
                      <div key={idx} className="glass-card p-10 relative space-y-8 ring-1 ring-white/5 bg-white/[0.02]">
                        <button onClick={() => removeItem("results", idx)} className="absolute top-6 right-6 text-gray-600 hover:text-red-500 p-2 bg-white/5 rounded-lg active:scale-90"><Trash2 className="w-4 h-4" /></button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Input label="Nome do Cliente" value={item.name} onChange={(v: string) => updateItem("results", idx, "name", v)} />
                          <Input label="Tempo de Uso" value={item.time} onChange={(v: string) => updateItem("results", idx, "time", v)} />
                          <Input label="Peso Eliminado" value={item.loss} onChange={(v: string) => updateItem("results", idx, "loss", v)} />
                        </div>
                        <Textarea label="Relato Curto" value={item.text} onChange={(v: string) => updateItem("results", idx, "text", v)} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                           <Input label="URL da Imagem de Resultado" value={item.image || ""} onChange={(v: string) => updateItem("results", idx, "image", v)} />
                           <ImageUpload 
                             label="Upload de Foto" 
                             onUpload={(url: string) => updateItem("results", idx, "image", url)} 
                           />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addItem("results", { name: "Nome", time: "30 dias", loss: "-5kg", text: "" })} className="p-8 border-2 border-dashed border-white/10 rounded-3xl text-gray-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs">
                      <Plus className="w-4 h-4" /> ADICIONAR CASO DE SUCESSO
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "faq" && (
                <div className="space-y-8">
                  <SectionHeader title="Central de Dúvidas" icon={<HelpCircle />} />
                  <div className="space-y-6">
                    {content.faq.items.map((item: any, idx: number) => (
                      <div key={idx} className="glass-card p-8 relative ring-1 ring-white/5 bg-white/[0.02]">
                        <button onClick={() => removeItem("faq", idx)} className="absolute top-6 right-6 text-gray-600 hover:text-red-500 p-2 bg-white/5 rounded-lg active:scale-90"><Trash2 className="w-4 h-4" /></button>
                        <Input label="Pergunta do Cliente" value={item.q} onChange={(v: string) => updateItem("faq", idx, "q", v)} className="mb-6" />
                        <Textarea label="Resposta do Especialista" value={item.a} onChange={(v: string) => updateItem("faq", idx, "a", v)} />
                      </div>
                    ))}
                    <button onClick={() => addItem("faq", { q: "Pergunta?", a: "Resposta..." })} className="p-8 border-2 border-dashed border-white/10 rounded-3xl text-gray-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs">
                      <Plus className="w-4 h-4" /> ADICIONAR PERGUNTA
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "config" && (
                <div className="space-y-8">
                  <SectionHeader title="Configurações Globais" icon={<LinkIcon />} />
                  <div className="glass-card p-10 space-y-10 ring-1 ring-white/5 bg-white/[0.02]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Input label="WhatsApp de Vendas (Ex: 5511999999999)" value={content.whatsapp} onChange={(v: string) => setContent({ ...content, whatsapp: v })} icon={<MessageSquare className="w-4 h-4" />} />
                      <Input label="Link Grupo VIP (Opcional)" value={content.group_vip} onChange={(v: string) => setContent({ ...content, group_vip: v })} icon={<LinkIcon className="w-4 h-4" />} />
                    </div>
                    <div className="pt-8 border-t border-white/5 space-y-8">
                      <Input label="Rodapé - Copyright" value={content.footer.copyright} onChange={(v: string) => setContent({ ...content, footer: { ...content.footer, copyright: v } })} />
                      <Textarea label="Rodapé - Aviso Legal" value={content.footer.disclaimer} onChange={(v: string) => setContent({ ...content, footer: { ...content.footer, disclaimer: v } })} />
                      <div className="pt-8 border-t border-white/5 space-y-6">
                        <SectionHeader title="Foto de Fechamento (Final CTA)" icon={<ImageIcon />} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                           <Input label="URL da Imagem" value={content.footer.product_image || ""} onChange={(v: string) => setContent({ ...content, footer: { ...content.footer, product_image: v } })} />
                           <ImageUpload 
                             label="Upload de Foto" 
                             onUpload={(url: string) => setContent({ ...content, footer: { ...content.footer, product_image: url } })} 
                           />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8">
                  <SectionHeader title="Segurança do Painel" icon={<Lock />} />
                  <div className="glass-card p-10 space-y-10 ring-1 ring-white/5 bg-white/[0.02]">
                    <div className="max-w-md">
                       <Input 
                         label="Nova Senha de Acesso" 
                         value={content.admin.password} 
                         onChange={(v: string) => setContent({ ...content, admin: { ...content.admin, password: v } })} 
                         icon={<Lock className="w-4 h-4" />}
                         placeholder="Digite a nova senha"
                       />
                       <p className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                         * A senha é necessária para entrar neste painel. <br />
                         Certifique-se de salvar antes de sair.
                       </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function ImageUpload({ label, onUpload }: { label: string, onUpload: (url: string) => void }) {
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
      if (data.url) {
        onUpload(data.url);
        alert("Upload concluído!");
      } else {
        alert("Erro no upload: " + (data.error || "Desconhecido"));
      }
    } catch (error) {
      alert("Erro na conexão com o servidor de upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">{label}</label>
      <div className="relative group">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`file-upload-${label.replace(/\s+/g, "-")}`}
        />
        <label
          htmlFor={`file-upload-${label.replace(/\s+/g, "-")}`}
          className={`flex items-center justify-center gap-3 w-full bg-white/5 border border-dashed border-white/10 rounded-2xl p-5 text-gray-400 cursor-pointer hover:bg-white/10 hover:border-primary/50 transition-all ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isUploading ? (
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          ) : (
            <Upload className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
          )}
          <span className="text-xs font-black uppercase tracking-widest">
            {isUploading ? "ENVIANDO..." : "ESCOLHER ARQUIVO"}
          </span>
        </label>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10 shadow-inner group-hover:bg-primary/10 transition-colors ring-1 ring-white/5">
        {icon}
      </div>
      <h2 className="text-2xl font-black uppercase tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{title}</h2>
    </div>
  );
}

function Input({ label, value, onChange, className = "", placeholder = "", icon }: any) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 px-1">
        {icon && <span className="text-primary">{icon}</span>}
        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</label>
      </div>
      <div className="relative group">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium ring-1 ring-white/5"
        />
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-white/10 transition-all" />
      </div>
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</label>
      </div>
      <div className="relative group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium h-40 resize-none leading-relaxed ring-1 ring-white/5"
        />
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-white/10 transition-all" />
      </div>
    </div>
  );
}
