import { useState } from 'react';
import monogramChalk from '../assets/monogram-chalk.png';
import { NUM, TILES } from '../data.js';

// What we do · compose your project — pick elements, see the specialists it takes
export default function Compose() {
  const [sel, setSel] = useState(['pool', 'planting', 'okitchen']);
  const toggle = id => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const chosen = TILES.filter(d => sel.includes(d[0]));
  const specs = []; chosen.forEach(d => d[6].forEach(s => { if (!specs.includes(s)) specs.push(s); }));
  const hasIn = chosen.some(d => d[1] === 'in'), hasOut = chosen.some(d => d[1] === 'out');
  const summaryLine = !chosen.length ? 'Pick what you would like to change — inside, outside, or both.'
    : hasIn && hasOut ? 'Inside and out, as one joined-up project — one team, one programme.'
    : NUM[specs.length] + ' specialists, one ' + (hasOut ? 'outdoor idea' : 'renovation') + '. We coordinate all of them.';

  const renderTile = d => {
    const on = sel.includes(d[0]);
    return (
      <button key={d[0]} className={'tile' + (on ? ' is-on' : '')} onClick={() => toggle(d[0])} aria-pressed={on}>
        <span className="tile-media">
          <span role="img" aria-label={d[2]} className="tile-img" style={{ backgroundImage: `url(${d[3]})`, backgroundSize: d[4], backgroundPosition: d[5], filter: (d[7] ? d[7] + ' ' : '') + (on ? 'none' : 'saturate(.55)') }} />
          <span className="tile-check">{on ? '✓' : '+'}</span>
        </span>
        <span className="tile-label">{d[2]}</span>
      </button>
    );
  };

  return (
    <section id="compose" className="compose" data-screen-label="07 Compose your project">
      <div className="compose-main">
        <div className="section-head">
          <span className="eyebrow">WHAT WE DO · COMPOSE YOUR PROJECT</span>
          <h2 className="h2">Choose what you'd like<br /><em>to change.</em></h2>
          <p className="copy compose-copy">Outdoor is what we're known for. When the work moves inside, the same team carries it through. Select anything — we'll show you who it takes.</p>
        </div>
        <div className="tile-group">
          <span className="label">OUTSIDE</span>
          <div className="tile-grid">{TILES.filter(d => d[1] === 'out').map(renderTile)}</div>
        </div>
        <div className="tile-group">
          <span className="label">INSIDE</span>
          <div className="tile-grid">{TILES.filter(d => d[1] === 'in').map(renderTile)}</div>
        </div>
      </div>
      <aside className="brief">
        <div className="brief-head">
          <span className="label label--stone">YOUR PROJECT</span>
          <img src={monogramChalk} alt="" />
        </div>
        <div className="brief-count-row">
          <span className="brief-count">{String(chosen.length).padStart(2, '0')}</span>
          <span className="brief-word">{chosen.length === 1 ? 'element' : 'elements'}</span>
        </div>
        <div className="chips">
          {chosen.map(d => <button key={d[0]} className="chip chip--outline" onClick={() => toggle(d[0])}>{d[2]} <span className="chip-x">×</span></button>)}
          {!chosen.length && <span className="brief-empty">Nothing selected yet.</span>}
        </div>
        <div className="brief-specs">
          <span className="label label--stone">SPECIALISTS WE BRING TOGETHER · {specs.length}</span>
          <div className="chips">{specs.map(s => <span key={s} className="spec">{s}</span>)}</div>
        </div>
        <p className="brief-summary">{summaryLine}</p>
        <a href="#start" className="pill-cta">Continue with this brief <span className="pill-cta-arrow">→</span></a>
      </aside>
    </section>
  );
}
