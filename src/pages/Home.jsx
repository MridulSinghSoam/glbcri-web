import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Initials, Photo } from '../components/ui'
import { InstagramFeed } from '../components/blocks'
import { ipStats, recognitionLogos, site, stats } from '../data/site'
import { mentors } from '../data/programs'
import { startupLogos, startups, testimonials } from '../data/startups'
import { portfolio } from '../data/portfolio'
import { team } from '../data/team'
import { dateParts, formatDate, getPast, getUpcoming, isToday, toDate } from '../lib/events'
import { useSeo } from '../lib/useSeo'

const IMG = '/images/glbcri/'

function Eyebrow({ children, dark = false }) {
  return <span className={`self-start rounded-full px-3 py-1.5 text-[13px] font-semibold ${dark ? 'bg-gold-300 text-gold-950' : 'bg-gold-100 text-gold-800'}`}>{children}</span>
}

/* 1 · HERO ----------------------------------------------------------------------- */
const STAGES = [
  { id: 'idea', label: 'Just an idea', program: 'Pre-Incubation', why: 'Validate your idea and apply for up to ₹10 lakh in prototype funding.', cta: 'Start with Pre-Incubation', to: '/apply?program=pre-incubation' },
  { id: 'prototype', label: 'Prototype', program: 'Pre-Incubation + NIDHI PRAYAS', why: 'Finish your prototype with up to ₹10 lakh, mentors and our labs.', cta: 'Check PRAYAS eligibility', to: '/funding#prayas' },
  { id: 'mvp', label: 'MVP ready', program: 'Full Incubation', why: 'Workspace, 1:1 mentors and UP seed capital up to ₹7.5 lakh.', cta: 'Scale with GLBCRI', to: '/apply?program=incubation' },
  { id: 'revenue', label: 'Earning revenue', program: 'Acceleration', why: 'Go-to-market support, partnerships and trade-show showcases.', cta: 'Apply for Acceleration', to: '/apply?program=acceleration' },
  { id: 'raising', label: 'Raising money', program: 'Acceleration', why: 'Pitch training, investor meets and demo day.', cta: 'Get investor-ready', to: '/apply?program=acceleration' },
]

function StagePicker() {
  const [picked, setPicked] = useState('mvp')
  const rec = STAGES.find((s) => s.id === picked)
  return (
    <div className="flex flex-col gap-3.5 rounded-[20px] border border-[#eadfd3] bg-white p-5 shadow-[0_1px_2px_rgba(81,53,41,.06),0_20px_40px_-24px_rgba(81,53,41,.28)]">
      <p id="stage-label" className="text-[13px] font-bold uppercase tracking-[0.08em] text-gold-700">Where is your startup today?</p>
      <div role="radiogroup" aria-labelledby="stage-label" className="flex flex-wrap gap-2">
        {STAGES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={picked === s.id}
            onClick={() => setPicked(s.id)}
            className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold transition ${picked === s.id ? 'border-gold-300 bg-gold-300 text-gold-950' : 'border-[#eadfd3] bg-white text-ink-soft hover:border-gold-400'}`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#eadfd3] pt-3.5" aria-live="polite">
        <div className="min-w-0 flex-[1_1_240px]">
          <p className="text-[15px] font-bold">{rec.program}</p>
          <p className="text-sm text-ink-soft">{rec.why}</p>
        </div>
        <Link to={rec.to} className="btn whitespace-nowrap bg-gold-800 font-bold text-white hover:bg-gold-900">
          {rec.cta} <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="container-x">
      <div className="flex flex-col gap-12 pb-8 pt-6 lg:flex-row lg:items-stretch lg:pt-8">
        <div className="flex flex-1 flex-col justify-center gap-6 lg:py-6">
          <Link to="/events/smart-india-hackathon-2025" className="inline-flex items-center gap-2 self-start rounded-full bg-[#fbf3e4] py-1.5 pl-1.5 pr-3 text-[13px] font-semibold text-gold-800">
            <span className="rounded-full bg-gold-800 px-2.5 py-1 text-[11px] font-bold text-gold-300">Hosted</span>
            Smart India Hackathon 2025 Grand Finale
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </Link>
          <h1 className="text-[44px] font-extrabold leading-none sm:text-6xl xl:text-[68px]">
            Fueling the next generation of{' '}
            <span className="relative whitespace-nowrap text-gold-800">
              entrepreneurs.
              <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-2.5 left-0 h-4 w-full">
                <path d="M4 14 C 80 4, 180 2, 296 10" fill="none" stroke="#d98c39" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="max-w-[520px] text-lg leading-relaxed text-ink-soft">
            From a first idea to a funded company. Prototype grants up to ₹10 lakh, mentors who have built companies, and labs to build in, in Greater Noida.
          </p>
          <StagePicker />
        </div>

        <div className="relative min-h-[460px] flex-1 sm:min-h-[600px]">
          <div aria-hidden="true" className="absolute -right-3 bottom-14 top-10 hidden w-4/5 rotate-3 overflow-hidden rounded-[28px] shadow-lift sm:block">
            <Photo src={IMG + 'hero-hackathon.jpg'} alt="" className="h-full w-full object-cover object-[28%_center]" />
          </div>
          <div className="absolute bottom-8 left-0 right-0 top-4 overflow-hidden rounded-[28px] bg-gold-200 shadow-[0_30px_60px_-30px_rgba(81,53,41,.55)] sm:right-6">
            <Photo src={IMG + 'hero-aktu-award.jpg'} alt="The GLBCRI team receiving the AKTU Leader Incubator Award 2026 at UP Startup Samvad, Lucknow" className="h-full w-full object-cover object-[52%_center]" loading="eager" />
          </div>
          <div className="absolute right-0 top-0 flex items-center gap-3 rounded-[18px] bg-white px-4 py-3.5 shadow-lift">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-300 text-gold-800"><Icon name="rupee" className="h-[22px] w-[22px]" strokeWidth={2} /></span>
            <span className="flex flex-col">
              <strong className="font-display text-[22px] font-extrabold">Up to ₹10 L</strong>
              <span className="text-xs text-ink-soft">Prototype grant · DST NIDHI PRAYAS</span>
            </span>
          </div>
          <Link to="/events/aktu-leader-incubator-award-2026" className="absolute bottom-0 left-3 flex max-w-[360px] items-center gap-3.5 rounded-[18px] bg-white px-4 py-3.5 shadow-lift sm:left-6">
            <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px] bg-gold-800 text-gold-300"><Icon name="trophy" className="h-[26px] w-[26px]" strokeWidth={1.9} /></span>
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-gold-600">Winner · 10 Sep 2026</span>
              <strong className="text-[15px]">AKTU Leader Incubator Award 2026</strong>
              <span className="text-xs text-ink-soft">UP Startup Samvad, Lucknow</span>
            </span>
          </Link>
          <div className="absolute bottom-[76px] right-10 hidden flex-col rounded-2xl bg-gold-800 px-[18px] py-3.5 text-white shadow-lift sm:flex">
            <strong className="font-display text-[30px] font-extrabold leading-none text-gold-300">{portfolio.length}</strong>
            <span className="text-xs text-[#f1e3d6]">startups incubated</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 2 · LATEST AT GLBCRI: an event showcase in the style of the Startup India home page.
   Big banner on the left, thumbnails on the right, arrows + counter, and a stats bar under it.
   Slides: upcoming events first (soonest first), then the most recent past ones. */
const SLIDE_MS = 5000

function showcaseSlides() {
  const hasImg = (e) => e.image
  return [...getUpcoming().filter(hasImg), ...getPast().filter(hasImg)].slice(0, 6)
}

function SlideImage({ e, eager = false, thumb = false }) {
  if (e.heroFit === 'contain') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-gold-900">
        <Photo src={e.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
        <Photo src={e.image} alt={thumb ? '' : e.title} className={`relative h-full w-full object-contain ${thumb ? 'p-1' : 'p-3 sm:p-6 sm:pb-24'}`} loading={eager ? 'eager' : 'lazy'} />
      </div>
    )
  }
  return <Photo src={e.image} alt={thumb ? '' : e.title} className="h-full w-full object-cover" style={{ objectPosition: e.heroPos || 'center' }} loading={eager ? 'eager' : 'lazy'} />
}

function EventShowcase() {
  const slides = showcaseSlides()
  const n = slides.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (paused || reduce || n < 2) return
    const t = setTimeout(() => setI((x) => (x + 1) % n), SLIDE_MS)
    return () => clearTimeout(t)
  }, [i, paused, n])

  if (!n) return null
  const cur = slides[i]
  const upcoming = getUpcoming().includes(cur)
  const label = isToday(cur) ? 'Happening today' : upcoming ? 'Up next' : 'Latest'
  const go = (d) => setI((x) => (x + d + n) % n)
  // the thumbnail column shows 4 at a time and follows the active slide
  const start = Math.min(Math.max(0, i - 1), Math.max(0, n - 4))
  const thumbs = slides.slice(start, start + 4)
  const numbers = [
    { icon: 'rocket', value: portfolio.length, label: 'Startups incubated' },
    { icon: 'rupee', value: stats[1].value, label: 'Raised by our startups' },
    { icon: 'shield', value: stats[4].value, label: 'Patents published' },
  ]

  return (
    <section className="relative overflow-hidden bg-[#fbeee0] py-12 sm:py-16" aria-labelledby="latest-h">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold-300/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />

      <div className="container-x relative">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-600">What’s happening</span>
            <h2 id="latest-h" className="mt-1 text-[28px] font-extrabold leading-tight sm:text-[34px]">Latest at GLBCRI</h2>
          </div>
          <Link to="/events" className="hidden shrink-0 text-sm font-semibold text-gold-700 hover:underline sm:inline">All events →</Link>
        </div>

        <div
          className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-5"
          aria-roledescription="carousel"
          aria-label="GLBCRI events"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* main banner */}
          <div className="relative overflow-hidden rounded-[22px] bg-gold-900 shadow-[0_24px_50px_-28px_rgba(81,53,41,.6)]">
            <div className="relative aspect-[16/10] sm:aspect-[16/8]">
            {slides.map((e, k) => (
              <div key={e.slug} aria-hidden={k !== i} className={`absolute inset-0 transition-opacity duration-700 ${k === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                <SlideImage e={e} eager={k === 0} />
              </div>
            ))}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-2/3 bg-gradient-to-t from-black/75 via-black/30 to-transparent sm:block" />
            </div>
            {/* caption: under the picture on phones, over it on bigger screens */}
            <div className="flex flex-col gap-3 p-5 text-white sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex-row sm:items-end sm:justify-between sm:p-7" aria-live={paused ? 'polite' : 'off'}>
              <div className="min-w-0">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${upcoming ? 'bg-gold-300 text-gold-950' : 'bg-white/20 text-white backdrop-blur'}`}>
                  {isToday(cur) && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />}
                  {label} · {formatDate(cur.date)}
                </span>
                <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-[32px]">{cur.title}</h3>
                {cur.venue && <p className="mt-1 truncate text-sm text-white/80">{cur.venue}</p>}
              </div>
              <Link to={`/events/${cur.slug}`} className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-gold-300 px-5 py-2.5 text-sm font-bold text-gold-950 shadow-lift transition hover:bg-gold-400">
                Know more <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* thumbnails + controls */}
          {n > 1 && (
            <div className="flex min-w-0 flex-col gap-3">
              <ul className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {slides.map((e, k) => {
                  const on = k === i
                  // phones: a scrolling row of all slides; desktop: a column of 4 that follows the active one
                  const inColumn = thumbs.includes(e)
                  return (
                    <li key={e.slug} className={`w-[150px] shrink-0 lg:w-auto lg:flex-1 ${inColumn ? '' : 'lg:hidden'}`}>
                      <button
                        type="button"
                        onClick={() => setI(k)}
                        aria-label={`Show ${e.title}`}
                        aria-current={on}
                        className={`relative block aspect-[16/10] h-full w-full overflow-hidden rounded-2xl border-[3px] transition lg:aspect-auto lg:min-h-[86px] ${on ? 'border-gold-500 shadow-lift' : 'border-white opacity-70 hover:opacity-100'}`}
                      >
                        <SlideImage e={e} thumb />
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div className="flex items-center justify-center gap-4">
                <button type="button" onClick={() => go(-1)} aria-label="Previous event" className="grid h-10 w-10 place-items-center rounded-full border-2 border-gold-600 text-gold-700 transition hover:bg-gold-600 hover:text-white">
                  <Icon name="chevLeft" className="h-4 w-4" strokeWidth={2.4} />
                </button>
                <span className="min-w-[44px] text-center text-sm font-semibold tabular-nums text-ink-soft">{i + 1} / {n}</span>
                <button type="button" onClick={() => go(1)} aria-label="Next event" className="grid h-10 w-10 place-items-center rounded-full border-2 border-gold-600 text-gold-700 transition hover:bg-gold-600 hover:text-white">
                  <Icon name="chevRight" className="h-4 w-4" strokeWidth={2.4} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* stats bar */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:mr-[240px]">
          {numbers.map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-[20px] bg-white/85 px-5 py-4 shadow-card">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold-300 bg-gold-50 text-gold-700"><Icon name={s.icon} className="h-5 w-5" /></span>
              <strong className="whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tightest xl:text-[28px]">{s.value}</strong>
              <span className="border-l-2 border-ink/80 pl-3 text-sm font-semibold leading-tight text-ink-soft">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Illustration: CRI emblem in the centre, the recognition & support logos circling it. */
const ORBIT_NAMES = {
  'rec-msme.jpg': 'Ministry of MSME',
  'rec-nidhi-prayas.jpg': 'DST NIDHI PRAYAS',
  'rec-startinup.jpg': 'Start in UP',
  'rec-iic.jpg': 'IIC',
  'rec-aicte.jpg': 'AICTE',
  'rec-startupindia.jpg': 'Startup India',
  'rec-nirf.jpg': 'NIRF Innovation',
  'rec-moe.jpg': 'Ministry of Education',
}
const orbitLogos = recognitionLogos.map((l) => {
  const file = l.src.split('/').pop()
  return { ...l, file, short: ORBIT_NAMES[file] || l.alt, orbitSrc: IMG + 'orbit/' + file }
})

function RecognitionOrbit() {
  const R = 41 // radius, as % of the box
  return (
    <div className="relative aspect-square w-full max-w-[420px] shrink-0">
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full border-2 border-dashed border-gold-400/60" />
      <div aria-hidden="true" className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle,#fad157_0_45%,rgba(250,209,87,0)_70%)] opacity-60" />
      <div className="absolute inset-[30%] grid place-items-center rounded-full bg-white shadow-lift ring-8 ring-gold-300/40">
        <img src={IMG + 'orbit/cri-emblem.png'} alt="GLBCRI emblem" className="h-[78%] w-[78%] object-contain" />
      </div>
      <ul className="absolute inset-0 motion-safe:animate-[spin_70s_linear_infinite]">
        {orbitLogos.map((l, k) => {
          const a = (k / orbitLogos.length) * 2 * Math.PI - Math.PI / 2
          return (
            <li key={l.file} className="absolute h-[16%] w-[25%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` }}>
              <div className="grid h-full w-full place-items-center rounded-[18px] bg-white px-[10%] py-[8%] shadow-card ring-1 ring-gold-200 motion-safe:animate-[spin_70s_linear_infinite_reverse]">
                <img src={l.orbitSrc} alt={l.alt} title={l.alt} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* 2 · ABOUT + IMPACT + PRAYAS ------------------------------------------------------- */
function About() {
  const numbers = [
    { value: `${portfolio.length}`, label: 'Startups incubated' },
    { value: stats[1].value, label: 'Raised by our startups' },
    ...ipStats,
  ]
  return (
    <section className="container-x section">
      <div className="flex flex-col gap-14">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex flex-1 flex-col gap-[18px]">
            <Eyebrow>About GLBCRI</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl">Where ideas from Greater Noida become companies</h2>
            <p className="text-[17px] leading-relaxed text-ink-soft">
              Set up by GL Bajaj Institute of Technology and Management, GLBCRI gives innovators a platform to generate ideas, then supports and mentors them to become successful entrepreneurs.
            </p>
            <div className="mt-1.5 grid gap-3.5 sm:grid-cols-2">
              <div className="border-l-[3px] border-gold-500 py-1 pl-3.5">
                <strong className="text-sm">Our mission</strong>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">Build the support and infrastructure for students and faculty to innovate and prototype.</p>
              </div>
              <div className="border-l-[3px] border-gold-500 py-1 pl-3.5">
                <strong className="text-sm">Our vision</strong>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">A self-sustaining incubator for ideas of national and societal importance, creating job creators.</p>
              </div>
            </div>
            <Link to="/about" className="mt-1 text-[15px] font-semibold text-gold-700 hover:underline">Read our story, policies and directors →</Link>
          </div>
          <figure className="relative w-full flex-1">
            <Photo src={IMG + 'event-iic-meet.jpg'} alt="Participants at the IIC Regional Meet 2025 hosted at GL Bajaj" className="h-[300px] w-full rounded-[28px] object-cover sm:h-[340px]" />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold">IIC Regional Meet 2025, hosted at GL Bajaj</figcaption>
          </figure>
        </div>

        <dl className="grid grid-cols-2 border-y border-[#eee5dc] sm:grid-cols-3 lg:grid-cols-6">
          {numbers.map((n, i) => (
            <div key={n.label} className={`flex flex-col-reverse gap-1.5 px-5 py-7 ${i % 6 !== 5 ? 'lg:border-r' : ''} border-[#eee5dc]`}>
              <dt className="text-[13px] text-ink-soft">{n.label}</dt>
              <dd className="whitespace-nowrap font-display text-[32px] font-extrabold tracking-tightest text-gold-800 xl:text-[38px]">{n.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col items-center gap-10 overflow-hidden rounded-[28px] bg-[#fdf3d8] p-7 sm:p-10 lg:flex-row lg:gap-14">
          <RecognitionOrbit />
          <div className="flex flex-1 flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-gold-700">Recognised &amp; supported by</span>
            <h3 className="text-[32px] font-extrabold leading-tight">Backed by the programs that fund Indian startups</h3>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              GLBCRI works with the Ministry of MSME, DST NIDHI PRAYAS, Startup India and Start in UP, so our incubatees can apply to these schemes with our team guiding them through it.
            </p>
            <ul className="mt-1 flex flex-wrap gap-2">
              {orbitLogos.map((l) => (
                <li key={l.file} className="rounded-full bg-white/80 px-3 py-1.5 text-[13px] font-semibold text-gold-900">{l.short}</li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link to="/funding" className="btn bg-gold-800 font-bold text-white hover:bg-gold-900">See funding routes <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link to="/funding#prayas" className="text-sm font-semibold text-gold-700 hover:underline">NIDHI PRAYAS: prototype grants up to ₹10 L →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 3 · ALREADY BUILDING ---------------------------------------------------------------- */
const GROW = [
  { icon: 'rupee', title: 'Unlock state funding', body: 'Seed capital up to ₹7.5 L + ₹17,500/month', to: '/funding#up-policy' },
  { icon: 'users', title: 'Meet investors', body: 'Angel & VC connects, demo days, pitch arenas', to: '/programs#acceleration' },
  { icon: 'globe', title: 'Find customers', body: 'UP Trade Show, IITF, AI Impact Summit', to: '/events' },
  { icon: 'shield', title: 'Protect your IP', body: 'Patent costs back: ₹2 L India, ₹10 L abroad', to: '/funding#up-policy' },
  { icon: 'network', title: 'Grow your team', body: 'GL Bajaj interns, HR and branding support', to: '/programs' },
  { icon: 'trophy', title: 'Look credible', body: 'MSME- & DST-recognised, AKTU Leader Incubator', to: '/about' },
]

function AlreadyBuilding() {
  return (
    <section className="container-x pb-10">
      <div className="relative flex min-h-[860px] flex-col justify-between gap-12 overflow-hidden rounded-[32px] bg-gold-900 px-6 py-14 text-white sm:px-16 sm:py-[72px]">
        <div aria-hidden="true" className="absolute -bottom-[460px] -right-[340px] h-[1100px] w-[1100px] rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, #fad157 0 12%, #f0b04a 12% 24%, #d98c39 24% 38%, #a8602a 38% 54%, #6e3f22 54% 70%, #3a241b 70%)' }} />
        <div aria-hidden="true" className="absolute -bottom-[460px] -right-[340px] h-[1100px] w-[1100px] rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(58,36,27,0) 0 40%, rgba(58,36,27,.55) 70%)' }} />

        <div className="relative flex max-w-[640px] flex-col gap-[18px]">
          <Eyebrow dark>For startups already building</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-[1.04] sm:text-[56px]">
            Already building?
            <br />
            <span className="text-gold-300">Here's what changes when you join.</span>
          </h2>
        </div>

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[360px] flex-col gap-5">
            <div className="flex items-center gap-3.5 rounded-[20px] bg-white/95 p-4 text-ink">
              <Photo src={IMG + 'story-eythor.jpg'} alt="Naveen Kumar, founder of Eythor" className="h-[72px] w-[72px] shrink-0 rounded-[14px] object-cover" />
              <span className="flex flex-col gap-0.5">
                <strong className="text-[15px]">Naveen Kumar, Eythor</strong>
                <span className="text-[13px] leading-snug text-ink-soft">Built a solar-panel cleaning robot and secured ₹6.5 lakh through NIDHI PRAYAS.</span>
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-[#f1e3d6]">8 GLBCRI startups won UP Startup Policy grants in August 2026. A recognised incubator is your route to them.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/apply?program=incubation" className="btn-primary">Scale with GLBCRI →</Link>
              <Link to="/funding#up-policy" className="btn border border-white/35 text-white hover:border-gold-300">Check UP incentives</Link>
            </div>
          </div>

          <div className="grid max-w-[640px] flex-1 gap-3.5 sm:grid-cols-2">
            {GROW.map((g) => (
              <Link key={g.title} to={g.to} className="group flex min-h-[132px] flex-col justify-between gap-4 rounded-[18px] bg-white p-5 text-ink transition hover:-translate-y-0.5">
                <span className="flex items-start justify-between">
                  <Icon name={g.icon} className="h-[26px] w-[26px] text-gold-800" strokeWidth={1.7} />
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
                </span>
                <span className="flex flex-col gap-1">
                  <strong className="text-base">{g.title}</strong>
                  <span className="text-[13px] text-ink-soft">{g.body}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* 4 · STARTUPS ------------------------------------------------------------------------ */
function Startups() {
  const current = portfolio.filter((s) => s.status === 'current').length
  const graduated = portfolio.length - current
  const stories = startups.filter((s) => s.image)
  return (
    <section className="bg-cream">
      <div className="container-x section flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <Eyebrow>Our incubatee startups</Eyebrow>
            <h2 className="h-section">
              {portfolio.length} startups have built here. <span className="text-gold-600">You could be next.</span>
            </h2>
          </div>
          <div className="flex items-end gap-7">
            <div><strong className="font-display text-[34px] font-extrabold text-gold-800">{current}</strong><p className="text-[13px] text-ink-soft">current</p></div>
            <div><strong className="font-display text-[34px] font-extrabold text-gold-800">{graduated}</strong><p className="text-[13px] text-ink-soft">graduated</p></div>
            <Link to="/startups" className="pb-1.5 text-[15px] font-semibold text-gold-700 hover:underline">See all startups →</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {startupLogos.map((l) => (
            <div key={l.src} className="grid h-[104px] place-items-center rounded-2xl bg-white p-2">
              <Photo src={l.src} alt={l.alt} className="max-h-[84px] max-w-full" />
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((s) => (
            <article key={s.name} className="flex overflow-hidden rounded-3xl bg-white">
              <Photo src={s.image} alt={s.founder ? `${s.founder} of ${s.name}` : `The ${s.name} team`} className="w-2/5 object-cover" />
              <div className="flex flex-1 flex-col gap-2.5 p-7">
                <span className="self-start rounded-full bg-gold-300 px-2.5 py-1 text-xs font-bold">{s.funding}{s.name.startsWith('Eythor') ? ' · NIDHI PRAYAS' : ' funding'}</span>
                <h3 className="text-[22px] font-extrabold">{s.name}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{s.story}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure key={t.name} className={`flex flex-col justify-between gap-6 rounded-3xl p-8 ${i === 0 ? 'bg-gold-800 text-white' : 'border border-[#eee5dc] bg-white'}`}>
              <Icon name="quote" className={`h-[34px] w-[34px] ${i === 0 ? 'text-gold-300' : 'text-gold-500'}`} strokeWidth={2.2} />
              <blockquote className="text-lg leading-relaxed">{t.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                <Initials name={t.name} className={`h-11 w-11 text-sm ${i === 0 ? '!bg-none !bg-gold-300 !text-gold-800' : '!bg-none !bg-gold-800 !text-gold-300'}`} />
                <span className="flex flex-col">
                  <strong className="text-[15px]">{t.name}</strong>
                  <span className={`text-[13px] ${i === 0 ? 'text-[#f1e3d6]' : 'text-ink-soft'}`}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 5 · NEWS & EVENTS (tabs) ------------------------------------------------------------- */
function EventCard({ e }) {
  return (
    <Link to={`/events/${e.slug}`} className="relative h-[390px] w-[300px] shrink-0 snap-start overflow-hidden rounded-[22px] border-4 border-white/15 bg-[#6e3f22] text-white">
      {e.image && <Photo src={e.image} alt={e.title} className="absolute inset-0 h-full w-full object-cover" />}
      <span aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(43,26,18,.55) 0%, rgba(43,26,18,0) 30%, rgba(43,26,18,.15) 50%, rgba(43,26,18,.92) 100%)' }} />
      <span className="absolute left-5 top-5 flex items-center gap-2.5 text-[13px] font-medium">
        <span aria-hidden="true" className="h-px w-9 bg-white" />
        {formatDate(e.date)}{isToday(e) ? ' · Today' : ''}
      </span>
      <span className="absolute bottom-5 left-5 right-5 flex flex-col gap-1.5">
        <span className="self-start rounded-full bg-gold-300 px-2.5 py-0.5 text-[11px] font-bold text-gold-950">{e.type}</span>
        <strong className="font-display text-xl font-extrabold leading-tight">{e.title}</strong>
        <span className="line-clamp-2 text-[13px] leading-snug text-[#f1e3d6]">{e.summary}</span>
        <span className="text-[13px] font-bold text-gold-300">{getUpcoming().includes(e) ? 'Register' : 'View'} →</span>
      </span>
    </Link>
  )
}

function News() {
  const [tab, setTab] = useState('latest')
  const upcoming = getUpcoming()
  const past = getPast()
  const cards = tab === 'upcoming' ? upcoming : past
  const byMonth = [...upcoming, ...past]
    .sort((a, b) => toDate(b.date) - toDate(a.date))
    .reduce((acc, e) => {
      const d = toDate(e.date)
      const key = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' })
      ;(acc[key] ||= []).push(e)
      return acc
    }, {})

  const tabs = [
    ['latest', 'Latest Events'],
    ['upcoming', 'Upcoming Events'],
    ['bydate', 'Event by Date'],
  ]
  return (
    <section className="container-x py-16">
      <div className="relative flex flex-col gap-8 overflow-hidden rounded-[32px] bg-[#4a2b1a] py-14 text-white sm:py-16">
        <svg aria-hidden="true" viewBox="0 0 1200 640" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <polygon points="1080,40 1180,20 1140,120" fill="#d98c39" opacity=".45" />
          <polygon points="960,90 1010,60 1000,120" fill="#fad157" opacity=".35" />
          <polygon points="40,560 120,470 150,600" fill="#d98c39" opacity=".35" />
          <polygon points="160,120 210,90 200,150" fill="#a8602a" opacity=".5" />
          <polygon points="1100,560 1190,520 1170,630" fill="#a8602a" opacity=".45" />
        </svg>
        <div className="relative flex flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-4xl font-extrabold sm:text-5xl">Latest News &amp; Events</h2>
          <div role="tablist" aria-label="Filter events" className="flex flex-wrap justify-center gap-3">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`min-h-[44px] rounded-full border px-6 text-sm font-semibold transition ${tab === id ? 'border-gold-300 bg-gold-300 text-gold-950' : 'border-white/55 text-white hover:border-white'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab !== 'bydate' ? (
          cards.length ? (
            <div className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:px-12">
              {cards.map((e) => <EventCard key={e.slug} e={e} />)}
            </div>
          ) : (
            <p className="relative px-6 text-center text-[#f1e3d6]">No upcoming events right now. Get alerts below and we'll tell you first.</p>
          )
        ) : (
          <div className="relative grid gap-4 px-6 sm:px-12 md:grid-cols-2">
            {Object.entries(byMonth).map(([month, items]) => (
              <div key={month} className="flex flex-col gap-3 rounded-[20px] border border-white/15 bg-white/[0.07] p-5">
                <strong className="text-[13px] uppercase tracking-[0.1em] text-gold-300">{month}</strong>
                {items.map((e) => (
                  <Link key={e.slug} to={`/events/${e.slug}`} className="flex items-center gap-3.5 hover:text-gold-300">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white font-display text-lg font-extrabold text-ink">{dateParts(e.date).day}</span>
                    <span className="flex flex-col"><strong className="text-[15px]">{e.title}</strong><span className="text-xs text-[#f1e3d6]">{e.type}</span></span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="relative flex flex-wrap justify-center gap-3 px-6">
          <Link to="/events" className="btn-primary">See all events</Link>
          <a href="#news-email" className="btn border border-white/35 text-white hover:border-gold-300">Get event alerts</a>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-[20px] bg-cream px-5 py-4">
        <span className="mr-1.5 text-sm font-bold">Explore more</span>
        {[
          ['Photo gallery', '/events/gallery'],
          ['Programs we ran', '/events/gallery?type=organized'],
          ['Newsletters', '/events/newsletters'],
          ['In the press', '/events/press'],
          ['Academia MoUs', 'https://glbcri.org/Mou.php'],
          ['IIC achievements', 'https://glbcri.org/Achievements.php'],
        ].map(([label, href]) =>
          href.startsWith('/') ? (
            <Link key={label} to={href} className="rounded-full border border-[#eadfd3] bg-white px-3.5 py-2 text-sm font-medium hover:border-gold-500">{label}</Link>
          ) : (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-full border border-[#eadfd3] bg-white px-3.5 py-2 text-sm font-medium hover:border-gold-500">{label}</a>
          ),
        )}
      </div>
    </section>
  )
}

/* 6 · TEAM + LABS + MENTORS ------------------------------------------------------------ */
const TILT = ['-rotate-3', 'rotate-2 sm:mt-6', '-rotate-[1.5deg]', 'rotate-3 sm:mt-6', '-rotate-2']

function Team() {
  const pm = team.find((m) => m.role === 'Program Manager') || team[0]
  const labs = [
    ['coworking.jpg', 'Co-working space'],
    ['lab-idea.jpg', 'IDEA Lab'],
    ['lab-ev.jpg', 'EV Centre of Excellence'],
    ['lab-ios.jpg', 'iOS Lab'],
  ]
  const featured = mentors.filter((m) => ['Mr. Manveen Chadha', 'Mr. Ashish Kushwaha', 'Ms. Garima Ujjainia', 'Ms. Neha Misra'].includes(m.name))
  return (
    <section className="bg-cream">
      <div className="container-x section flex flex-col gap-16">
        <div className="flex flex-col items-center gap-3.5 text-center">
          <Eyebrow>Team GLBCRI</Eyebrow>
          <h2 className="h-section max-w-[720px]">The people you'll work with</h2>
          <p className="max-w-[560px] text-[17px] leading-relaxed text-ink-soft">A small team that reads every application and answers every founder personally.</p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 px-1 sm:grid-cols-3 sm:gap-x-7 lg:grid-cols-5 lg:px-2">
          {team.map((m, i) => (
            <div key={m.name} className={`flex flex-col gap-3 ${i === team.length - 1 && team.length % 2 ? 'col-span-2 mx-auto w-1/2 sm:col-span-1 sm:mx-0 sm:w-auto' : ''}`}>
              <figure className={`rounded-md bg-white p-3 pb-[18px] shadow-[0_2px_4px_rgba(81,53,41,.08),0_24px_40px_-24px_rgba(81,53,41,.4)] ${TILT[i % TILT.length]}`}>
                <Photo src={m.photo} alt={m.name} className="aspect-[4/5] w-full rounded-[3px] object-cover object-top" fallback={<div className="grid aspect-[4/5] place-items-center bg-gold-100"><Initials name={m.name} /></div>} />
                <figcaption className="flex flex-col gap-0.5 pt-3.5">
                  <strong className="text-[15px] leading-snug">{m.name.replace(/^(Dr\.|Mr\.|Ms\.)\s*/, (t) => (t.startsWith('Dr') ? t : ''))}</strong>
                  <span className="text-[13px] text-ink-soft">{m.role}</span>
                </figcaption>
              </figure>
              {m.handles && (
                <Link to={`/contact?topic=${encodeURIComponent(m.topic)}`} className="group flex min-h-[44px] items-center justify-between gap-2 rounded-full bg-gold-800 py-2 pl-4 pr-2 text-left text-white transition hover:bg-gold-900">
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-gold-300">Ask about</span>
                    <span className="text-[12px] font-bold leading-tight sm:text-[13px]">{m.handles}</span>
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-300 text-gold-900 transition group-hover:translate-x-0.5"><Icon name="arrow" className="h-3.5 w-3.5" /></span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <aside className="relative flex flex-col items-start gap-6 overflow-hidden rounded-[28px] bg-gold-900 px-7 py-8 text-white sm:flex-row sm:items-center sm:gap-8 sm:px-9">
          <div aria-hidden="true" className="absolute -right-[120px] -top-[160px] h-[420px] w-[420px] rounded-full opacity-55" style={{ background: 'radial-gradient(circle, #fad157 0 18%, #d98c39 18% 40%, #a8602a 40% 62%, rgba(58,36,27,0) 62%)' }} />
          <Photo src={pm.photo} alt={pm.name} className="relative h-28 w-28 rounded-full border-4 border-gold-300 object-cover object-top" fallback={<Initials name={pm.name} className="relative h-28 w-28 text-2xl" />} />
          <div className="relative flex min-w-0 flex-1 flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-gold-300">Not sure where you fit?</span>
            <h3 className="text-[30px] font-extrabold leading-tight">Talk to {pm.name.replace(/^(Mr\.|Ms\.|Dr\.)\s*/, '').split(' ')[0]}, our {pm.role}</h3>
            <p className="max-w-[560px] text-[15px] leading-relaxed text-[#f1e3d6]">A 15-minute call to find your program, funding route and next step. No pitch deck needed.</p>
          </div>
          <div className="relative flex w-full flex-col gap-2 sm:w-auto sm:min-w-[240px]">
            <a href={site.bookingUrl} className="btn-primary">Book a 15-min call</a>
            <a href={`mailto:${site.email}`} className="py-2.5 text-center text-sm font-semibold text-gold-300 hover:underline">or email {site.email}</a>
          </div>
        </aside>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-[28px] font-extrabold">Where you'll build</h3>
            <Link to="/funding#facilities" className="text-[15px] font-semibold text-gold-700 hover:underline">Tour our labs →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            {labs.map(([file, label]) => (
              <figure key={file} className="relative h-44 overflow-hidden rounded-[18px] sm:h-[220px]">
                <Photo src={IMG + file} alt={label} className="h-full w-full object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold">{label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-[28px] font-extrabold">Mentors who've built and backed startups</h3>
            <Link to="/programs#mentors" className="text-[15px] font-semibold text-gold-700 hover:underline">See all {mentors.length} mentors →</Link>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((m) => (
              <div key={m.name} className="flex flex-col gap-1.5 rounded-[18px] border border-[#eee5dc] bg-white p-5">
                <span className="text-xs font-bold uppercase tracking-[0.06em] text-gold-700">{m.org}</span>
                <strong className="text-[17px]">{m.name.replace(/^(Mr\.|Ms\.)\s*/, '')}</strong>
                <span className="text-sm text-ink-soft">{m.role} · {m.tags[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* INSTAGRAM --------------------------------------------------------------------------- */
function Instagram() {
  return (
    <section className="container-x pb-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <Eyebrow>From our Instagram</Eyebrow>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Life at GLBCRI</h2>
        </div>
      </div>
      <div className="mt-8"><InstagramFeed /></div>
    </section>
  )
}

export default function Home() {
  useSeo(null, 'Incubate your startup at GLBCRI, Greater Noida: prototype funding up to ₹10 lakh, UP Startup Policy incentives, mentors, labs and investor access.')
  return (
    <>
      <Hero />
      <EventShowcase />
      <About />
      <AlreadyBuilding />
      <Startups />
      <News />
      <Instagram />
      <Team />
    </>
  )
}
