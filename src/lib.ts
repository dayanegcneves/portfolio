import type { Lang, Localized } from './types';

/** localStorage protegido: em alguns navegadores/iframes ele não existe */
export const store = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* sem storage: só não lembra a preferência */
    }
  },
};

export const pick = (value: Localized, lang: Lang): string =>
  typeof value === 'string' ? value : value[lang];
