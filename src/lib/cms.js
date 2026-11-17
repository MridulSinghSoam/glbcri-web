// ─────────────────────────────────────────────────────────────────────────────
// Connects the website to the admin panel's database (Supabase).
//
// The pages still import their content from src/data/*.js. Before the first
// render, hydrate() loads what the team published in the admin panel and
// replaces those arrays IN PLACE, so every page shows the admin's content
// without being rewritten. If the database is empty or unreachable, the
// built-in files stay as they are, so the site never shows an empty section.
//
// Speed: the last content is cached in the browser. Repeat visits render
// instantly from the cache and refresh in the background.
// ─────────────────────────────────────────────────────────────────────────────

import { events } from '../data/events'
import { albums, newsletters, setPress } from '../data/media'
import { team } from '../data/team'
import { mentors } from '../data/programs'
import { startups as stories, testimonials } from '../data/startups'
import { portfolio } from '../data/portfolio'
import { site, stats, ipStats } from '../data/site'

// The publishable key is meant to be public: the database's security rules decide what it can do.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://gwvfqwopylwldbrjcsaq.supabase.co'
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_wcw7CazJpnjEdRpKkqKwcA_8OXTOLHo'
export const cmsEnabled = Boolean(SUPABASE_URL && SUPABASE_KEY)

export const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }

// News posts from the admin panel (the site had none before). One can be pinned to the announcement bar.
export const news = []

const CACHE = 'glbcri:cms:v1'
let lastJson = ''

const strip = ({ updatedAt, order, ...rest }) => rest
const replaceAll = (target, rows) => target.splice(0, target.length, ...rows)

function apply(byCollection) {
  const c = (k) => (byCollection[k] || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  if (c('events').length) replaceAll(events, c('events').map((e) => ({ ...strip(e), slug: e.slug || e.id })))
  if (c('albums').length) replaceAll(albums, c('albums').map((a) => ({ ...strip(a), slug: a.slug || a.id, photos: a.photos || [] })).sort((a, b) => String(b.date).localeCompare(String(a.date))))
  if (c('newsletters').length) {
    const list = c('newsletters').map((n) => ({ ...strip(n), slug: n.slug || n.id, url: n.file || n.url }))
    replaceAll(newsletters, [...list.filter((n) => n.latest), ...list.filter((n) => !n.latest)])
  }
  if (c('press').length) {
    const groups = []
    for (const p of c('press')) {
      const title = p.story || 'In the news'
      let g = groups.find((x) => x.title === title)
      if (!g) groups.push((g = { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title, when: p.when || '', items: [] }))
      g.items.push({ id: p.id, src: p.image, caption: p.caption, paper: p.paper || '' })
    }
    setPress(groups)
  }
  if (c('team').length) replaceAll(team, c('team').map(strip))
  if (c('mentors').length) replaceAll(mentors, c('mentors').map((m) => ({ ...strip(m), tags: m.tags || [] })))
  if (c('startups').length) {
    replaceAll(portfolio, c('startups').map((s) => ({ ...strip(s), founders: s.founders || [] })).sort((a, b) => a.name.localeCompare(b.name)))
    stats[0].value = `${portfolio.length}`
  }
  if (c('stories').length) replaceAll(stories, c('stories').map(strip))
  if (c('testimonials').length) replaceAll(testimonials, c('testimonials').map(strip))
  replaceAll(news, c('news').filter((n) => n.published !== false).map(strip).sort((a, b) => String(b.date).localeCompare(String(a.date))))

  const s = (byCollection.settings || [])[0]
  if (s) {
    if (s.phone) {
      site.phone = s.phone
      const digits = s.phone.replace(/[^\d+]/g, '')
      site.phoneHref = `tel:${digits}`
      site.whatsappHref = `https://wa.me/${digits.replace('+', '')}`
    }
    if (s.email) site.email = s.email
    if (s.addressLines?.length) site.address.lines = s.addressLines
    if (s.applyMode) site.applyMode = s.applyMode
    if (s.incubexaUrl) site.incubexaUrl = s.incubexaUrl
    if (s.bookingUrl) site.bookingUrl = s.bookingUrl
    if (s.instagram) site.social.instagram.url = s.instagram
    if (s.linkedin) site.social.linkedin = s.linkedin
    if (s.youtube) site.social.youtube = s.youtube
    if (s.facebook) site.social.facebook = s.facebook
    if (s.raised) stats[1].value = s.raised
    if (s.womenFounders) stats[3].value = s.womenFounders
    const ip = [s.patentsPublished, s.patentsGranted, s.designPatents, s.copyrights]
    ip.forEach((v, i) => v && (ipStats[i].value = String(v)))
    if (s.patentsPublished) stats[4].value = String(s.patentsPublished)
  }
}

async function fetchAll(timeoutMs) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/content?select=collection,id,data,sort&order=collection,sort`, { headers, signal: ctrl.signal })
    if (!res.ok) throw new Error(`CMS ${res.status}`)
    const rows = await res.json()
    const out = {}
    for (const r of rows) (out[r.collection] ||= []).push({ ...r.data, id: r.id, order: r.sort })
    return out
  } finally {
    clearTimeout(t)
  }
}

function readCache() {
  try {
    return localStorage.getItem(CACHE)
  } catch {
    return null
  }
}
function writeCache(json) {
  try {
    localStorage.setItem(CACHE, json)
  } catch {
    /* storage full or blocked: fine, just no cache */
  }
}

// Call once before rendering. Resolves quickly; never throws.
export async function hydrate() {
  if (!cmsEnabled) return
  const cached = readCache()
  if (cached) {
    try {
      apply(JSON.parse(cached))
      lastJson = cached
    } catch {
      /* bad cache: ignore */
    }
    refreshInBackground()
    return
  }
  try {
    const data = await fetchAll(2500)
    const json = JSON.stringify(data)
    apply(data)
    lastJson = json
    writeCache(json)
  } catch {
    /* offline, slow or not set up yet: the built-in content is used */
  }
}

// Repeat visits: fetch the latest content after the page is up; if anything changed, re-render.
function refreshInBackground() {
  fetchAll(8000)
    .then((data) => {
      const json = JSON.stringify(data)
      if (json === lastJson) return
      apply(data)
      lastJson = json
      writeCache(json)
      window.dispatchEvent(new Event('cms:update'))
    })
    .catch(() => {})
}
