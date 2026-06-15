import type { ContentConfig } from "@/types/content";

export const defaultContent: ContentConfig = {
  schema_version: 2,
  whatsapp: "5521999999999",
  group_vip: "https://chat.whatsapp.com/CODIGO_DO_GRUPO",
  admin: {
    password: "DinaoSkull@2026",
  },
  navbar: {
    cta_text: "QUERO COMPRAR",
    mobile_cta_text: "COMPRAR AGORA",
    links: [
      { name: "Início", href: "#inicio" },
      { name: "Benefícios", href: "#beneficios" },
      { name: "Ingredientes", href: "#ingredientes" },
      { name: "Resultados", href: "#resultados" },
      { name: "Depoimentos", href: "#depoimentos" },
      { name: "FAQ", href: "#faq" },
    ],
  },
  hero: {
    badge: "Ultra Concentrado 1000mg",
    title: "QUEIME GORDURA COMO NUNCA ANTES",
    subtitle: "Termogênico ultra concentrado com 30 cápsulas de 1000mg. Acelera sua rotina, ajuda no controle do apetite e entrega energia para treinar melhor.",
    cta_primary: "QUERO EMAGRECER AGORA",
    cta_secondary: "CONHECER MAIS",
    image: "/pote_preto.jpg",
    logo: "/logo.png",
    image_alt: "Dinão Skull Thermo",
    formula_badge: "FÓRMULA ULTRA CONCENTRADA",
    quick_benefits: [
      { text: "Metabolismo Turbo" },
      { text: "Energia Explosiva" },
      { text: "Queima Real" },
      { text: "Foco Total" },
    ],
  },
  problem_solution: {
    title: "Cansado de suplementos que não funcionam?",
    problem_heading: "O cenário atual:",
    problems: [
      "Treina duro mas não vê resultados",
      "Metabolismo lento e travado",
      "Falta de energia durante o dia",
      "Gordura teimosa que não sai",
    ],
    quote: "Você não precisa de mais um placebo. Você precisa de potência real.",
    solution_title: "A solução Dinão Skull:",
    solution_text: "Nossa fórmula foi desenhada para quem atingiu o platô e precisa de um choque térmico no metabolismo. Ultra concentração para resultados visíveis.",
    highlights: [
      { label: "1000mg", text: "de potência em cada cápsula" },
      { label: "30 Dias", text: "de rotina intensa com acompanhamento" },
    ],
    cta_heading: "Chegou a hora de conhecer o Dinão Skull Thermo",
    cta_text: "QUERO TRANSFORMAR MEU CORPO",
  },
  benefits: {
    title: "POR QUE ESCOLHER DINÃO SKULL THERMO?",
    subtitle: "Desenvolvido para pessoas que buscam rotina, energia e constância com uma fórmula concentrada.",
    cta_text: "COMEÇAR MINHA TRANSFORMAÇÃO",
    items: [
      { title: "Termogênese Potente", description: "Ajuda a aumentar a queima calórica diária dentro de uma rotina equilibrada." },
      { title: "Energia e Foco", description: "Cafeína concentrada para treinos mais intensos, produtividade e foco mental." },
      { title: "Efeito Diurético", description: "Ajuda a reduzir retenção de líquidos e sensação de inchaço." },
      { title: "Controle de Apetite", description: "Apoia uma rotina alimentar mais controlada e consistente." },
      { title: "Fórmula Científica", description: "Ingredientes selecionados com dosagem concentrada de 1000mg." },
      { title: "Natural e Seguro", description: "Produto desenvolvido para complementar hábitos saudáveis." },
    ],
  },
  ingredients: {
    title: "FÓRMULA ULTRA CONCENTRADA",
    subtitle: "Transparência total: saiba exatamente o que você está colocando no seu corpo. Cada mg conta.",
    active_badge_value: "100%",
    active_badge_label: "Ingredientes Ativos",
    cta_text: "QUERO ESSA POTÊNCIA NO MEU TREINO",
    items: [
      { name: "Cafeína", dose: "250mg", benefits: ["Estimulante natural", "Aumenta energia e foco", "Acelera metabolismo"] },
      { name: "Hibiscus", dose: "300mg", benefits: ["Poderoso diurético", "Elimina toxinas", "Reduz inchaço"] },
      { name: "Cromo", dose: "500mcg", benefits: ["Regula glicemia", "Reduz compulsão por doces", "Melhora metabolismo"] },
      { name: "Yohimbe", dose: "5mg", benefits: ["Queima localizada", "Aumenta performance", "Vasodilatador natural"] },
      { name: "Taraxacum", dose: "300mg", benefits: ["Desintoxica o fígado", "Efeito diurético", "Melhora digestão"] },
      { name: "L-Carnitina", dose: "300mg", benefits: ["Potencializa queima", "Preserva massa magra", "Aumenta resistência"] },
    ],
  },
  how_it_works: {
    title: "TRANSFORME SEU CORPO EM 3 PASSOS SIMPLES",
    cta_text: "COMEÇAR MINHA TRANSFORMAÇÃO AGORA",
    steps: [
      { title: "1. Tome 1 cápsula ao dia", text: "De preferência pela manhã ou 30-40 minutos antes do seu treino para máxima absorção." },
      { title: "2. Sinta a energia", text: "O efeito termogênico ativa rapidamente, aumentando seu foco e disposição para o dia." },
      { title: "3. Veja os resultados", text: "Queima de gordura potencializada e definição muscular aparente em poucas semanas." },
    ],
  },
  results: {
    title: "RESULTADOS REAIS",
    subtitle: "Pessoas que já transformaram suas rotinas com o Dinão Skull Thermo.",
    placeholder_text: "Resultado Real",
    cta_text: "QUERO ESSES RESULTADOS TAMBÉM",
    items: [
      { name: "Carlos S.", time: "60 dias", loss: "-8kg", text: "Minha disposição mudou completamente. Recomendo!", image: "" },
      { name: "Ana P.", time: "45 dias", loss: "-6kg", text: "Finalmente um termogênico que não me dá tremedeira.", image: "" },
      { name: "Ricardo M.", time: "90 dias", loss: "-12kg", text: "A definição muscular apareceu de verdade agora.", image: "" },
    ],
  },
  testimonials: {
    title: "O QUE NOSSOS CLIENTES DIZEM",
    verified_label: "Compra Verificada",
    items: [
      { name: "Rodrigo Oliveira", city: "São Paulo, SP", text: "O Dinão Skull foi o divisor de águas no meu cutting.", rating: 5 },
      { name: "Juliana Santos", city: "Rio de Janeiro, RJ", text: "Realmente ajudou na minha rotina e no controle da vontade de doces.", rating: 5 },
    ],
  },
  faq: {
    title: "DÚVIDAS FREQUENTES",
    subtitle: "Tudo o que você precisa saber antes de começar sua jornada.",
    items: [
      { q: "Como devo tomar?", a: "1 cápsula ao dia pela manhã ou antes do treino." },
      { q: "É aprovado pela ANVISA?", a: "Dispensado de registro conforme RDC 240/2018." },
      { q: "Preciso treinar?", a: "O produto funciona melhor combinado com alimentação equilibrada, treino e hidratação." },
    ],
  },
  final_cta: {
    title_before: "PRONTO PARA",
    title_highlight: "TRANSFORMAR",
    title_after: "SEU CORPO?",
    text: "Não deixe para amanhã a rotina que você pode começar hoje. Fale com nossa equipe e veja a melhor oferta disponível.",
    vip_cta: "GRUPO VIP WHATSAPP",
    urgency_badge: "Últimas unidades disponíveis",
    trust_items: [
      { icon: "shield", text: "Compra Segura" },
      { icon: "truck", text: "Entrega Rápida" },
      { icon: "star", text: "Clientes Satisfeitos" },
    ],
  },
  footer: {
    brand_text: "Dinão Skull Thermo é o suplemento ultra concentrado para quem busca energia, foco e constância. Performance sem limites.",
    navigation_title: "Navegação",
    support_title: "Suporte",
    social_title: "Siga-nos",
    support_links: [
      { name: "Termos de Uso", href: "#" },
      { name: "Privacidade", href: "#" },
      { name: "Dúvidas Frequentes", href: "#faq" },
    ],
    social_links: [
      { name: "Instagram", href: "#" },
      { name: "Facebook", href: "#" },
      { name: "TikTok", href: "#" },
    ],
    copyright: "Copyright © 2026 DINÃO SKULL. Todos os direitos reservados.",
    disclaimer: "DISCLAIMER: Este produto não é um medicamento. Não substitui uma alimentação equilibrada.",
    product_image: "/pote_preto.jpg",
  },
  lead_popup: {
    step1_title: "QUASE LÁ!",
    step1_text: "Preencha os dados abaixo para falar com um especialista no WhatsApp.",
    fields: {
      name: "Seu nome completo",
      email: "Seu melhor e-mail",
      phone: "WhatsApp (com DDD)",
    },
    next_button: "PROSSEGUIR",
    step2_title: "VOCÊ QUER MESMO",
    step2_highlight: "PERDER PESO?",
    motivations: [
      "SIM, quero emagrecer rápido!",
      "QUERO transformar meu corpo agora",
      "PRECISO de mais energia e foco",
      "CHEGA de promessas, quero resultados",
    ],
    step3_title: "TUDO PRONTO!",
    step3_text: "Clique no botão abaixo para ser redirecionado ao WhatsApp e garantir sua oferta exclusiva.",
    submit_button: "FALAR COM ESPECIALISTA AGORA",
    whatsapp_message: "Olá! Meu nome é {name}. Gostaria de mais informações sobre o Dinão Skull Thermo. Meu objetivo é: {motivation}.",
  },
  presentation: {
    brand: "DINÃO SKULL",
    keyboard_hint: "Use as setas do teclado para navegar",
    slides: [
      { title: "DINÃO SKULL THERMO", subtitle: "A Nova Era da Queima de Gordura", content: "Fórmula ultra concentrada de 1000mg em cápsulas.", image: "/pote_preto.png" },
      { title: "O PROBLEMA", subtitle: "Platô de Emagrecimento", content: "Metabolismo lento, falta de energia e gordura localizada que não sai com dietas comuns.", icon: "!" },
      { title: "A SOLUÇÃO", subtitle: "Termogênese Ativa", content: "Combinação de ingredientes poderosos para apoiar energia, foco e rotina.", image: "/pote_preto.png" },
      { title: "BENEFÍCIOS CHAVE", subtitle: "Potência em cada mg", content: "Energia, foco mental, apoio ao controle de apetite e redução de inchaço.", icon: "*" },
      { title: "INGREDIENTES", subtitle: "Transparência Total", content: "Cafeína, Hibisco, Cromo, Yohimbe, Taraxacum e L-Carnitina.", icon: "+" },
      { title: "COMO USAR", subtitle: "Simplicidade e Eficácia", content: "Apenas 1 cápsula ao dia, preferencialmente pela manhã ou antes do treino.", icon: "1" },
      { title: "OFERTA ESPECIAL", subtitle: "Comece Hoje", content: "Fale com nossa equipe e veja a melhor condição para iniciar sua jornada.", image: "/pote_preto.png" },
    ],
  },
};

export function mergeContent(content: Partial<ContentConfig> | null | undefined): ContentConfig {
  return deepMerge(defaultContent, content ?? {}) as ContentConfig;
}

function deepMerge(target: unknown, source: unknown): unknown {
  if (Array.isArray(target)) {
    return Array.isArray(source) ? source : target;
  }

  if (isRecord(target)) {
    const result: Record<string, unknown> = { ...target };
    if (!isRecord(source)) return result;

    for (const key of Object.keys(source)) {
      result[key] = key in result ? deepMerge(result[key], source[key]) : source[key];
    }

    return result;
  }

  return source ?? target;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
