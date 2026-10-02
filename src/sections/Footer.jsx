import monogramChalk from '../assets/monogram-chalk.png';
import { FOOTER_COLS } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid" data-reveal>
          <div className="footer-brand">
            <img src={monogramChalk} alt="" />
            <p className="footer-motto">Transforming homes.<br />Inside and out.</p>
            <p className="footer-blurb">Design, build and renovation across Marbella and the Costa del Sol, specialising in outdoor transformations and complete villa renovations.</p>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.h} className="footer-col">
              <span className="label">{col.h}</span>
              {col.items.map(i => <a key={i} href="#" className="footer-link">{i}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-base" data-reveal style={{ '--d': '.15s' }}><span>© DOMAIRE · DESIGN · BUILD · RENOVATE</span><span>Privacy · Legal notice · Cookies · Instagram · LinkedIn · English / Español</span></div>
      </div>
    </footer>
  );
}
