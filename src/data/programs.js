// Programs, copied from the Figma "Programs" cards plus a "who it's for" line.
// status: 'open' | 'rolling' | 'closed'. A closed program shows "Notify me".
// CONFIRM: durations, fees and equity with GLBCRI.

export const programs = [
  {
    id: 'pre-incubation',
    name: 'Pre-Incubation',
    badge: 'Getting started',
    duration: '3–6 months',
    stage: 'Idea or early prototype',
    forWho: 'Early-stage founders with an idea to validate.',
    status: 'rolling',
    features: ['Idea validation workshops', 'Prototype development support', 'Market research assistance', 'Basic mentorship', 'Networking opportunities', 'Route to the NIDHI PRAYAS grant'],
    fee: null,
    equity: null,
    icon: 'spark',
  },
  {
    id: 'incubation',
    name: 'Full Incubation',
    badge: 'Most popular',
    highlight: true,
    duration: '12–18 months',
    stage: 'MVP, ready to build the business',
    forWho: 'Startups with an MVP that are ready to build the business.',
    status: 'rolling',
    features: ['Dedicated workspace', '1:1 mentorship program', 'Business development support', 'Legal and compliance guidance', 'Investor network access'],
    fee: null,
    equity: null,
    icon: 'rocket',
  },
  {
    id: 'student',
    name: 'Student Startup Program',
    badge: 'Students only',
    duration: '6–12 months',
    stage: 'Any stage, while studying',
    forWho: 'Student founders balancing classes and a startup.',
    status: 'rolling',
    features: ['Flexible timings', 'Academic credit integration', 'Peer learning groups', 'Faculty mentorship', 'Competition preparation'],
    fee: null,
    equity: null,
    icon: 'cap',
  },
  {
    id: 'acceleration',
    name: 'Acceleration',
    badge: 'Advanced',
    duration: '3–6 months',
    stage: 'Early revenue, ready to scale',
    forWho: 'Growth-stage startups seeking scale and funding.',
    status: 'rolling',
    features: ['Intensive mentorship', 'Investor pitch training', 'Go-to-market strategy', 'Partnership facilitation', 'Demo day participation'],
    fee: null,
    equity: null,
    icon: 'chart',
  },
]

// The three-step ladder shown on the home page.
export const stages = [
  { id: 'pre-incubation', step: '01', name: 'Pre-Incubation', when: 'You have an idea or early prototype', duration: '3–6 months', gets: 'Validation, prototype support and the NIDHI PRAYAS grant route.' },
  { id: 'incubation', step: '02', name: 'Incubation', when: 'You have an MVP', duration: '12–18 months', gets: 'Workspace, 1:1 mentors, legal and compliance, investor access.' },
  { id: 'acceleration', step: '03', name: 'Acceleration', when: 'You have revenue and want to scale', duration: '3–6 months', gets: 'Pitch training, go-to-market, partnerships and demo day.' },
]

export const supportServices = [
  { title: 'Mentorship network', body: 'Industry experts and founders, matched to your sector.', icon: 'users' },
  { title: 'Funding support', body: 'Angel investors, VCs and government schemes.', icon: 'rupee' },
  { title: 'Legal and compliance', body: 'IP, company formation and regulations.', icon: 'shield' },
  { title: 'Events and workshops', body: 'Regular workshops, bootcamps and networking meets.', icon: 'calendar' },
]

export const benefits = [
  { title: 'Funding', body: 'Prototype grants up to ₹10 lakh, plus help with UP Startup Policy grants and investor pitches.', icon: 'rupee' },
  { title: 'Mentors', body: 'Founders, investors and domain experts, matched to your sector.', icon: 'users' },
  { title: 'Workspace and labs', body: 'Desks, plus the NVIDIA AI Lab, IDEA Lab, iOS Lab and the EV Centre of Excellence.', icon: 'lab' },
  { title: 'Legal and IP', body: 'Company registration, compliance, and patent and copyright filing support.', icon: 'shield' },
  { title: 'Market access', body: 'Trade shows, expos and summits — UP International Trade Show, AI Impact Summit and more.', icon: 'globe' },
  { title: 'Network', body: 'Monthly startup and industry meets, plus the GL Bajaj alumni network.', icon: 'network' },
]

export const applySteps = [
  { title: 'Apply online', body: '10 minutes. No pitch deck needed for pre-incubation.' },
  { title: 'Screening call', body: 'We check fit and stage within 7 working days.' },
  { title: 'Pitch to the committee', body: 'Present your idea and your plan.' },
  { title: 'Onboard', body: 'Sign the agreement, meet your mentor, start building.' },
]

// Mentors as listed on glbcri.org/Our-Mentors.php (read 31 Oct 2026). featured = shown first.
const featuredMentors = ['Ms. Neha Misra', 'Mr. Ashish Kushwaha', 'Ms. Garima Ujjainia', 'Mr. Manveen Chadha', 'Mr. Tushar Srivastava', 'Mr. Shashwat Mishra', 'Mr. L Ganesh Kumar', 'Mr. Mittu Tigi']
export const mentors = [
  { name: "Mr. Manikumar Lakkaraju", role: "Director", org: "Startebee Consulting LLP", tags: ["Mentoring"] },
  { name: "Ms. Neha Misra", role: "Co-Founder & CEO", org: "Fin Lit Project Services", tags: ["Fintech", "Entrepreneurship", "Sustainable finance"] },
  { name: "Mr. Mittu Tigi", role: "CEO", org: "AIC IIIT Kottayam", tags: ["Marketing", "Business strategy"] },
  { name: "Mr. Aditya Singha", role: "Founder, Legal Counsel", org: "Independent practice", tags: ["Law"] },
  { name: "Mr. Shashwat Mishra", role: "Client & Investor Relations", org: "", tags: ["Investments", "Pitch decks", "Fundraising"] },
  { name: "Ms. Garima Ujjainia", role: "Consultant", org: "Atal Innovation Mission, NITI Aayog", tags: ["Innovation", "Startup consulting"] },
  { name: "Mr. Praveen Desai", role: "Head", org: "TBI", tags: ["Startup ecosystem"] },
  { name: "Dr. Ambuj Saxena", role: "Associate Professor", org: "GL Bajaj ITM", tags: ["Composite materials"] },
  { name: "Dr. Animesh Puri", role: "Director", org: "KinAxis Inc.", tags: ["Data management"] },
  { name: "Dr. Anita Gehlot", role: "Professor", org: "Uttaranchal University", tags: ["Electronic hardware", "Embedded systems", "ML"] },
  { name: "Dr. Antonio Galletta", role: "Assistant Professor of CS", org: "University of Messina, Italy", tags: ["Machine learning", "AI"] },
  { name: "Dr. Mahaveer Singh Naruka", role: "Professor", org: "GL Bajaj ITM", tags: ["Power quality"] },
  { name: "Dr. Mayank Singh", role: "Professor", org: "GL Bajaj ITM", tags: ["ML", "Data science", "AI"] },
  { name: "Dr. Mohit Bansal", role: "Professor", org: "GL Bajaj ITM", tags: ["Electric vehicles", "Arduino", "Automobile"] },
  { name: "Dr. Nivedita Singh", role: "Assistant Professor", org: "Management Studies, GLBITM", tags: ["HR management"] },
  { name: "Dr. P.K. Srivastava", role: "Professor, In-charge", org: "Purvanchal Centre for Innovation and Incubation", tags: ["Wireless sensor networks", "ML"] },
  { name: "Dr. Rajesh Singh", role: "Director (Research & Innovation)", org: "Uttaranchal University", tags: ["IoT", "Wireless", "Industry 4.0"] },
  { name: "Dr. S.P. Mishra", role: "Advisor", org: "Innovation Hub, AKTU & GL Bajaj Group", tags: ["Incubation", "Social entrepreneurship"] },
  { name: "Dr. Shashank Awasthi", role: "Professor", org: "GL Bajaj ITM", tags: ["Wireless sensor networks", "ML"] },
  { name: "Dr. Tarun Gupta", role: "Associate Professor", org: "GL Bajaj ITM", tags: ["Industrial engineering"] },
  { name: "Mr. Akash Deep", role: "E-Cell In-charge", org: "GL Bajaj ITM", tags: ["Finite element analysis", "Composites"] },
  { name: "Mr. Amit Kumar", role: "Partner", org: "ANVC & Co.", tags: ["Business valuation"] },
  { name: "Mr. Tushar Srivastava", role: "Founder & Managing Partner", org: "JT Attorney Alliance", tags: ["Intellectual property"] },
  { name: "Mr. Ashish Kushwaha", role: "Engineering Manager", org: "Thales", tags: ["Product strategy", "Solution design", "Cloud"] },
  { name: "Mr. Bhupendra Singh", role: "Director", org: "Schematicsla, Dehradun", tags: ["IoT", "Embedded", "Electronic hardware"] },
  { name: "Ms. Deepti Dohare", role: "Assistant Professor & Innovation Coordinator", org: "GL Bajaj ITM", tags: ["Geotechnical", "Plastic waste management"] },
  { name: "Mr. L Ganesh Kumar", role: "CEO", org: "iFocus Systec", tags: ["AI/ML", "5G", "Media & entertainment"] },
  { name: "Mr. Mahip Singh", role: "Head", org: "Innovation Hub", tags: ["Robotics", "Mechatronics"] },
  { name: "Mr. Manveen Chadha", role: "Senior Manager", org: "FITT, IIT Delhi", tags: ["Electronics"] },
  { name: "Mr. Rehan Ahmed", role: "CEO", org: "MIET Incubation Forum", tags: ["Electronics"] },
  { name: "Mr. Sachin Sharma", role: "Incubation Manager", org: "UPID, Noida", tags: ["Robotics", "Mechatronics"] },
  { name: "Mr. Sandeep Kumar", role: "Incubation Manager", org: "IET, Lucknow", tags: ["Hardware", "Business"] },
  { name: "Mr. Sudhanshu Ranjan", role: "Head", org: "Navrachna Foundation", tags: ["Hardware", "Business support"] },
  { name: "Ms. Sugandh Gupta", role: "Research & Training Consultant, AI", org: "Global Infoventures", tags: ["AI", "IoT"] },
  { name: "Ms. Vandana Sharma", role: "Manager", org: "Innovation Hub", tags: ["Business & financial modelling"] },
].map((m) => ({ ...m, featured: featuredMentors.includes(m.name) }))
