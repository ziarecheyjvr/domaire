import { BETTER_WAYS } from '../data.js';
import { useT } from '../i18n.jsx';

// A better way to live at home — headline and intro, then four ways a home can give more
export default function Statement() {
  const all = useT(), t = all.statement;
  return (
    <section className="statement" data-screen-label="02 A better way to live at home">
      <div className="statement-head">
        <div className="section-head" data-reveal>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="h2"><span className="statement-line">{t.l1}</span><br /><em>{t.l2}</em></h2>
        </div>
        <div className="statement-intro" data-reveal style={{ '--d': '.15s' }}>
          <p className="copy">{t.intro}</p>
          <a href="#compose" className="text-link">{t.link}</a>
        </div>
      </div>
      <div className="ways">
        {BETTER_WAYS.map(([img, size, pos], i) => {
          const w = all.ways[i];
          return (
            <article key={i} className="way" data-reveal style={{ '--d': i * .1 + 's' }}>
              <div className="way-media">
                <div role="img" aria-label={w.t} className="way-img" style={{ backgroundImage: `url(${img})`, backgroundSize: size, backgroundPosition: pos }} />
              </div>
              <span className="way-n">0{i + 1}</span>
              <span className="way-k">{w.k}</span>
              <p className="way-t">{w.t}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
