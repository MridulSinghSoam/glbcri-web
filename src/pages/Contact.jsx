import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { PageHero } from '../components/ui'
import { site } from '../data/site'
import { submitContact } from '../lib/api'
import { useSeo } from '../lib/useSeo'

const interests = ['Incubation', 'Funding', 'Mentorship', 'Events', 'Partnership', 'Media', 'Other']

export default function Contact() {
  useSeo('Contact', 'Contact GLBCRI, GL Bajaj Centre for Research and Incubation, Knowledge Park III, Greater Noida.')
  const [params] = useSearchParams()
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', interest: params.get('topic') ? 'Incubation' : '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await submitContact(form)
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk" sub="Whether you have a bold idea or a scaling startup, we’re here to help. Startups looking to join should apply directly — it’s faster." >
        <Link to="/apply" className="btn-primary">Apply for Incubation <Icon name="arrow" className="h-4 w-4" /></Link>
      </PageHero>

      <section className="container-x section grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-bold">Send us a message</h2>
          <p className="mt-1 text-sm text-ink-soft">We reply within 2 working days.</p>
          {state === 'sent' ? (
            <div className="mt-8 rounded-2xl bg-gold-50 p-8 text-center">
              <Icon name="checkCircle" className="mx-auto h-10 w-10 text-gold-600" />
              <p className="mt-3 font-bold">Message sent. Thank you!</p>
              <p className="mt-1 text-sm text-ink-soft">We’ll get back to you at {form.email}.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="First name" required><input className="input" required value={form.firstName} onChange={set('firstName')} placeholder="Enter your first name" /></Field>
              <Field label="Last name"><input className="input" value={form.lastName} onChange={set('lastName')} placeholder="Enter your last name" /></Field>
              <Field label="Email" required><input className="input" type="email" required value={form.email} onChange={set('email')} placeholder="your.email@example.com" /></Field>
              <Field label="Phone number"><input className="input" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" /></Field>
              <Field label="Company / startup name (optional)"><input className="input" value={form.company} onChange={set('company')} placeholder="Your company or startup name" /></Field>
              <Field label="Area of interest" required>
                <select className="input" required value={form.interest} onChange={set('interest')}>
                  <option value="">Select your area of interest</option>
                  {interests.map((i) => <option key={i}>{i}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message" required><textarea className="input min-h-[140px]" required value={form.message} onChange={set('message')} placeholder="Tell us how we can help…" /></Field>
              </div>
              {state === 'error' && <p className="text-sm text-red-600 sm:col-span-2">Something went wrong. Please email us at {site.email}.</p>}
              <button className="btn-primary sm:col-span-2" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <Info icon="pin" title="Visit us">
            {site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}
            <a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block font-semibold text-gold-700">Open in Maps →</a>
          </Info>
          <Info icon="phone" title="Call us"><a href={site.phoneHref} className="hover:text-gold-700">{site.phone}</a></Info>
          <Info icon="mail" title="Email us"><a href={`mailto:${site.email}`} className="hover:text-gold-700">{site.email}</a></Info>
          <Info icon="clock" title="Office hours">
            {site.officeHours.map((o) => <span key={o.days} className="block">{o.days}: {o.time}</span>)}
          </Info>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <h2 className="text-center text-2xl font-extrabold">Quick actions</h2>
        <p className="mt-2 text-center text-sm text-ink-soft">Looking for something specific? These shortcuts help you start faster.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { icon: 'calendar', title: 'Schedule a consultation', body: 'Get personal guidance for your startup idea.', cta: 'Book now', href: site.bookingUrl },
            { icon: 'users', title: 'Attend our events', body: 'Workshops, networking sessions and pitch competitions.', cta: 'View events', to: '/events' },
            { icon: 'lab', title: 'Tour our facilities', body: 'See the labs and spaces you can build in.', cta: 'See the labs', to: '/funding#facilities' },
          ].map((q) => (
            <div key={q.title} className="card p-6 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gold-50 text-gold-700"><Icon name={q.icon} /></span>
              <h3 className="mt-4 font-bold">{q.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{q.body}</p>
              {q.to ? <Link to={q.to} className="btn-outline mt-5">{q.cta}</Link> : <a href={q.href} className="btn-outline mt-5">{q.cta}</a>}
            </div>
          ))}
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10">
          <iframe title="Map to GLBCRI" src={site.address.mapEmbed} className="h-80 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="label">{label}{required && <span className="text-gold-600"> *</span>}</span>
      {children}
    </label>
  )
}

function Info({ icon, title, children }) {
  return (
    <div className="card flex gap-4 p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-700"><Icon name={icon} /></span>
      <div className="text-sm text-ink-soft">
        <h3 className="mb-1 font-bold text-ink">{title}</h3>
        {children}
      </div>
    </div>
  )
}
