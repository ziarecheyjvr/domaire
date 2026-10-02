import { useRef } from 'react';
import useViewport from './useViewport.js';
import useReveal from './useReveal.js';
import Header from './sections/Header.jsx';
import VideoHero from './sections/VideoHero.jsx';
import Statement from './sections/Statement.jsx';
import VillaTour from './sections/VillaTour.jsx';
import Rooms from './sections/Rooms.jsx';
import DayAtVilla from './sections/DayAtVilla.jsx';
import Compare from './sections/Compare.jsx';
import Compose from './sections/Compose.jsx';
import Approach from './sections/Approach.jsx';
import Enquiry from './sections/Enquiry.jsx';
import Footer from './sections/Footer.jsx';

export default function App({ motion = true, showConceptLabels = true }) {
  const { w, vh, y } = useViewport();
  const heroRef = useRef(null);
  useReveal();
  const m = motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = { w, vh, y, m, wide: w >= 1180, labels: showConceptLabels };

  // Header stays transparent over the video hero, then switches to light
  const heroEl = heroRef.current, heroEnd = heroEl ? heroEl.offsetTop + heroEl.offsetHeight - 70 : vh;

  return (
    <div className="page">
      <Header dark={y < heroEnd} wide={ctx.wide} />
      <VideoHero heroRef={heroRef} {...ctx} />
      <Statement />
      <VillaTour {...ctx} />
      <Rooms {...ctx} />
      <DayAtVilla {...ctx} />
      <Compare {...ctx} />
      <Compose />
      <Approach {...ctx} />
      <Enquiry />
      <Footer />
    </div>
  );
}
