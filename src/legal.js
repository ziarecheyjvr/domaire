// Legal pages in English and Spanish. {tokens} are filled from COMPANY in site.js.
// Drafts: have them reviewed by a legal adviser before launch.
const ID_EN = ['Company: {name}', 'Tax ID (NIF/CIF): {taxId}', 'Registered address: {address}', 'Email: {email}', 'Phone: {phone}'];
const ID_ES = ['Empresa: {name}', 'NIF/CIF: {taxId}', 'Domicilio social: {address}', 'Correo electrónico: {email}', 'Teléfono: {phone}'];

export const LEGAL = {
  en: {
    updated: 'Last updated: 23 November 2026', eyebrow: 'LEGAL', back: '← Back to the site',
    labels: { name: 'legal name', taxId: 'tax ID', address: 'registered address', registry: 'commercial registry details', email: 'contact email', phone: 'phone', host: 'hosting provider', retention: 'retention period' },
    privacy: {
      title: 'Privacy policy',
      sections: [
        ['Who is responsible for your data', ['The controller of the personal data collected through this website is:'], ID_EN],
        ['What we collect', ['When you send an enquiry we receive what you choose to give us:'], ['Name, email address and, if provided, phone or WhatsApp number', 'Property location, the work you are interested in, budget and timing', 'Your message and any photos, sketches or plans you upload'], 'Please avoid uploading images that show other people or information we do not need.'],
        ['Why we use it and our legal basis', ['We use your details to answer your enquiry, prepare a quote and arrange a conversation or visit. The legal basis is your consent and, where you ask for a quote, the steps taken at your request before entering into a contract (Article 6(1)(a) and (b) GDPR). We do not use your enquiry for marketing without asking you separately.']],
        ['How long we keep it', ['We keep enquiries for {retention} after our last contact, or for longer if you become a client or the law requires it.']],
        ['Who can see it', ['Your details are not sold. They may be handled by providers who process data on our behalf, such as our website host ({host}) and email provider, and shared with project specialists only as needed to answer your enquiry.', 'This website loads its typefaces from Google Fonts. Your browser therefore sends your IP address to Google, which may process it outside the European Economic Area.']],
        ['Your rights', ['You can ask to access, correct, delete, restrict or transfer your data, object to its use, or withdraw consent at any time, by writing to {email}. You can also complain to the Spanish Data Protection Agency (Agencia Española de Protección de Datos, www.aepd.es).']]
      ]
    },
    legal: {
      title: 'Legal notice',
      sections: [
        ['Website owner', ['In accordance with Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE), the owner of this website is:'], [...ID_EN, 'Registry details: {registry}']],
        ['Use of this website', ['This website presents DOMAIRE and its services. By using it you agree to do so lawfully and without damaging the site or the rights of others.']],
        ['Concept images', ['Images and films on this website marked as concept visualisations illustrate ideas and are not completed projects. Nothing on the website is a binding offer; scope, price and programme are agreed individually in writing.']],
        ['Intellectual property', ['The texts, designs, images and brand elements on this website belong to their owner or are used under licence, and may not be reproduced without permission.']],
        ['Links and liability', ['We take reasonable care to keep this website accurate and available, but cannot guarantee that it is always free of errors or interruptions. We are not responsible for the content of external websites.']],
        ['Applicable law', ['This notice is governed by Spanish law. Consumers keep the protection and the courts that the law gives them.']]
      ]
    },
    cookies: {
      title: 'Cookies',
      sections: [
        ['What this website stores', ['This website does not set advertising or analytics cookies. It saves two small preferences in your browser:'], ['domaire-lang: remembers your language until you clear your browser data', 'domaire-quote-modal-seen: avoids repeating the quote invitation, and is deleted when you close the tab'], 'Neither identifies you, and neither is sent to us.'],
        ['Third parties', ['Typefaces are loaded from Google Fonts, which receives your IP address when the page loads. See the privacy policy for details.']],
        ['Managing your preferences', ['You can delete this information at any time in your browser settings. The website keeps working; it simply forgets your preferences.']],
        ['Changes', ['If we add analytics or similar tools, we will update this page and ask for your consent first where required.']]
      ]
    }
  },
  es: {
    updated: 'Última actualización: 23 de noviembre de 2026', eyebrow: 'LEGAL', back: '← Volver al sitio',
    labels: { name: 'razón social', taxId: 'NIF/CIF', address: 'domicilio social', registry: 'datos registrales', email: 'correo de contacto', phone: 'teléfono', host: 'proveedor de alojamiento', retention: 'plazo de conservación' },
    privacy: {
      title: 'Política de privacidad',
      sections: [
        ['Responsable del tratamiento', ['El responsable de los datos personales recogidos a través de este sitio web es:'], ID_ES],
        ['Qué datos recogemos', ['Cuando envía una consulta recibimos lo que usted decide facilitarnos:'], ['Nombre, correo electrónico y, si lo indica, teléfono o WhatsApp', 'Ubicación de la propiedad, trabajos de interés, presupuesto y plazo', 'Su mensaje y las fotos, bocetos o planos que adjunte'], 'Evite adjuntar imágenes en las que aparezcan otras personas o información que no necesitemos.'],
        ['Para qué los usamos y base jurídica', ['Utilizamos sus datos para responder a su consulta, preparar un presupuesto y organizar una conversación o visita. La base jurídica es su consentimiento y, si solicita un presupuesto, la aplicación de medidas precontractuales a petición suya (artículo 6.1.a y b del RGPD). No utilizamos su consulta con fines comerciales sin preguntarle por separado.']],
        ['Cuánto tiempo los conservamos', ['Conservamos las consultas durante {retention} desde nuestro último contacto, o más tiempo si pasa a ser cliente o la ley lo exige.']],
        ['Quién puede acceder a ellos', ['No vendemos sus datos. Pueden tratarlos proveedores que actúan por cuenta nuestra, como el alojamiento web ({host}) y el correo electrónico, y compartirse con especialistas del proyecto solo cuando sea necesario para responder a su consulta.', 'Este sitio web carga sus tipografías desde Google Fonts. Por ello, su navegador envía su dirección IP a Google, que puede tratarla fuera del Espacio Económico Europeo.']],
        ['Sus derechos', ['Puede solicitar el acceso, la rectificación, la supresión, la limitación o la portabilidad de sus datos, oponerse a su uso o retirar su consentimiento en cualquier momento escribiendo a {email}. También puede reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).']]
      ]
    },
    legal: {
      title: 'Aviso legal',
      sections: [
        ['Titular del sitio web', ['De conformidad con la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), el titular de este sitio web es:'], [...ID_ES, 'Datos registrales: {registry}']],
        ['Uso del sitio web', ['Este sitio web presenta DOMAIRE y sus servicios. Al utilizarlo, se compromete a hacerlo de forma lícita y sin dañar el sitio ni los derechos de terceros.']],
        ['Imágenes conceptuales', ['Las imágenes y vídeos señalados como visualizaciones conceptuales ilustran ideas y no son proyectos terminados. Nada en el sitio web constituye una oferta vinculante; el alcance, el precio y el calendario se acuerdan individualmente por escrito.']],
        ['Propiedad intelectual', ['Los textos, diseños, imágenes y elementos de marca de este sitio web pertenecen a su titular o se utilizan bajo licencia, y no pueden reproducirse sin permiso.']],
        ['Enlaces y responsabilidad', ['Procuramos que este sitio web sea exacto y esté disponible, pero no podemos garantizar que esté siempre libre de errores o interrupciones. No somos responsables del contenido de sitios web externos.']],
        ['Legislación aplicable', ['Este aviso se rige por la legislación española. Los consumidores conservan la protección y los tribunales que la ley les reconoce.']]
      ]
    },
    cookies: {
      title: 'Cookies',
      sections: [
        ['Qué guarda este sitio web', ['Este sitio web no instala cookies publicitarias ni de análisis. Guarda dos pequeñas preferencias en su navegador:'], ['domaire-lang: recuerda su idioma hasta que borre los datos del navegador', 'domaire-quote-modal-seen: evita repetir la invitación a pedir presupuesto y se elimina al cerrar la pestaña'], 'Ninguna le identifica ni se nos envía.'],
        ['Terceros', ['Las tipografías se cargan desde Google Fonts, que recibe su dirección IP al abrir la página. Consulte la política de privacidad.']],
        ['Cómo gestionar sus preferencias', ['Puede eliminar esta información en cualquier momento en los ajustes de su navegador. El sitio seguirá funcionando; simplemente olvidará sus preferencias.']],
        ['Cambios', ['Si incorporamos herramientas de análisis o similares, actualizaremos esta página y le pediremos antes su consentimiento cuando sea necesario.']]
      ]
    }
  }
};
