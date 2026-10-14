import useViewport from './useViewport.js';
import useReveal from './useReveal.js';
import Header from './sections/Header.jsx';
import Lens from './sections/Lens.jsx';
import Footer from './sections/Footer.jsx';
import QuoteModal from './sections/QuoteModal.jsx';
import { useT } from './i18n.jsx';

// About page — opens on the interactive lens, then who DOMAIRE are
export default function AboutApp({ motion = true, showConceptLabels = true }) {
  const t = useT().about;
  const { w, vh, y } = useViewport();
  useReveal();
  const m = motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = { w, vh, m, wide: w >= 1180, labels: showConceptLabels };

  return (
    <div className="page">
      {/* The lens fills the first screen, so the header stays transparent until it scrolls past */}
      <Header dark={y < Math.max(vh, 600) - 70} wide={ctx.wide} />
      <Lens {...ctx} />
      <section className="about" data-screen-label="02 About DOMAIRE">
        <div className="section-head" data-reveal>
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 className="h2">{t.h1}<br /><em>{t.h2}</em></h1>
        </div>
        <div className="about-body" data-reveal style={{ '--d': '.15s' }}>
          <p className="about-lede">{t.lede}</p>
          <p className="copy">{t.p1}</p>
          <p className="copy">{t.p2}</p>
          <a href="/#start" className="pill-cta about-cta">{t.cta} <span className="pill-cta-arrow">→</span></a>
        </div>
      </section>
      <Footer />
      <QuoteModal formHref="/#start" />
    </div>
  );
}
