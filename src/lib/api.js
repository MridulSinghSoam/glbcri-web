// ---------------------------------------------------------------------------
// The ONLY place forms talk to the outside world.
//
// V1: if VITE_FORM_ENDPOINT is set (e.g. a Formspree / Web3Forms / Google Apps
//     Script URL), submissions are POSTed there as JSON and the team gets an
//     email. If it is not set, we run in demo mode: the submission is kept in
//     this browser so the flow can be tested end to end.
// V2: point these functions at the admin panel API. No component changes.
// ---------------------------------------------------------------------------

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

export async function submitApplication(data) {
  const ref = makeRef()
  const record = { ...data, ref, kind: 'incubation-application', submittedAt: new Date().toISOString() }
  // Files can't go in JSON; we send the deck's name and ask for a link instead.
  if (record.deckFile instanceof File) record.deckFile = record.deckFile.name

  if (ENDPOINT) {
    await post(ENDPOINT, { _subject: `New incubation application ${ref} — ${data.startupName}`, ...record })
  } else {
    await new Promise((r) => setTimeout(r, 700))
    keepLocally('glbcri:applications', record)
  }
  return { ref }
}

export async function submitContact(data) {
  const record = { ...data, kind: 'contact', submittedAt: new Date().toISOString() }
  if (CONTACT_ENDPOINT) {
    await post(CONTACT_ENDPOINT, { _subject: `Website message from ${data.firstName} ${data.lastName}`, ...record })
  } else {
    await new Promise((r) => setTimeout(r, 600))
    keepLocally('glbcri:messages', record)
  }
  return { ok: true }
}

export async function subscribe(email, list = 'events') {
  const record = { email, list, kind: 'subscribe', submittedAt: new Date().toISOString() }
  if (CONTACT_ENDPOINT) await post(CONTACT_ENDPOINT, { _subject: `New ${list} subscriber`, ...record })
  else keepLocally('glbcri:subscribers', record)
  return { ok: true }
}

export const isDemoMode = !ENDPOINT
