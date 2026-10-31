import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import { ApplyButton, Initials, PageHero, Photo, SectionHeading } from '../components/ui'
import { Testimonials } from '../components/blocks'
import { alumniFounders, startups, testimonials } from '../data/startups'
import { portfolio } from '../data/portfolio'
import { useSeo } from '../lib/useSeo'

const PAGE = 24

export default function Startups() {
  useSeo('Startups', `${portfolio.length} startups incubated at GLBCRI, GL Bajaj Greater Noida.`)
  const [status, setStatus] = useState('all')
  const [q, setQ] = useState('')
  const [limit, setLimit] = useState(PAGE)

  const list = useMemo(
    () =>
      portfolio.filter(
        (s) => (status === 'all' || s.status === status) && (!q || `${s.name} ${s.founders.join(' ')}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [status, q],
  )
  const counts = { all: portfolio.length, current: portfolio.filter((s) => s.status === 'current').length, alumni: portfolio.filter((s) => s.status === 'alumni').length }
  const featured = startups.filter((s) => s.featured)

  return (
    <>
      <PageHero eyebrow="Our startups" title={`${portfolio.length} startups have built here. You could be next.`} sub="Solar-cleaning robots, agri drones, AI labs, D2C brands and more — incubated, funded and launched from GLBCRI.">
        <ApplyButton />
      </PageHero>

      <section className="container-x section">
        <SectionHeading align="left" eyebrow="Success stories" title="Startups in the spotlight" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <article key={s.name} className="card overflow-hidden">
              <div className="relative flex h-40 items-end justify-between overflow-hidden bg-gradient-to-br from-gold-400 to-gold-700 p-5 text-white">
                {s.image && <Photo src={s.image} alt={s.name} className="absolute inset-0 h-full w-full object-cover" />}
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="relative text-xs font-semibold uppercase tracking-wider text-white/80">{s.sector}</span>
                {s.funding && <span className="relative text-2xl font-extrabold">{s.funding}</span>}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{s.name}</h3>
                {s.founder && <p className="text-xs text-ink-mute">Founder: {s.founder}</p>}
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.story}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-extrabold">All startups</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full bg-ink/[0.04] p-1" role="tablist" aria-label="Status">
              {[
                ['all', 'All'],
                ['current', 'Current'],
                ['alumni', 'Graduated'],
              ].map(([k, l]) => (
                <button key={k} role="tab" aria-selected={status === k} onClick={() => { setStatus(k); setLimit(PAGE) }} className={`rounded-full px-4 py-2 text-sm font-medium ${status === k ? 'bg-white shadow-card' : 'text-ink-soft'}`}>
                  {l} <span className="text-ink-mute">{counts[k]}</span>
                </button>
              ))}
            </div>
            <label className="relative">
              <span className="sr-only">Search startups or founders</span>
              <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
              <input value={q} onChange={(e) => { setQ(e.target.value); setLimit(PAGE) }} placeholder="Search startup or founder" className="input w-60 py-2 pl-9" />
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.slice(0, limit).map((s) => (
            <article key={s.name + s.founders[0]} className="card flex items-start gap-3 p-4">
              <Initials name={s.name} className="h-10 w-10 rounded-xl text-xs" />
              <div className="min-w-0">
                <h3 className="text-sm font-bold leading-snug">{s.name}</h3>
                <p className="mt-0.5 truncate text-xs text-ink-mute">{s.founders.join(', ')}</p>
                {s.status === 'alumni' && <span className="tag mt-2 bg-gold-50 text-gold-800">Graduated</span>}
              </div>
            </article>
          ))}
          {list.length === 0 && <p className="col-span-full rounded-2xl border border-dashed border-ink/15 p-10 text-center text-sm text-ink-mute">No startups match “{q}”.</p>}
        </div>
        {list.length > limit && (
          <div className="mt-8 text-center">
            <button className="btn-outline" onClick={() => setLimit((l) => l + PAGE)}>
              Show more <span className="text-ink-mute">({list.length - limit} left)</span>
            </button>
          </div>
        )}
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <SectionHeading align="left" eyebrow="Alumni founders" title="GL Bajaj founders, building everywhere" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {alumniFounders.map((a) => (
            <div key={a.name} className="card flex items-center gap-3 p-4">
              <Initials name={a.name} className="h-11 w-11 text-sm" />
              <div>
                <p className="font-semibold">{a.name}</p>
                <p className="text-xs text-ink-mute">{a.role}, {a.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gold-50/50">
        <div className="container-x section">
          <SectionHeading eyebrow="Founders say" title="In their words" />
          <div className="mt-10">
            <Testimonials items={testimonials} />
          </div>
        </div>
      </section>
    </>
  )
}
