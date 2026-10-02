export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const ease = t => 1 - Math.pow(1 - t, 3);
export const lerp = (a, b, t) => a + (b - a) * t;
export const fmt = h => { let hh = Math.floor(h), mm = Math.round((h - hh) * 12) * 5; if (mm === 60) { hh++; mm = 0; } return String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0'); };

// Progress through a tall sticky section (0 at its top, 1 when its end reaches the viewport bottom)
export const prog = (ref, vh) => { const el = ref.current; if (!el) return 0; const r = el.getBoundingClientRect(); const run = r.height - vh; return run > 0 ? clamp(-r.top / run, 0, 1) : 0; };
// Progress of a section entering the viewport
export const enter = (ref, vh, a, b) => { const el = ref.current; if (!el) return 0; const top = el.getBoundingClientRect().top; return clamp((vh * a - top) / (vh * b), 0, 1); };
// Scroll so a sticky section sits at progress p
export const scrollIn = (ref, vh, p) => { const el = ref.current; if (!el) return; const top = el.getBoundingClientRect().top + window.scrollY; window.scrollTo({ top: top + p * (el.offsetHeight - vh), behavior: 'smooth' }); };
