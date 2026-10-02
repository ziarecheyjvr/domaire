import { useRef, useState } from 'react';
import villaNight from '../assets/villa-night.webp';
import { AFTER, MOMENTS, SKY } from '../data.js';
import { clamp, ease, fmt, lerp, prog, scrollIn } from '../util.js';

// Scroll through the day — the garden's light changes from first light to after dark
export default function DayAtVilla({ w, vh, m, labels }) {
  const ref = useRef(null);
  const [manualT, setManualT] = useState(0);

  const hp = m ? prog(ref, vh) : manualT;
  const tt = clamp((hp - .08) / .92, 0, 1), hour = 7 + tt * 15.5;
  let k = 0; while (k < SKY.length - 2 && hour > SKY[k + 1][0]) k++;
  const A = SKY[k], B = SKY[k + 1], f = clamp((hour - A[0]) / (B[0] - A[0]), 0, 1), v = i => lerp(A[i], B[i], f);
  const sky = {
    filter: 'brightness(' + v(1).toFixed(3) + ') saturate(' + v(2).toFixed(3) + ') sepia(' + v(3).toFixed(3) + ')',
    tint: 'rgb(' + [4, 5, 6].map(i => Math.round(v(i))).join(',') + ')',
    glow: v(8),
    zoom: (1.08 - .08 * hp).toFixed(4)
  };
  // The lit night photograph crossfades in on the way into After Dark
  const night = ease(clamp((hour - 20.4) / 1.2, 0, 1));
  const tp = h => .08 + ((h - 7) / 15.5) * .92;
  let act = 0; MOMENTS.forEach((mo, i) => { if (hour >= mo[0] - 1.2) act = i; });
  const capIn = m ? clamp((hp - .04) / .08, 0, 1) : 1;
  const goMoment = h => m ? scrollIn(ref, vh, tp(h)) : setManualT(tp(h));
  const dayFrac = clamp((hour - 7) / 13.5, 0, 1), ang = Math.PI * (1 - dayFrac);
  const warm = hour < 9 || hour > 17.5;
  const sun = {
    left: (50 + 50 * Math.cos(ang)).toFixed(2) + '%',
    top: (100 - 100 * Math.sin(ang)).toFixed(2) + '%',
    background: warm ? '#E7A57E' : '#FFF4DE',
    boxShadow: '0 0 24px 6px ' + (warm ? 'rgba(231,165,126,.6)' : 'rgba(255,240,210,.6)'),
    opacity: hour > 20.5 ? 0 : 1
  };

  return (
    <section id="day" ref={ref} className="day" data-screen-label="05 A day at the villa" style={{ height: m ? '440vh' : '100vh' }}>
      <div className="day-stage">
        <img src={AFTER} alt="Concept: Mediterranean villa garden with natural stone pool, planting and outdoor kitchen" className="day-layer day-img" style={{ filter: sky.filter, transform: `scale(${sky.zoom})` }} />
        <div className="day-layer day-tint" style={{ background: sky.tint }} />
        <div className="day-layer day-glow" style={{ opacity: (sky.glow * (1 - night)).toFixed(3) }} />
        <img src={villaNight} alt="" aria-hidden="true" className="day-layer day-img" style={{ opacity: night.toFixed(3), transform: `scale(${sky.zoom})` }} />
        <div className="day-layer day-shade" />
        <div className="day-layer day-shade-night" style={{ opacity: night.toFixed(3) }} />

        {m && (
          <div className="day-title" style={{ opacity: (1 - clamp(hp / .07, 0, 1)).toFixed(3), transform: `translateY(${Math.round(-hp * 400)}px)` }}>
            <span className="eyebrow">A DAY AT THE VILLA · SCROLL THROUGH THE DAY</span>
            <h2 className="day-h">From first light<br /><em>to after dark.</em></h2>
          </div>
        )}

        <div className="day-cap" style={{ opacity: capIn.toFixed(3), pointerEvents: capIn > .5 ? 'auto' : 'none' }}>
          <div className="moments">
            {MOMENTS.map(([, label, caption], i) => (
              <div key={label} className="moment" style={{ opacity: i === act ? 1 : 0, transform: `translateY(${i === act ? 0 : i < act ? -24 : 24}px)` }}>
                <span className="moment-k">{label}</span>
                <span className="moment-t">{caption}</span>
              </div>
            ))}
          </div>
          <div className="dial-wrap">
            <div className="dial">
              <div className="dial-arc" />
              <div className="dial-sun" style={sun} />
              <div className="dial-horizon" />
            </div>
            <div className="clock">
              <span className="clock-time">{fmt(hour)}</span>
              <span className="clock-phase">{MOMENTS[act][1]}</span>
            </div>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-track"><div className="timeline-fill" style={{ width: (tt * 100).toFixed(2) + '%' }} /></div>
          <div className="timeline-stops">
            {MOMENTS.map(([h, label], i) => (
              <button key={label} className="timeline-stop" onClick={() => goMoment(h)} style={{ color: i <= act && capIn > .5 ? '#F6F3EC' : 'rgba(246,243,236,.5)' }}>
                <span className="timeline-time">{fmt(h)}</span>
                {w >= 700 && <span className="timeline-k">{label}</span>}
              </button>
            ))}
          </div>
        </div>
        {labels && <span className="day-concept concept-mark">CONCEPT VISUALISATION · {m ? 'SCROLL THROUGH THE DAY' : 'TAP A TIME'}</span>}
      </div>
    </section>
  );
}
