// Team as listed on glbcri.org/OurTeam.php (read 31 Oct 2026).
// Add photo (/public/images/team/<file>), email and LinkedIn for each person.
export const team = [
  { name: 'Dr. P.S. Pandey', role: 'General Manager', email: 'glbcri@glbitm.ac.in', photo: '/images/glbcri/team-pandey.jpg', linkedin: '' },
  { name: 'Mr. Abhishek Pratap Gautam', role: 'Program Manager', email: '', photo: '/images/glbcri/team-abhishek.jpg', linkedin: '' },
  { name: 'Mr. Akash Deep', role: 'Member & IIC Convenor', email: '', photo: '/images/glbcri/team-akash.jpg', linkedin: '' },
  { name: 'Mr. Love Kumar Sharma', role: 'Professional Assistant', email: '', photo: '/images/glbcri/team-love.jpg', linkedin: '' },
]

export const contactPerson = team[0]

// Lab copy is rewritten: on the current site the IDEA Lab text repeats the NVIDIA Lab text.
export const facilities = [
  { name: 'NVIDIA AI Lab', image: '/images/glbcri/lab-nvidia.jpg', body: 'GPU computing for AI and machine learning research, training and product work.', icon: 'chip' },
  { name: 'EVM Centre of Excellence', image: '/images/glbcri/lab-ev.jpg', body: '“The World of EV” — an electric vehicle R&D centre on campus, set up with alumnus Alok Tripathi.', icon: 'bolt' },
  { name: 'IDEA Lab', image: '/images/glbcri/lab-idea.jpg', body: 'A prototyping space for building and testing hardware.', icon: 'lab', confirm: true },
  { name: 'iOS Lab', image: '/images/glbcri/lab-ios.jpg', body: 'A dedicated Apple development lab for app builders.', icon: 'phone', confirm: true },
  { name: 'Co-working space', image: '/images/glbcri/coworking.jpg', body: 'Office space, co-working areas and meeting rooms for incubated teams.', icon: 'desk' },
]

export const fundingRoutes = [
  { name: 'DST NIDHI PRAYAS prototype grant', amount: 'Up to ₹10 lakh', for: 'Individual innovators or early startups turning a science/tech idea into a physical prototype within 18 months.', cta: { label: 'Check eligibility', to: '/funding#prayas' }, highlight: true },
  { name: 'UP Startup Policy (Start in UP)', amount: 'Up to ₹7.5 lakh', for: 'Sustenance allowance, a prototype grant and seed capital for DPIIT and Startin UP registered startups.', cta: { label: 'See the incentives', to: '/funding#up-policy' } },
  { name: 'MSME Idea Hackathon', amount: 'Up to ₹15 lakh', for: 'GLBCRI is a host institute. Ideas in renewable energy, automotive, Industry 4.0, robotics and frontier tech.', cta: { label: 'See events', to: '/events' } },
  { name: 'Investor connects', amount: 'Equity rounds', for: 'Connections with angel investors, VCs and corporate partners through demo days and networking meets.', cta: { label: 'Explore Acceleration', to: '/programs#acceleration' } },
]

// From glbcri.org/Nidhi-Prayas.php — summarised.
export const prayas = {
  eligible: [
    'Indian citizen, 18 or older',
    'An individual innovator, or a co-founder of a startup under 7 years old',
    'Startup turnover has never exceeded ₹25 lakh in a year',
    'A technology or science-based idea that becomes a physical prototype',
    'Prototype can be completed within 18 months',
    'Not funded by another agency for this prototype',
  ],
  notEligible: ['Pure software, app-based, e-commerce or service ideas', 'Products already past the prototype stage', 'Funding research or student internships'],
  priority: ['Manufacturing', 'Agriculture', 'Healthcare', 'Clean-tech', 'Energy', 'Water', 'IoT'],
  preference: ['Women innovators', 'Young innovators', 'Bootstrapped or co-invested', 'Clear roadmap to commercialisation'],
}

// From glbcri.org/Start-in-UP.php — UP Startup Policy 2020 (First Amendment 2022).
export const upPolicy = [
  { name: 'Sustenance allowance', amount: '₹17,500 / month', note: 'For one year, idea-stage startups' },
  { name: 'Prototype grant', amount: 'Up to ₹5 lakh', note: 'One time, for DPIIT + Startin UP registered startups' },
  { name: 'Seed capital / marketing', amount: 'Up to ₹7.5 lakh', note: 'To launch your MVP, paid in 3 milestone tranches' },
  { name: 'Patent filing', amount: '₹2 L / ₹10 L', note: 'Reimbursed for Indian / international patents' },
  { name: 'Event participation', amount: '₹50k / ₹1 L', note: 'Reimbursed for national / international events' },
]
export const upPolicyBonus = '50% extra on sustenance and seed capital for startups founded by women, divyangjan, transgender persons or EWS founders, or based in Purvanchal / Bundelkhand.'
