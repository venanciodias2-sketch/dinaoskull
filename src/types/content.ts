export type NavLink = {
  name: string;
  href: string;
};

export type TextItem = {
  text: string;
};

export type LabelTextItem = {
  label: string;
  text: string;
};

export type BenefitItem = {
  title: string;
  description: string;
};

export type IngredientItem = {
  name: string;
  dose: string;
  benefits: string[];
};

export type StepItem = {
  title: string;
  text: string;
};

export type ResultItem = {
  name: string;
  time: string;
  loss: string;
  text: string;
  image?: string;
};

export type TestimonialItem = {
  name: string;
  city: string;
  text: string;
  rating: number;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type TrustItem = {
  icon: "shield" | "truck" | "star";
  text: string;
};

export type SocialLink = {
  name: string;
  href: string;
};

export type LeadFieldPlaceholders = {
  name: string;
  email: string;
  phone: string;
};

export type PresentationSlide = {
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  icon?: string;
};

export type ContentConfig = {
  schema_version: number;
  whatsapp: string;
  group_vip: string;
  admin: {
    password: string;
  };
  navbar: {
    cta_text: string;
    mobile_cta_text: string;
    links: NavLink[];
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
    image: string;
    logo: string;
    favicon: string;
    image_alt: string;
    formula_badge: string;
    quick_benefits: TextItem[];
  };
  problem_solution: {
    title: string;
    problem_heading: string;
    problems: string[];
    quote: string;
    solution_title: string;
    solution_text: string;
    highlights: LabelTextItem[];
    cta_heading: string;
    cta_text: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    cta_text: string;
    items: BenefitItem[];
  };
  ingredients: {
    title: string;
    subtitle: string;
    active_badge_value: string;
    active_badge_label: string;
    cta_text: string;
    items: IngredientItem[];
  };
  how_it_works: {
    title: string;
    cta_text: string;
    steps: StepItem[];
  };
  results: {
    title: string;
    subtitle: string;
    placeholder_text: string;
    cta_text: string;
    items: ResultItem[];
  };
  testimonials: {
    title: string;
    verified_label: string;
    items: TestimonialItem[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  final_cta: {
    title_before: string;
    title_highlight: string;
    title_after: string;
    text: string;
    vip_cta: string;
    urgency_badge: string;
    trust_items: TrustItem[];
  };
  footer: {
    brand_text: string;
    navigation_title: string;
    support_title: string;
    social_title: string;
    support_links: NavLink[];
    social_links: SocialLink[];
    copyright: string;
    disclaimer: string;
    product_image: string;
  };
  lead_popup: {
    step1_title: string;
    step1_text: string;
    fields: LeadFieldPlaceholders;
    next_button: string;
    step2_title: string;
    step2_highlight: string;
    motivations: string[];
    step3_title: string;
    step3_text: string;
    submit_button: string;
    whatsapp_message: string;
  };
  presentation: {
    brand: string;
    keyboard_hint: string;
    slides: PresentationSlide[];
  };
};
