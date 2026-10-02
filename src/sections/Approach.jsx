import { useRef } from 'react';
import { STEPS } from '../data.js';
import { enter } from '../util.js';

// Our approach — five steps that light up as the section scrolls in
export default function Approach({ vh, m }) {
  const ref = useRef(null);
  const pp = m ? enter(ref, vh, .85, .7) : 1;
  return (
    <section id="approach" ref={ref} className="approach" data-screen-label="08 Approach">
      <div className="approach-inner">
        <div className="approach-head">
          <div className="section-head">
            <span className="eyebrow">OUR APPROACH</span>
            <h2 className="h2">One project.<br /><em>The right people.</em></h2>
          </div>
          <p className="copy approach-copy">Good projects need clear scope, the right specialists, realistic decisions and disciplined delivery.</p>
        </div>
        <div className="steps">
          <div className="steps-track"><div className="steps-fill" style={{ width: (pp * 100).toFixed(1) + '%' }} /></div>
          <div className="steps-grid">
            {STEPS.map(([n, t, d], i) => (
              <div key={n} className={'step' + (pp * 5.4 > i + .4 ? ' is-on' : '')}>
                <span className="step-n">{n}</span>
                <span className="step-t">{t}</span>
                <span className="step-d">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
