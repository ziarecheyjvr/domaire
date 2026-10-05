import { useEffect, useRef, useState } from 'react';
import gardenImg from '../assets/garden-3-wellness.webp';

const DELAY_MS = 10000;
const SEEN_KEY = 'domaire-quote-modal-seen';

// sessionStorage can throw (private mode, blocked storage) — the modal still works, it just may reappear
const wasSeen = () => { try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch { return false; } };
const markSeen = () => { try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ } };

// Small invitation that appears once per visit, 10 seconds in, and sends visitors to the Start a project form.
// formHref: '#start' on the home page, '/#start' from other pages.
export default function QuoteModal({ formHref = '#start' }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef(null), btnRef = useRef(null), lastFocus = useRef(null);

  // Open after the delay — unless already seen this visit, or the visitor is already at / in the form
  useEffect(() => {
    if (wasSeen()) return;
    const t = setTimeout(() => {
      const form = document.getElementById('start');
      const r = form && form.getBoundingClientRect();
      const atForm = r && r.top < window.innerHeight && r.bottom > 0;
      const busy = document.activeElement && document.activeElement.closest && document.activeElement.closest('#start');
      if (atForm || busy) return;
      lastFocus.current = document.activeElement;
      markSeen();
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = (restore = true) => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); if (restore && lastFocus.current && lastFocus.current.focus) lastFocus.current.focus({ preventScroll: true }); }, 320);
  };

  // While open: Esc closes, focus stays on the dialog's two controls
  useEffect(() => {
    if (!open) return;
    setTimeout(() => btnRef.current && btnRef.current.focus({ preventScroll: true }), 60);
    const onKey = e => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const els = [...dialogRef.current.querySelectorAll('a[href], button')];
      const a = els[0], b = els[els.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); }
      else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  // On the home page, scroll to the form and put the cursor in its first field
  const goToForm = e => {
    if (formHref.startsWith('#')) {
      e.preventDefault();
      close(false);
      const form = document.getElementById('start');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { const first = form.querySelector('input, select, textarea'); if (first) first.focus({ preventScroll: true }); }, 900);
      }
    }
  };

  return (
    <div className={'qm' + (closing ? ' is-closing' : '')} onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
      <div ref={dialogRef} className="qm-card" role="dialog" aria-modal="true" aria-labelledby="qm-title" aria-describedby="qm-copy">
        <div className="qm-media" aria-hidden="true"><img src={gardenImg} alt="" /></div>
        <div className="qm-body">
          <button type="button" className="qm-x" onClick={() => close()} aria-label="Close">×</button>
          <span className="eyebrow">START A PROJECT</span>
          <h2 id="qm-title" className="qm-title">Thinking about your <em>garden or home?</em></h2>
          <p id="qm-copy" className="copy">Get a quote or book a site visit — tell us what you'd like to change and share photos of the space.</p>
          <div className="qm-actions">
            <a ref={btnRef} href={formHref} className="fsubmit" onClick={goToForm}>Get a quote <span className="fsubmit-arrow">→</span></a>
            <button type="button" className="qm-later" onClick={() => close()}>Maybe later</button>
          </div>
        </div>
      </div>
    </div>
  );
}
