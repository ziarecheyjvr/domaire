import { useEffect, useRef, useState } from 'react';
import villaBefore from '../assets/villa-before.png';
import { AFTER, CHANGES } from '../data.js';
import { clamp } from '../util.js';

const SLIDE = 'clip-path 1.3s cubic-bezier(.6,0,.2,1),left 1.3s cubic-bezier(.6,0,.2,1)';

// Featured concept · drag to compare — before/after slider with a one-time demo sweep
export default function Compare({ vh, y, m, labels }) {
  const secRef = useRef(null), baRef = useRef(null);
  const [ba, setBa] = useState(50);
  const [drag, setDrag] = useState(false);
  const [anim, setAnim] = useState(false);
  const [mode, setMode] = useState('compare');
  const demoed = useRef(false), timers = useRef([]);

  const stopDemo = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => stopDemo, []);

  // When the section comes into view, sweep the handle once to show it can be dragged
  useEffect(() => {
    if (demoed.current || !m) return;
    const el = secRef.current; if (!el || el.getBoundingClientRect().top > vh * .45) return;
    demoed.current = true; setAnim(true); setBa(82);
    timers.current = [
      setTimeout(() => setBa(18), 1400),
      setTimeout(() => setBa(50), 2800),
      setTimeout(() => setAnim(false), 4100)
    ];
  }, [y, vh, m]);

  const setFrom = e => { const el = baRef.current; if (!el) return; const r = el.getBoundingClientRect(); stopDemo(); setAnim(false); setMode('compare'); setBa(clamp((e.clientX - r.left) / r.width * 100, 1, 99)); };
  const split = mode === 'before' ? 100 : mode === 'after' ? 0 : ba;
  const tr = anim || (!drag && mode !== 'compare') ? SLIDE : 'none';

  return (
    <section id="work" ref={secRef} className="compare" data-screen-label="06 Featured concept — Drag to compare">
      <div className="compare-head" data-reveal>
        <div className="section-head">
          <span className="eyebrow">FEATURED CONCEPT · DRAG TO COMPARE</span>
          <h2 className="h2">From a lawn to<br /><em>a way of living.</em></h2>
        </div>
        <div className="compare-side">
          <p className="copy">The house was already beautiful. The garden gave it very little back. The concept brings pool, stone terrace, planting, shade and an outdoor kitchen together as one outside space — one complete idea.</p>
          <div className="seg">
            {[['BEFORE', 'before'], ['COMPARE', 'compare'], ['AFTER', 'after']].map(([label, k]) => (
              <button key={k} className={'seg-btn' + (mode === k ? ' is-on' : '')} onClick={() => { stopDemo(); setMode(k); setAnim(true); setBa(50); }}>{label}</button>
            ))}
          </div>
        </div>
      </div>
      <div ref={baRef} className="ba" data-reveal style={{ '--d': '.1s' }}
        onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); setDrag(true); setFrom(e); }}
        onPointerMove={e => { if (drag) setFrom(e); }}
        onPointerUp={() => setDrag(false)} onPointerCancel={() => setDrag(false)}>
        <img src={AFTER} alt="After: natural stone pool, planting, loungers and outdoor kitchen" draggable="false" />
        <div className="ba-before" style={{ clipPath: `inset(0 ${(100 - split).toFixed(2)}% 0 0)`, transition: tr }}>
          <img src={villaBefore} alt="Before: the same villa with an open lawn" draggable="false" />
        </div>
        <span className="ba-pill ba-pill--b" style={{ opacity: split > 8 ? 1 : 0 }}>BEFORE</span>
        <span className="ba-pill ba-pill--a" style={{ opacity: split < 92 ? 1 : 0 }}>AFTER</span>
        <div className="ba-line" style={{ left: split.toFixed(2) + '%', transition: tr }}>
          <div className="ba-knob"><span>←</span><span>→</span></div>
        </div>
        {labels && <span className="ba-concept concept-mark">CONCEPT VISUALISATION — NOT A COMPLETED PROJECT</span>}
      </div>
      <div className="changes" data-reveal style={{ '--d': '.15s' }}>
        {CHANGES.map(([n, t, d]) => (
          <div key={n} className="change" style={{ opacity: split > 96 ? .35 : 1 }}>
            <span className="change-n">+ {n}</span>
            <span className="change-t">{t}</span>
            <span className="change-d">{d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
