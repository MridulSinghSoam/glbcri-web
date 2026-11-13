// ---------------------------------------------------------------------------
// The ONLY place forms talk to the outside world.
//
// V1: if VITE_FORM_ENDPOINT is set (e.g. a Formspree / Web3Forms / Google Apps
//     Script URL), submissions are POSTed there as JSON and the team gets an
//     email. If it is not set, we run in demo mode: the submission is kept in
//     this browser so the flow can be tested end to end.
// V2: point these functions at the admin panel API. No component changes.
// ---------------------------------------------------------------------------

import { SUPABASE_URL, cmsEnabled, headers } from './cms'
import { track } from './track'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ENDPOINT

function makeRef() {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `GLB-${new Date().getFullYear()}-${n}`
}

function keepLocally(key, record) {
  try {
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    list.push(record)
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // storage can be unavailable (private mode); demo mode just skips saving
  }
}

async function post(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
  return res
}

// V2: every form also lands in the admin panel's Inbox (Supabase `submissions` table).
// The database lets the website ADD entries but never read them back.
async function toInbox(type, data) {
  if (!cmsEnabled) return false
  const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ type, data }),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
  return true
}

export async function submitApplication(data) {
  const ref = makeRef()
  const record = { ...data, ref, kind: 'incubation-application', submittedAt: new Date().toISOString() }
  // Files can't go in JSON; we send the deck's name and ask for a link instead.
  if (record.deckFile instanceof File) record.deckFile = record.deckFile.name

  const sent = await toInbox('application', {
    name: data.fullName, email: data.email, phone: data.phone, startup: data.startupName, stage: data.stage, program: data.program,
    sector: data.sector, message: [data.problem, data.solution].filter(Boolean).join('\n\n'), ref, ...record,
  })
  if (sent) track('apply_click', '/apply')
  if (ENDPOINT) {
    await post(ENDPOINT, { _subject: `New incubation application ${ref} — ${data.startupName}`, ...record })
  } else if (!sent) {
    await new Promise((r) => setTimeout(r, 700))
    keepLocally('glbcri:applications', record)
  }
  return { ref }
}

export async function submitContact(data) {
  const record = { ...data, kind: 'contact', submittedAt: new Date().toISOString() }
  const sent = await toInbox('contact', {
    name: [data.firstName, data.lastName].filter(Boolean).join(' '), email: data.email, phone: data.phone, company: data.company, interest: data.interest, message: data.message,
  })
  if (CONTACT_ENDPOINT) {
    await post(CONTACT_ENDPOINT, { _subject: `Website message from ${data.firstName} ${data.lastName}`, ...record })
  } else if (!sent) {
    await new Promise((r) => setTimeout(r, 600))
    keepLocally('glbcri:messages', record)
  }
  return { ok: true }
}

export async function subscribe(email, list = 'events') {
  const record = { email, list, kind: 'subscribe', submittedAt: new Date().toISOString() }
  const sent = await toInbox('subscribe', { email, source: list })
  track('subscribe')
  if (CONTACT_ENDPOINT) await post(CONTACT_ENDPOINT, { _subject: `New ${list} subscriber`, ...record })
  else if (!sent) keepLocally('glbcri:subscribers', record)
  return { ok: true }
}

export const isDemoMode = !ENDPOINT && !cmsEnabled
