import { events } from '../data/events'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Parse 'YYYY-MM-DD' as a local date (avoids the off-by-one you get from UTC parsing).
export function toDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatDate(iso, { year = true } = {}) {
  const d = toDate(iso)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}${year ? ` ${d.getFullYear()}` : ''}`
}

export function dateParts(iso) {
  const d = toDate(iso)
  return { day: String(d.getDate()).padStart(2, '0'), month: MONTHS[d.getMonth()], year: d.getFullYear() }
}

function endOfEvent(e) {
  const end = toDate(e.endDate || e.date)
  end.setHours(23, 59, 59, 999)
  return end
}

export function isUpcoming(e, now = new Date()) {
  return endOfEvent(e) >= now
}

export function isToday(e, now = new Date()) {
  const start = toDate(e.date)
  return start <= now && endOfEvent(e) >= now
}

export function getUpcoming(now = new Date()) {
  return events.filter((e) => isUpcoming(e, now)).sort((a, b) => toDate(a.date) - toDate(b.date))
}

export function getPast(now = new Date()) {
  return events.filter((e) => !isUpcoming(e, now)).sort((a, b) => toDate(b.date) - toDate(a.date))
}

// The event the site should shout about: the next upcoming one, else null.
export function getNextEvent(now = new Date()) {
  return getUpcoming(now)[0] || null
}

export function getEvent(slug) {
  return events.find((e) => e.slug === slug)
}
