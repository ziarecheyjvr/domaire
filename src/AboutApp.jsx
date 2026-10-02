import useViewport from './useViewport.js';
import Header from './sections/Header.jsx';
import Lens from './sections/Lens.jsx';
import Footer from './sections/Footer.jsx';

// About page — opens on the interactive lens, then who DOMAIRE are
export default function AboutApp({ motion = true, showConceptLabels = true }) {
  const { w, vh, y } = useViewport();
  const m = motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = { w, vh, m, wide: w >= 1180, labels: showConceptLabels };

  return (
    <div className="page">
      {/* The lens fills the first screen, so the header stays transparent until it scrolls past */}
      <Header dark={y < Math.max(vh, 600) - 70} wide={ctx.wide} />
      <Lens {...ctx} />
      <section className="about" data-screen-label="02 About DOMAIRE">
        <div className="section-head">
          <span className="eyebrow">ABOUT DOMAIRE</span>
          <h1 className="h2">Design, build and renovation —<br /><em>with the outside in mind.</em></h1>
        </div>
        <div className="about-body">
          <p className="about-lede">DOMAIRE designs, builds and renovates homes across Marbella and the Costa del Sol, with a particular specialism in exceptional outdoor spaces.</p>
          <p className="copy">We consider the relationship between house and garden, sunlight and shade, cooking and dining, planting and materials, water, lighting and the way people naturally move through a space.</p>
          <p className="copy">From a new kitchen or bathroom to a complete villa renovation, extension or substantial reconfiguration — managed as one joined-up project, with the right specialists brought together for each brief.</p>
          <a href="/#start" className="pill-cta about-cta">Start a project <span className="pill-cta-arrow">→</span></a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
