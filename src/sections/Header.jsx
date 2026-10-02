import monogramChalk from '../assets/monogram-chalk.png';
import monogramOlive from '../assets/monogram-olive.png';
import { NAV } from '../data.js';

export default function Header({ dark, wide }) {
  const hdr = dark ? { bg: 'transparent', blur: 0, ink: '#F6F3EC' } : { bg: 'rgba(246,243,236,.92)', blur: 10, ink: '#232824' };
  return (
    <header className="hdr" style={{ '--hdr-ink': hdr.ink, background: hdr.bg, backdropFilter: `blur(${hdr.blur}px)` }}>
      <div className="hdr-inner">
        <a href="/" aria-label="DOMAIRE home" className="brand">
          <span className="brand-mark">
            <img src={monogramChalk} alt="" style={{ opacity: dark ? 1 : 0 }} />
            <img src={monogramOlive} alt="" style={{ opacity: dark ? 0 : 1 }} />
          </span>
          <span className="brand-text">
            <span className="brand-name">DOMΛIRE</span>
            <span className="brand-tag">DESIGN · BUILD · RENOVATE</span>
          </span>
        </a>
        <nav className="nav">
          {wide && NAV.map(([n, href]) => <a key={n} href={href} className="nav-link">{n}</a>)}
          <a href="/#start" className="nav-cta">Start a project</a>
        </nav>
      </div>
    </header>
  );
}
