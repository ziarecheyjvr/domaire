import monogramChalk from '../assets/monogram-chalk.png';
import monogramOlive from '../assets/monogram-olive.png';
import { NAV } from '../data.js';
import { useT } from '../i18n.jsx';
import LangSwitch from './LangSwitch.jsx';

export default function Header({ dark, wide }) {
  const t = useT();
  const hdr = dark ? { bg: 'transparent', blur: 0, ink: '#F6F3EC' } : { bg: 'rgba(246,243,236,.92)', blur: 10, ink: '#232824' };
  return (
    <header className="hdr" style={{ '--hdr-ink': hdr.ink, background: hdr.bg, backdropFilter: `blur(${hdr.blur}px)` }}>
      <div className="hdr-inner">
        <a href="/" aria-label={t.header.home} className="brand">
          <span className="brand-mark">
            <img src={monogramChalk} alt="" style={{ opacity: dark ? 1 : 0 }} />
            <img src={monogramOlive} alt="" style={{ opacity: dark ? 0 : 1 }} />
          </span>
          <span className="brand-text">
            <span className="brand-name">DOMΛIRE</span>
            <span className="brand-tag">{t.header.tag}</span>
          </span>
        </a>
        <nav className="nav">
          {wide && NAV.map(([key, href]) => <a key={key} href={href} className="nav-link">{t.nav[key]}</a>)}
          <LangSwitch className="lang--hdr" />
          <a href="/#start" className="nav-cta"><span className="cta-long">{t.header.cta}</span><span className="cta-short">{t.header.ctaShort}</span></a>
        </nav>
      </div>
    </header>
  );
}
