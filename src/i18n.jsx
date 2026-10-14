import { createContext, useContext, useEffect, useState } from 'react';
import { CONTENT } from './content.js';

const KEY = 'domaire-lang';
const LangContext = createContext({ lang: 'en', setLang: () => {}, t: CONTENT.en });

// ?lang=es in the URL wins, then the visitor's last choice, then their browser language
const initialLang = () => {
  try { const q = new URLSearchParams(window.location.search).get('lang'); if (q && CONTENT[q]) return q; } catch { /* ignore */ }
  try { const saved = localStorage.getItem(KEY); if (saved && CONTENT[saved]) return saved; } catch { /* storage blocked */ }
  return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
};

// page: 'home' | 'about' — picks the document title
export function LangProvider({ page = 'home', children }) {
  const [lang, setLangState] = useState(initialLang);
  const t = CONTENT[lang];

  const setLang = l => {
    if (!CONTENT[l]) return;
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* per-visitor convenience only */ }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = page === 'about' ? t.meta.aboutTitle : t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.meta.description);
  }, [lang, page, t]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;
