import { useState } from 'react';
import monogramChalk from '../assets/monogram-chalk.png';
import { TILES, TILE_TO_FORM } from '../data.js';
import { useT } from '../i18n.jsx';

// What we do · compose your project — pick elements, see the specialists it takes
export default function Compose({ onContinue }) {
  const all = useT(), t = all.compose;
  const [sel, setSel] = useState(['pool', 'planting', 'okitchen']);
  const toggle = id => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const chosen = TILES.filter(d => sel.includes(d[0]));
  const specs = []; chosen.forEach(d => d[5].forEach(s => { if (!specs.includes(s)) specs.push(s); }));
  const hasIn = chosen.some(d => d[1] === 'in'), hasOut = chosen.some(d => d[1] === 'out');
  const summaryLine = !chosen.length ? t.none : hasIn && hasOut ? t.both : t.summary(specs.length, hasOut);
  const label = d => all.tiles[d[0]];

  const renderTile = d => {
    const on = sel.includes(d[0]);
    return (
      <button key={d[0]} className={'tile' + (on ? ' is-on' : '')} onClick={() => toggle(d[0])} aria-pressed={on}>
        <span className="tile-media">
          <span role="img" aria-label={label(d)} className="tile-img" style={{ backgroundImage: `url(${d[2]})`, backgroundSize: d[3], backgroundPosition: d[4], filter: (d[6] ? d[6] + ' ' : '') + (on ? 'none' : 'saturate(.55)') }} />
          <span className="tile-check">{on ? '✓' : '+'}</span>
        </span>
        <span className="tile-label">{label(d)}</span>
      </button>
    );
  };

  return (
    <section id="compose" className="compose" data-screen-label="07 Compose your project">
      <div className="compose-main">
        <div className="section-head" data-reveal>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="h2">{t.h1}<br /><em>{t.h2}</em></h2>
          <p className="copy compose-copy">{t.body}</p>
        </div>
        <div className="tile-group" data-reveal style={{ '--d': '.1s' }}>
          <span className="label">{t.outside}</span>
          <div className="tile-grid">{TILES.filter(d => d[1] === 'out').map(renderTile)}</div>
        </div>
        <div className="tile-group" data-reveal>
          <span className="label">{t.inside}</span>
          <div className="tile-grid">{TILES.filter(d => d[1] === 'in').map(renderTile)}</div>
        </div>
      </div>
      <aside className="brief" data-reveal style={{ '--d': '.2s' }}>
        <div className="brief-head">
          <span className="label label--stone">{t.yourProject}</span>
          <img src={monogramChalk} alt="" />
        </div>
        <div className="brief-count-row">
          <span className="brief-count">{String(chosen.length).padStart(2, '0')}</span>
          <span className="brief-word">{chosen.length === 1 ? t.element : t.elements}</span>
        </div>
        <div className="chips">
          {chosen.map(d => <button key={d[0]} className="chip chip--outline" onClick={() => toggle(d[0])}>{label(d)} <span className="chip-x">×</span></button>)}
          {!chosen.length && <span className="brief-empty">{t.empty}</span>}
        </div>
        <div className="brief-specs">
          <span className="label label--stone">{t.specialists} · {specs.length}</span>
          <div className="chips">{specs.map(s => <span key={s} className="spec">{all.specs[s]}</span>)}</div>
        </div>
        <p className="brief-summary">{summaryLine}</p>
        <a href="#start" className="pill-cta" onClick={() => onContinue && onContinue(chosen.map(d => TILE_TO_FORM[d[0]]).filter(Boolean))}>{t.cta} <span className="pill-cta-arrow">→</span></a>
      </aside>
    </section>
  );
}
