import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { Logo, Photo } from './ui'
import { site } from '../data/site'
import { getNextEvent, formatDate, isToday } from '../lib/events'
import { subscribe } from '../lib/api'

const nav = [
  { to: '/programs', label: 'Programs' },
  { to: '/funding', label: 'Funding & Labs' },
  { to: '/startups', label: 'Startups' },
  { to: '/events', label: 'Events & Media' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function AnnouncementBar() {
  const next = getNextEvent()
  const key = next ? `glbcri:dismiss:${next.slug}` : ''
  const [hidden, setHidden] = useState(() => {
    try {
      return key ? sessionStorage.getItem(key) === '1' : true
    } catch {
      return false
    }
  })
  if (!next || hidden) return null
  const close = () => {
    setHidden(true)
    try {
      sessionStorage.setItem(key, '1')
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="relative bg-ink text-white">
      <div className="container-x flex items-center justify-center gap-3 py-2.5 pr-10 text-center text-[13px]">
        <span className="hidden rounded-full bg-gold-500 px-2 py-0.5 text-[11px] font-semibold text-ink sm:inline">{isToday(next) ? 'Today' : 'Upcoming'}</span>
        <span className="truncate">
          <strong className="font-semibold">{next.title}</strong>
          <span className="text-white/70"> · {formatDate(next.date, { year: false })}{next.prize ? ` · ${next.prize}` : ''}</span>
        </span>
        <Link to={`/events/${next.slug}`} className="shrink-0 font-semibold text-gold-300 underline-offset-4 hover:underline">
          Details →
        </Link>
      </div>
      <button onClick={close} aria-label="Dismiss announcement" className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/60 hover:text-white">
        <Icon name="close" className="h-4 w-4" />
      </button>
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const link = ({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-gold-100 text-gold-800' : 'text-ink hover:text-gold-700'}`

  return (
    <header className={`sticky top-0 z-40 transition ${scrolled ? 'border-b border-ink/5 bg-white/85 backdrop-blur-md' : 'bg-white/0'}`}>
      <div className="container-x flex h-[76px] items-center justify-between gap-4">
        <Link to="/" aria-label="GLBCRI home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={link}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.bookingUrl} className="btn hidden bg-gold-950/[0.05] px-5 py-2.5 text-ink hover:bg-gold-950/10 xl:inline-flex">
            Talk to us
          </a>
          <Link to="/apply" className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
            Apply now
          </Link>
          <button className="rounded-full p-2 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-ink/5 bg-white lg:hidden">
          <nav className="container-x flex flex-col py-3" aria-label="Mobile">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `rounded-xl px-3 py-3 text-base font-medium ${isActive ? 'bg-gold-50 text-gold-700' : 'text-ink'}`}>
                {n.label}
              </NavLink>
            ))}
            <Link to="/apply" className="btn-primary mt-3">
              Apply for Incubation
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function PreFooterCTA() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    await subscribe(email, 'events').catch(() => {})
    setDone(true)
  }
  return (
    <section className="bg-[#f6eee4]">
      <div className="container-x pb-14 pt-16 sm:pt-20">
        <div className="grid gap-5 md:grid-cols-2">
          <Link to="/apply?program=pre-incubation" className="group flex min-h-[240px] overflow-hidden rounded-3xl bg-white">
            <Photo src="/images/glbcri/lab-ios.jpg" alt="Students working at the iOS Lab" className="hidden w-[42%] object-cover sm:block" />
            <span className="flex flex-1 flex-col justify-between gap-4 p-7">
              <span className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-gold-700">Have an idea?</span>
                <strong className="font-display text-[28px] font-extrabold leading-tight tracking-tightest">Turn it into a prototype</strong>
                <span className="text-sm leading-relaxed text-ink-soft">Up to ₹10 lakh, mentors and labs. Students and first-time founders welcome.</span>
              </span>
              <span className="btn-dark self-start px-5 py-2.5">Start here →</span>
            </span>
          </Link>
          <Link to="/apply?program=incubation" className="group flex min-h-[240px] overflow-hidden rounded-3xl bg-gold-800 text-white">
            <Photo src="/images/glbcri/event-iitf.jpg" alt="GLBCRI startup team at IITF 2025" className="hidden w-[42%] object-cover sm:block" />
            <span className="flex flex-1 flex-col justify-between gap-4 p-7">
              <span className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-gold-300">Already building?</span>
                <strong className="font-display text-[28px] font-extrabold leading-tight tracking-tightest">Scale with GLBCRI</strong>
                <span className="text-sm leading-relaxed text-[#f1e3d6]">State funding, investors and market access. We reply within {site.replyPromise}.</span>
              </span>
              <span className="btn-primary self-start px-5 py-2.5">Scale here →</span>
            </span>
          </Link>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          {done ? (
            <p className="text-sm font-semibold text-gold-800">Subscribed. We'll email you before the next event or funding call.</p>
          ) : (
            <form onSubmit={submit} className="flex flex-wrap items-center gap-2.5">
              <label htmlFor="news-email" className="text-sm font-semibold">Get event alerts and funding calls</label>
              <input id="news-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@startup.com" className="input w-64 rounded-full py-2.5" />
              <button className="btn-dark px-5 py-2.5">Subscribe</button>
            </form>
          )}
          <Link to="/events/newsletters" className="text-sm font-semibold text-gold-700 hover:underline">Read past issues →</Link>
          <span className="text-sm text-ink-soft">
            Questions first?{' '}
            <a href={site.bookingUrl} className="font-semibold text-gold-700 hover:underline">Book a 15-min call</a>
          </span>
        </div>
      </div>
    </section>
  )
}

// Every page from the old glbcri.org menu stays reachable. Pages not rebuilt yet link to the old site.
const OLD = 'https://glbcri.org/'
const footerCols = [
  { title: 'For founders', links: [['Apply for incubation', '/apply'], ['Programs', '/programs'], ['Incubation support', '/programs'], ['Incubation facilities', '/funding#facilities'], ['Incubation policies', OLD + 'Incubation-Policies.php'], ['Focus sectors', OLD + 'Focus-Sector.php'], ['FAQ', '/programs#faq']] },
  { title: 'Funding', links: [['DST NIDHI PRAYAS', '/funding#prayas'], ['Prayasee 2022–23', OLD + 'Prayasee-2022-23.php'], ['Prayasee 2023–24', OLD + 'Prayasee-2023-24.php'], ['Start in UP', '/funding#up-policy'], ['MSME Idea Hackathon', '/events/msme-idea-hackathon-6']] },
  { title: 'Startups', links: [['Our incubatees', '/startups'], ['Graduated startups', '/startups'], ['Student entrepreneurs', OLD + 'Students-Entrepreneurs.php'], ['Success stories', '/startups']], extra: { title: 'Media', links: [['Events', '/events'], ['Gallery', '/events/gallery'], ['Newsletters', '/events/newsletters'], ['In the press', '/events/press']] } },
  { title: 'About', links: [['About GLBCRI', '/about'], ['Vision, mission & policies', OLD + 'vision-mission.php'], ['Directors', OLD + 'Directors.php'], ['Our team', '/about#team'], ['Our mentors', '/programs#mentors'], ['Labs (State of Art)', '/funding#facilities'], ['Academia MoUs', OLD + 'Mou.php'], ['Contact', '/contact']] },
  { title: 'IIC & E-Cell', links: [['About IIC 8.0', OLD + 'About-IIC.php'], ['IIC achievements', OLD + 'Achievements.php'], ['Faculty & student members', OLD + 'Faculty-Members.php'], ['Innovation Ambassadors', OLD + 'Innovation-Ambassadors.php'], ['Yukti', OLD + 'Yukti.php'], ['Submit IIC report', OLD + 'Submit-IIC-Report.php'], ['E-Cell & Udyami Cell', OLD + 'E-cell.php'], ['GLBITM home', 'https://www.glbitm.org/']] },
]

function FLink({ to, children }) {
  const cls = 'text-[#f1e3d6] hover:text-gold-300'
  return to.startsWith('http') ? (
    <a href={to} target="_blank" rel="noreferrer" className={cls}>{children}</a>
  ) : (
    <Link to={to} className={cls}>{children}</Link>
  )
}

function Footer() {
  const { social } = site
  const socials = [
    ['instagram', social.instagram.url],
    ['linkedin', social.linkedin],
    ['youtube', social.youtube],
    ['facebook', social.facebook],
  ].filter(([, url]) => url)
  return (
    <footer className="overflow-hidden bg-gold-950 text-[#f1e3d6]">
      <div className="container-x pt-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-[280px] lg:shrink-0">
            <span className="self-start rounded-xl bg-white px-3.5 py-2.5"><Logo /></span>
            <address className="text-sm not-italic leading-relaxed">{site.address.lines.join(', ')}</address>
            <p className="text-sm leading-7">
              <a href={`mailto:${site.email}`} className="hover:text-gold-300">{site.email}</a>
              <br />
              <a href={site.phoneHref} className="hover:text-gold-300">{site.phone}</a>
            </p>
            <div className="flex gap-2">
              {socials.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="grid h-10 w-10 place-items-center rounded-full border border-[#5a4236] hover:border-gold-300 hover:text-gold-300">
                  <Icon name={name} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Footer" className="grid flex-1 grid-cols-2 gap-8 text-sm leading-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerCols.map((col) => (
              <div key={col.title} className="flex flex-col">
                <h3 className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.1em] text-gold-300">{col.title}</h3>
                {col.links.map(([label, to]) => <FLink key={label} to={to}>{label}</FLink>)}
                {col.extra && (
                  <>
                    <h3 className="mb-2 mt-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-gold-300">{col.extra.title}</h3>
                    {col.extra.links.map(([label, to]) => <FLink key={label} to={to}>{label}</FLink>)}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-[#4a3329] pt-5 text-xs text-[#c9b6a8] sm:flex-row">
          <p>© {new Date().getFullYear()} {site.fullName} · MSME-recognised Business Incubator · DST NIDHI PRAYAS Centre</p>
          <p>Terms of use · Privacy policy</p>
        </div>
      </div>
      <div aria-hidden="true" className="select-none whitespace-nowrap pt-8 text-center font-display text-[22vw] font-extrabold leading-[0.78] tracking-[-0.06em] text-gold-800 xl:text-[300px]">
        GLBCRI
      </div>
    </footer>
  )
}

function MobileCTA() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/apply')) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 backdrop-blur sm:hidden">
      <div className="flex gap-2">
        <Link to="/apply" className="btn-primary flex-1">
          Apply for Incubation
        </Link>
        <a href={site.whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="btn-outline px-4">
          <Icon name="whatsapp" className="h-5 w-5" />
        </a>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col pb-[72px] sm:pb-0">
      <ScrollToTop />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      {!pathname.startsWith('/apply') && <PreFooterCTA />}
      <Footer />
      <MobileCTA />
    </div>
  )
}
