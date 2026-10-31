import { portfolio } from './portfolio'

// ---------------------------------------------------------------------------
// Site-wide settings. Every number on the site comes from this file, so a
// figure is changed in exactly one place. In V2 the admin panel replaces this
// file with an API call — the components do not change.
// Items marked CONFIRM need a final check with the GLBCRI team.
// ---------------------------------------------------------------------------

export const site = {
  name: 'GLBCRI',
  fullName: 'GL Bajaj Centre for Research and Incubation',
  tagline: 'The innovation hub of GL Bajaj Group, Greater Noida',
  address: {
    lines: ['Academic Block-1, 2nd Floor', 'Plot No. 2, APJ Abdul Kalam Road', 'Knowledge Park III, Greater Noida', 'Uttar Pradesh 201306'],
    mapUrl: 'https://maps.google.com/?q=GL+Bajaj+Institute+of+Technology+and+Management+Greater+Noida',
    mapEmbed: 'https://maps.google.com/maps?q=GL%20Bajaj%20Institute%20of%20Technology%20and%20Management%2C%20Greater%20Noida&z=15&output=embed',
  },
  phone: '+91 78350 05147',
  phoneHref: 'tel:+917835005147',
  whatsappHref: 'https://wa.me/917835005147',
  email: 'glbcri@glbitm.ac.in',
  officeHours: [
    { days: 'Monday – Friday', time: '9:00 AM – 5:00 PM' }, // CONFIRM
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  // CONFIRM: a Calendly / Google Calendar booking link for the 15-min call.
  bookingUrl: 'mailto:glbcri@glbitm.ac.in?subject=Book%20a%2015-min%20call',
  replyPromise: '7 working days', // CONFIRM

  // How "Apply" works:
  //  'incubexa' → the Apply page explains the steps, then hands off to GLBCRI's existing
  //               Incubexa intake form (what the team uses today).
  //  'native'   → the site's own 3-step form (src/pages/Apply.jsx → lib/api.js).
  applyMode: 'incubexa',
  incubexaUrl: 'https://app.incubexa.com/intake/4b7abb89636c4f0984711cd5f7031d9a',

  social: {
    instagram: { handle: 'glbajaj_cri', url: 'https://www.instagram.com/glbajaj_cri/' },
    linkedin: 'https://www.linkedin.com/company/gl-bajaj-center-for-research-and-incubation/',
    youtube: 'https://www.youtube.com/@GLBCRI',
    facebook: 'https://www.facebook.com/glbcri',
  },

  ecosystemLinks: [
    { label: 'Institution’s Innovation Council (IIC)', href: 'https://www.glbitm.org' },
    { label: 'E-Cell', href: 'https://www.glbitm.org' },
    { label: 'IPR Cell', href: 'https://www.glbitm.org' },
    { label: 'Start in UP', href: 'https://startinup.up.gov.in' },
    { label: 'GLBITM Home', href: 'https://www.glbitm.org' },
  ],
}

// Headline numbers. The startup count comes from the official portfolio list
// (src/data/portfolio.js), so it updates itself when a startup is added.
export const stats = [
  { value: `${portfolio.length}`, label: 'Startups incubated' },
  { value: '₹6.56 Cr+', label: 'Raised by our startups' },
  { value: '₹10 L', label: 'Prototype grant, up to', prefix: 'Up to' },
  { value: '50%+', label: 'Startups with a woman founder' },
  { value: '447', label: 'Patents published' },
]

export const ipStats = [
  { value: '447', label: 'Patents published' },
  { value: '24', label: 'Patents granted' },
  { value: '17', label: 'Design patents' },
  { value: '6', label: 'Copyrights' },
]

// Newest first.
export const recognitions = [
  { year: '2026', title: 'AKTU Leader Incubator Award 2026', note: 'Received on 10 September 2026' },
  { year: '2026', title: 'Host Institute, MSME Idea Hackathon 6.0', note: 'Ministry of MSME, up to ₹15 lakh per idea' },
  { year: '2023', title: 'DST NIDHI PRAYAS Centre', note: '₹3 crore grant from the Department of Science & Technology' },
  { year: '—', title: 'MSME-recognised Business Incubator', note: 'Ministry of MSME, Government of India' },
  { year: '2019', title: 'Startin UP recognised incubator', note: 'Uttar Pradesh startup portal' },
  { year: '2021', title: 'IIC 5-star rating', note: 'Ministry of Education’s Innovation Cell, IIC annual report 2020–21' },
  { year: '2021', title: 'ARIIA 2021 — Excellent band', note: 'Private technical colleges' },
  { year: '2022', title: 'SIRO recognition', note: 'Scientific & Industrial Research Organisation, Government of India' },
]

export const partnerLogos = ['MSME', 'DST NIDHI PRAYAS', 'Startin UP', 'AKTU Innovation Hub', 'IIC · Ministry of Education', 'NVIDIA Lab']

// Recognition logos from glbcri.org. `hero: true` ones appear in the hero strip.
export const recognitionLogos = [
  { src: '/images/glbcri/rec-msme.jpg', alt: 'Ministry of MSME, Government of India', hero: true },
  { src: '/images/glbcri/rec-nidhi-prayas.jpg', alt: 'DST NIDHI PRAYAS', hero: true },
  { src: '/images/glbcri/rec-startinup.jpg', alt: 'Start in UP, a Government of UP initiative', hero: true },
  { src: '/images/glbcri/rec-iic.jpg', alt: "Institution's Innovation Council", hero: true },
  { src: '/images/glbcri/rec-aicte.jpg', alt: 'AICTE', hero: true },
  { src: '/images/glbcri/rec-startupindia.jpg', alt: 'Startup India', hero: true },
  { src: '/images/glbcri/rec-nirf.jpg', alt: 'NIRF Innovation, Ministry of Education' },
  { src: '/images/glbcri/rec-moe.jpg', alt: 'Ministry of Education, Government of India' },
]
