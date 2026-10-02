import { useState } from 'react';
import { ADVICE, AREAS } from '../data.js';

// Areas — big area names with a floating image preview that follows the cursor
export default function Areas({ wide }) {
  const [area, setArea] = useState(-1);
  const [pt, setPt] = useState({ x: 0, y: 0 });
  const ad = AREAS[Math.max(0, area)];

  return (
    <section id="areas" className="areas-sec" data-screen-label="09 Areas">
      <div className="areas-head">
        <div className="section-head">
          <span className="eyebrow">AREAS</span>
          <h2 className="areas-h">Selected projects across the western Costa del Sol.</h2>
        </div>
        <p className="copy areas-copy">Each brief is shaped around the actual property — its levels, views, exposure and access — rather than a generic local template.</p>
      </div>
      <div className="area-list"
        onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setPt({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
        onMouseLeave={() => setArea(-1)}>
        {AREAS.map(([name, d], i) => (
          <a key={name} href="#start" className="area-row" onMouseEnter={() => setArea(i)}
            style={{ color: area === i ? '#3F4A3C' : area >= 0 ? 'rgba(35,40,36,.3)' : '#232824' }}>
            <span className="area-n">(0{i + 1})</span>
            <span className="area-name" style={{ fontStyle: area === i ? 'italic' : 'normal', transform: `translateX(${area === i ? 24 : 0}px)` }}>{name}</span>
            <span className="area-d">{d}</span>
          </a>
        ))}
        <div className="area-prev" aria-hidden="true" style={{
          borderRadius: area >= 0 ? 4 : '50%',
          transform: `translate(${Math.round(pt.x + 40)}px,${Math.round(pt.y - 110)}px) scale(${area >= 0 ? 1 : .6})`,
          opacity: area >= 0 && wide ? 1 : 0
        }}>
          <div style={{ backgroundImage: `url(${ad[2]})`, backgroundSize: ad[3], backgroundPosition: ad[4] }} />
        </div>
      </div>
      <div className="advice-row">
        <span className="eyebrow">ADVICE</span>
        {ADVICE.map(v => <a key={v} href="#" className="advice-pill">{v} →</a>)}
      </div>
    </section>
  );
}
