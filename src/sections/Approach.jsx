import { useRef } from 'react';
import { useT } from '../i18n.jsx';
import { enter } from '../util.js';

// Our approach — five steps that light up as the section scrolls in
export default function Approach({ vh, m }) {
  const t = useT().approach;
  const ref = useRef(null);
  const pp = m ? enter(ref, vh, .85, .7) : 1;
  return (
    <section id="approach" ref={ref} className="approach" data-screen-label="08 Approach">
      <div className="approach-inner">
        <div className="approach-head" data-reveal>
          <div className="section-head">
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="h2">{t.h1}<br /><em>{t.h2}</em></h2>
          </div>
          <p className="copy approach-copy">{t.body}</p>
        </div>
        <div className="steps">
          <div className="steps-track"><div className="steps-fill" style={{ width: (pp * 100).toFixed(1) + '%' }} /></div>
          <div className="steps-grid">
            {t.steps.map((s, i) => (
              <div key={i} className={'step' + (pp * 5.4 > i + .4 ? ' is-on' : '')}>
                <span className="step-n">0{i + 1}</span>
                <span className="step-t">{s.t}</span>
                <span className="step-d">{s.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
