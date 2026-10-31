import { useEffect, useState } from 'react'
import { Link, NavLink, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { Logo, PageHero, Photo } from '../components/ui'
import { albums, albumTypes, featuredPhotos, latestPress, newsletters, pressCount, pressGroups } from '../data/media'
import { getUpcoming } from '../lib/events'
import { subscribe } from '../lib/api'
import { useSeo } from '../lib/useSeo'

/* ───────────── Shared: the 4 tabs under "Events & Media" ───────────── */

const photoTotal = albums.reduce((n, a) => n + (a.photos.length || a.photoCount || 0), 0)

export function MediaTabs() {
  const tabs = [
    ['/events', 'Events', getUpcoming().length ? `${getUpcoming().length} upcoming` : null],
    ['/events/gallery', 'Gallery', `${albums.length} albums`],
    ['/events/newsletters', 'Newsletters', `${newsletters.length} issues`],
    ['/events/press', 'In the press', `${pressCount}`],
  ]
  return (
    <nav aria-label="Events and media" className="border-b border-ink/5 bg-cream">
      <div className="container-x flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
        {tabs.map(([to, label, meta]) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-gold-800 text-white' : 'text-ink-soft hover:bg-ink/[0.05]'
              }`
            }
          >
            {label}
            {meta && <span className="rounded-full bg-black/10 px-2 py-0.5 text-[11px] font-medium opacity-80">{meta}</span>}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

/* ───────────── Lightbox: full-screen photo viewer ───────────── */

export function Lightbox({ items, index, onClose, onIndex }) {
  const item = items[index]
  const go = (d) => onIndex((index + d + items.length) % items.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  })

  if (!item) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={item.caption} className="fixed inset-0 z-[100] flex flex-col bg-[#1c110b]/[0.97] text-white" onClick={onClose}>
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold sm:text-lg">{item.caption}</p>
          {item.sub && <p className="truncate text-sm text-white/60">{item.sub}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm tabular-nums text-white/60">{index + 1} / {items.length}</span>
          <button onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
        <img key={item.src} src={item.src} alt={item.caption} className="max-h-full max-w-full rounded-lg object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        {items.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous photo" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:left-6">
              <Icon name="chevLeft" className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next photo" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:right-6">
              <Icon name="chevRight" className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

/* ───────────── Gallery ───────────── */

function BrandCover({ album }) {
  const [d, m, y] = album.when.split(' ')
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gold-800 p-5 text-white">
      <svg className="absolute -right-10 -top-10 h-48 w-48 text-gold-500/30" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="14" />
      </svg>
      <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-200">
        <Icon name={album.type === 'organized' ? 'spark' : 'globe'} className="h-3.5 w-3.5" />
        {albumTypes[album.type]}
      </span>
      <p className="relative font-display text-3xl font-extrabold leading-none tracking-tightest text-gold-300">
        {album.when.length <= 6 ? album.when : <>{d} {m}<br /><span className="text-white/80">{y || ''}</span></>}
      </p>
    </div>
  )
}

function AlbumCard({ album, onOpen }) {
  const has = album.photos.length > 0
  const count = album.photos.length || album.photoCount || 0
  const Wrap = has ? 'button' : 'a'
  const wrapProps = has ? { type: 'button', onClick: onOpen } : { href: album.source, target: '_blank', rel: 'noreferrer' }
  return (
    <article className="group flex flex-col overflow-hidden rounded-[22px] border border-gold-200/70 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift">
      <Wrap {...wrapProps} className="relative block aspect-[4/3] w-full overflow-hidden text-left" aria-label={has ? `Open ${album.title} photos` : `${album.title} photos on glbcri.org`}>
        {has ? (
          <>
            <Photo src={album.photos[0]} alt={album.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" fallback={<BrandCover album={album} />} />
            {album.photos[1] && (
              <Photo src={album.photos[1]} alt="" className="absolute bottom-3 right-3 h-16 w-20 rotate-3 rounded-lg border-2 border-white object-cover shadow-lift" fallback={null} />
            )}
          </>
        ) : (
          <BrandCover album={album} />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Icon name="image" className="h-3.5 w-3.5" /> {count}
        </span>
      </Wrap>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">{album.when} · {album.place}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug">{album.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{album.summary}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-sm font-semibold">
          {has ? (
            <button onClick={onOpen} className="inline-flex items-center gap-1.5 text-gold-700 hover:text-gold-900">
              View {count} photo{count > 1 ? 's' : ''} <Icon name="arrow" className="h-4 w-4" />
            </button>
          ) : (
            <a href={album.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-gold-700 hover:text-gold-900">
              Photos on glbcri.org <Icon name="external" className="h-4 w-4" />
            </a>
          )}
          {album.cta && <Link to={album.cta.to} className="text-ink-soft underline-offset-4 hover:underline">{album.cta.label}</Link>}
          {album.event && <Link to={`/events/${album.event}`} className="text-ink-soft underline-offset-4 hover:underline">Event page</Link>}
        </div>
      </div>
    </article>
  )
}

export function Gallery() {
  useSeo('Gallery', 'Photos from GLBCRI programs, expos and showcases — where our startups pitched, exhibited and won.')
  const [params] = useSearchParams()
  const [filter, setFilter] = useState(albumTypes[params.get('type')] ? params.get('type') : 'all')
  const [viewer, setViewer] = useState(null) // { items, index }
  const list = albums.filter((a) => filter === 'all' || a.type === filter)
  const count = (t) => albums.filter((a) => t === 'all' || a.type === t).length

  const open = (album, index = 0) =>
    setViewer({
      index,
      items: album.photos.map((src) => ({ src, caption: album.title, sub: `${album.when} · ${album.place}` })),
    })

  const latestPhotos = featuredPhotos
    .map(([slug, i]) => {
      const album = albums.find((a) => a.slug === slug)
      return album?.photos[i] && { src: album.photos[i], album, i }
    })
    .filter(Boolean)

  return (
    <>
      <PageHero
        eyebrow="Events & Media"
        title="Gallery"
        sub="Where our startups showcased and the programs we ran — from trade shows and the Raj Bhawan expo to pitch days on campus."
      >
        <span className="chip">{albums.length} albums</span>
        <span className="chip">{photoTotal}+ photos</span>
      </PageHero>
      <MediaTabs />

      {latestPhotos.length > 0 && (
        <section className="container-x pt-12">
          <h2 className="font-display text-xl font-extrabold">Recent moments</h2>
          <div className="mt-5 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[170px] md:grid-cols-4">
            {latestPhotos.map(({ src, album, i }, k) => (
              <button
                key={src}
                onClick={() => open(album, i)}
                className={`group relative overflow-hidden rounded-2xl ${k === 0 ? 'col-span-2 row-span-2' : ''}`}
                aria-label={`Open photo from ${album.title}`}
              >
                <Photo src={src} alt={album.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  {album.title}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="container-x section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">All albums</h2>
          <div className="inline-flex w-fit rounded-full bg-ink/[0.04] p-1" role="tablist">
            {[['all', 'All'], ['participation', albumTypes.participation], ['organized', albumTypes.organized]].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)} className={`rounded-full px-4 py-2 text-sm font-medium ${filter === k ? 'bg-white shadow-card' : 'text-ink-soft'}`}>
                {l} <span className="text-ink-mute">({count(k)})</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => <AlbumCard key={a.slug} album={a} onOpen={() => open(a)} />)}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="flex flex-col items-start justify-between gap-5 rounded-[28px] bg-gold-900 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Want your startup in the next album?</h2>
            <p className="mt-2 max-w-xl text-white/70">Incubatees get stalls at expos, trade shows and summits across UP — we handle the nomination.</p>
          </div>
          <Link to="/apply" className="btn-primary shrink-0">Apply for incubation <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
      </section>

      {viewer && <Lightbox items={viewer.items} index={viewer.index} onClose={() => setViewer(null)} onIndex={(index) => setViewer((v) => ({ ...v, index }))} />}
    </>
  )
}

/* ───────────── Newsletters ───────────── */

function NewsletterCover({ issue, big = false }) {
  return (
    <div className={`relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-2xl bg-cream p-5 shadow-lift ring-1 ring-gold-200 ${big ? 'sm:p-8' : ''}`}>
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-800" />
      <div className={`${big ? 'h-9' : 'h-7'} w-fit`}><Logo /></div>
      <p className={`mt-auto font-display font-extrabold uppercase tracking-[0.2em] text-gold-600 ${big ? 'text-sm' : 'text-[10px]'}`}>Newsletter</p>
      <p className={`mt-1 font-display font-extrabold leading-[0.95] tracking-tightest text-ink ${big ? 'text-5xl' : 'text-2xl'}`}>{issue.period}</p>
      <div className="mt-4 grid grid-cols-3 gap-1.5" aria-hidden="true">
        <div className="col-span-2 h-10 rounded bg-gold-800/90" />
        <div className="h-10 rounded bg-gold-300" />
        <div className="h-2 rounded bg-ink/10" /><div className="col-span-2 h-2 rounded bg-ink/10" />
        <div className="col-span-3 h-2 rounded bg-ink/10" />
      </div>
      <span className="absolute right-4 top-5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{issue.format}</span>
    </div>
  )
}

function SubscribeBox({ id = 'nl-email' }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  if (done) return <p className="font-medium text-gold-700">Subscribed — the next issue comes straight to your inbox.</p>
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!email) return
        await subscribe(email, 'newsletter').catch(() => {})
        setDone(true)
      }}
      className="flex w-full max-w-md gap-2"
    >
      <label htmlFor={id} className="sr-only">Email</label>
      <input id={id} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@startup.com" className="input" />
      <button className="btn-primary shrink-0">Subscribe</button>
    </form>
  )
}

export function Newsletters() {
  useSeo('Newsletters', 'Read GLBCRI’s annual and quarterly newsletters — startups, grants, programs and wins.')
  const [latest, ...past] = newsletters
  return (
    <>
      <PageHero eyebrow="Events & Media" title="Newsletters" sub="Every quarter we round up new startups, grants won, programs and events. Read past issues or get the next one by email.">
        <SubscribeBox id="nl-hero" />
      </PageHero>
      <MediaTabs />

      <section className="container-x section">
        <div className="grid items-center gap-10 rounded-[28px] bg-[#f6eee4] p-6 sm:p-10 lg:grid-cols-[minmax(0,360px)_1fr]">
          <div className="mx-auto w-full max-w-[300px] -rotate-2 lg:max-w-none"><NewsletterCover issue={latest} big /></div>
          <div>
            <span className="tag">Latest issue</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">{latest.title}</h2>
            <p className="mt-3 max-w-lg text-lg text-ink-soft">{latest.blurb}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={latest.url} target="_blank" rel="noreferrer" className="btn-dark">Read the {latest.format.toLowerCase()} <Icon name="external" className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <h2 className="mt-16 font-display text-2xl font-extrabold">Past issues</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {past.map((n) => (
            <a key={n.slug} href={n.url} target="_blank" rel="noreferrer" className="group">
              <div className="transition group-hover:-translate-y-1"><NewsletterCover issue={n} /></div>
              <p className="mt-4 font-bold">{n.title}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                <Icon name="download" className="h-4 w-4" /> Read / download {n.format}
              </p>
            </a>
          ))}
          <a href="#nl-footer" className="flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gold-300 p-6 text-center transition hover:border-gold-500 hover:bg-white">
            <Icon name="mail" className="h-8 w-8 text-gold-600" />
            <p className="mt-4 font-display text-lg font-extrabold">Next issue</p>
            <p className="mt-1 text-sm text-ink-soft">Subscribe and it lands in your inbox.</p>
          </a>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="flex flex-col gap-5 rounded-[28px] bg-gold-900 p-8 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Get the next issue first</h2>
            <p className="mt-2 text-white/70">One email a quarter. No spam.</p>
          </div>
          <div className="[&_.input]:bg-white"><SubscribeBox id="nl-footer" /></div>
        </div>
      </section>
    </>
  )
}

/* ───────────── In the press ───────────── */

function Clipping({ item, onOpen }) {
  return (
    <button onClick={onOpen} className="group text-left" aria-label={`Open clipping: ${item.caption}`}>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f3ece0] shadow-card ring-1 ring-ink/5">
        <Photo src={item.src} alt={item.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-card transition group-hover:opacity-100">
          <Icon name="plus" className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-snug">{item.caption}</p>
      {item.paper && <p className="mt-1 text-xs text-ink-mute">{item.paper}</p>}
    </button>
  )
}

export function Press() {
  useSeo('In the press', 'GLBCRI and its startups in the news.')
  const [viewer, setViewer] = useState(null)
  const all = pressGroups.flatMap((g) => g.items.map((i) => ({ ...i, g })))
  const open = (item) =>
    setViewer({
      index: all.findIndex((i) => i.id === item.id),
      items: all.map((i) => ({ src: i.src, caption: i.caption, sub: [i.paper, i.g.when].filter(Boolean).join(' · ') })),
    })

  return (
    <>
      <PageHero eyebrow="Events & Media" title="In the press" sub="Newspaper coverage of GLBCRI, our startups and the programs we run.">
        <span className="chip"><Icon name="news" className="h-4 w-4" /> {pressCount} clippings · {pressGroups.length} stories</span>
        <Link to="/contact" className="btn-outline">Media enquiries</Link>
      </PageHero>
      <MediaTabs />

      <section className="container-x section space-y-16">
        {pressGroups.map((g) => (
          <div key={g.slug}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-ink/10 pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-600">{g.when}</p>
              <h2 className="font-display text-xl font-extrabold sm:text-2xl">{g.title}</h2>
              <span className="text-sm text-ink-mute">· {g.items.length} clipping{g.items.length > 1 ? 's' : ''}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {g.items.map((it) => <Clipping key={it.id} item={it} onOpen={() => open(it)} />)}
            </div>
          </div>
        ))}
      </section>

      {viewer && <Lightbox items={viewer.items} index={viewer.index} onClose={() => setViewer(null)} onIndex={(index) => setViewer((v) => ({ ...v, index }))} />}
    </>
  )
}

/* ───────────── Small strip reused on About ───────────── */

export function PressStrip() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {latestPress.map((c) => (
          <Link key={c.id} to="/events/press" className="group">
            <div className="aspect-square overflow-hidden rounded-2xl bg-[#f3ece0] shadow-card ring-1 ring-ink/5">
              <Photo src={c.src} alt={c.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-gold-600">{c.group.when}</p>
            <p className="mt-1 text-sm font-semibold leading-snug">{c.group.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
