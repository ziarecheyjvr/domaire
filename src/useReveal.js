import { useEffect } from 'react';

// Turn reveals on before first paint, so elements start hidden instead of flashing in and out.
// Skipped for reduced motion — everything simply shows.
export const prepareReveal = () => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('reveal-ready');
};

// Fades [data-reveal] elements up as they enter the viewport. Picks up elements rendered later too.
export default function useReveal() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('reveal-ready')) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    const scan = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}
