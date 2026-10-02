import { useEffect, useRef, useState } from 'react';
import monogramChalk from '../assets/monogram-chalk.png';
import { CHANGE_OPTS, PLACE_OPTS, WHEN_OPTS } from '../data.js';

const MAX_PHOTOS = 10;
const MAX_MB = 15;

// Start a project — a fill-in-the-blanks sentence instead of a form, with optional photos of the space
export default function Enquiry() {
  const [s, setS] = useState({ change: 'the garden', place: 'Marbella', when: 'later this year', name: '', email: '', consent: true, sent: false });
  const [pop, setPop] = useState(null);
  const set = (k, v) => setS(f => ({ ...f, [k]: v }));
  const canSend = s.consent && s.name.trim() && s.email.trim();
  const first = s.name.trim().split(' ')[0];

  // Optional photos of the space — previewed locally until the enquiry is sent
  const [photos, setPhotos] = useState([]);
  const [drag, setDrag] = useState(false);
  const [note, setNote] = useState('');
  const fileRef = useRef(null);
  const photosRef = useRef(photos); photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach(p => URL.revokeObjectURL(p.url)), []);
  const addPhotos = list => {
    const files = [...list].filter(f => f.type.startsWith('image/'));
    const tooBig = files.filter(f => f.size > MAX_MB * 1024 * 1024);
    const ok = files.filter(f => f.size <= MAX_MB * 1024 * 1024).slice(0, Math.max(0, MAX_PHOTOS - photos.length));
    setNote(tooBig.length ? `Skipped ${tooBig.length} over ${MAX_MB}MB.` : files.length > ok.length ? `Up to ${MAX_PHOTOS} photos.` : '');
    setPhotos(p => [...p, ...ok.map(f => ({ id: f.name + f.size + f.lastModified + Math.random(), file: f, url: URL.createObjectURL(f) }))]);
  };
  const removePhoto = id => setPhotos(p => { const x = p.find(q => q.id === id); if (x) URL.revokeObjectURL(x.url); return p.filter(q => q.id !== id); });

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
        <span className="eyebrow" data-reveal>START A PROJECT · TELL US WHAT YOU WOULD LIKE TO CHANGE</span>
        {!s.sent ? (
          <>
            <div className="sentence" data-reveal style={{ '--d': '.1s' }}>
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
            <div className="photos" data-reveal style={{ '--d': '.15s' }}>
              <div className={'photos-drop' + (drag ? ' is-drag' : '')} role="button" tabIndex={0}
                aria-label="Add photos of the space (optional)"
                onClick={() => fileRef.current && fileRef.current.click()}
                onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && fileRef.current) { e.preventDefault(); fileRef.current.click(); } }}
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); addPhotos(e.dataTransfer.files); }}>
                <span className="photos-icon" aria-hidden="true">+</span>
                <span className="photos-copy">
                  <span className="photos-title">Add photos of the space <em>(optional)</em></span>
                  <span className="photos-hint">The garden, terrace or room you'd like to change — drag them here or <span className="photos-browse">browse</span>. Up to {MAX_PHOTOS}, {MAX_MB}MB each.</span>
                </span>
                <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={e => { addPhotos(e.target.files); e.target.value = ''; }} />
              </div>
              {(photos.length > 0 || note) && (
                <div className="photos-list">
                  {photos.map(p => (
                    <span key={p.id} className="photo">
                      <img src={p.url} alt={p.file.name} />
                      <button type="button" className="photo-x" onClick={() => removePhoto(p.id)} aria-label={'Remove ' + p.file.name}>×</button>
                    </span>
                  ))}
                  {note && <span className="photos-note">{note}</span>}
                </div>
              )}
            </div>
            <div className="start-foot" data-reveal style={{ '--d': '.2s' }}>
              <label className="start-consent"><input type="checkbox" checked={s.consent} onChange={() => set('consent', !s.consent)} />I agree to be contacted about my enquiry and to the privacy policy.</label>
              <button type="button" className={'start-send' + (canSend ? ' is-ready' : '')} onClick={() => canSend && set('sent', true)}>Start your project <span className="start-send-arrow">→</span></button>
            </div>
          </>
        ) : (
          <div className="start-thanks" data-reveal>
            <img src={monogramChalk} alt="" />
            <p>Thank you{first ? ', ' + first : ''}. We'll be in touch about {s.change} in {s.place}{photos.length ? ` — and thanks for the ${photos.length === 1 ? 'photo' : photos.length + ' photos'}` : ''}.</p>
            <button type="button" className="ghost-btn-light" onClick={() => set('sent', false)}>Start another enquiry</button>
          </div>
        )}
      </div>
    </section>
  );
}
