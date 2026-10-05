import { BETTER_WAYS } from '../data.js';

// A better way to live at home — headline and intro, then four ways a home can give more
export default function Statement() {
  return (
    <section className="statement" data-screen-label="02 A better way to live at home">
      <div className="statement-head">
        <div className="section-head" data-reveal>
          <span className="eyebrow">A BETTER WAY TO LIVE AT HOME</span>
          <h2 className="h2"><span className="statement-line">A home can already be beautiful</span><br /><em>and still have more to give.</em></h2>
        </div>
        <div className="statement-intro" data-reveal style={{ '--d': '.15s' }}>
          <p className="copy">Outdoor is what makes us memorable. When the transformation moves inside, the same team carries it through — managed as one joined-up project.</p>
          <a href="#compose" className="text-link">Compose your project ↓</a>
        </div>
      </div>
      <div className="ways">
        {BETTER_WAYS.map(([k, t, img, size, pos], i) => (
          <article key={k} className="way" data-reveal style={{ '--d': i * .1 + 's' }}>
            <div className="way-media">
              <div role="img" aria-label={t} className="way-img" style={{ backgroundImage: `url(${img})`, backgroundSize: size, backgroundPosition: pos }} />
            </div>
            <span className="way-n">0{i + 1}</span>
            <span className="way-k">{k}</span>
            <p className="way-t">{t}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
