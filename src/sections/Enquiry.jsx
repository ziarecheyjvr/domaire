import { useEffect, useRef, useState } from 'react';
import monogramChalk from '../assets/monogram-chalk.png';
import { BUDGET_OPTS, CHANGE_OPTS, PLACE_OPTS, WHEN_OPTS } from '../data.js';

const MAX_FILES = 10;
const MAX_MB = 15;
const ACCEPT = 'image/*,application/pdf';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', phone: '', place: '', work: [], budget: '', when: '', message: '', consent: false };

const sizeLabel = b => b > 1024 * 1024 ? (b / 1024 / 1024).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';

// Start a project — enquiry form with an upload for photos, inspiration or plans of what they want done.
// Fields carry name attributes so the form can be pointed at a form service or API as-is.
export default function Enquiry() {
  const [f, setF] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k, v) => setF(s => ({ ...s, [k]: v }));
  const touch = k => setTouched(t => ({ ...t, [k]: true }));
  const toggleWork = o => setF(s => ({ ...s, work: s.work.includes(o) ? s.work.filter(x => x !== o) : [...s.work, o] }));

  const errors = {
    name: !f.name.trim() ? 'Please enter your name.' : '',
    email: !f.email.trim() ? 'Please enter your email.' : !EMAIL.test(f.email.trim()) ? 'Please enter a valid email address.' : '',
    work: !f.work.length ? 'Choose at least one area.' : '',
    message: !f.message.trim() ? 'Tell us a little about what you would like done.' : '',
    consent: !f.consent ? 'Please agree so we can contact you about your enquiry.' : ''
  };
  const show = k => (tried || touched[k]) && errors[k];
  const valid = Object.values(errors).every(e => !e);

  // Upload: photos of the space, inspiration, sketches or plans
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const [note, setNote] = useState('');
  const fileRef = useRef(null);
  const filesRef = useRef(files); filesRef.current = files;
  useEffect(() => () => filesRef.current.forEach(x => x.url && URL.revokeObjectURL(x.url)), []);
  const addFiles = list => {
    const all = [...list].filter(x => x.type.startsWith('image/') || x.type === 'application/pdf');
    const skippedType = list.length - all.length;
    const tooBig = all.filter(x => x.size > MAX_MB * 1024 * 1024).length;
    const ok = all.filter(x => x.size <= MAX_MB * 1024 * 1024).slice(0, Math.max(0, MAX_FILES - files.length));
    const over = all.length - tooBig - ok.length;
    setNote([skippedType && `${skippedType} not an image or PDF`, tooBig && `${tooBig} over ${MAX_MB}MB`, over > 0 && `limit is ${MAX_FILES} files`].filter(Boolean).join(' · '));
    setFiles(p => [...p, ...ok.map(x => ({ id: x.name + x.size + x.lastModified + Math.random(), file: x, url: x.type.startsWith('image/') ? URL.createObjectURL(x) : null }))]);
  };
  const removeFile = id => setFiles(p => { const x = p.find(q => q.id === id); if (x && x.url) URL.revokeObjectURL(x.url); return p.filter(q => q.id !== id); });
  const browse = () => fileRef.current && fileRef.current.click();

  const submit = e => {
    e.preventDefault(); setTried(true);
    if (!valid) { const first = e.currentTarget.querySelector('[aria-invalid="true"], .is-invalid'); if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    // No backend yet — the enquiry (FormData incl. files) is ready to POST here
    setSent(true);
  };
  const reset = () => { files.forEach(x => x.url && URL.revokeObjectURL(x.url)); setFiles([]); setNote(''); setF(EMPTY); setTouched({}); setTried(false); setSent(false); };

  const field = (k, label, input, { req, hint } = {}) => (
    <label className={'ff' + (show(k) ? ' is-invalid' : '')}>
      <span className="ff-label">{label}{req ? <span className="ff-req" aria-hidden="true"> *</span> : <span className="ff-opt"> (optional)</span>}</span>
      {input}
      {show(k) ? <span className="ff-err" role="alert">{errors[k]}</span> : hint ? <span className="ff-hint">{hint}</span> : null}
    </label>
  );

  return (
    <section id="start" className="start" data-screen-label="09 Start a project">
      <div className="start-inner">
        <div className="start-intro" data-reveal>
          <span className="eyebrow">START A PROJECT</span>
          <h2 className="h2 start-h">Tell us what you would <em>like to change.</em></h2>
          <p className="copy start-copy">Share a few details and anything that shows what you have in mind — photos of the space, inspiration, sketches or plans. We'll come back to you personally.</p>
          <ul className="start-steps">
            <li><span>01</span>Send your enquiry and files</li>
            <li><span>02</span>We review the property and brief</li>
            <li><span>03</span>We arrange a conversation or site visit</li>
          </ul>
          <img src={monogramChalk} alt="" className="start-mark" />
        </div>

        {!sent ? (
          <form className="eform" onSubmit={submit} noValidate encType="multipart/form-data" data-reveal style={{ '--d': '.15s' }}>
            <div className="eform-grid">
              {field('name', 'Full name', <input className="fi" name="name" value={f.name} onChange={e => set('name', e.target.value)} onBlur={() => touch('name')} autoComplete="name" aria-invalid={!!show('name')} />, { req: true })}
              {field('email', 'Email', <input className="fi" name="email" type="email" value={f.email} onChange={e => set('email', e.target.value)} onBlur={() => touch('email')} autoComplete="email" aria-invalid={!!show('email')} />, { req: true })}
              {field('phone', 'Phone or WhatsApp', <input className="fi" name="phone" type="tel" value={f.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" />)}
              {field('place', 'Property location', (
                <select className="fi fsel" name="location" value={f.place} onChange={e => set('place', e.target.value)}>
                  <option value="">Select an area</option>
                  {PLACE_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ))}
            </div>

            <fieldset className={'ff ff-set' + (show('work') ? ' is-invalid' : '')}>
              <legend className="ff-label">What would you like done?<span className="ff-req" aria-hidden="true"> *</span> <span className="ff-opt">Choose all that apply</span></legend>
              <div className="fchecks">
                {CHANGE_OPTS.map(o => (
                  <label key={o} className={'fcheck' + (f.work.includes(o) ? ' is-on' : '')}>
                    <input type="checkbox" name="work" value={o} checked={f.work.includes(o)} onChange={() => { toggleWork(o); touch('work'); }} />
                    <span className="fcheck-box" aria-hidden="true" />{o}
                  </label>
                ))}
              </div>
              {show('work') && <span className="ff-err" role="alert">{errors.work}</span>}
            </fieldset>

            <div className="eform-grid">
              {field('budget', 'Estimated budget', (
                <select className="fi fsel" name="budget" value={f.budget} onChange={e => set('budget', e.target.value)}>
                  <option value="">Select a range</option>
                  {BUDGET_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ))}
              {field('when', 'Ideal timing', (
                <select className="fi fsel" name="timing" value={f.when} onChange={e => set('when', e.target.value)}>
                  <option value="">Select timing</option>
                  {WHEN_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ))}
            </div>

            {field('message', 'Describe what you would like done', (
              <textarea className="fi" name="message" rows={5} value={f.message} onChange={e => set('message', e.target.value)} onBlur={() => touch('message')} aria-invalid={!!show('message')}
                placeholder="The space today, what isn't working, and what you'd love it to become…" />
            ), { req: true })}

            <div className="ff">
              <span className="ff-label" id="upload-label">Upload what you want done<span className="ff-opt"> (optional)</span></span>
              <div className={'fdrop' + (drag ? ' is-drag' : '')} role="button" tabIndex={0} aria-labelledby="upload-label"
                onClick={browse}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); browse(); } }}
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}>
                <span className="fdrop-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
                </span>
                <span className="fdrop-title"><strong>Drag files here</strong> or <span className="fdrop-link">browse</span></span>
                <span className="fdrop-hint">Photos of the space, inspiration images, sketches or plans · JPG, PNG, HEIC or PDF · up to {MAX_FILES} files, {MAX_MB}MB each</span>
                <input ref={fileRef} type="file" name="files" accept={ACCEPT} multiple hidden onChange={e => { addFiles(e.target.files); e.target.value = ''; }} />
              </div>
              {note && <span className="ff-hint">Skipped: {note}.</span>}
              {files.length > 0 && (
                <ul className="flist">
                  {files.map(x => (
                    <li key={x.id} className="fitem">
                      {x.url ? <img src={x.url} alt="" /> : <span className="fitem-pdf">PDF</span>}
                      <span className="fitem-meta"><span className="fitem-name">{x.file.name}</span><span className="fitem-size">{sizeLabel(x.file.size)}</span></span>
                      <button type="button" className="fitem-x" onClick={() => removeFile(x.id)} aria-label={'Remove ' + x.file.name}>×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="eform-foot">
              <label className={'fconsent' + (show('consent') ? ' is-invalid' : '')}>
                <input type="checkbox" name="consent" checked={f.consent} onChange={() => { set('consent', !f.consent); touch('consent'); }} />
                <span>I agree to be contacted about my enquiry and to the privacy policy.<span className="ff-req" aria-hidden="true"> *</span></span>
              </label>
              <button type="submit" className="fsubmit">Send enquiry <span className="fsubmit-arrow">→</span></button>
            </div>
            {show('consent') && <span className="ff-err" role="alert">{errors.consent}</span>}
            <p className="eform-note"><span className="ff-req">*</span> Required</p>
          </form>
        ) : (
          <div className="start-thanks" data-reveal>
            <p>Thank you{f.name.trim() ? ', ' + f.name.trim().split(' ')[0] : ''}.</p>
            <span className="copy start-copy">
              Your enquiry about {f.work.join(', ').toLowerCase()}{f.place ? ' in ' + f.place : ''} is with us
              {files.length ? `, along with ${files.length === 1 ? 'one file' : files.length + ' files'}` : ''}. We'll be in touch personally.
            </span>
            <button type="button" className="ghost-btn-light" onClick={reset}>Send another enquiry</button>
          </div>
        )}
      </div>
    </section>
  );
}
