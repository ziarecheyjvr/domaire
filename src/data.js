import villaAfter from './assets/villa-after.png';
import gLawnKitchen from './assets/garden-1-kitchen.webp';
import gPool from './assets/garden-2-pool.webp';
import gWellness from './assets/garden-3-wellness.webp';
import gGym from './assets/garden-4-gym.webp';
import gDusk from './assets/garden-5-dusk.webp';
import villaNight from './assets/villa-night.webp';
import livingAfter from './assets/interior-after.webp';
import kitchenAfter from './assets/kitchen-after.webp';

export const PX = (id, w) => 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + (w || 900);
export const AFTER = villaAfter;

// label, anchor
export const NAV = [
  ['Outdoor Living', '/#rooms'],
  ['Renovations', '/#compose'],
  ['Projects', '/#work'],
  ['Approach', '/#approach'],
  ['Areas', '/#areas'],
  ['About', '/about/']
];

// Statement copy: [key] inserts an image pill, *word* is italicised
export const STATEMENT = 'A home can already be [terrace] beautiful and still have more to give. A terrace can work harder. A garden can [pool] connect to the house. A kitchen can open into the way you [kitchen] entertain. An entire villa can be rethought around the way you [living] *live *now.';
export const STATEMENT_IMAGES = {
  terrace: [AFTER, '360%', '42% 50%', 'Terrace'],
  pool: [gPool, '240%', '50% 74%', 'Natural pool'],
  kitchen: [kitchenAfter, '220%', '55% 60%', 'Kitchen'],
  living: [livingAfter, '200%', '30% 70%', 'Living room']
};

// label, title, image, background-size, background-position, filter
export const ROOMS = [
  ['THE TERRACE', 'Where mornings start.', AFTER, '360%', '42% 50%', 'none'],
  ['THE POOL', 'More than the pool itself.', gPool, '230%', '50% 74%', 'none'],
  ['THE OUTDOOR KITCHEN', 'Built around the way you host.', gLawnKitchen, '330%', '88% 50%', 'none'],
  ['THE WELLNESS CORNER', 'Heat, then cold.', gWellness, '360%', '5% 58%', 'none'],
  ['THE PLANTING', 'Structure, character and connection.', gWellness, '300%', '88% 72%', 'none'],
  ['THE OUTDOOR GYM', 'Train in the open air.', gGym, '300%', '0% 47%', 'none'],
  ['THE SHADE', 'Spend longer outside.', AFTER, '380%', '2% 44%', 'none'],
  ['AFTER DARK', 'How it all feels after the sun goes down.', gDusk, '200%', '55% 60%', 'none']
];

// hour, brightness, saturate, sepia, tint r,g,b, tint strength (0 = white), glow
export const SKY = [
  [7, .9, .85, .3, 240, 190, 165, .9, 0],
  [12, 1.04, 1.05, 0, 255, 255, 255, 1, 0],
  [17, 1, 1.15, .3, 240, 185, 130, .85, 0],
  [19.8, .7, .95, .3, 150, 120, 150, .75, .25],
  [22.5, .4, .75, .15, 70, 85, 130, .7, 1]
];

// hour, label, caption
export const MOMENTS = [
  [7.5, 'FIRST LIGHT', 'Coffee on the terrace before the day begins.'],
  [13, 'MIDDAY', 'Lunch in the shade, a step from the kitchen.'],
  [16.5, 'AFTERNOON', 'The pool, the loungers, the long afternoon.'],
  [19.5, 'GOLDEN HOUR', 'Friends arrive. The outdoor kitchen takes over.'],
  [22, 'AFTER DARK', 'Lighting turns the garden into a room of its own.']
];

// number, title, description
export const CHANGES = [
  ['01', 'A natural stone pool', 'Shaped to the garden, with a shallow beach entry and stone surround.'],
  ['02', 'An outdoor kitchen', 'Cooking, prep and dining under the olive tree, connected back to the house.'],
  ['03', 'Mediterranean planting', 'Lavender, agapanthus and olives give structure and privacy.'],
  ['04', 'Places to stay longer', 'Loungers, shade and lighting so the garden works all day.']
];

// id, group, label, image, background-size, background-position, specialists, extra filter
export const TILES = [
  ['terrace', 'out', 'Terraces & outdoor living', AFTER, '360%', '42% 50%', ['Garden designer', 'Stonework']],
  ['pool', 'out', 'Pools & natural pools', gPool, '220%', '50% 74%', ['Pool engineer', 'Landscape architect']],
  ['okitchen', 'out', 'Outdoor kitchens', gLawnKitchen, '330%', '88% 50%', ['Kitchen designer', 'MEP engineer']],
  ['planting', 'out', 'Landscaping & planting', gWellness, '300%', '88% 72%', ['Landscape architect', 'Irrigation']],
  ['wellness', 'out', 'Sauna & cold plunge', gWellness, '340%', '5% 58%', ['Wellness specialist', 'Plumbing', 'Electrical']],
  ['gym', 'out', 'Outdoor gym', gGym, '300%', '0% 47%', ['Landscape architect', 'Structural engineer']],
  ['shade', 'out', 'Shade & pergolas', AFTER, '380%', '2% 44%', ['Architect', 'Structural engineer']],
  ['light', 'out', 'Outdoor lighting', gDusk, '160%', '55% 60%', ['Lighting designer', 'Electrical']],
  ['kitchen', 'in', 'Kitchens', kitchenAfter, 'cover', 'center', ['Kitchen designer', 'MEP engineer']],
  ['bath', 'in', 'Bathrooms', PX(1457847), 'cover', 'center', ['Interior designer', 'Plumbing']],
  ['interiors', 'in', 'Interiors', livingAfter, 'cover', 'center', ['Interior designer']],
  ['villa', 'in', 'Complete villa renovation', PX(323780), 'cover', 'center', ['Architect', 'Interior designer', 'Structural engineer', 'MEP engineer']],
  ['ext', 'in', 'Extensions & reconfiguration', PX(1974596), 'cover', 'center', ['Architect', 'Structural engineer', 'Licensing']]
];

export const NUM = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven'];

export const STEPS = [
  ['01', 'UNDERSTAND', 'Property, priorities and what needs to change.'],
  ['02', 'DEVELOP', 'Concept, design and the right technical specialists.'],
  ['03', 'DEFINE', 'Scope, specification, programme and stages.'],
  ['04', 'BUILD', 'Coordinated work, reporting and decisions.'],
  ['05', 'FINISH', 'Final details, handover and aftercare.']
];

// name, description, image, background-size, background-position
export const AREAS = [
  ['Marbella', 'Outdoor transformations & villa renovations', AFTER, '200%', '50% 40%'],
  ['Benahavís', 'Outdoor living & villa renovation', gDusk, 'cover', 'center'],
  ['Estepona', 'Outdoor transformations & home renovation', gWellness, 'cover', 'center'],
  ['Costa del Sol', 'Selected projects across the western coast', villaNight, 'cover', 'center']
];

export const ADVICE = [
  'What to decide before redesigning your outdoor space',
  'Natural swimming pools: does the concept suit your property?',
  'Pool renovation vs replacement'
];

// Enquiry sentence blanks
export const CHANGE_OPTS = ['the garden', 'the terrace', 'the pool', 'the outdoor kitchen', 'the kitchen', 'a bathroom', 'the whole villa', 'everything, inside and out'];
export const PLACE_OPTS = ['Marbella', 'Benahavís', 'Estepona', 'elsewhere on the Costa del Sol'];
export const WHEN_OPTS = ['in the next few months', 'later this year', 'next year', 'when the time is right'];

export const FOOTER_COLS = [
  { h: 'OUTDOOR LIVING', items: ['Outdoor Transformations', 'Landscaping & Gardens', 'Outdoor Kitchens', 'Pools & Natural Pools'] },
  { h: 'RENOVATIONS', items: ['Complete Villas', 'Interiors', 'Kitchens', 'Bathrooms'] },
  { h: 'AREAS', items: AREAS.map(a => a[0]) }
];

// Villa tour chapters: scroll progress to jump to, label, caption
export const TOUR = [
  [.03, 'AS IT IS', 'A beautiful house. A garden that gives very little back.'],
  [.2, 'THE OUTSIDE, DESIGNED', 'Natural pool, sauna, cold plunge and an outdoor kitchen — one complete idea.'],
  [.42, 'STEP INSIDE', 'The same eye, carried through the glass doors.'],
  [.62, 'THE LIVING ROOM, DESIGNED', 'Calm materials, open glass, the garden as part of the room.'],
  [.8, 'THE KITCHEN, DESIGNED', 'The room that connects everything — opened straight onto the outdoor kitchen.']
];
