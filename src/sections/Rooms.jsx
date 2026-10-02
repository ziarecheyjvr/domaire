import { useRef } from 'react';
import { ROOMS } from '../data.js';
import { prog } from '../util.js';

// Sometimes the best room in the house isn't in the house — vertical scroll drives a horizontal carousel
export default function Rooms({ w, vh, m }) {
  const secRef = useRef(null), trackRef = useRef(null);
  const rp = m ? prog(secRef, vh) : 0;
  const tw = trackRef.current ? trackRef.current.scrollWidth : 3000;
  const travel = Math.max(0, tw - w);
  const n = ROOMS.length;

  return (
    <section id="rooms" ref={secRef} className={'rooms' + (m ? '' : ' is-static')} data-screen-label="04 Outdoor rooms" style={{ height: m ? Math.round(travel + vh * 1.1) : 'auto' }}>
      <div className="rooms-stage">
        <div className="rooms-head">
          <h2 className="rooms-h">Sometimes the best room in the house <em>isn't in the house.</em></h2>
          <div className="rooms-count">
            <span>{String(Math.min(n, 1 + Math.floor(rp * n))).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            <span className="rooms-bar"><span style={{ width: (rp * 100).toFixed(1) + '%' }} /></span>
          </div>
        </div>
        <div ref={trackRef} className="rooms-track" style={{ transform: `translateX(${m ? Math.round(-rp * travel) : 0}px)` }}>
          {ROOMS.map(([k, t, img, size, pos, f], i) => (
            <article key={k} className="room">
              <div role="img" aria-label={t} className="room-img" style={{ backgroundImage: `url(${img})`, backgroundSize: size, backgroundPosition: pos, filter: f, transform: `translateX(${m ? Math.round((rp * travel - i * 380) * .06) : 0}px)` }} />
              <div className="room-shade" />
              <span className="room-n">({String(i + 1).padStart(2, '0')})</span>
              <div className="room-cap">
                <span className="room-k">{k}</span>
                <span className="room-t">{t}</span>
              </div>
            </article>
          ))}
          <article className="room room--note">
            <span className="room-k">OUTDOOR LIVING</span>
            <p>We consider the relationship between house and garden, sunlight and shade, cooking and dining, planting and materials, water, lighting and the way people naturally move through a space.</p>
            <a href="#compose" className="room-link">Explore Outdoor Living →</a>
          </article>
        </div>
      </div>
    </section>
  );
}
