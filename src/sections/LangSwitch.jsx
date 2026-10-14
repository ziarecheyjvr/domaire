import { LANGS } from '../content.js';
import { useLang } from '../i18n.jsx';

// EN / ES toggle — short codes in the header, full names in the footer
export default function LangSwitch({ className = '', full = false }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={'lang ' + className} role="group" aria-label={t.header.lang}>
      {LANGS.map(([code, short, name], i) => (
        <span key={code} className="lang-item">
          {i > 0 && <span className="lang-sep" aria-hidden="true">/</span>}
          <button type="button" lang={code} className={'lang-btn' + (lang === code ? ' is-on' : '')} aria-pressed={lang === code} aria-label={name} title={name} onClick={() => setLang(code)}>{full ? name : short}</button>
        </span>
      ))}
    </div>
  );
}
