import { useEffect, useReducer, useState } from 'react';

// Window size + scroll position, shared by every page.
// Sections measure their refs during render, so re-render once they exist and again after fonts settle.
export default function useViewport() {
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, vh: window.innerHeight }));
  const [y, setY] = useState(() => window.scrollY);
  const [, forceUpdate] = useReducer(n => n + 1, 0);

  useEffect(() => {
    let raf = null;
    const onR = () => setVp({ w: window.innerWidth, vh: window.innerHeight });
    const onS = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = null; setY(window.scrollY); }); };
    window.addEventListener('resize', onR); window.addEventListener('scroll', onS, { passive: true });
    forceUpdate();
    const t = setTimeout(forceUpdate, 300);
    return () => { window.removeEventListener('resize', onR); window.removeEventListener('scroll', onS); cancelAnimationFrame(raf); clearTimeout(t); };
  }, []);

  return { ...vp, y };
}
