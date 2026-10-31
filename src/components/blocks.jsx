import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Initials, Photo } from './ui'
import { dateParts, formatDate, isToday, toDate } from '../lib/events'
import { fetchInstagramPosts } from '../lib/instagram'
import { site } from '../data/site'

/* ---------------- Countdown ---------------- */
export function Countdown({ date, time = '09:30' }) {
  const target = toDate(date)
  const [h, m] = (time.match(/(\d{1,2}):(\d{2})/) || [null, '9', '30']).slice(1).map(Number)
  target.setHours(h, m, 0, 0)
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, target - now)
  if (diff === 0) return <span className="chip border-emerald-200 bg-emerald-50 text-emerald-700">● Happening now</span>
  const d = Math.floor(diff / 864e5)
  const hrs = Math.floor((diff % 864e5) / 36e5)
  const min = Math.floor((diff % 36e5) / 6e4)
  return (
    <div className="flex gap-2" aria-label={`${d} days ${hrs} hours ${min} minutes to go`}>
      {[
        [d, 'days'],
        [hrs, 'hrs'],
        [min, 'min'],
      ].map(([v, l]) => (
        <div key={l} className="min-w-[58px] rounded-xl bg-white px-2 py-2 text-center shadow-card">
          <div className="text-xl font-extrabold tabular-nums">{String(v).padStart(2, '0')}</div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-ink-mute">{l}</div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Event card ---------------- */
export function EventCard({ event, past = false }) {
  const { day, month, year } = dateParts(event.date)
  return (
    <Link to={`/events/${event.slug}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift">
      {event.image && <Photo src={event.image} alt={event.title} className="h-40 w-full object-cover" />}
      <div className="flex gap-4 p-5">
      <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl ${past ? 'bg-ink/[0.04] text-ink-soft' : 'bg-gold-50 text-gold-800'}`}>
        <span className="text-xl font-extrabold leading-none">{day}</span>
        <span className="mt-1 text-[11px] font-semibold uppercase">{month}</span>
        <span className="text-[10px] text-ink-mute">{year}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag">{event.type}</span>
          {!past && isToday(event) && <span className="tag bg-emerald-50 text-emerald-700">Today</span>}
        </div>
        <h3 className="mt-2 font-bold leading-snug group-hover:text-gold-700">{event.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{event.summary}</p>
        <p className="mt-3 text-xs font-semibold text-gold-700">{past ? 'See highlights →' : 'Register →'}</p>
      </div>
      </div>
    </Link>
  )
}

/* ---------------- Program card ---------------- */
const statusLabel = { open: 'Applications open', rolling: 'Rolling applications', closed: 'Applications closed' }

export function ProgramCard({ program }) {
  const closed = program.status === 'closed'
  return (
    <article id={program.id} className={`card relative flex scroll-mt-28 flex-col p-6 ${program.highlight ? 'ring-2 ring-gold-400' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-50 text-gold-700">
          <Icon name={program.icon} className="h-5 w-5" />
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${program.highlight ? 'bg-gold-500 text-white' : 'bg-gold-50 text-gold-800'}`}>{program.badge}</span>
      </div>
      <h3 className="mt-5 text-xl font-bold">{program.name}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-gold-700">
        <Icon name="calendar" className="h-4 w-4" /> {program.duration}
      </p>
      <p className="mt-3 text-sm text-ink-soft">{program.forWho}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {program.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm">
            <Icon name="checkCircle" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
            {f}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs font-medium text-ink-mute">● {statusLabel[program.status]}</p>
      {closed ? (
        <Link to={`/contact?topic=${program.id}`} className="btn-outline mt-3 w-full">
          Notify me
        </Link>
      ) : (
        <Link to={`/apply?program=${program.id}`} className="btn-primary mt-3 w-full">
          Apply for {program.name.replace('Program', '').trim()}
        </Link>
      )}
    </article>
  )
}

/* ---------------- Instagram feed ---------------- */
export function InstagramFeed() {
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    let alive = true
    fetchInstagramPosts(6).then((p) => alive && setPosts(p))
    return () => {
      alive = false
    }
  }, [])
  const ig = site.social.instagram

  // Fallback tiles while loading or when no token is configured.
  const fallback = [
    { label: 'Pitch days', icon: 'trophy' },
    { label: 'Workshops', icon: 'lab' },
    { label: 'Demo days', icon: 'rocket' },
    { label: 'Founder stories', icon: 'users' },
    { label: 'Lab life', icon: 'chip' },
    { label: 'Events', icon: 'calendar' },
  ]

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {posts && posts.length > 0
          ? posts.map((p) => (
              <a key={p.id} href={p.permalink} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-2xl bg-gold-50">
                <img src={p.image} alt={p.caption.slice(0, 120) || 'Instagram post from GLBCRI'} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                {p.isVideo && <Icon name="play" className="absolute right-2 top-2 h-5 w-5 text-white drop-shadow" />}
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-3 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  <span className="line-clamp-3">{p.caption}</span>
                </span>
              </a>
            ))
          : fallback.map((f, i) => (
              <a
                key={f.label}
                href={ig.url || '/events'}
                target={ig.url ? '_blank' : undefined}
                rel="noreferrer"
                className={`group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl p-4 ${posts === null ? 'animate-pulse' : ''} ${i % 3 === 0 ? 'bg-gold-500 text-white' : i % 3 === 1 ? 'bg-gold-100 text-gold-800' : 'bg-ink text-white'}`}
              >
                <Icon name="instagram" className="h-5 w-5 opacity-70" />
                <span>
                  <Icon name={f.icon} className="mb-2 h-7 w-7" />
                  <span className="block text-sm font-bold">{f.label}</span>
                  {ig.handle && <span className="block text-[11px] opacity-70">@{ig.handle}</span>}
                </span>
              </a>
            ))}
      </div>
      {ig.url && (
        <div className="mt-8 text-center">
          <a href={ig.url} target="_blank" rel="noreferrer" className="btn-outline">
            <Icon name="instagram" className="h-4 w-4" /> Follow @{ig.handle}
          </a>
        </div>
      )}
    </div>
  )
}

/* ---------------- Testimonials ---------------- */
export function Testimonials({ items }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (items.length < 2) return
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 7000)
    return () => clearInterval(t)
  }, [items.length])
  const t = items[i]
  return (
    <div className="card relative mx-auto max-w-3xl p-8 sm:p-12">
      <Icon name="quote" className="h-10 w-10 text-gold-400" strokeWidth={2.2} />
      <blockquote key={i} className="mt-4 text-lg font-medium leading-relaxed sm:text-xl">
        “{t.quote}”
      </blockquote>
      <div className="mt-6 flex items-center gap-3">
        <Photo src={t.photo} alt={t.name} className="h-12 w-12 rounded-full object-cover" fallback={<Initials name={t.name} className="h-11 w-11 text-sm" />} />
        <div>
          <p className="font-semibold">{t.name}</p>
          <p className="text-sm text-ink-mute">{t.role}</p>
        </div>
      </div>
      {items.length > 1 && (
        <div className="mt-6 flex gap-2">
          {items.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-gold-500' : 'w-2 bg-ink/15'}`} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------------- FAQ ---------------- */
export function FAQ({ items }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {f.q}
            <Icon name="plus" className="h-5 w-5 shrink-0 text-gold-600 transition group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

/* ---------------- Startup marquee (Figma: two rows of logo pills) ---------------- */
export function StartupMarquee({ startups }) {
  const names = startups.map((s) => s.name.replace(/\s+(Pvt Ltd|LLP|Private Limited)$/i, ''))
  const row = (list, anim) => (
    <div className="flex w-max gap-4 py-2" style={{ animation: undefined }}>
      <div className={`flex gap-4 ${anim} hover:[animation-play-state:paused]`}>
        {[...list, ...list].map((n, i) => (
          <span key={i} className={`whitespace-nowrap rounded-full border px-7 py-4 text-sm font-semibold shadow-card ${i % 4 === 1 ? 'border-gold-400 bg-gold-500 text-white' : 'border-ink/5 bg-white text-ink'}`}>
            {n}
          </span>
        ))}
      </div>
    </div>
  )
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      {row(names, 'animate-marquee')}
      {row([...names].reverse(), 'animate-marqueeRev')}
    </div>
  )
}

/* ---------------- Mentor grid ---------------- */
export function MentorGrid({ mentors, initial = 8 }) {
  const [all, setAll] = useState(false)
  const sorted = [...mentors].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  const shown = all ? sorted : sorted.slice(0, initial)
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((m) => (
          <div key={m.name} className="card p-6 text-center">
            <Initials name={m.name} className="mx-auto h-16 w-16 text-lg" />
            <h3 className="mt-4 font-bold">{m.name}</h3>
            <p className="text-sm text-gold-700">{m.role}</p>
            <p className="text-xs text-ink-mute">{m.org}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {m.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {mentors.length > initial && (
        <div className="mt-8 text-center">
          <button onClick={() => setAll((a) => !a)} className="btn-outline">
            {all ? 'Show fewer' : `Show all ${mentors.length} mentors`}
          </button>
        </div>
      )}
    </>
  )
}

/* ---------------- Steps ---------------- */
export function Steps({ steps }) {
  return (
    <ol className="grid gap-5 md:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-600 text-sm font-bold text-white">{i + 1}</span>
            {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-gradient-to-r from-gold-400 to-gold-100 md:block" />}
          </div>
          <h3 className="mt-4 font-bold">{s.title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

export { formatDate }
