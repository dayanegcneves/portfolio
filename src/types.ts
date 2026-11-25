export type Lang = 'pt' | 'en';
export type Theme = 'dark' | 'light';

/** Texto simples ou traduzido */
export type Localized = string | Record<Lang, string>;

/** Ícones desenhados em Icons.tsx */
export type GlyphName = 'check' | 'loop' | 'spark';

export type StackLevel = 'daily' | 'learning' | 'used';

export interface StackItem {
  name: Localized;
  /** caminho do SVG importado ou nome de um ícone desenhado */
  icon: string | GlyphName;
  level: StackLevel;
}

export interface StackGroup {
  id: 'back' | 'front' | 'design' | 'qa' | 'tools';
  title: Record<Lang, string>;
  items: StackItem[];
}

export interface Project {
  title: string;
  type: Record<Lang, string>;
  description: Record<Lang, string>;
  tags: string[];
  image?: string;
  live?: string;
  repo?: string;
}

export interface Profile {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  /** PDFs do currículo na pasta /public, um por idioma */
  cvUrl: Record<Lang, string>;
}

export type ServiceIcon = 'web' | 'api' | 'system' | 'design';

export interface Content {
  nav: Record<'about' | 'stack' | 'exp' | 'services' | 'projects' | 'contact', string>;
  hero: Record<'status' | 'role' | 'lead' | 'ctaContact' | 'ctaCv' | 'location', string>;
  about: {
    kicker: string;
    statement: string;
    body: string[];
    diffs: { title: string; text: string }[];
    stats: { value: number; suffix: string; label: string }[];
  };
  stack: Record<
    'kicker' | 'title' | 'daily' | 'learning' | 'used' | 'legendDaily' | 'legendLearning' | 'legendUsed',
    string
  >;
  exp: {
    kicker: string;
    title: string;
    jobs: {
      company: string;
      role: string;
      period: string;
      phases: string[];
      summary: string;
      bullets: string[];
    }[];
  };
  services: {
    kicker: string;
    title: string;
    items: { icon: ServiceIcon; title: string; text: string }[];
    processTitle: string;
    process: { title: string; text: string }[];
  };
  projects: Record<'kicker' | 'title' | 'emptyTitle' | 'emptyText' | 'emptyCta' | 'live' | 'repo', string>;
  edu: {
    kicker: string;
    title: string;
    items: { title: string; place: string; period: string }[];
  };
  contact: Record<'kicker' | 'title' | 'text' | 'copy' | 'copied' | 'cv', string>;
  ui: Record<'theme' | 'lang' | 'menu' | 'top', string>;
}
