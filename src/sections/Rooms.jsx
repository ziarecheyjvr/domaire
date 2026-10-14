import { useRef } from 'react';
import { ROOMS } from '../data.js';
import { prog } from '../util.js';
import { useT } from '../i18n.jsx';

// Sometimes the best room in the house isn't in the house — vertical scroll drives a horizontal carousel
export default function Rooms({ w, vh, m }) {
  const t = useT().rooms;
  const secRef = useRef(null), trackRef = useRef(null);
  const rp = m ? prog(secRef, vh) : 0;
  const tw = trackRef.current ? trackRef.current.scrollWidth : 3000;
  const travel = Math.max(0, tw - w);
  const n = ROOMS.length;

  return (
    <section id="rooms" ref={secRef} className={'rooms' + (m ? '' : ' is-static')} data-screen-label="04 Outdoor rooms" style={{ height: m ? Math.round(travel + vh * 1.1) : 'auto' }}>
      <div className="rooms-stage">
        <div className="rooms-head" data-reveal>
          <h2 className="rooms-h">{t.h1}<em>{t.h2}</em></h2>
          <div className="rooms-count">
            <span>{String(Math.min(n, 1 + Math.floor(rp * n))).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            <span className="rooms-bar"><span style={{ width: (rp * 100).toFixed(1) + '%' }} /></span>
          </div>
        </div>
        <div ref={trackRef} className="rooms-track" style={{ transform: `translateX(${m ? Math.round(-rp * travel) : 0}px)` }}>
          {ROOMS.map(([img, size, pos, f], i) => { const { k, t: title } = t.items[i]; return (
            <article key={i} className="room">
              <div role="img" aria-label={title} className="room-img" style={{ backgroundImage: `url(${img})`, backgroundSize: size, backgroundPosition: pos, filter: f, transform: `translateX(${m ? Math.round((rp * travel - i * 380) * .06) : 0}px)` }} />
              <div className="room-shade" />
              <span className="room-n">({String(i + 1).padStart(2, '0')})</span>
              <div className="room-cap">
                <span className="room-k">{k}</span>
                <span className="room-t">{title}</span>
              </div>
            </article>
          ); })}
          <article className="room room--note">
            <span className="room-k">{t.noteK}</span>
            <p>{t.note}</p>
            <a href="#compose" className="room-link">{t.link}</a>
          </article>
        </div>
      </div>
    </section>
  );
}
