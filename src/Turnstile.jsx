import { useEffect, useRef } from 'react';

const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let loading;
const load = () => loading || (loading = new Promise((res, rej) => {
  if (window.turnstile) return res(window.turnstile);
  const s = document.createElement('script');
  s.src = SRC; s.async = true;
  s.onload = () => res(window.turnstile);
  s.onerror = () => { loading = null; s.remove(); rej(new Error('turnstile')); };
  document.head.appendChild(s);
}));

// Cloudflare Turnstile captcha. Only loaded once the form comes near the screen. Tokens are single-use:
// change resetKey to get a fresh one after a failed send.
export default function Turnstile({ siteKey, lang, resetKey, onToken }) {
  const ref = useRef(null), cb = useRef(onToken);
  cb.current = onToken;
  useEffect(() => {
    const el = ref.current;
    if (!siteKey || !el) return;
    let id = null, gone = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      load().then(ts => {
        if (gone) return;
        id = ts.render(el, {
          sitekey: siteKey, language: lang, theme: 'light', size: 'flexible',
          callback: t => cb.current(t), 'expired-callback': () => cb.current(''), 'error-callback': () => { cb.current(''); return true; }
        });
      }).catch(() => cb.current(''));
    }, { rootMargin: '600px' });
    io.observe(el);
    return () => { gone = true; io.disconnect(); cb.current(''); if (id !== null && window.turnstile) window.turnstile.remove(id); };
  }, [siteKey, lang, resetKey]);
  return <div ref={ref} className="fcaptcha" />;
}
