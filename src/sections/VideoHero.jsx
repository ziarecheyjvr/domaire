import { useEffect, useRef } from 'react';
import { useT } from '../i18n.jsx';

// 01 Hero — looping build film: lawn → dig → stone pool → finished garden, then dissolves back to the lawn
export default function VideoHero({ heroRef, m, labels }) {
  const all = useT(), t = all.hero;
  const videoRef = useRef(null);
  // React doesn't render the muted attribute, which browsers require for autoplay — set it and start playback here
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    v.muted = true;
    if (!m) { v.pause(); return; }
    // Background tabs block autoplay, so try again whenever the tab becomes visible
    const play = () => { if (!document.hidden && v.paused) v.play().catch(() => {}); };
    play();
    document.addEventListener('visibilitychange', play);
    return () => document.removeEventListener('visibilitychange', play);
  }, [m]);

  return (
    <section id="top" ref={heroRef} className="vhero" data-screen-label="01 Hero — Video">
      <video
        ref={videoRef}
        className="vhero-video"
        src="/media/hero-build-loop.mp4"
        poster="/media/hero-build-poster.jpg"
        autoPlay={m} muted loop playsInline preload="auto"
        aria-label={t.video}
      />
      <div className="vhero-shade" />
      <div className="vhero-scrim" />
      <div className="vhero-content">
        <div className="vhero-head">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 className="vhero-h1">
            <span className="vhero-line" style={{ '--i': 0 }}><span>{t.l1}</span></span>
            <span className="vhero-line" style={{ '--i': 1 }}><em>{t.l2}</em></span>
          </h1>
        </div>
        <div className="vhero-side">
          <p>{t.body}</p>
          <div className="btn-row">
            <a href="#start" className="btn-light">{t.cta1}</a>
            <a href="#tour" className="btn-ghost-light">{t.cta2}</a>
          </div>
        </div>
      </div>
      {labels && <span className="vhero-concept concept-mark">{all.concept}</span>}
    </section>
  );
}
