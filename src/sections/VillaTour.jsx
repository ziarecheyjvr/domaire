import { useEffect, useRef, useState } from 'react';
import exteriorBefore from '../assets/garden-0-lawn.webp';
import exteriorAfter from '../assets/garden-3-wellness.webp';
import interiorBefore from '../assets/interior-before.webp';
import interiorAfter from '../assets/interior-after.webp';
import kitchenBefore from '../assets/kitchen-before.webp';
import kitchenAfter from '../assets/kitchen-after.webp';
import { TOUR } from '../data.js';
import { clamp, prog, scrollIn } from '../util.js';
import { useT } from '../i18n.jsx';

// Where the living-room glass doors sit in the exterior shots — the camera pushes in here
const DOOR = '31% 50%';
// How quickly the camera catches up with the scroll position each frame (lower = softer)
const FOLLOW = .07;
const smooth = t => t * t * (3 - 2 * t);
const seg = (p, a, b) => smooth(clamp((p - a) / (b - a), 0, 1));
// A walk through the villa — scroll drives the camera: as it is → outside designed → through the doors → living room → kitchen.
// Progress is eased toward the scroll position every frame and written straight to the DOM, so wheel steps glide instead of jump.
// Every change is a fade or a scale (compositor-only), with long overlapping ranges so the camera never stops between moves.
export default function VillaTour({ w, m, labels }) {
  const all = useT(), t = all.tour;
  const ref = useRef(null);
  const el = useRef({});
  const target = useRef(TOUR[0]), cur = useRef(-1), actRef = useRef(0);
  const [act, setAct] = useState(0);
  const bind = k => node => { el.current[k] = node; };

  useEffect(() => {
    const apply = p => {
      const E = el.current; if (!E.ext) return;
      const settle = seg(p, 0, .12);             // exterior eases out from a close crop
      const design = seg(p, .08, .26);           // lawn dissolves into the designed garden
      const push = seg(p, .24, .5);              // camera pushes in toward the doors…
      const inside = seg(p, .36, .5);            // …and the living room fades in over it
      const living = seg(p, .5, .66);            // living room before → after
      const kitchenIn = seg(p, .68, .82);        // move on to the kitchen
      const kitchen = seg(p, .82, .96);          // kitchen before → after

      E.ext.style.transform = `scale(${((1.1 - .1 * settle) * (1 + .7 * push)).toFixed(4)})`;
      E.ext.style.visibility = inside >= 1 ? 'hidden' : 'visible';
      E.extAfter.style.opacity = design.toFixed(4);
      // Each room keeps drifting forward from the moment it appears, so the move never stops dead
      E.int.style.transform = `scale(${(1.06 + .1 * seg(p, .36, .72)).toFixed(4)})`;
      E.int.style.opacity = inside.toFixed(4);
      E.int.style.visibility = inside <= 0 || kitchenIn >= 1 ? 'hidden' : 'visible';
      E.intAfter.style.opacity = living.toFixed(4);
      E.kit.style.transform = `scale(${(1.06 + .1 * seg(p, .68, 1)).toFixed(4)})`;
      E.kit.style.opacity = kitchenIn.toFixed(4);
      E.kit.style.visibility = kitchenIn <= 0 ? 'hidden' : 'visible';
      E.kitAfter.style.opacity = kitchen.toFixed(4);
      E.fill.style.width = (p * 100).toFixed(2) + '%';

      let a = 0; TOUR.forEach((at, k) => { if (p >= at - .06) a = k; });
      if (a !== actRef.current) { actRef.current = a; setAct(a); }
    };

    let raf, last = performance.now();
    const tick = now => {
      const dt = Math.min(64, now - last); last = now;
      if (m) target.current = prog(ref, window.innerHeight);
      const c = cur.current, t = target.current, d = t - c;
      // Same glide at 60Hz or 120Hz
      const k = 1 - Math.pow(1 - FOLLOW, dt / 16.67);
      const next = c < 0 || !m || Math.abs(d) < .00005 ? t : c + d * k;
      if (next !== c) { cur.current = next; apply(next); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [m]);

  const go = k => m ? scrollIn(ref, window.innerHeight, TOUR[k]) : (target.current = TOUR[k]);

  return (
    <section id="tour" ref={ref} className="tour" data-screen-label="03 A walk through the villa" style={{ height: m ? '700vh' : '100vh' }}>
      <div className="tour-stage">
        <div ref={bind('ext')} className="tour-layer" style={{ transformOrigin: DOOR }}>
          <img src={exteriorBefore} alt={t.alts.extBefore} className="tour-img" />
          <img ref={bind('extAfter')} src={exteriorAfter} alt={t.alts.extAfter} className="tour-img" style={{ opacity: 0 }} />
        </div>
        <div ref={bind('int')} className="tour-layer" style={{ opacity: 0 }}>
          <img src={interiorBefore} alt={t.alts.intBefore} className="tour-img" />
          <img ref={bind('intAfter')} src={interiorAfter} alt={t.alts.intAfter} className="tour-img" style={{ opacity: 0 }} />
        </div>
        <div ref={bind('kit')} className="tour-layer" style={{ opacity: 0 }}>
          <img src={kitchenBefore} alt={t.alts.kitBefore} className="tour-img" />
          <img ref={bind('kitAfter')} src={kitchenAfter} alt={t.alts.kitAfter} className="tour-img" style={{ opacity: 0 }} />
        </div>
        <div className="tour-shade" />

        <div className="tour-top">
          <span className="eyebrow">{t.eyebrow}</span>
          <span className="tour-hint">{m ? t.hintScroll : t.hintTap}</span>
        </div>

        <div className="tour-cap">
          <div className="moments">
            {t.chapters.map(({ k: label, t: caption }, k) => (
              <div key={k} className="moment" style={{ opacity: k === act ? 1 : 0, transform: `translateY(${k === act ? 0 : k < act ? -24 : 24}px)` }}>
                <span className="moment-k">0{k + 1} · {label}</span>
                <span className="moment-t">{caption}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-track"><div ref={bind('fill')} className="timeline-fill" /></div>
          <div className="timeline-stops">
            {t.chapters.map(({ k: label }, k) => (
              <button key={k} type="button" className="timeline-stop" onClick={() => go(k)} style={{ color: k <= act ? '#F6F3EC' : 'rgba(246,243,236,.5)' }}>
                <span className="timeline-time">0{k + 1}</span>
                {w >= 700 && <span className="timeline-k">{label}</span>}
              </button>
            ))}
          </div>
        </div>
        {labels && <span className="tour-concept concept-mark">{all.concept}</span>}
      </div>
    </section>
  );
}
