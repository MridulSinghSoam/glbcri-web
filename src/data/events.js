// Events. In V2 these come from the admin panel; in V1 edit this file.
// date / endDate: ISO 'YYYY-MM-DD'. Upcoming vs past is worked out from today's
// date, so the home page never shows a stale "upcoming" event.
// CONFIRM all details with GLBCRI before launch.

export const eventTypes = ['Pitch', 'Summit', 'Workshop', 'Competition', 'Showcase', 'Recognition']

export const events = [
  {
    slug: 'bharat-udyam-sangam-2026',
    image: '/images/glbcri/event-bus-2026.jpg',
    heroFit: 'contain', // poster: show the whole image in the hero slideshow
    title: 'Bharat Udyam Sangam 2026',
    type: 'Summit',
    date: '2026-10-31',
    time: '9:30 AM onwards', // CONFIRM
    venue: 'GL Bajaj Institute of Technology & Management, Greater Noida',
    summary: 'A one-day startup investment conclave with a Startup Investment Pitch Arena, panels and a student hackathon.',
    prize: '₹2 lakh prize pool', // CONFIRM: one source says ₹1 lakh
    audience: ['Startup founders', 'Student innovators', 'Investors', 'Researchers', 'Mentors'],
    about: [
      'Bharat Udyam Sangam brings founders, investors, industry leaders, faculty and students together for a day of pitches and conversations about taking ventures from the lab to the market.',
      'Selected startups present their business model, traction and funding needs to investors and angel networks in the Startup Investment Pitch Arena. Promising ideas may be taken forward for mentoring and incubation at GLBCRI.',
    ],
    partners: ['Ministry of MSME', 'DST NIDHI PRAYAS', 'IIC', 'Startin UP', 'AKTU Innovation Hub'],
    registerUrl: '/apply?program=incubation&source=bharat-udyam-sangam-2026', // CONFIRM: event form link
    featured: true,
  },
  {
    slug: 'aktu-leader-incubator-award-2026',
    image: '/images/glbcri/hero-aktu-award.jpg',
    heroPos: '52% center',
    title: 'AKTU Leader Incubator Award 2026',
    type: 'Recognition',
    date: '2026-09-10',
    venue: 'UP Startup Samvad, Lucknow',
    summary: 'GLBCRI was honoured with the AKTU Leader Incubator Award 2026 for its work with startups.',
  },
  {
    slug: 'msme-idea-hackathon-6',
    title: 'MSME Idea Hackathon 6.0',
    type: 'Pitch',
    date: '2026-06-30',
    endDate: '2026-07-14',
    venue: 'GL Bajaj, Greater Noida (Host Institute)',
    summary: 'GLBCRI hosted applications for the Ministry of MSME’s Idea Hackathon 6.0 — up to ₹15 lakh funding, mentorship and incubation support.',
    prize: 'Up to ₹15 lakh funding',
    audience: ['Students', 'Innovators', 'Researchers', 'Startups', 'Entrepreneurs'],
    about: [
      'As a Host Institute for MSME Idea Hackathon 6.0, GL Bajaj Institute of Technology and Management, through GLBCRI, invited students, innovators, researchers, startups and entrepreneurs to turn bold ideas into impactful innovations.',
      'Focus areas: renewable energy, energy efficiency, automotive technology, Industry 4.0 & 5.0, robotics & automation, and other frontier technologies. The application window ran from 30 June to 14 July 2026.',
    ],
  },
  {
    slug: 'international-trade-fair-2025',
    image: '/images/glbcri/event-iitf.jpg',
    heroFit: 'contain',
    title: 'International Trade Fair 2025',
    type: 'Showcase',
    date: '2025-12-12',
    venue: 'UP Startup Zone, IITF, New Delhi',
    summary: 'Some of our most promising startups showcased their work at the Uttar Pradesh Startup Zone.',
  },
  {
    slug: 'smart-india-hackathon-2025',
    image: '/images/glbcri/hero-hackathon.jpg',
    heroPos: '28% center',
    title: 'Smart India Hackathon 2025 Grand Finale',
    type: 'Competition',
    date: '2025-12-12', // CONFIRM: date read off the winner's cheque
    venue: 'GL Bajaj Institute of Technology & Management, Greater Noida',
    summary: 'GL Bajaj hosted the Smart India Hackathon 2025 hardware edition grand finale.',
  },
  {
    slug: 'iic-regional-meet-2025',
    image: '/images/glbcri/event-iic-meet.jpg',
    heroFit: 'contain',
    title: 'IIC Regional Meet 2025',
    type: 'Summit',
    date: '2025-11-25',
    venue: 'Organised by MIC & AICTE',
    summary: 'IIC Regional Meet 2025, organised by the Ministry of Education’s Innovation Cell (MIC) and AICTE.',
  },
  {
    slug: 'sustainability-awards-2025',
    title: 'Zielony wins Global Sustainability Award 2025',
    type: 'Recognition',
    date: '2025-11-12',
    venue: '—',
    summary: 'GLBCRI incubatee Zielony was honoured with the Global Sustainability Award 2025.',
  },
  {
    slug: 'estic-2025',
    title: 'Innovation Conclave (ESTIC) 2025',
    type: 'Summit',
    date: '2025-11-05',
    venue: 'New Delhi',
    summary: 'GLBCRI at the Emerging Science, Technology and Innovation Conclave (ESTIC) 2025.',
  },
  {
    slug: 'ai-impact-summit-2026',
    title: 'Three GLBCRI startups at the AI Impact Summit 2026',
    type: 'Showcase',
    date: '2026-02-18',
    venue: 'New Delhi',
    summary: 'Three startups incubated at GLBCRI were selected to showcase their innovations at the AI Impact Summit 2026.',
  },
  {
    slug: 'capacity-building-program-2025',
    title: 'Capacity Building Program',
    type: 'Workshop',
    date: '2025-03-22',
    venue: 'GLBCRI, Greater Noida',
    summary: 'A capacity building program for founders and innovators at GLBCRI.',
  },
  {
    slug: 'revive-and-thrive-2024',
    title: 'Empowering YUVA — “Revive and Thrive”',
    type: 'Competition',
    date: '2024-12-13',
    venue: 'GLBCRI, Greater Noida',
    summary: 'The “Revive and Thrive” competition for young innovators.',
  },
  {
    slug: 'supercomputing-workshop-2024',
    title: 'AI & ML Using Supercomputing',
    type: 'Workshop',
    date: '2024-11-28',
    venue: 'GLBCRI, Greater Noida',
    summary: 'Part of the Empowerment Workshop Series — hands-on AI and ML on supercomputing infrastructure.',
  },
]
