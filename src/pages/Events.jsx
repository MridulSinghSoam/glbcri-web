import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { ApplyButton, Eyebrow, PageHero, Photo } from '../components/ui'
import { Countdown, EventCard, InstagramFeed } from '../components/blocks'
import { eventTypes } from '../data/events'
import { formatDate, getEvent, getPast, getUpcoming, isUpcoming } from '../lib/events'
import { subscribe } from '../lib/api'
import { useSeo } from '../lib/useSeo'
import { MediaTabs } from './Media'

function Subscribe() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    await subscribe(email, 'events').catch(() => {})
    setDone(true)
  }
  if (done) return <p className="text-sm font-medium text-gold-700">You’re on the list. We’ll email you before the next event.</p>
  return (
    <form onSubmit={submit} className="flex w-full max-w-md gap-2">
      <label htmlFor="sub-email" className="sr-only">Email</label>
      <input id="sub-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@startup.com" className="input" />
      <button className="btn-primary shrink-0">Get alerts</button>
    </form>
  )
}

export function Events() {
  useSeo('Events', 'Pitch days, workshops, summits and networking meets at GLBCRI, Greater Noida.')
  const [tab, setTab] = useState('upcoming')
  const [type, setType] = useState('All')
  const upcoming = getUpcoming()
  const past = getPast()
  const base = tab === 'upcoming' ? upcoming : tab === 'past' ? past : [...upcoming, ...past]
  const list = base.filter((e) => type === 'All' || e.type === type)
  const featured = upcoming.find((e) => e.featured) || upcoming[0]

  return (
    <>
      <PageHero eyebrow="Events & Media" title="Pitch, learn, meet investors" sub="Pitch arenas, workshops and summits for founders and student innovators. Get an email before each one.">
        <Subscribe />
      </PageHero>
      <MediaTabs />

      {featured && (
        <section className="container-x pt-12">
          <div className="grid overflow-hidden rounded-[28px] border border-gold-200 bg-white shadow-card lg:grid-cols-[1fr_1.2fr]">
            <div className="relative flex min-h-[220px] flex-col justify-end bg-gradient-to-br from-ink via-ink to-gold-800 p-8 text-white">
              {featured.image && <Photo src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover opacity-50" />}
              <div className="glow right-0 top-0 h-48 w-48 bg-gold-500/40" />
              <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Featured event</p>
              <p className="relative mt-2 text-5xl font-extrabold">{formatDate(featured.date, { year: false })}</p>
              {featured.prize && <p className="relative mt-2 font-semibold text-gold-200">{featured.prize}</p>}
            </div>
            <div className="p-8">
              <span className="tag">{featured.type}</span>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{featured.title}</h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft"><Icon name="pin" className="h-4 w-4" />{featured.venue}</p>
              <p className="mt-4 text-ink-soft">{featured.summary}</p>
              {featured.audience && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {featured.audience.map((a) => <span key={a} className="chip">{a}</span>)}
                </div>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Countdown date={featured.date} time={featured.time} />
                <Link to={`/events/${featured.slug}`} className="btn-primary">Register <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="container-x section">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-full bg-ink/[0.04] p-1" role="tablist">
            {[
              ['upcoming', `Upcoming (${upcoming.length})`],
              ['past', `Past (${past.length})`],
              ['all', 'All'],
            ].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-sm font-medium ${tab === k ? 'bg-white shadow-card' : 'text-ink-soft'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', ...eventTypes].map((t) => (
              <button key={t} onClick={() => setType(t)} className={`rounded-full px-3 py-1.5 text-xs font-medium ${type === t ? 'bg-ink text-white' : 'bg-ink/[0.04] text-ink-soft'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => <EventCard key={e.slug} event={e} past={!isUpcoming(e)} />)}
        </div>
        {list.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-ink/15 p-10 text-center">
            <p className="font-semibold">No {tab === 'upcoming' ? 'upcoming' : ''} events here right now.</p>
            <p className="mt-1 text-sm text-ink-mute">Subscribe above and we’ll tell you when the next one is announced.</p>
          </div>
        )}
      </section>
    </>
  )
}

export function EventDetail() {
  const { slug } = useParams()
  const e = getEvent(slug)
  useSeo(e?.title || 'Event', e?.summary)
  if (!e) {
    return (
      <section className="container-x section text-center">
        <h1 className="text-3xl font-extrabold">Event not found</h1>
        <Link to="/events" className="btn-outline mt-6">Back to events</Link>
      </section>
    )
  }
  const upcoming = isUpcoming(e)
  return (
    <>
      <PageHero eyebrow={`${e.type} · ${upcoming ? 'Upcoming' : 'Past event'}`} title={e.title} sub={e.summary}>
        {upcoming ? (
          e.registerUrl?.startsWith('http') ? (
            <a href={e.registerUrl} target="_blank" rel="noreferrer" className="btn-primary">Register <Icon name="arrow" className="h-4 w-4" /></a>
          ) : (
            <Link to={e.registerUrl || '/apply'} className="btn-primary">Register / apply to pitch <Icon name="arrow" className="h-4 w-4" /></Link>
          )
        ) : (
          <ApplyButton>Apply for the next cohort</ApplyButton>
        )}
        <Link to="/events" className="btn-outline">All events</Link>
      </PageHero>

      <section className="container-x section grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5 leading-relaxed text-ink-soft">
          {e.image && <Photo src={e.image} alt={e.title} className="w-full rounded-2xl object-cover" />}
          <h2 className="text-2xl font-extrabold text-ink">About the event</h2>
          {(e.about || [e.summary]).map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          {e.partners && (
            <>
              <h3 className="pt-4 text-lg font-bold text-ink">In association with</h3>
              <div className="flex flex-wrap gap-2">
                {e.partners.map((p) => <span key={p} className="chip">{p}</span>)}
              </div>
            </>
          )}
        </div>
        <aside className="card h-fit space-y-4 p-6">
          {upcoming && <Countdown date={e.date} time={e.time} />}
          <p className="flex items-start gap-3 text-sm"><Icon name="calendar" className="h-5 w-5 text-gold-600" /><span><strong className="block">{formatDate(e.date)}</strong>{e.time}</span></p>
          <p className="flex items-start gap-3 text-sm"><Icon name="pin" className="h-5 w-5 text-gold-600" />{e.venue}</p>
          {e.prize && <p className="flex items-start gap-3 text-sm"><Icon name="trophy" className="h-5 w-5 text-gold-600" />{e.prize}</p>}
          {e.audience && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-mute">Who should attend</p>
              <div className="mt-2 flex flex-wrap gap-1.5">{e.audience.map((a) => <span key={a} className="tag">{a}</span>)}</div>
            </div>
          )}
        </aside>
      </section>

      <section className="bg-gold-50/50">
        <div className="container-x section">
          <Eyebrow>From our Instagram</Eyebrow>
          <h2 className="mt-4 text-2xl font-extrabold">Photos and highlights</h2>
          <div className="mt-8"><InstagramFeed /></div>
        </div>
      </section>
    </>
  )
}
