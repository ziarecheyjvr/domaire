import { useRef } from 'react';
import livingAfter from '../assets/interior-after.webp';
import { STATEMENT, STATEMENT_IMAGES } from '../data.js';
import { clamp, ease, enter } from '../util.js';

// A better way to live at home — split layout: a tall photograph beside the statement, whose image pills open on scroll
export default function Statement({ vh, m, labels }) {
  const ref = useRef(null);
  const sp = m ? enter(ref, vh, .9, .55) : 1;
  let imgIdx = 0;
  const tokens = STATEMENT.split(' ').map(t => {
    const mm = t.match(/^\[(\w+)\]$/);
    if (mm) { const d = STATEMENT_IMAGES[mm[1]], q = clamp(sp * 1.6 - (imgIdx++) * .14, 0, 1); return { img: d[0], size: d[1], pos: d[2], alt: d[3], w: (ease(q) * 1.9).toFixed(3) + 'em' }; }
    return { t: t.replace(/\*/g, ''), it: t.startsWith('*') };
  });

  // Gentle parallax on the photograph as the section passes through the viewport
  const el = ref.current, r = el ? el.getBoundingClientRect() : null;
  const drift = m && r ? clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1) * -28 : 0;

  return (
    <section ref={ref} className="statement" data-screen-label="02 Statement">
      <figure className="statement-media" data-reveal>
        <img src={livingAfter} alt="A renovated living room opening fully onto the garden terrace" style={{ transform: `translateY(${drift.toFixed(1)}px)` }} />
        {labels && <figcaption className="concept-mark">CONCEPT VISUALISATION</figcaption>}
      </figure>
      <div className="statement-body">
        <span className="eyebrow" data-reveal>A BETTER WAY TO LIVE AT HOME</span>
        <p className="statement-text" data-reveal style={{ '--d': '.1s' }}>
          {tokens.map((tk, i) => tk.img
            ? <span key={i} role="img" aria-label={tk.alt} className="statement-img" style={{ width: tk.w, backgroundImage: `url(${tk.img})`, backgroundSize: tk.size, backgroundPosition: tk.pos }} />
            : <span key={i} className={tk.it ? 'statement-em' : undefined}>{tk.t}</span>)}
        </p>
        <div className="statement-foot" data-reveal style={{ '--d': '.2s' }}>
          <p className="copy statement-lede">Outdoor is what makes us memorable. When the transformation moves inside, the same team carries it through — managed as one joined-up project.</p>
          <a href="#compose" className="text-link">Compose your project ↓</a>
        </div>
      </div>
    </section>
  );
}
