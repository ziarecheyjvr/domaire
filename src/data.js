import villaAfter from './assets/villa-after.png';
import gLawnKitchen from './assets/garden-1-kitchen.webp';
import gPool from './assets/garden-2-pool.webp';
import gWellness from './assets/garden-3-wellness.webp';
import gGym from './assets/garden-4-gym.webp';
import gDusk from './assets/garden-5-dusk.webp';
import livingAfter from './assets/interior-after.webp';
import kitchenAfter from './assets/kitchen-after.webp';

export const PX = (id, w) => 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + (w || 900);
export const AFTER = villaAfter;

// nav key (label in content.js), anchor
export const NAV = [
  ['outdoor', '/#rooms'],
  ['renovations', '/#compose'],
  ['projects', '/#work'],
  ['approach', '/#approach'],
  ['about', '/about/']
];

// A better way to live at home (copy: content.ways): image, background-size, background-position
export const BETTER_WAYS = [
  [AFTER, '300%', '42% 52%'],
  [gWellness, '170%', '50% 70%'],
  [kitchenAfter, 'cover', '40% 50%'],
  [livingAfter, 'cover', '35% 50%']
];

// Outdoor rooms carousel (copy: content.rooms.items): image, background-size, background-position, filter
export const ROOMS = [
  [AFTER, '360%', '42% 50%', 'none'],
  [gPool, '230%', '50% 74%', 'none'],
  [gLawnKitchen, '330%', '88% 50%', 'none'],
  [gWellness, '360%', '5% 58%', 'none'],
  [gWellness, '300%', '88% 72%', 'none'],
  [gGym, '300%', '0% 47%', 'none'],
  [AFTER, '380%', '2% 44%', 'none'],
  [gDusk, '200%', '55% 60%', 'none']
];

// hour, brightness, saturate, sepia, tint r,g,b, tint strength (0 = white), glow
export const SKY = [
  [7, .9, .85, .3, 240, 190, 165, .9, 0],
  [12, 1.04, 1.05, 0, 255, 255, 255, 1, 0],
  [17, 1, 1.15, .3, 240, 185, 130, .85, 0],
  [19.8, .7, .95, .3, 150, 120, 150, .75, .25],
  [22.5, .4, .75, .15, 70, 85, 130, .7, 1]
];

// Hour of each moment in the day section (copy: content.day.moments)
export const MOMENT_HOURS = [7.5, 13, 16.5, 19.5, 22];

// id, group, image, background-size, background-position, specialist ids (labels: content.tiles / content.specs), extra filter
export const TILES = [
  ['terrace', 'out', AFTER, '360%', '42% 50%', ['garden', 'stone']],
  ['pool', 'out', gPool, '220%', '50% 74%', ['poolEng', 'landscape']],
  ['okitchen', 'out', gLawnKitchen, '330%', '88% 50%', ['kitchen', 'mep']],
  ['planting', 'out', gWellness, '300%', '88% 72%', ['landscape', 'irrigation']],
  ['wellness', 'out', gWellness, '340%', '5% 58%', ['wellness', 'plumbing', 'electrical']],
  ['gym', 'out', gGym, '300%', '0% 47%', ['landscape', 'structural']],
  ['shade', 'out', AFTER, '380%', '2% 44%', ['architect', 'structural']],
  ['light', 'out', gDusk, '160%', '55% 60%', ['lighting', 'electrical']],
  ['kitchen', 'in', kitchenAfter, 'cover', 'center', ['kitchen', 'mep']],
  ['bath', 'in', PX(1457847), 'cover', 'center', ['interior', 'plumbing']],
  ['interiors', 'in', livingAfter, 'cover', 'center', ['interior']],
  ['villa', 'in', PX(323780), 'cover', 'center', ['architect', 'interior', 'structural', 'mep']],
  ['ext', 'in', PX(1974596), 'cover', 'center', ['architect', 'structural', 'licensing']]
];

// Enquiry form option ids (labels: content.options)
export const WORK_IDS = ['garden', 'terrace', 'pool', 'okitchen', 'wellness', 'gym', 'shade', 'light', 'kitchen', 'bath', 'interiors', 'villa', 'ext', 'other'];
export const PLACE_IDS = ['marbella', 'benahavis', 'estepona', 'elsewhere', 'outside'];
export const WHEN_IDS = ['asap', 'soon', 'year', 'next', 'exploring'];
export const BUDGET_IDS = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'];
// Compose tile id → enquiry form option id, so a composed brief carries over to the form
export const TILE_TO_FORM = {
  terrace: 'terrace', pool: 'pool', okitchen: 'okitchen', planting: 'garden', wellness: 'wellness', gym: 'gym',
  shade: 'shade', light: 'light', kitchen: 'kitchen', bath: 'bath', interiors: 'interiors', villa: 'villa', ext: 'ext'
};

// Villa tour chapters (copy: content.tour.chapters): scroll progress to jump to
export const TOUR = [.03, .2, .42, .62, .8];
