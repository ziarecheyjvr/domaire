import monogramChalk from '../assets/monogram-chalk.png';
import { SOCIAL } from '../site.js';
import { useT } from '../i18n.jsx';
import LangSwitch from './LangSwitch.jsx';

// Where each footer link goes, in the same order as content.footer.cols
const HREFS = [
  ['/#tour', '/#compose', '/#compose', '/#compose'],
  ['/#compose', '/#compose', '/#compose', '/#compose'],
  ['/#start', '/#start', '/#start', '/#start']
];

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
          {t.cols.map((col, c) => (
            <div key={col.h} className="footer-col">
              <span className="label">{col.h}</span>
              {col.items.map((i, n) => <a key={i} href={HREFS[c][n]} className="footer-link">{i}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-base" data-reveal style={{ '--d': '.15s' }}>
          <span>{t.base}</span>
          <span className="footer-legal">
            {Object.entries(t.legal).map(([k, label]) => <span key={k}><a href={`/${k}/`}>{label}</a> · </span>)}
            {Object.entries(SOCIAL).filter(([, url]) => url).map(([name, url]) => <span key={name}><a href={url} target="_blank" rel="noopener">{name}</a> · </span>)}
            <LangSwitch className="lang--foot" full /></span>
        </div>
      </div>
    </footer>
  );
}
