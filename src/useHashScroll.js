import { useEffect } from 'react';

// Arriving from another page with a #section: the section doesn't exist until React renders, so the browser's
// own jump misses it. Jump once rendered, and again as the layout settles — unless the visitor has taken over.
export default function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || id === 'top') return;
    let stopped = false;
    const stop = () => { stopped = true; };
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    events.forEach(e => window.addEventListener(e, stop, { passive: true }));
    const jump = () => { const el = document.getElementById(id); if (el && !stopped) el.scrollIntoView({ behavior: 'instant', block: 'start' }); };
    const timers = [0, 450, 1200].map(ms => setTimeout(jump, ms));
    return () => { timers.forEach(clearTimeout); events.forEach(e => window.removeEventListener(e, stop)); };
  }, []);
}
