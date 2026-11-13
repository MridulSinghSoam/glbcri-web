// Gallery, newsletters and press — everything the "Events & Media" tabs show.
// V2: the admin panel will write to these lists instead of this file.
//
// photos[]  → only images that are bundled in public/images/glbcri/gallery/.
//             An album with no bundled photos still shows (branded cover + link to the old page).
// source    → the page on the current glbcri.org site the album came from.

const G = '/images/glbcri/gallery/'
const OLD = 'https://glbcri.org/'
const p = (slug, nums) => nums.map((n) => `${G}${slug}-${n}.jpg`)

export const albumTypes = {
  participation: 'Where we showcased',
  organized: 'Programs we ran',
}

export const albums = [
  // ── Where we showcased (Participation.php) ──
  {
    slug: 'gorakhpur-trade-show-2024',
    type: 'participation',
    title: 'Showcasing startups at Gorakhpur Trade Show, GIDA',
    when: '30 Nov – 1 Dec 2024',
    date: '2024-11-30',
    place: 'Gorakhpur Industrial Development Authority',
    summary:
      'Two GLBCRI startups — Dream Provider Pvt. Ltd. and Youthbuzz Educom LLP — were selected by Innovation Hub to present at the Gorakhpur Trade Show, with support from the StartinUP team.',
    startups: ['Dream Provider', 'Youthbuzz Educom'],
    photos: p('gida', [1, 3]),
    source: OLD + 'Participation.php',
  },
  {
    slug: 'bandiz-cyber-forensics-conference',
    type: 'participation',
    title: 'Bandiz Technoz at the Cyber Security & Forensics Conference',
    when: '2024',
    date: '2024-10-01',
    place: 'UP State Institute of Forensic Science, Lucknow',
    summary:
      'Our incubatee Bandiz Technoz Pvt. Ltd. ran a Data Privacy Centre stall at the conference on forensics and cyber security under the new criminal laws, facilitated by Innovation Hub UP.',
    startups: ['Bandiz Technoz'],
    photos: p('bandiz', [1, 2]),
    source: OLD + 'Participation.php',
  },
  {
    slug: 'raj-bhawan-startup-expo-2024',
    type: 'participation',
    title: 'HKVBenaras at the Raj Bhawan Startup Expo',
    when: '31 Jul 2024',
    date: '2024-07-31',
    place: 'Raj Bhawan, Lucknow',
    summary:
      'Incubatee HKVBenaras (Hath Kargha Vastra Benaras) presented its D2C brand reviving Banarasi silk, alongside its Hastkala Pramanak product-verification tool. Supported by AKTU and Innovation Hub UP.',
    startups: ['HKVBenaras'],
    photos: p('expo', [2, 4, 6, 7]),
    source: OLD + 'Participation.php',
  },
  {
    slug: 'bhashini-program',
    type: 'participation',
    title: 'Students at the Bhashini Program, Government of India',
    when: '2024',
    date: '2024-06-01',
    place: 'Dr. Ambedkar Bhawan, New Delhi',
    summary: 'Students joined the Government of India’s Bhashini programme on language technology and digital inclusion.',
    photos: p('bhashini', [1]),
    source: OLD + 'Participation.php',
  },
  {
    slug: 'msme-technology-centre-2024',
    type: 'participation',
    title: 'Six startups at the MSME Technology Centre inauguration',
    when: '14 Feb 2024',
    date: '2024-02-14',
    place: 'MSME Technology Centre, Greater Noida',
    summary: 'Six GLBCRI startups exhibited at the inauguration of the MSME Technology Centre and met industry representatives.',
    photos: p('msme', [1, 2, 3, 5]),
    source: OLD + 'Participation.php',
  },
  {
    slug: 'varanasi-investor-startup-summit-2024',
    type: 'participation',
    title: 'Co-sponsoring the Varanasi Investor Startup Summit',
    when: '10 – 11 Feb 2024',
    date: '2024-02-10',
    place: 'Varanasi',
    // The old site repeats the Bhashini text under this heading — this summary is written from the title. CONFIRM.
    summary: 'GLBCRI collaborated with and sponsored the Varanasi Investor Startup Summit 2024, connecting founders with investors from the region.',
    photos: p('varanasi', [1]),
    source: OLD + 'Participation.php',
  },
  {
    slug: 'isbacon-2023',
    type: 'participation',
    title: 'GLBITM at ISBACON 2023',
    when: '2023',
    date: '2023-10-01',
    place: 'Mumbai',
    summary: 'The team attended ISBACON 2023, the national conference of the Indian STEPs and Business Incubators Association.',
    photos: p('isbacon', [1, 2, 3, 6, 7]),
    source: OLD + 'Participation.php',
  },
  {
    slug: 'iisf-faridabad',
    type: 'participation',
    title: 'Startups at the India International Science Festival',
    when: 'Jan 2024',
    date: '2024-01-17',
    place: 'Faridabad',
    summary:
      'Our startups showcased their work at IISF, organised by the Ministries of Science & Technology and Earth Sciences, DoS and DAE with Vijnana Bharati.',
    photos: p('iisf', [1, 2, 3, 4, 5, 6, 7]),
    source: OLD + 'Participation.php',
  },

  // ── Programs we ran (Organized-Programs.php) ──
  {
    slug: 'liftoff-pre-incubation',
    type: 'organized',
    title: 'LiftOff Pre-Incubation Program',
    when: 'Jul – Aug 2025',
    date: '2025-07-14',
    place: 'GLBCRI, Greater Noida + online',
    // Old page text says ₹1 lakh of soft-infra benefits; the LiftOff poster says "up to ₹10 lakh". CONFIRM.
    summary:
      'An 8-week pre-incubation program for early founders turning an idea or MVP into a venture: soft-infrastructure benefits, demo-day grants, mentors, funding access and co-working, delivered “phygitally”.',
    cta: { label: 'Apply for pre-incubation', to: '/apply?program=pre-incubation' },
    photos: p('liftoff', [1, 2, 3, 4, 5, 6, 7, 8, 9]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'pitch-deck-competition-2025',
    type: 'organized',
    title: 'Startup Pitch Deck Competition 2025',
    when: '23 Aug 2025',
    date: '2025-08-23',
    place: 'GLBCRI, Greater Noida',
    summary: '25 teams and 80+ student innovators pitched, organised by E-Cell under NEC as part of IIT Bombay’s Eureka! B-Plan competition.',
    photos: p('pitchdeck', [1, 2, 3, 4, 5, 6, 7]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'cheers-to-peers',
    type: 'organized',
    title: 'Cheers to Peers — founders’ luncheon',
    when: '2025',
    date: '2025-07-01',
    place: 'GL Bajaj Institute of Technology & Management',
    summary: 'A luncheon bringing founders, investors and ecosystem enablers together, with ecosystem partner TiE Delhi-NCR.',
    photos: p('cheers', [1, 2, 3, 4, 5]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'patent-cell-exposure-visit',
    type: 'organized',
    title: 'Exposure visit to GLBCRI & the Patent Cell',
    when: '16 May 2025',
    date: '2025-05-16',
    place: 'GLBCRI, Greater Noida',
    summary: 'Second-year CS-DS students toured the incubator and Patent Cell to learn how IP is created and protected.',
    photos: p('exposure', [1, 2]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'cultivating-innovation-2025',
    type: 'organized',
    title: 'Cultivating the Spirit of Innovation & Entrepreneurship',
    when: '25 – 26 Apr 2025',
    date: '2025-04-25',
    place: 'GLBITM',
    summary: 'A two-day introduction to startups and leadership for first-year students, with talks from founders and academics.',
    photos: p('cultivating', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'safer-internet-day-2025',
    type: 'organized',
    title: 'Safer Internet Day session',
    when: '11 Feb 2025',
    date: '2025-02-11',
    place: 'GLBITM, with CSE-AI',
    summary: 'A session on cyber safety, responsible digital habits and online security for students and faculty.',
    photos: p('safer', [1, 2]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'revive-and-thrive-2024',
    type: 'organized',
    title: '“Revive and Thrive” competition',
    when: '13 Dec 2024',
    date: '2024-12-13',
    place: 'GLBCRI, Greater Noida',
    summary: '30 teams pitched revival strategies for defunct companies — sponsored by our incubated startup Digimoga.',
    event: 'revive-and-thrive-2024',
    photos: p('revive', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'entrepreneurship-interaction-2024',
    type: 'organized',
    title: 'Entrepreneurship & innovation interaction',
    when: 'Dec 2024',
    date: '2024-12-14',
    place: 'GLBCRI, Greater Noida',
    summary: 'An open conversation on entrepreneurship, innovation and future opportunities.',
    photos: p('interaction', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'startup-finance-seminar-2024',
    type: 'organized',
    title: 'Seminar: setting up startups & financial support',
    when: 'Dec 2024',
    date: '2024-12-06',
    place: 'GLBITM, Electrical Engineering',
    summary: 'How to set up a startup and which financial support schemes students can use.',
    photos: p('seminar', [1, 2]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'ipr-basics-2024',
    type: 'organized',
    title: 'Basics of IPR for innovators & entrepreneurs',
    when: '27 Nov 2024',
    date: '2024-11-27',
    place: 'GLBCRI, Greater Noida',
    summary: 'IPR fundamentals and why protecting your idea early matters.',
    photos: p('ipr', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'yuva-viksit-bharat',
    type: 'organized',
    title: 'YUVA workshop for Viksit Bharat',
    when: 'Nov 2024',
    date: '2024-11-20',
    place: 'GLBITM, with UP Electronics Corporation Ltd.',
    summary: 'A workshop with CSE-AIML and UPLC to empower young entrepreneurs under the YUVA initiative.',
    photos: p('yuva', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'innovative-leap-3',
    type: 'organized',
    title: 'Innovative Leap 3.0: Prototyping the Future',
    when: '10 Aug 2024',
    date: '2024-08-10',
    place: 'GLBCRI, Greater Noida',
    summary: 'A hands-on session taking founders from idea to prototype, open to all innovators.',
    photos: p('leap', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'atl-school-visit-2024',
    type: 'organized',
    title: 'Mentee schools’ Atal Tinkering Lab visit',
    when: '2024',
    date: '2024-07-01',
    place: 'GLBITM',
    summary: 'Three mentee schools explored the bootcamp, incubation centre and Centre of Excellence.',
    photos: p('atl', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'additive-manufacturing-pcb-training',
    type: 'organized',
    title: 'Additive manufacturing & PCB design training',
    when: '2024',
    date: '2024-04-01',
    place: 'GLBITM, with CDAD experts',
    summary: 'Two days of hands-on training for 120+ participants, sponsored by DST NIDHI PRAYAS with the AVITHA Club and ECE.',
    photos: p('cdad', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'ideation-felicitation-2024',
    type: 'organized',
    title: 'Startup Ideation Competition felicitation',
    when: '28 Feb 2024',
    date: '2024-02-28',
    place: 'GLBITM',
    summary: 'Winners and jury of the Startup Ideation Competition were honoured, with an address by BrainSaas Technologies’ co-founder.',
    photos: p('ideation', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'national-science-day-2024',
    type: 'organized',
    title: 'National Science Day & Startup Idea Competition',
    when: 'Feb 2024',
    date: '2024-02-27',
    place: 'GLBITM',
    summary: 'Student startup ideas competed on National Science Day; winners came from ECE, IT and CS-DS.',
    photos: p('scienceday', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'national-youth-day-2024',
    type: 'organized',
    title: 'National Youth Day celebration',
    when: '12 Jan 2024',
    date: '2024-01-12',
    place: 'GLBITM',
    summary: 'A keynote on perseverance, social responsibility and entrepreneurial paths for societal impact.',
    photos: p('youthday', [1]),
    source: OLD + 'Organized-Programs.php',
  },
  {
    slug: 'energy-conservation-day',
    type: 'organized',
    title: 'Energy Conservation Day student panel',
    when: 'Dec 2023',
    date: '2023-12-14',
    place: 'GLBITM',
    summary: 'Students from different branches debated the link between energy use and climate change.',
    photos: p('energy', [1]),
    source: OLD + 'Organized-Programs.php',
  },
].sort((a, b) => b.date.localeCompare(a.date))

// Hand-picked photos for the "Recent moments" mosaic on the Gallery page: [album slug, photo index]
export const featuredPhotos = [
  ['msme-technology-centre-2024', 0],
  ['pitch-deck-competition-2025', 0],
  ['raj-bhawan-startup-expo-2024', 2],
  ['isbacon-2023', 2],
  ['cheers-to-peers', 4],
  ['iisf-faridabad', 2],
  ['bandiz-cyber-forensics-conference', 0],
  ['revive-and-thrive-2024', 0],
  ['gorakhpur-trade-show-2024', 1],
]

export const newsletters = [
  {
    slug: '2025-26',
    title: 'Annual Newsletter 2025–26',
    period: '2025 – 2026',
    format: 'Flipbook',
    blurb: 'The full year at GLBCRI — new startups, grants, events and wins.',
    url: OLD + 'newsletter/Newsletter2025%E2%80%9326/',
    latest: true,
  },
  {
    slug: 'q1-apr-jun-2025',
    title: 'Quarter 1 · Apr – Jun 2025',
    period: 'Apr – Jun 2025',
    format: 'PDF',
    blurb: 'Quarterly round-up of cohorts, programs and startup news.',
    url: OLD + 'download/GLBCRI-Newsletter-Quarter-Apr-Jun%202025.pdf',
  },
  {
    slug: 'q4-jan-mar-2025',
    title: 'Quarter 4 · Jan – Mar 2025',
    period: 'Jan – Mar 2025',
    format: 'PDF',
    blurb: 'Quarterly round-up of cohorts, programs and startup news.',
    url: OLD + 'download/GLBCRI-Newsletter-Quarter-Jan-March-2025.pdf',
  },
]

// Press clippings from Media.php, grouped by story. Captions are English summaries of the Hindi headlines.
// 3 clippings from the old page are left out because their mastheads/photos feature public figures.
const P = '/images/glbcri/press/'
const clip = (file, caption, paper) => ({ id: file, src: `${P}${file}.jpg`, caption, paper })
export const pressGroups = [
  {
    slug: 'research-grant-2025',
    title: '₹14.08 lakh research grant from CST, UP',
    when: 'Sep 2025',
    items: [
      clip('100925-1', 'GL Bajaj ECE department receives ₹14.08 lakh research grant', 'Janta Ki Khoj'),
      clip('100925-2', 'Research grant from the Council of Science & Technology, UP', 'Avadhoot'),
      clip('100925-3', 'GL Bajaj gets ₹14 lakh research grant', 'Durgam Khabar'),
      clip('100925-4', '₹14.08 lakh grant for a three-year research project', 'Future Line Times'),
    ],
  },
  {
    slug: 'up-trade-show-2024',
    title: 'Seven startups at the UP International Trade Show',
    when: 'Sep 2024',
    items: [
      clip('01032024-11', 'Seven GL Bajaj startups join the UP International Trade Show', 'Loktantra Vani'),
      clip('01032024-12', 'Seven startups showcased at the trade show', 'Jai Hind Janab'),
      clip('10', 'Incubated startup’s AI simulator trains for combat strategy', 'Noida Times (NBT)'),
      clip('11', 'Students’ voice-controlled wheelchair for the specially-abled', 'Noida Times (NBT)'),
    ],
  },
  {
    slug: 'national-startup-summit-2024',
    title: 'National Startup Summit 2024 at GLBCRI',
    when: 'Apr 2024',
    items: [
      clip('01032024-9', 'Two-day National Startup Summit 2024 inaugurated at GLBCRI', 'Janta Ki Khoj'),
      clip('2', '“Focus on startups is essential” — Digital India CEO at the summit', 'Dainik Hint'),
      clip('3', '300+ startups at the two-day summit', 'Amar Ujala'),
    ],
  },
  {
    slug: 'msme-vendor-development-2024',
    title: 'MSME Vendor Development Programme',
    when: 'Mar 2024',
    items: [
      clip('01032024-8', 'Two-day Vendor Development Programme opens at GL Bajaj', 'Future Line Times'),
      clip('01032024-5', 'Entrepreneurs briefed on solutions across sectors', 'Janta Ki Khoj'),
      clip('4', 'How to start an enterprise, explained', 'Hindustan'),
      clip('12', 'MSME ministry’s vendor programme concludes', 'Deshbandhu'),
    ],
  },
  {
    slug: 'national-science-day-2024',
    title: 'National Science Day & Startup Idea Competition',
    when: 'Mar 2024',
    items: [
      clip('01032024-1', 'National Science Day 2024 celebrated by GLBITM and GLBIMR', 'The Morning Mints'),
      clip('01032024-4', 'Grand celebration of National Science Day 2024', 'Aadhunik Samachar'),
    ],
  },
  {
    slug: 'varanasi-startup-summit-2024',
    title: 'Varanasi Startup Summit 2024 with BHU',
    when: 'Feb 2024',
    items: [
      clip('01032024-2', 'GLBCRI co-hosts two-day Startup Summit with BHU’s Atal Incubation Centre', 'Janta Ki Khoj'),
      clip('01032024-3', '80 startups pitch for investment at the summit', 'Sach Kahoon'),
    ],
  },
  {
    slug: 'workshops',
    title: 'Workshops & programmes',
    when: '2024',
    items: [
      clip('01032024-6', 'GL Bajaj teams in the Ministry of Education’s Yukti 2024 challenge', 'Janta Ki Khoj'),
      clip('01032024-7', 'Online women entrepreneurship development programme', 'Dainik Bhaskar'),
      clip('01032024-10', 'One-day entrepreneur dialogue session at GLBCRI', 'The Morning Mints'),
      clip('5', 'Technology-based entrepreneurship development programme (NSTEDB, DST)', 'Yug Karvat'),
      clip('9', 'Supercomputing workshop to empower young minds in AI', null),
    ],
  },
]
export let pressCount = pressGroups.reduce((n, g) => n + g.items.length, 0)
export const pressSource = OLD + 'Media.php'
export const latestPress = pressGroups.slice(0, 4).map((g) => ({ ...g.items[0], group: g }))

// Used by lib/cms.js when the admin panel has press clippings: swaps them in and recomputes the totals.
export function setPress(groups) {
  pressGroups.splice(0, pressGroups.length, ...groups)
  pressCount = pressGroups.reduce((n, g) => n + g.items.length, 0)
  latestPress.splice(0, latestPress.length, ...pressGroups.slice(0, 4).map((g) => ({ ...g.items[0], group: g })))
}
