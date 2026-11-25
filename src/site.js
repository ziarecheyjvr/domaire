// Company details used by the legal pages and footer.
// Company source: https://os.worldie.ai/privacy (5 October 2026). A null value shows as a highlighted [placeholder].
export const COMPANY = {
  name: { en: 'KLB Solutions FZCO, trading as DOMAIRE', es: 'KLB Solutions FZCO, que opera con el nombre comercial DOMAIRE' },
  registration: 'DSO-FZCO-19439',
  address: {
    en: 'Unit No. 21089-001, IFZA Business Park, DDP, Dubai, United Arab Emirates',
    es: 'Unit No. 21089-001, IFZA Business Park, DDP, Dubái, Emiratos Árabes Unidos'
  },
  email: 'hello@domaire.co',
  retention: { en: '12 months', es: '12 meses' }
};

// Links appear in the footer once a URL is set
export const SOCIAL = {
  Facebook: 'https://www.facebook.com/domaire',
  Instagram: 'https://www.instagram.com/domaire.co',
  YouTube: 'https://www.youtube.com/@domaire',
  LinkedIn: ''
};

// Enquiry form. The Turnstile site key is public; its secret stays on the server (see server/).
export const FORM = {
  endpoint: '/api/enquiry.php',
  // '1x00000000000000000000AA' is Cloudflare's always-pass test key, for local development only
  turnstileSiteKey: import.meta.env.DEV ? '1x00000000000000000000AA' : ''
};
