// All visible copy, in English and Spanish. Both languages share the same shape;
// option lists are keyed by id so selections survive a language switch.

const en = {
  meta: {
    title: 'DOMAIRE — Design · Build · Renovate · Marbella & Costa del Sol',
    aboutTitle: 'About — DOMAIRE · Design · Build · Renovate',
    description: 'DOMAIRE designs, builds and renovates homes across Marbella and the Costa del Sol, with a particular specialism in exceptional outdoor spaces.'
  },
  nav: { outdoor: 'Outdoor Living', renovations: 'Renovations', projects: 'Projects', approach: 'Approach', about: 'About' },
  header: { tag: 'DESIGN · BUILD · RENOVATE', cta: 'Start a project', ctaShort: 'Enquire', home: 'DOMAIRE home', lang: 'Language' },
  concept: 'CONCEPT VISUALISATION',

  hero: {
    eyebrow: 'DESIGN · BUILD · RENOVATE — MARBELLA & COSTA DEL SOL',
    l1: 'Transforming homes.', l2: 'Inside and out.',
    body: 'DOMAIRE designs, builds and renovates homes across Marbella and the Costa del Sol, with a particular specialism in exceptional outdoor spaces.',
    cta1: 'Start your project', cta2: 'Walk through the villa',
    video: 'Film: an empty villa lawn being excavated, built and finished as a natural stone pool garden'
  },

  statement: {
    eyebrow: 'A BETTER WAY TO LIVE AT HOME',
    l1: 'A home can already be beautiful', l2: 'and still have more to give.',
    intro: 'Outdoor is what makes us memorable. When the transformation moves inside, the same team carries it through — managed as one joined-up project.',
    link: 'Compose your project ↓'
  },
  ways: [
    { k: 'THE TERRACE', t: 'A terrace can work harder.' },
    { k: 'THE GARDEN', t: 'A garden can connect to the house.' },
    { k: 'THE KITCHEN', t: 'A kitchen can open into the way you entertain.' },
    { k: 'THE WHOLE VILLA', t: 'An entire villa can be rethought around the way you live now.' }
  ],

  tour: {
    eyebrow: 'A WALK THROUGH THE VILLA',
    hintScroll: 'SCROLL TO MOVE THROUGH THE HOUSE', hintTap: 'CHOOSE A VIEW',
    chapters: [
      { k: 'AS IT IS', t: 'A beautiful house. A garden that gives very little back.' },
      { k: 'THE OUTSIDE, DESIGNED', t: 'Natural pool, sauna, cold plunge and an outdoor kitchen — one complete idea.' },
      { k: 'STEP INSIDE', t: 'The same eye, carried through the glass doors.' },
      { k: 'THE LIVING ROOM, DESIGNED', t: 'Calm materials, open glass, the garden as part of the room.' },
      { k: 'THE KITCHEN, DESIGNED', t: 'The room that connects everything — opened straight onto the outdoor kitchen.' }
    ],
    alts: {
      extBefore: 'The villa as it is: an open lawn',
      extAfter: 'The villa garden designed: natural pool, sauna and cold plunge',
      intBefore: 'The living room as it is',
      intAfter: 'The living room designed, opening onto the garden',
      kitBefore: 'The kitchen as it is',
      kitAfter: 'The kitchen designed, with glass doors onto the outdoor kitchen'
    }
  },

  rooms: {
    h1: 'Sometimes the best room in the house ', h2: "isn't in the house.",
    items: [
      { k: 'THE TERRACE', t: 'Where mornings start.' },
      { k: 'THE POOL', t: 'More than the pool itself.' },
      { k: 'THE OUTDOOR KITCHEN', t: 'Built around the way you host.' },
      { k: 'THE WELLNESS CORNER', t: 'Heat, then cold.' },
      { k: 'THE PLANTING', t: 'Structure, character and connection.' },
      { k: 'THE OUTDOOR GYM', t: 'Train in the open air.' },
      { k: 'THE SHADE', t: 'Spend longer outside.' },
      { k: 'AFTER DARK', t: 'How it all feels after the sun goes down.' }
    ],
    noteK: 'OUTDOOR LIVING',
    note: 'We consider the relationship between house and garden, sunlight and shade, cooking and dining, planting and materials, water, lighting and the way people naturally move through a space.',
    link: 'Explore Outdoor Living →'
  },

  day: {
    eyebrow: 'A DAY AT THE VILLA · SCROLL THROUGH THE DAY',
    h1: 'From first light', h2: 'to after dark.',
    moments: [
      { k: 'FIRST LIGHT', t: 'Coffee on the terrace before the day begins.' },
      { k: 'MIDDAY', t: 'Lunch in the shade, a step from the kitchen.' },
      { k: 'AFTERNOON', t: 'The pool, the loungers, the long afternoon.' },
      { k: 'GOLDEN HOUR', t: 'Friends arrive. The outdoor kitchen takes over.' },
      { k: 'AFTER DARK', t: 'Lighting turns the garden into a room of its own.' }
    ],
    conceptScroll: 'SCROLL THROUGH THE DAY', conceptTap: 'TAP A TIME',
    alt: 'Concept: Mediterranean villa garden with natural stone pool, planting and outdoor kitchen'
  },

  compare: {
    eyebrow: 'FEATURED CONCEPT · DRAG TO COMPARE',
    h1: 'From a lawn to', h2: 'a way of living.',
    body: 'The house was already beautiful. The garden gave it very little back. The concept brings pool, stone terrace, planting, shade and an outdoor kitchen together as one outside space — one complete idea.',
    modes: { before: 'BEFORE', compare: 'COMPARE', after: 'AFTER' },
    before: 'BEFORE', after: 'AFTER',
    altAfter: 'After: natural stone pool, planting, loungers and outdoor kitchen',
    altBefore: 'Before: the same villa with an open lawn',
    concept: 'CONCEPT VISUALISATION — NOT A COMPLETED PROJECT',
    changes: [
      { t: 'A natural stone pool', d: 'Shaped to the garden, with a shallow beach entry and stone surround.' },
      { t: 'An outdoor kitchen', d: 'Cooking, prep and dining under the olive tree, connected back to the house.' },
      { t: 'Mediterranean planting', d: 'Lavender, agapanthus and olives give structure and privacy.' },
      { t: 'Places to stay longer', d: 'Loungers, shade and lighting so the garden works all day.' }
    ]
  },

  compose: {
    eyebrow: 'WHAT WE DO · COMPOSE YOUR PROJECT',
    h1: "Choose what you'd like", h2: 'to change.',
    body: "Outdoor is what we're known for. When the work moves inside, the same team carries it through. Select anything — we'll show you who it takes.",
    outside: 'OUTSIDE', inside: 'INSIDE',
    yourProject: 'YOUR PROJECT', element: 'element', elements: 'elements',
    empty: 'Nothing selected yet.',
    specialists: 'SPECIALISTS WE BRING TOGETHER',
    none: 'Pick what you would like to change — inside, outside, or both.',
    both: 'Inside and out, as one joined-up project — one team, one programme.',
    summary: (n, outdoor) => `${n === 1 ? 'One specialist' : (NUM_EN[n] || n) + ' specialists'}, one ${outdoor ? 'outdoor idea' : 'renovation'}. We coordinate ${n === 1 ? 'the work' : 'all of them'}.`,
    cta: 'Continue with this brief'
  },
  tiles: {
    terrace: 'Terraces & outdoor living', pool: 'Pools & natural pools', okitchen: 'Outdoor kitchens', planting: 'Landscaping & planting',
    wellness: 'Sauna & cold plunge', gym: 'Outdoor gym', shade: 'Shade & pergolas', light: 'Outdoor lighting',
    kitchen: 'Kitchens', bath: 'Bathrooms', interiors: 'Interiors', villa: 'Complete villa renovation', ext: 'Extensions & reconfiguration'
  },
  specs: {
    garden: 'Garden designer', stone: 'Stonework', poolEng: 'Pool engineer', landscape: 'Landscape architect', kitchen: 'Kitchen designer',
    mep: 'MEP engineer', irrigation: 'Irrigation', wellness: 'Wellness specialist', plumbing: 'Plumbing', electrical: 'Electrical',
    architect: 'Architect', structural: 'Structural engineer', lighting: 'Lighting designer', interior: 'Interior designer', licensing: 'Licensing'
  },

  approach: {
    eyebrow: 'OUR APPROACH', h1: 'One project.', h2: 'The right people.',
    body: 'Good projects need clear scope, the right specialists, realistic decisions and disciplined delivery.',
    steps: [
      { t: 'UNDERSTAND', d: 'Property, priorities and what needs to change.' },
      { t: 'DEVELOP', d: 'Concept, design and the right technical specialists.' },
      { t: 'DEFINE', d: 'Scope, specification, programme and stages.' },
      { t: 'BUILD', d: 'Coordinated work, reporting and decisions.' },
      { t: 'FINISH', d: 'Final details, handover and aftercare.' }
    ]
  },

  form: {
    eyebrow: 'START A PROJECT', h1: 'Tell us what you would ', h2: 'like to change.',
    body: "Share a few details and anything that shows what you have in mind — photos of the space, inspiration, sketches or plans. We'll come back to you personally.",
    steps: ['Send your enquiry and files', 'We review the property and brief', 'We arrange a conversation or site visit'],
    optional: '(optional)', required: 'Required',
    name: 'Full name', email: 'Email', phone: 'Phone or WhatsApp',
    place: 'Property location', selectArea: 'Select an area',
    work: 'What would you like done?', chooseAll: 'Choose all that apply',
    carried: 'Carried over from your project brief — adjust as needed.',
    budget: 'Estimated budget', selectRange: 'Select a range',
    when: 'Ideal timing', selectWhen: 'Select timing',
    message: 'Describe what you would like done',
    placeholder: "The space today, what isn't working, and what you'd love it to become…",
    upload: 'Upload what you want done',
    drag: 'Drag files here', or: 'or', browse: 'browse',
    uploadHint: (n, mb) => `Photos of the space, inspiration images, sketches or plans · JPG, PNG, HEIC or PDF · up to ${n} files, ${mb}MB each`,
    skipped: 'Skipped',
    notImage: n => `${n} not an image or PDF`,
    tooBig: (n, mb) => `${n} over ${mb}MB`,
    limit: n => `limit is ${n} files`,
    remove: 'Remove',
    consent: 'I agree to be contacted about my enquiry and to the privacy policy.',
    submit: 'Send enquiry',
    errors: {
      name: 'Please enter your name.', email: 'Please enter your email.', emailBad: 'Please enter a valid email address.',
      work: 'Choose at least one area.', message: 'Tell us a little about what you would like done.',
      consent: 'Please agree so we can contact you about your enquiry.'
    },
    thanks: name => `Thank you${name ? ', ' + name : ''}.`,
    thanksBody: (work, place, files) => `Your enquiry about ${work}${place ? ' in ' + place : ''} is with us${files ? `, along with ${files === 1 ? 'one file' : files + ' files'}` : ''}. We'll be in touch personally.`,
    another: 'Send another enquiry'
  },
  options: {
    work: {
      garden: 'Garden & landscaping', terrace: 'Terrace & outdoor living', pool: 'Pool or natural pool', okitchen: 'Outdoor kitchen',
      wellness: 'Sauna & cold plunge', gym: 'Outdoor gym', shade: 'Shade & pergolas', light: 'Outdoor lighting',
      kitchen: 'Kitchen', bath: 'Bathroom', interiors: 'Interiors', villa: 'Complete villa renovation',
      ext: 'Extension or reconfiguration', other: 'Something else'
    },
    place: { marbella: 'Marbella', benahavis: 'Benahavís', estepona: 'Estepona', elsewhere: 'Elsewhere on the Costa del Sol', outside: 'Outside the Costa del Sol' },
    when: { asap: 'As soon as possible', soon: 'In the next 3–6 months', year: 'Later this year', next: 'Next year', exploring: 'Just exploring for now' },
    budget: { b1: 'Under €50,000', b2: '€50,000 – €150,000', b3: '€150,000 – €500,000', b4: '€500,000 – €1M', b5: 'Over €1M', b6: 'Not sure yet' }
  },

  footer: {
    motto1: 'Transforming homes.', motto2: 'Inside and out.',
    blurb: 'Design, build and renovation across Marbella and the Costa del Sol, specialising in outdoor transformations and complete villa renovations.',
    cols: [
      { h: 'OUTDOOR LIVING', items: ['Outdoor Transformations', 'Landscaping & Gardens', 'Outdoor Kitchens', 'Pools & Natural Pools'] },
      { h: 'RENOVATIONS', items: ['Complete Villas', 'Interiors', 'Kitchens', 'Bathrooms'] },
      { h: 'AREAS', items: ['Marbella', 'Benahavís', 'Estepona', 'Costa del Sol'] }
    ],
    base: '© DOMAIRE · DESIGN · BUILD · RENOVATE',
    legal: 'Privacy · Legal notice · Cookies · Instagram · LinkedIn'
  },

  about: {
    eyebrow: 'ABOUT DOMAIRE', h1: 'Design, build and renovation —', h2: 'with the outside in mind.',
    lede: 'DOMAIRE designs, builds and renovates homes across Marbella and the Costa del Sol, with a particular specialism in exceptional outdoor spaces.',
    p1: 'We consider the relationship between house and garden, sunlight and shade, cooking and dining, planting and materials, water, lighting and the way people naturally move through a space.',
    p2: 'From a new kitchen or bathroom to a complete villa renovation, extension or substantial reconfiguration — managed as one joined-up project, with the right specialists brought together for each brief.',
    cta: 'Start a project'
  },

  lens: {
    eyebrow: 'THE CONCEPT — MOVE THE LENS', h1: 'See what your', h2: 'garden could be.',
    hintFull: 'THE FINISHED GARDEN', hintMove: 'MOVE ACROSS THE LAWN', hintTap: 'TAP TO REVEAL',
    body: 'The same villa, the same lawn. Look through the lens to see the stone pool, olive trees and terrace the concept brings to it.',
    cta: 'Start your project', reveal: 'Reveal the full transformation', back: 'Back to the lawn',
    ring: 'AFTER', concept: 'AFTER: CONCEPT VISUALISATION',
    altBefore: 'The villa before: an empty lawn', altAfter: 'The villa after: natural stone pool, olive trees and outdoor living'
  },

  modal: {
    eyebrow: 'START A PROJECT', h1: 'Thinking about your ', h2: 'garden or home?',
    body: "Get a quote or book a site visit — tell us what you'd like to change and share photos of the space.",
    cta: 'Get a quote', later: 'Maybe later', close: 'Close'
  }
};

const es = {
  meta: {
    title: 'DOMAIRE — Diseño · Construcción · Reforma · Marbella y Costa del Sol',
    aboutTitle: 'Nosotros — DOMAIRE · Diseño · Construcción · Reforma',
    description: 'DOMAIRE diseña, construye y reforma viviendas en Marbella y la Costa del Sol, con una especialización particular en espacios exteriores excepcionales.'
  },
  nav: { outdoor: 'Vida exterior', renovations: 'Reformas', projects: 'Proyectos', approach: 'Método', about: 'Nosotros' },
  header: { tag: 'DISEÑO · CONSTRUCCIÓN · REFORMA', cta: 'Iniciar un proyecto', ctaShort: 'Consultar', home: 'Inicio de DOMAIRE', lang: 'Idioma' },
  concept: 'VISUALIZACIÓN CONCEPTUAL',

  hero: {
    eyebrow: 'DISEÑO · CONSTRUCCIÓN · REFORMA — MARBELLA Y COSTA DEL SOL',
    l1: 'Transformamos hogares.', l2: 'Por dentro y por fuera.',
    body: 'DOMAIRE diseña, construye y reforma viviendas en Marbella y la Costa del Sol, con una especialización particular en espacios exteriores excepcionales.',
    cta1: 'Inicie su proyecto', cta2: 'Recorra la villa',
    video: 'Vídeo: el césped vacío de una villa se excava, se construye y se convierte en un jardín con piscina natural de piedra'
  },

  statement: {
    eyebrow: 'UNA MEJOR FORMA DE VIVIR EN CASA',
    l1: 'Un hogar ya puede ser bonito', l2: 'y aún tener más que ofrecer.',
    intro: 'El exterior es lo que nos hace memorables. Cuando la transformación pasa al interior, el mismo equipo la lleva a cabo, gestionada como un único proyecto coordinado.',
    link: 'Componga su proyecto ↓'
  },
  ways: [
    { k: 'LA TERRAZA', t: 'Una terraza puede dar mucho más de sí.' },
    { k: 'EL JARDÍN', t: 'Un jardín puede conectar con la casa.' },
    { k: 'LA COCINA', t: 'Una cocina puede abrirse a su forma de recibir.' },
    { k: 'LA VILLA COMPLETA', t: 'Toda una villa puede repensarse según cómo vive hoy.' }
  ],

  tour: {
    eyebrow: 'UN RECORRIDO POR LA VILLA',
    hintScroll: 'DESPLÁCESE PARA RECORRER LA CASA', hintTap: 'ELIJA UNA VISTA',
    chapters: [
      { k: 'TAL COMO ES', t: 'Una casa preciosa. Un jardín que apenas le aporta nada.' },
      { k: 'EL EXTERIOR, DISEÑADO', t: 'Piscina natural, sauna, baño de agua fría y cocina exterior: una sola idea completa.' },
      { k: 'PASE DENTRO', t: 'La misma mirada, llevada a través de las puertas de cristal.' },
      { k: 'EL SALÓN, DISEÑADO', t: 'Materiales serenos, cristal abierto y el jardín como parte de la estancia.' },
      { k: 'LA COCINA, DISEÑADA', t: 'La estancia que lo conecta todo, abierta directamente a la cocina exterior.' }
    ],
    alts: {
      extBefore: 'La villa tal como es: un césped abierto',
      extAfter: 'El jardín de la villa diseñado: piscina natural, sauna y baño de agua fría',
      intBefore: 'El salón tal como es',
      intAfter: 'El salón diseñado, abierto al jardín',
      kitBefore: 'La cocina tal como es',
      kitAfter: 'La cocina diseñada, con puertas de cristal hacia la cocina exterior'
    }
  },

  rooms: {
    h1: 'A veces la mejor estancia de la casa ', h2: 'no está dentro de la casa.',
    items: [
      { k: 'LA TERRAZA', t: 'Donde empiezan las mañanas.' },
      { k: 'LA PISCINA', t: 'Mucho más que la propia piscina.' },
      { k: 'LA COCINA EXTERIOR', t: 'Pensada para su forma de recibir.' },
      { k: 'EL RINCÓN DE BIENESTAR', t: 'Calor, y después frío.' },
      { k: 'LA VEGETACIÓN', t: 'Estructura, carácter y conexión.' },
      { k: 'EL GIMNASIO EXTERIOR', t: 'Entrenar al aire libre.' },
      { k: 'LA SOMBRA', t: 'Para disfrutar más tiempo fuera.' },
      { k: 'AL ANOCHECER', t: 'Cómo se siente todo cuando se pone el sol.' }
    ],
    noteK: 'VIDA EXTERIOR',
    note: 'Tenemos en cuenta la relación entre la casa y el jardín, el sol y la sombra, cocinar y comer, la vegetación y los materiales, el agua, la iluminación y la forma natural en que las personas se mueven por un espacio.',
    link: 'Descubra la vida exterior →'
  },

  day: {
    eyebrow: 'UN DÍA EN LA VILLA · RECORRA EL DÍA',
    h1: 'De la primera luz', h2: 'a la caída de la noche.',
    moments: [
      { k: 'PRIMERA LUZ', t: 'Café en la terraza antes de que empiece el día.' },
      { k: 'MEDIODÍA', t: 'Almuerzo a la sombra, a un paso de la cocina.' },
      { k: 'TARDE', t: 'La piscina, las tumbonas, la tarde larga.' },
      { k: 'HORA DORADA', t: 'Llegan los amigos. La cocina exterior toma el relevo.' },
      { k: 'AL ANOCHECER', t: 'La iluminación convierte el jardín en una estancia propia.' }
    ],
    conceptScroll: 'DESPLÁCESE A LO LARGO DEL DÍA', conceptTap: 'TOQUE UNA HORA',
    alt: 'Concepto: jardín de villa mediterránea con piscina natural de piedra, vegetación y cocina exterior'
  },

  compare: {
    eyebrow: 'CONCEPTO DESTACADO · ARRASTRE PARA COMPARAR',
    h1: 'De un césped a', h2: 'una forma de vivir.',
    body: 'La casa ya era preciosa. El jardín apenas le aportaba nada. El concepto reúne piscina, terraza de piedra, vegetación, sombra y cocina exterior en un único espacio exterior: una sola idea completa.',
    modes: { before: 'ANTES', compare: 'COMPARAR', after: 'DESPUÉS' },
    before: 'ANTES', after: 'DESPUÉS',
    altAfter: 'Después: piscina natural de piedra, vegetación, tumbonas y cocina exterior',
    altBefore: 'Antes: la misma villa con un césped abierto',
    concept: 'VISUALIZACIÓN CONCEPTUAL — NO ES UN PROYECTO TERMINADO',
    changes: [
      { t: 'Una piscina de piedra natural', d: 'Adaptada al jardín, con entrada de playa poco profunda y borde de piedra.' },
      { t: 'Una cocina exterior', d: 'Cocinar, preparar y comer bajo el olivo, conectado con la casa.' },
      { t: 'Vegetación mediterránea', d: 'Lavanda, agapantos y olivos aportan estructura y privacidad.' },
      { t: 'Lugares para quedarse más', d: 'Tumbonas, sombra e iluminación para que el jardín funcione todo el día.' }
    ]
  },

  compose: {
    eyebrow: 'QUÉ HACEMOS · COMPONGA SU PROYECTO',
    h1: 'Elija lo que le gustaría', h2: 'cambiar.',
    body: 'El exterior es por lo que se nos conoce. Cuando el trabajo pasa al interior, el mismo equipo lo continúa. Seleccione lo que quiera y le mostraremos a quién hace falta.',
    outside: 'EXTERIOR', inside: 'INTERIOR',
    yourProject: 'SU PROYECTO', element: 'elemento', elements: 'elementos',
    empty: 'Aún no ha seleccionado nada.',
    specialists: 'ESPECIALISTAS QUE REUNIMOS',
    none: 'Elija lo que le gustaría cambiar: dentro, fuera o ambos.',
    both: 'Dentro y fuera, como un único proyecto coordinado: un equipo, un calendario.',
    summary: (n, outdoor) => `${n === 1 ? 'Un especialista' : (NUM_ES[n] || n) + ' especialistas'}, ${outdoor ? 'una idea exterior' : 'una reforma'}. ${n === 1 ? 'Coordinamos el trabajo.' : 'Los coordinamos a todos.'}`,
    cta: 'Continuar con este proyecto'
  },
  tiles: {
    terrace: 'Terrazas y vida exterior', pool: 'Piscinas y piscinas naturales', okitchen: 'Cocinas exteriores', planting: 'Paisajismo y vegetación',
    wellness: 'Sauna y baño de agua fría', gym: 'Gimnasio exterior', shade: 'Sombra y pérgolas', light: 'Iluminación exterior',
    kitchen: 'Cocinas', bath: 'Baños', interiors: 'Interiorismo', villa: 'Reforma integral de villa', ext: 'Ampliaciones y redistribución'
  },
  specs: {
    garden: 'Diseñador de jardines', stone: 'Cantería', poolEng: 'Ingeniero de piscinas', landscape: 'Arquitecto paisajista', kitchen: 'Diseñador de cocinas',
    mep: 'Ingeniero de instalaciones', irrigation: 'Riego', wellness: 'Especialista en bienestar', plumbing: 'Fontanería', electrical: 'Electricidad',
    architect: 'Arquitecto', structural: 'Ingeniero de estructuras', lighting: 'Diseñador de iluminación', interior: 'Interiorista', licensing: 'Licencias'
  },

  approach: {
    eyebrow: 'NUESTRO MÉTODO', h1: 'Un proyecto.', h2: 'Las personas adecuadas.',
    body: 'Los buenos proyectos necesitan un alcance claro, los especialistas adecuados, decisiones realistas y una ejecución disciplinada.',
    steps: [
      { t: 'ENTENDER', d: 'La propiedad, las prioridades y lo que necesita cambiar.' },
      { t: 'DESARROLLAR', d: 'Concepto, diseño y los especialistas técnicos adecuados.' },
      { t: 'DEFINIR', d: 'Alcance, especificaciones, calendario y fases.' },
      { t: 'CONSTRUIR', d: 'Obra coordinada, seguimiento y decisiones.' },
      { t: 'FINALIZAR', d: 'Últimos detalles, entrega y servicio posventa.' }
    ]
  },

  form: {
    eyebrow: 'INICIAR UN PROYECTO', h1: 'Cuéntenos qué le gustaría ', h2: 'cambiar.',
    body: 'Comparta algunos detalles y todo lo que muestre lo que tiene en mente: fotos del espacio, inspiración, bocetos o planos. Le responderemos personalmente.',
    steps: ['Envíe su consulta y sus archivos', 'Revisamos la propiedad y el encargo', 'Organizamos una conversación o una visita'],
    optional: '(opcional)', required: 'Obligatorio',
    name: 'Nombre completo', email: 'Correo electrónico', phone: 'Teléfono o WhatsApp',
    place: 'Ubicación de la propiedad', selectArea: 'Seleccione una zona',
    work: '¿Qué le gustaría hacer?', chooseAll: 'Elija todas las que correspondan',
    carried: 'Traído de su selección de proyecto: ajústelo si lo necesita.',
    budget: 'Presupuesto estimado', selectRange: 'Seleccione un rango',
    when: 'Plazo ideal', selectWhen: 'Seleccione un plazo',
    message: 'Describa lo que le gustaría hacer',
    placeholder: 'El espacio hoy, lo que no funciona y en qué le gustaría que se convirtiera…',
    upload: 'Suba lo que quiere hacer',
    drag: 'Arrastre archivos aquí', or: 'o', browse: 'búsquelos',
    uploadHint: (n, mb) => `Fotos del espacio, imágenes de inspiración, bocetos o planos · JPG, PNG, HEIC o PDF · hasta ${n} archivos, ${mb} MB cada uno`,
    skipped: 'Omitidos',
    notImage: n => `${n} ${n === 1 ? 'no es una imagen ni un PDF' : 'no son imágenes ni PDF'}`,
    tooBig: (n, mb) => `${n} ${n === 1 ? 'supera' : 'superan'} los ${mb} MB`,
    limit: n => `el límite es de ${n} archivos`,
    remove: 'Quitar',
    consent: 'Acepto ser contactado en relación con mi consulta y la política de privacidad.',
    submit: 'Enviar consulta',
    errors: {
      name: 'Introduzca su nombre.', email: 'Introduzca su correo electrónico.', emailBad: 'Introduzca un correo electrónico válido.',
      work: 'Elija al menos una opción.', message: 'Cuéntenos un poco lo que le gustaría hacer.',
      consent: 'Acéptelo para que podamos contactarle en relación con su consulta.'
    },
    thanks: name => `Gracias${name ? ', ' + name : ''}.`,
    thanksBody: (work, place, files) => `Hemos recibido su consulta sobre ${work}${place ? ' en ' + place : ''}${files ? `, junto con ${files === 1 ? 'un archivo' : files + ' archivos'}` : ''}. Nos pondremos en contacto con usted personalmente.`,
    another: 'Enviar otra consulta'
  },
  options: {
    work: {
      garden: 'Jardín y paisajismo', terrace: 'Terraza y vida exterior', pool: 'Piscina o piscina natural', okitchen: 'Cocina exterior',
      wellness: 'Sauna y baño de agua fría', gym: 'Gimnasio exterior', shade: 'Sombra y pérgolas', light: 'Iluminación exterior',
      kitchen: 'Cocina', bath: 'Baño', interiors: 'Interiorismo', villa: 'Reforma integral de villa',
      ext: 'Ampliación o redistribución', other: 'Otra cosa'
    },
    place: { marbella: 'Marbella', benahavis: 'Benahavís', estepona: 'Estepona', elsewhere: 'Otra zona de la Costa del Sol', outside: 'Fuera de la Costa del Sol' },
    when: { asap: 'Lo antes posible', soon: 'En los próximos 3–6 meses', year: 'Más adelante este año', next: 'El año que viene', exploring: 'Solo estoy explorando' },
    budget: { b1: 'Menos de 50.000 €', b2: '50.000 € – 150.000 €', b3: '150.000 € – 500.000 €', b4: '500.000 € – 1 M€', b5: 'Más de 1 M€', b6: 'Aún no lo sé' }
  },

  footer: {
    motto1: 'Transformamos hogares.', motto2: 'Por dentro y por fuera.',
    blurb: 'Diseño, construcción y reforma en Marbella y la Costa del Sol, especializados en transformaciones exteriores y reformas integrales de villas.',
    cols: [
      { h: 'VIDA EXTERIOR', items: ['Transformaciones exteriores', 'Paisajismo y jardines', 'Cocinas exteriores', 'Piscinas y piscinas naturales'] },
      { h: 'REFORMAS', items: ['Villas completas', 'Interiorismo', 'Cocinas', 'Baños'] },
      { h: 'ZONAS', items: ['Marbella', 'Benahavís', 'Estepona', 'Costa del Sol'] }
    ],
    base: '© DOMAIRE · DISEÑO · CONSTRUCCIÓN · REFORMA',
    legal: 'Privacidad · Aviso legal · Cookies · Instagram · LinkedIn'
  },

  about: {
    eyebrow: 'SOBRE DOMAIRE', h1: 'Diseño, construcción y reforma,', h2: 'pensando en el exterior.',
    lede: 'DOMAIRE diseña, construye y reforma viviendas en Marbella y la Costa del Sol, con una especialización particular en espacios exteriores excepcionales.',
    p1: 'Tenemos en cuenta la relación entre la casa y el jardín, el sol y la sombra, cocinar y comer, la vegetación y los materiales, el agua, la iluminación y la forma natural en que las personas se mueven por un espacio.',
    p2: 'Desde una nueva cocina o un baño hasta la reforma integral de una villa, una ampliación o una redistribución importante, gestionado como un único proyecto coordinado, con los especialistas adecuados reunidos para cada encargo.',
    cta: 'Iniciar un proyecto'
  },

  lens: {
    eyebrow: 'EL CONCEPTO — MUEVA LA LENTE', h1: 'Descubra lo que su', h2: 'jardín podría ser.',
    hintFull: 'EL JARDÍN TERMINADO', hintMove: 'RECORRA EL CÉSPED', hintTap: 'TOQUE PARA DESCUBRIR',
    body: 'La misma villa, el mismo césped. Mire a través de la lente para ver la piscina de piedra, los olivos y la terraza que aporta el concepto.',
    cta: 'Inicie su proyecto', reveal: 'Ver la transformación completa', back: 'Volver al césped',
    ring: 'DESPUÉS', concept: 'DESPUÉS: VISUALIZACIÓN CONCEPTUAL',
    altBefore: 'La villa antes: un césped vacío', altAfter: 'La villa después: piscina natural de piedra, olivos y vida exterior'
  },

  modal: {
    eyebrow: 'INICIAR UN PROYECTO', h1: '¿Está pensando en su ', h2: 'jardín o su casa?',
    body: 'Pida un presupuesto o reserve una visita: cuéntenos qué le gustaría cambiar y comparta fotos del espacio.',
    cta: 'Pedir presupuesto', later: 'Quizá más tarde', close: 'Cerrar'
  }
};

const NUM_EN = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen'];
const NUM_ES = ['Cero', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince'];

export const CONTENT = { en, es };
export const LANGS = [['en', 'EN', 'English'], ['es', 'ES', 'Español']];
