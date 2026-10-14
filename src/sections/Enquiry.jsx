import { useEffect, useRef, useState } from 'react';
import monogramChalk from '../assets/monogram-chalk.png';
import { BUDGET_IDS, PLACE_IDS, WHEN_IDS, WORK_IDS } from '../data.js';
import { useT } from '../i18n.jsx';

const MAX_FILES = 10;
const MAX_MB = 15;
const ACCEPT = 'image/*,application/pdf';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', phone: '', place: '', work: [], budget: '', when: '', message: '', consent: false };

const sizeLabel = b => b > 1024 * 1024 ? (b / 1024 / 1024).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';

// Start a project — enquiry form with an upload for photos, inspiration or plans of what they want done.
// Fields carry name attributes so the form can be pointed at a form service or API as-is; option values are
// language-independent ids, so a visitor can switch language mid-form without losing their choices.
export default function Enquiry({ brief }) {
  const all = useT(), t = all.form, opt = all.options;
  const [f, setF] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [fromBrief, setFromBrief] = useState(false);

  // A brief arriving from "Compose your project" ticks the matching boxes (and reopens the form if already sent)
  useEffect(() => {
    if (!brief) return;
    setF(s => ({ ...s, work: brief.work }));
    setFromBrief(brief.work.length > 0);
    setSent(false);
  }, [brief]);
  const set = (k, v) => setF(s => ({ ...s, [k]: v }));
  const touch = k => setTouched(t => ({ ...t, [k]: true }));
  const toggleWork = o => setF(s => ({ ...s, work: s.work.includes(o) ? s.work.filter(x => x !== o) : [...s.work, o] }));

  const errors = {
    name: !f.name.trim() ? t.errors.name : '',
    email: !f.email.trim() ? t.errors.email : !EMAIL.test(f.email.trim()) ? t.errors.emailBad : '',
    work: !f.work.length ? t.errors.work : '',
    message: !f.message.trim() ? t.errors.message : '',
    consent: !f.consent ? t.errors.consent : ''
  };
  const show = k => (tried || touched[k]) && errors[k];
  const valid = Object.values(errors).every(e => !e);

  // Upload: photos of the space, inspiration, sketches or plans
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const [note, setNote] = useState(null);
  const fileRef = useRef(null);
  const filesRef = useRef(files); filesRef.current = files;
  useEffect(() => () => filesRef.current.forEach(x => x.url && URL.revokeObjectURL(x.url)), []);
  const addFiles = list => {
    const all = [...list].filter(x => x.type.startsWith('image/') || x.type === 'application/pdf');
    const skippedType = list.length - all.length;
    const tooBig = all.filter(x => x.size > MAX_MB * 1024 * 1024).length;
    const ok = all.filter(x => x.size <= MAX_MB * 1024 * 1024).slice(0, Math.max(0, MAX_FILES - files.length));
    const over = all.length - tooBig - ok.length;
    setNote({ type: skippedType, big: tooBig, over: over > 0 });
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
  const reset = () => { files.forEach(x => x.url && URL.revokeObjectURL(x.url)); setFiles([]); setNote(null); setF(EMPTY); setTouched({}); setTried(false); setSent(false); setFromBrief(false); };

  const field = (k, label, input, { req, hint } = {}) => (
    <label className={'ff' + (show(k) ? ' is-invalid' : '')}>
      <span className="ff-label">{label}{req ? <span className="ff-req" aria-hidden="true"> *</span> : <span className="ff-opt"> {t.optional}</span>}</span>
      {input}
      {show(k) ? <span className="ff-err" role="alert">{errors[k]}</span> : hint ? <span className="ff-hint">{hint}</span> : null}
    </label>
  );

  return (
    <section id="start" className="start" data-screen-label="09 Start a project">
      <div className="start-inner">
        <div className="start-intro" data-reveal>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="h2 start-h">{t.h1}<em>{t.h2}</em></h2>
          <p className="copy start-copy">{t.body}</p>
          <ul className="start-steps">
            {t.steps.map((s, i) => <li key={i}><span>0{i + 1}</span>{s}</li>)}
          </ul>
          <img src={monogramChalk} alt="" className="start-mark" />
        </div>

        {!sent ? (
          <form className="eform" onSubmit={submit} noValidate encType="multipart/form-data" data-reveal style={{ '--d': '.15s' }}>
            <div className="eform-grid">
              {field('name', t.name, <input className="fi" name="name" value={f.name} onChange={e => set('name', e.target.value)} onBlur={() => touch('name')} autoComplete="name" aria-invalid={!!show('name')} />, { req: true })}
              {field('email', t.email, <input className="fi" name="email" type="email" value={f.email} onChange={e => set('email', e.target.value)} onBlur={() => touch('email')} autoComplete="email" aria-invalid={!!show('email')} />, { req: true })}
              {field('phone', t.phone, <input className="fi" name="phone" type="tel" value={f.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" />)}
              {field('place', t.place, (
                <select className="fi fsel" name="location" value={f.place} onChange={e => set('place', e.target.value)}>
                  <option value="">{t.selectArea}</option>
                  {PLACE_IDS.map(o => <option key={o} value={o}>{opt.place[o]}</option>)}
                </select>
              ))}
            </div>

            <fieldset className={'ff ff-set' + (show('work') ? ' is-invalid' : '')}>
              <legend className="ff-label">{t.work}<span className="ff-req" aria-hidden="true"> *</span> <span className="ff-opt">{t.chooseAll}</span></legend>
              {fromBrief && <span className="ff-carried">{t.carried}</span>}
              <div className="fchecks">
                {WORK_IDS.map(o => (
                  <label key={o} className={'fcheck' + (f.work.includes(o) ? ' is-on' : '')}>
                    <input type="checkbox" name="work" value={o} checked={f.work.includes(o)} onChange={() => { toggleWork(o); touch('work'); }} />
                    <span className="fcheck-box" aria-hidden="true" />{opt.work[o]}
                  </label>
                ))}
              </div>
              {show('work') && <span className="ff-err" role="alert">{errors.work}</span>}
            </fieldset>

            <div className="eform-grid">
              {field('budget', t.budget, (
                <select className="fi fsel" name="budget" value={f.budget} onChange={e => set('budget', e.target.value)}>
                  <option value="">{t.selectRange}</option>
                  {BUDGET_IDS.map(o => <option key={o} value={o}>{opt.budget[o]}</option>)}
                </select>
              ))}
              {field('when', t.when, (
                <select className="fi fsel" name="timing" value={f.when} onChange={e => set('when', e.target.value)}>
                  <option value="">{t.selectWhen}</option>
                  {WHEN_IDS.map(o => <option key={o} value={o}>{opt.when[o]}</option>)}
                </select>
              ))}
            </div>

            {field('message', t.message, (
              <textarea className="fi" name="message" rows={5} value={f.message} onChange={e => set('message', e.target.value)} onBlur={() => touch('message')} aria-invalid={!!show('message')}
                placeholder={t.placeholder} />
            ), { req: true })}

            <div className="ff">
              <span className="ff-label" id="upload-label">{t.upload}<span className="ff-opt"> {t.optional}</span></span>
              <div className={'fdrop' + (drag ? ' is-drag' : '')} role="button" tabIndex={0} aria-labelledby="upload-label"
                onClick={browse}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); browse(); } }}
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}>
                <span className="fdrop-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
                </span>
                <span className="fdrop-title"><strong>{t.drag}</strong> {t.or} <span className="fdrop-link">{t.browse}</span></span>
                <span className="fdrop-hint">{t.uploadHint(MAX_FILES, MAX_MB)}</span>
                <input ref={fileRef} type="file" name="files" accept={ACCEPT} multiple hidden onChange={e => { addFiles(e.target.files); e.target.value = ''; }} />
              </div>
              {note && (note.type || note.big || note.over) && (
                <span className="ff-hint">{t.skipped}: {[note.type && t.notImage(note.type), note.big && t.tooBig(note.big, MAX_MB), note.over && t.limit(MAX_FILES)].filter(Boolean).join(' · ')}.</span>
              )}
              {files.length > 0 && (
                <ul className="flist">
                  {files.map(x => (
                    <li key={x.id} className="fitem">
                      {x.url ? <img src={x.url} alt="" /> : <span className="fitem-pdf">PDF</span>}
                      <span className="fitem-meta"><span className="fitem-name">{x.file.name}</span><span className="fitem-size">{sizeLabel(x.file.size)}</span></span>
                      <button type="button" className="fitem-x" onClick={() => removeFile(x.id)} aria-label={t.remove + ' ' + x.file.name}>×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="eform-foot">
              <label className={'fconsent' + (show('consent') ? ' is-invalid' : '')}>
                <input type="checkbox" name="consent" checked={f.consent} onChange={() => { set('consent', !f.consent); touch('consent'); }} />
                <span>{t.consent}<span className="ff-req" aria-hidden="true"> *</span></span>
              </label>
              <button type="submit" className="fsubmit">{t.submit} <span className="fsubmit-arrow">→</span></button>
            </div>
            {show('consent') && <span className="ff-err" role="alert">{errors.consent}</span>}
            <p className="eform-note"><span className="ff-req">*</span> {t.required}</p>
          </form>
        ) : (
          <div className="start-thanks" data-reveal>
            <p>{t.thanks(f.name.trim().split(' ')[0])}</p>
            <span className="copy start-copy">
              {t.thanksBody(f.work.map(o => opt.work[o]).join(', ').toLowerCase(), f.place ? opt.place[f.place] : '', files.length)}
            </span>
            <button type="button" className="ghost-btn-light" onClick={reset}>{t.another}</button>
          </div>
        )}
      </div>
    </section>
  );
}
