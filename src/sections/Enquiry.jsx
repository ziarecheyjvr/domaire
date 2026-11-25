import { useEffect, useRef, useState } from 'react';
import monogramChalk from '../assets/monogram-chalk.png';
import { BUDGET_IDS, PLACE_IDS, WHEN_IDS, WORK_IDS } from '../data.js';
import { useLang } from '../i18n.jsx';
import { COMPANY, FORM } from '../site.js';
import Turnstile from '../Turnstile.jsx';

const MAX_FILES = 5;
const MAX_MB = 20; // for all files together
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'];
const ACCEPT = TYPES.join(',') + ',.heic,.heif';
const allowed = x => TYPES.includes(x.type) || /\.hei[cf]$/i.test(x.name);
const viewable = x => ['image/jpeg', 'image/png', 'image/webp'].includes(x.type);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', phone: '', place: '', work: [], budget: '', when: '', message: '', consent: false };

const sizeLabel = b => b > 1024 * 1024 ? (b / 1024 / 1024).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';

// Start a project — enquiry form with an upload for photos, inspiration or plans of what they want done.
// Fields carry name attributes so the form can be pointed at a form service or API as-is; option values are
// language-independent ids, so a visitor can switch language mid-form without losing their choices.
export default function Enquiry({ brief }) {
  const { t: all, lang } = useLang(), t = all.form, opt = all.options;
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
    const all = [...list].filter(allowed);
    const skippedType = list.length - all.length;
    let total = files.reduce((n, x) => n + x.file.size, 0), tooBig = 0, over = 0;
    const ok = [];
    all.forEach(x => {
      if (files.length + ok.length >= MAX_FILES) over++;
      else if (total + x.size > MAX_MB * 1024 * 1024) tooBig++;
      else { ok.push(x); total += x.size; }
    });
    setNote({ type: skippedType, big: tooBig, over: over > 0 });
    setFiles(p => [...p, ...ok.map(x => ({ id: x.name + x.size + x.lastModified + Math.random(), file: x, url: viewable(x) ? URL.createObjectURL(x) : null }))]);
  };
  const removeFile = id => setFiles(p => { const x = p.find(q => q.id === id); if (x && x.url) URL.revokeObjectURL(x.url); return p.filter(q => q.id !== id); });
  const browse = () => fileRef.current && fileRef.current.click();

  // Captcha token, and the state of the request
  const [token, setToken] = useState('');
  const [round, setRound] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | sending | an error code from the server
  const [trap, setTrap] = useState('');         // honeypot, invisible to people

  const submit = async e => {
    e.preventDefault(); setTried(true);
    if (status === 'sending') return;
    if (!valid) { const first = e.currentTarget.querySelector('[aria-invalid="true"], .is-invalid'); if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (!token) { setStatus('captcha'); return; }
    const data = new FormData();
    Object.entries({ name: f.name, email: f.email, phone: f.phone, location: f.place, budget: f.budget, timing: f.when, message: f.message, consent: 'yes', lang, company_site: trap, 'cf-turnstile-response': token }).forEach(([k, v]) => data.append(k, v));
    f.work.forEach(w => data.append('work[]', w));
    files.forEach(x => data.append('files[]', x.file, x.file.name));
    setStatus('sending');
    let code = 'server';
    try {
      const r = await fetch(FORM.endpoint, { method: 'POST', body: data });
      const body = await r.json();
      code = body.ok === true ? '' : body.error || 'server';
    } catch { /* offline, timeout or a non-JSON reply */ }
    setToken(''); setRound(n => n + 1); // tokens are single-use
    // 'captcha' is cleared by the next token; a rejection by the server must stay on screen
    if (code) { setStatus(code === 'captcha' ? 'server' : code); return; }
    setStatus('idle'); setSent(true);
  };
  const reset = () => { files.forEach(x => x.url && URL.revokeObjectURL(x.url)); setFiles([]); setNote(null); setF(EMPTY); setTouched({}); setTried(false); setSent(false); setFromBrief(false); setStatus('idle'); };

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
                      {x.url ? <img src={x.url} alt="" /> : <span className="fitem-pdf">{/pdf$/i.test(x.file.type) ? 'PDF' : 'IMG'}</span>}
                      <span className="fitem-meta"><span className="fitem-name">{x.file.name}</span><span className="fitem-size">{sizeLabel(x.file.size)}</span></span>
                      <button type="button" className="fitem-x" onClick={() => removeFile(x.id)} aria-label={t.remove + ' ' + x.file.name}>×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input type="text" name="company_site" value={trap} onChange={e => setTrap(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="ftrap" />
            <Turnstile siteKey={FORM.turnstileSiteKey} lang={lang} resetKey={round} onToken={v => { setToken(v); if (v) setStatus(s => s === 'captcha' ? 'idle' : s); }} />

            <div className="eform-foot">
              <label className={'fconsent' + (show('consent') ? ' is-invalid' : '')}>
                <input type="checkbox" name="consent" checked={f.consent} onChange={() => { set('consent', !f.consent); touch('consent'); }} />
                <span>{t.consent}<a href="/privacy/" target="_blank" rel="noopener" className="fconsent-link">{t.consentLink}</a>.<span className="ff-req" aria-hidden="true"> *</span></span>
              </label>
              <button type="submit" className="fsubmit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit} <span className="fsubmit-arrow">→</span></button>
            </div>
            {show('consent') && <span className="ff-err" role="alert">{errors.consent}</span>}
            {status !== 'idle' && status !== 'sending' && (
              <p className="fstatus" role="alert">{t.failed[status] || t.failed.server} <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
            )}
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
