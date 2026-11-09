import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

// An <img> that quietly falls back (to `fallback`, or nothing) if the file is missing.
// Images come from `npm run images`, which downloads them from the current glbcri.org.
export function Photo({ src, alt = '', className = '', fallback = null, ...rest }) {
  const [ok, setOk] = useState(Boolean(src))
  if (!ok) return fallback
  return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setOk(false)} {...rest} />
}

// Official logo (public/images/glbcri/logo.png); falls back to a text wordmark.
export function Logo({ light = false }) {
  return <Photo src="/images/glbcri/logo.png" alt="GL Bajaj Centre for Research and Incubation" loading="eager" className={`h-11 w-auto ${light ? 'brightness-0 invert' : ''}`} fallback={<Wordmark light={light} />} />
}

function Wordmark({ light }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-600 text-sm font-extrabold text-white">GL</span>
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>GL BAJAJ CRI</span>
        <span className={`block text-[10.5px] font-medium ${light ? 'text-white/60' : 'text-ink-mute'}`}>Centre for Research &amp; Incubation</span>
      </span>
    </span>
  )
}

// The small pill above section titles in the Figma ("✳ How you can get your idea into startup").
export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`chip ${className}`}>
      <Icon name="spark" className="h-3.5 w-3.5 text-gold-600" strokeWidth={2.2} />
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, sub, align = 'center', className = '' }) {
  const a = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${a} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-extrabold uppercase leading-[1.05] sm:text-[44px]">{title}</h2>
      {sub && <p className="text-base leading-relaxed text-ink-soft">{sub}</p>}
    </div>
  )
}

export function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="relative overflow-hidden border-b border-ink/5">
      <div className="glow -right-24 -top-24 h-80 w-80" />
      <div className="glow -left-32 top-32 h-72 w-72 bg-gold-200/40" />
      <div className="container-x relative py-16 sm:py-24">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.02] sm:text-6xl">{title}</h1>
        {sub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{sub}</p>}
        {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
      </div>
    </section>
  )
}

export function ApplyButton({ program, children = 'Apply for Incubation', className = '', ...rest }) {
  const to = program ? `/apply?program=${program}` : '/apply'
  return (
    <Link to={to} className={`btn-primary ${className}`} {...rest}>
      {children}
      <Icon name="arrow" className="h-4 w-4" />
    </Link>
  )
}

export function Initials({ name, className = 'h-14 w-14 text-base' }) {
  const parts = name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/, '').split(' ')
  const ini = (parts[0]?.[0] || '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')
  return <span className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 font-bold text-white ${className}`}>{ini}</span>
}
