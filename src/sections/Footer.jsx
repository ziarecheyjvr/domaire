import monogramChalk from '../assets/monogram-chalk.png';
import { useT } from '../i18n.jsx';
import LangSwitch from './LangSwitch.jsx';

export default function Footer() {
  const t = useT().footer;
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid" data-reveal>
          <div className="footer-brand">
            <img src={monogramChalk} alt="" />
            <p className="footer-motto">{t.motto1}<br />{t.motto2}</p>
            <p className="footer-blurb">{t.blurb}</p>
          </div>
          {t.cols.map(col => (
            <div key={col.h} className="footer-col">
              <span className="label">{col.h}</span>
              {col.items.map(i => <a key={i} href="#" className="footer-link">{i}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-base" data-reveal style={{ '--d': '.15s' }}>
          <span>{t.base}</span>
          <span className="footer-legal">{t.legal} · <LangSwitch className="lang--foot" full /></span>
        </div>
      </div>
    </footer>
  );
}
