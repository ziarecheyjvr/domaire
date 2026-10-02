import { useState } from 'react';
import monogramChalk from '../assets/monogram-chalk.png';
import { CHANGE_OPTS, PLACE_OPTS, WHEN_OPTS } from '../data.js';

// Start a project — a fill-in-the-blanks sentence instead of a form
export default function Enquiry() {
  const [s, setS] = useState({ change: 'the garden', place: 'Marbella', when: 'later this year', name: '', email: '', consent: true, sent: false });
  const [pop, setPop] = useState(null);
  const set = (k, v) => setS(f => ({ ...f, [k]: v }));
  const canSend = s.consent && s.name.trim() && s.email.trim();
  const first = s.name.trim().split(' ')[0];

  const blank = (key, opts) => (
    <span className="blank">
      <button type="button" className="blank-btn" aria-expanded={pop === key} onClick={e => { e.stopPropagation(); setPop(pop === key ? null : key); }}>
        {s[key]}<span className="blank-caret">▾</span>
      </button>
      {pop === key && (
        <span className="blank-pop">
          {opts.map(o => (
            <button key={o} type="button" className={'blank-opt' + (o === s[key] ? ' is-on' : '')} onClick={e => { e.stopPropagation(); set(key, o); setPop(null); }}>{o}</button>
          ))}
        </span>
      )}
    </span>
  );

  return (
    <section id="start" className="start" data-screen-label="10 Enquiry — Sentence">
      <div className="start-inner" onClick={() => pop && setPop(null)}>
        <span className="eyebrow">START A PROJECT · TELL US WHAT YOU WOULD LIKE TO CHANGE</span>
        {!s.sent ? (
          <>
            <div className="sentence">
              <span>I'd like to transform</span>
              {blank('change', CHANGE_OPTS)}
              <span>at my home in</span>
              {blank('place', PLACE_OPTS)}
              <span>, ideally</span>
              {blank('when', WHEN_OPTS)}
              <span>. My name is</span>
              <input className="sentence-input" style={{ width: '6.5em' }} value={s.name} onChange={e => set('name', e.target.value)} placeholder="your name" aria-label="Your name" />
              <span>and you can reach me at</span>
              <input className="sentence-input" style={{ width: '9em' }} value={s.email} onChange={e => set('email', e.target.value)} type="email" placeholder="email or WhatsApp" aria-label="Email or WhatsApp" />
              <span>.</span>
            </div>
            <div className="start-foot">
              <label className="start-consent"><input type="checkbox" checked={s.consent} onChange={() => set('consent', !s.consent)} />I agree to be contacted about my enquiry and to the privacy policy.</label>
              <button type="button" className={'start-send' + (canSend ? ' is-ready' : '')} onClick={() => canSend && set('sent', true)}>Start your project <span className="start-send-arrow">→</span></button>
            </div>
          </>
        ) : (
          <div className="start-thanks">
            <img src={monogramChalk} alt="" />
            <p>Thank you{first ? ', ' + first : ''}. We'll be in touch about {s.change} in {s.place}.</p>
            <button type="button" className="ghost-btn-light" onClick={() => set('sent', false)}>Start another enquiry</button>
          </div>
        )}
      </div>
    </section>
  );
}
