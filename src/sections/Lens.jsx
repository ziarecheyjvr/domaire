import { useEffect, useRef, useState } from 'react';
import heroBefore from '../assets/hero-before.jpg';
import heroAfter from '../assets/hero-after.jpg';

// See what your garden could be — a lens that reveals the finished garden over the lawn
export default function Lens({ wide, m, labels }) {
  const ref = useRef(null);
  const [full, setFull] = useState(false);
  const [anim, setAnim] = useState(false);
  const lens = useRef({ tx: 62, ty: 68, x: 62, y: 68, last: -1e9 });
  const animT = useRef(null);

  // Eases toward the pointer; drifts across the lawn when idle. Writes CSS vars directly (no re-render).
  useEffect(() => {
    let raf;
    const tick = t => {
      const el = ref.current, L = lens.current;
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          if (t - L.last > 2500 && m) { const s = t / 1000; L.tx = 50 + Math.sin(s * .35) * 26; L.ty = 70 + Math.sin(s * .7) * 8; }
          const k = m ? .08 : 1; L.x += (L.tx - L.x) * k; L.y += (L.ty - L.y) * k;
          el.style.setProperty('--x', L.x.toFixed(2) + '%'); el.style.setProperty('--y', L.y.toFixed(2) + '%');
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(animT.current); };
  }, [m]);

  const set = on => { clearTimeout(animT.current); setFull(on); setAnim(true); animT.current = setTimeout(() => setAnim(false), 950); };
  const onMove = e => { const r = e.currentTarget.getBoundingClientRect(); const L = lens.current; L.tx = (e.clientX - r.left) / r.width * 100; L.ty = (e.clientY - r.top) / r.height * 100; L.last = performance.now(); };

  return (
    <section id="lens" ref={ref} className="lens" data-screen-label="01 Lens — See what your garden could be"
      onPointerMove={onMove} onClick={e => { if (!e.target.closest('a,button')) set(!full); }}
      style={{ '--r': full ? '150vmax' : 'min(24vmin,240px)', cursor: full ? 'zoom-out' : 'crosshair' }}>
      <img src={heroBefore} alt="The villa before: an empty lawn" draggable="false" className="lens-img lens-before" />
      <img src={heroAfter} alt="The villa after: natural stone pool, olive trees and outdoor living" draggable="false" className="lens-img lens-after" style={{ transition: anim ? 'clip-path .9s cubic-bezier(.7,0,.2,1)' : 'none' }} />
      <div className="lens-ring" style={{ opacity: full ? 0 : 1 }}><span>AFTER</span></div>
      <div className="lens-shade" />
      <div className="lens-content">
        <div className="lens-head" data-reveal>
          <span className="eyebrow">THE CONCEPT — MOVE THE LENS</span>
          <h2 className="lens-h">See what your<br /><em>garden could be.</em></h2>
        </div>
        <div className="lens-side" data-reveal style={{ '--d': '.2s' }}>
          <span className="lens-hint"><span className="lens-dot" />{full ? 'THE FINISHED GARDEN' : (wide ? 'MOVE ACROSS THE LAWN' : 'TAP TO REVEAL')}</span>
          <p>The same villa, the same lawn. Look through the lens to see the stone pool, olive trees and terrace the concept brings to it.</p>
          <div className="btn-row">
            <a href="/#start" className="btn-light">Start your project</a>
            <button type="button" className="btn-ghost-light" onClick={e => { e.stopPropagation(); set(!full); }}>{full ? 'Back to the lawn' : 'Reveal the full transformation'}</button>
          </div>
          {labels && <span className="concept-mark lens-concept">AFTER: CONCEPT VISUALISATION</span>}
        </div>
      </div>
    </section>
  );
}
