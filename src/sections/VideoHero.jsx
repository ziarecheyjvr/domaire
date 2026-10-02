import { useEffect, useRef } from 'react';

// 01 Hero — looping build film: lawn → dig → stone pool → finished garden, then dissolves back to the lawn
export default function VideoHero({ heroRef, m, labels }) {
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
        aria-label="Film: an empty villa lawn being excavated, built and finished as a natural stone pool garden"
      />
      <div className="vhero-shade" />
      <div className="vhero-scrim" />
      <div className="vhero-content">
        <div className="vhero-head">
          <span className="eyebrow">DESIGN · BUILD · RENOVATE — MARBELLA &amp; COSTA DEL SOL</span>
          <h1 className="vhero-h1">Transforming homes.<br /><em>Inside and out.</em></h1>
        </div>
        <div className="vhero-side">
          <p>DOMAIRE designs, builds and renovates homes across Marbella and the Costa del Sol, with a particular specialism in exceptional outdoor spaces.</p>
          <div className="btn-row">
            <a href="#start" className="btn-light">Start your project</a>
            <a href="#tour" className="btn-ghost-light">Walk through the villa</a>
          </div>
        </div>
      </div>
      {labels && <span className="vhero-concept concept-mark">CONCEPT VISUALISATION</span>}
    </section>
  );
}
