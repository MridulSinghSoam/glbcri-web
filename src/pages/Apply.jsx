import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { Initials } from '../components/ui'
import { programs, applySteps } from '../data/programs'
import { site } from '../data/site'
import { contactPerson } from '../data/team'
import { isDemoMode, submitApplication } from '../lib/api'
import { track } from '../lib/track'
import { useSeo } from '../lib/useSeo'

const DRAFT_KEY = 'glbcri:apply-draft'
const sectors = ['AI/ML', 'Agritech', 'EV & Mobility', 'Healthtech', 'Edtech', 'Fintech', 'Deeptech / Hardware', 'D2C / Consumer', 'Social impact', 'Other']
const stagesList = ['Idea', 'Prototype', 'MVP', 'Early revenue', 'Growth']
const needsList = ['Funding', 'Mentorship', 'Workspace', 'Lab access', 'Legal / IP', 'Investor connects']
const heardList = ['Instagram', 'LinkedIn', 'An event', 'A friend', 'My college', 'Other']

const empty = {
  fullName: '', email: '', phone: '', youAre: '', org: '', linkedin: '',
  startupName: '', program: '', stage: '', sector: '', problem: '', solution: '', teamSize: '', registered: '', dpiit: '',
  needs: [], prayas: '', deckLink: '', deckFile: null, demoLink: '', heard: '', consent: false, source: '',
}

// Fields checked before moving past each step.
const required = [
  ['fullName', 'email', 'phone', 'youAre'],
  ['startupName', 'program', 'stage', 'sector', 'problem', 'solution', 'teamSize', 'registered'],
  ['needs', 'consent'],
]

function loadDraft() {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null')
  } catch {
    return null
  }
}

// The Apply page has two modes (see site.applyMode in src/data/site.js).
export default function Apply() {
  useSeo('Apply for Incubation', 'Apply to incubate your startup at GLBCRI.')
  return site.applyMode === 'incubexa' ? <ApplyIncubexa /> : <ApplyNative />
}

const incubexaSections = ['Your details', 'Company', 'Directors', 'Team', 'Sector', 'Innovation', 'Funding & investment', 'Seed capital', 'Patents & IP', 'Market & GTM', 'Mentorship & events']

// Mode 1: explain what to expect, then hand off to GLBCRI's Incubexa intake form.
function ApplyIncubexa() {
  const [params] = useSearchParams()
  const program = programs.find((p) => p.id === params.get('program'))
  return (
    <section className="relative overflow-hidden">
      <div className="glow -right-24 -top-10 h-80 w-80" />
      <div className="container-x relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="chip">Apply for Incubation{program ? ` · ${program.name}` : ''}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Tell us what you’re building</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">Applications go through GLBCRI’s startup intake form. No account needed, and your progress saves automatically as you type.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={site.incubexaUrl} target="_blank" rel="noreferrer" onClick={() => track('apply_click')} className="btn-primary px-8 py-4 text-base">
              Start your application <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a href={site.bookingUrl} className="btn-outline">Questions? Talk to us first</a>
          </div>
          <p className="mt-3 text-xs text-ink-mute">Opens the GLBCRI intake form on Incubexa in a new tab.</p>

          <h2 className="mt-12 text-lg font-bold">What happens next</h2>
          <ol className="mt-4 space-y-4">
            {applySteps.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${i === 0 ? 'bg-gold-600 text-white' : 'bg-gold-50 text-gold-700'}`}>{i + 1}</span>
                <span className="text-sm"><strong className="block">{s.title}</strong><span className="text-ink-soft">{s.body}</span></span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="card h-fit p-6 sm:p-8">
          <h2 className="font-bold">Keep these handy</h2>
          <p className="mt-1 text-sm text-ink-soft">The form covers {incubexaSections.length} short sections:</p>
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {incubexaSections.map((s, i) => (
              <li key={s} className="flex items-center gap-2 rounded-xl bg-ink/[0.03] px-3 py-2 text-sm">
                <span className="text-xs font-bold text-gold-600">{String(i + 1).padStart(2, '0')}</span>{s}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl bg-gold-50 p-4 text-sm text-gold-900">
            <strong>Tip:</strong> have your company details (if registered), co-founder names, a short problem/solution statement and any pitch deck link ready.
          </div>
          <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-6">
            <Initials name={contactPerson.name} className="h-11 w-11 text-sm" />
            <div className="text-sm">
              <p className="font-semibold">Stuck? Email us.</p>
              <a href={`mailto:${site.email}`} className="text-gold-700">{site.email}</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

// Mode 2: the site's own 3-step form.
function ApplyNative() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [data, setData] = useState(() => {
    const draft = loadDraft() || {}
    const program = params.get('program')
    return {
      ...empty,
      ...draft,
      deckFile: null,
      program: programs.some((p) => p.id === program) ? program : draft.program || '',
      prayas: params.get('prayas') === 'yes' ? 'yes' : draft.prayas || '',
      source: params.get('source') || draft.source || '',
    }
  })

  // Save progress in this browser so a founder can come back later.
  useEffect(() => {
    try {
      const { deckFile, ...rest } = data
      localStorage.setItem(DRAFT_KEY, JSON.stringify(rest))
    } catch {
      /* ignore */
    }
  }, [data])

  const set = (k, v) => {
    setData((d) => ({ ...d, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }
  const toggleNeed = (n) => set('needs', data.needs.includes(n) ? data.needs.filter((x) => x !== n) : [...data.needs, n])

  const validate = (s) => {
    const errs = {}
    for (const k of required[s]) {
      const v = data[k]
      if (Array.isArray(v) ? v.length === 0 : !v) errs[k] = 'Required'
    }
    if (s === 0 && data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errs.email = 'Enter a valid email'
    if (s === 0 && data.phone && data.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a 10-digit number'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => {
    if (validate(step)) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate(2)) return
    setStatus('sending')
    try {
      const res = await submitApplication(data)
      setResult(res)
      setStatus('done')
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {
        /* ignore */
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <section className="container-x section">
        <div className="card mx-auto max-w-xl p-10 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-50 text-gold-600"><Icon name="checkCircle" className="h-9 w-9" /></span>
          <h1 className="mt-6 text-3xl font-extrabold">Application received, {data.fullName.split(' ')[0]}!</h1>
          <p className="mt-3 text-ink-soft">We’ll reach out within {site.replyPromise}. Your reference ID is</p>
          <p className="mt-2 inline-block rounded-xl bg-ink px-4 py-2 font-mono text-lg font-bold text-gold-300">{result.ref}</p>
          {isDemoMode && <p className="mt-4 text-xs text-amber-700">Demo mode: no database or form endpoint is set, so this was saved in this browser only.</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/events" className="btn-outline">See upcoming events</Link>
            {site.social.instagram.url && <a href={site.social.instagram.url} target="_blank" rel="noreferrer" className="btn-primary"><Icon name="instagram" className="h-4 w-4" />Follow us</a>}
          </div>
        </div>
      </section>
    )
  }

  const stepNames = ['You', 'Your startup', 'Support & files']

  return (
    <section className="relative overflow-hidden">
      <div className="glow -right-24 -top-10 h-80 w-80" />
      <div className="container-x relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_2fr]">
        {/* Left: what happens next */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <p className="chip">Apply for Incubation</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight">Tell us what you’re building</h1>
          <p className="mt-3 text-ink-soft">Three short steps, about 10 minutes. Your progress is saved in this browser.</p>
          <ol className="mt-8 space-y-4">
            {applySteps.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${i === 0 ? 'bg-gold-600 text-white' : 'bg-gold-50 text-gold-700'}`}>{i + 1}</span>
                <span className="text-sm"><strong className="block">{s.title}</strong><span className="text-ink-soft">{s.body}</span></span>
              </li>
            ))}
          </ol>
          <div className="card mt-8 flex items-center gap-3 p-4">
            <Initials name={contactPerson.name} className="h-11 w-11 text-sm" />
            <div className="text-sm">
              <p className="font-semibold">Questions? Talk to us.</p>
              <a href={`mailto:${site.email}`} className="text-gold-700">{site.email}</a>
            </div>
          </div>
        </aside>

        {/* Right: the form */}
        <form onSubmit={submit} noValidate className="card p-6 sm:p-10">
          <div className="flex gap-2" aria-label="Progress">
            {stepNames.map((n, i) => (
              <div key={n} className="flex-1">
                <div className={`h-1.5 rounded-full ${i <= step ? 'bg-gold-500' : 'bg-ink/10'}`} />
                <p className={`mt-2 text-xs font-medium ${i === step ? 'text-ink' : 'text-ink-mute'}`}>Step {i + 1} · {n}</p>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" error={errors.fullName} required><input className="input" value={data.fullName} onChange={(e) => set('fullName', e.target.value)} autoComplete="name" /></Field>
              <Field label="Email" error={errors.email} required><input className="input" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></Field>
              <Field label="Phone (WhatsApp)" error={errors.phone} required><input className="input" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" autoComplete="tel" /></Field>
              <Field label="You are a…" error={errors.youAre} required>
                <select className="input" value={data.youAre} onChange={(e) => set('youAre', e.target.value)}>
                  <option value="">Select</option>
                  {['GL Bajaj student', 'GL Bajaj alumni', 'Faculty', 'Outside founder'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="College or organisation"><input className="input" value={data.org} onChange={(e) => set('org', e.target.value)} /></Field>
              <Field label="LinkedIn"><input className="input" type="url" value={data.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/…" /></Field>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Startup name" error={errors.startupName} required hint="“Not named yet” is fine"><input className="input" value={data.startupName} onChange={(e) => set('startupName', e.target.value)} /></Field>
              <Field label="Program" error={errors.program} required>
                <select className="input" value={data.program} onChange={(e) => set('program', e.target.value)}>
                  <option value="">Select a program</option>
                  {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  <option value="not-sure">Not sure — place me</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Stage" error={errors.stage} required>
                  <Pills options={stagesList} value={data.stage} onChange={(v) => set('stage', v)} />
                </Field>
              </div>
              <Field label="Sector" error={errors.sector} required>
                <select className="input" value={data.sector} onChange={(e) => set('sector', e.target.value)}>
                  <option value="">Select a sector</option>
                  {sectors.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Team size" error={errors.teamSize} required><input className="input" type="number" min="1" value={data.teamSize} onChange={(e) => set('teamSize', e.target.value)} /></Field>
              <div className="sm:col-span-2">
                <Field label="What problem do you solve?" error={errors.problem} required hint={`${data.problem.length}/300`}>
                  <textarea className="input min-h-[96px]" maxLength={300} value={data.problem} onChange={(e) => set('problem', e.target.value)} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Your solution" error={errors.solution} required hint={`${data.solution.length}/300`}>
                  <textarea className="input min-h-[96px]" maxLength={300} value={data.solution} onChange={(e) => set('solution', e.target.value)} />
                </Field>
              </div>
              <Field label="Registered company?" error={errors.registered} required>
                <Pills options={['No', 'Yes']} value={data.registered} onChange={(v) => set('registered', v)} />
              </Field>
              {data.registered === 'Yes' && <Field label="DPIIT number (optional)"><input className="input" value={data.dpiit} onChange={(e) => set('dpiit', e.target.value)} /></Field>}
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 grid gap-6">
              <Field label="What do you need most?" error={errors.needs} required hint="Pick all that apply">
                <div className="flex flex-wrap gap-2">
                  {needsList.map((n) => (
                    <button type="button" key={n} onClick={() => toggleNeed(n)} aria-pressed={data.needs.includes(n)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${data.needs.includes(n) ? 'border-gold-500 bg-gold-50 text-gold-800' : 'border-ink/15 text-ink-soft hover:border-gold-300'}`}>
                      {data.needs.includes(n) && '✓ '}{n}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Interested in the NIDHI PRAYAS prototype grant (up to ₹10 lakh)?">
                <Pills options={['yes', 'no']} labels={{ yes: 'Yes', no: 'No' }} value={data.prayas} onChange={(v) => set('prayas', v)} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Pitch deck link (optional)" hint="Google Drive, Docsend…"><input className="input" type="url" value={data.deckLink} onChange={(e) => set('deckLink', e.target.value)} placeholder="https://" /></Field>
                <Field label="Or upload a PDF (optional)" hint="Max 10 MB">
                  <label className="input flex cursor-pointer items-center gap-2 text-ink-mute">
                    <Icon name="upload" className="h-4 w-4" />
                    <span className="truncate">{data.deckFile ? data.deckFile.name : 'Choose file'}</span>
                    <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f && f.size <= 10 * 1024 * 1024) set('deckFile', f) }} />
                  </label>
                </Field>
                <Field label="Demo or video link (optional)"><input className="input" type="url" value={data.demoLink} onChange={(e) => set('demoLink', e.target.value)} placeholder="https://" /></Field>
                <Field label="How did you hear about us?">
                  <select className="input" value={data.heard} onChange={(e) => set('heard', e.target.value)}>
                    <option value="">Select</option>
                    {heardList.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </Field>
              </div>
              <label className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${errors.consent ? 'border-red-300 bg-red-50' : 'border-ink/10'}`}>
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-gold-600" checked={data.consent} onChange={(e) => set('consent', e.target.checked)} />
                <span>GLBCRI may contact me about my application. <span className="text-gold-600">*</span></span>
              </label>
              {status === 'error' && <p className="text-sm text-red-600">Something went wrong sending your application. Please try again, or email {site.email}.</p>}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-3 border-t border-ink/5 pt-6">
            {step > 0 ? <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-ghost">← Back</button> : <span />}
            {step < 2 ? (
              <button type="button" onClick={next} className="btn-primary">Continue <Icon name="arrow" className="h-4 w-4" /></button>
            ) : (
              <button type="submit" className="btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Submit application'}</button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({ label, error, required, hint, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">{label}{required && <span className="text-gold-600"> *</span>}</span>
        {hint && <span className="text-xs text-ink-mute">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}

function Pills({ options, value, onChange, labels = {} }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {options.map((o) => (
        <button type="button" role="radio" aria-checked={value === o} key={o} onClick={() => onChange(o)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${value === o ? 'border-gold-500 bg-gold-500 text-white' : 'border-ink/15 text-ink-soft hover:border-gold-300'}`}>
          {labels[o] || o}
        </button>
      ))}
    </div>
  )
}
