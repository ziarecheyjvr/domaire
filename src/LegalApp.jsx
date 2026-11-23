import useViewport from './useViewport.js';
import useReveal from './useReveal.js';
import Header from './sections/Header.jsx';
import Footer from './sections/Footer.jsx';
import { COMPANY } from './site.js';
import { LEGAL } from './legal.js';
import { useLang } from './i18n.jsx';

// Privacy policy, legal notice and cookies — page: 'privacy' | 'legal' | 'cookies'
export default function LegalApp({ page }) {
  const { w } = useViewport();
  const { lang } = useLang();
  useReveal();
  const L = LEGAL[lang], doc = L[page];

  // Fill {tokens} from COMPANY; missing ones show as a highlighted placeholder
  const fill = s => s.split(/(\{\w+\})/).map((part, i) => {
    const key = (part.match(/^\{(\w+)\}$/) || [])[1];
    if (!key) return part;
    const v = COMPANY[key], text = v && typeof v === 'object' ? v[lang] : v;
    return text || <mark key={i} className="legal-todo">[{L.labels[key]}]</mark>;
  });

  return (
    <div className="page">
      <Header dark={false} wide={w >= 1180} />
      <main className="legal">
        <a href="/" className="text-link">{L.back}</a>
        <span className="eyebrow">{L.eyebrow}</span>
        <h1 className="h2">{doc.title}</h1>
        <p className="legal-date">{L.updated}</p>
        {doc.sections.map(([h, paras, list, after]) => (
          <section key={h}>
            <h2>{h}</h2>
            {paras.map(p => <p key={p}>{fill(p)}</p>)}
            {list && <ul>{list.map(i => <li key={i}>{fill(i)}</li>)}</ul>}
            {after && <p>{fill(after)}</p>}
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
