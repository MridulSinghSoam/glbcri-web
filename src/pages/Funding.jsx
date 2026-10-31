import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { ApplyButton, PageHero, Photo, SectionHeading } from '../components/ui'
import { facilities, fundingRoutes, prayas, upPolicy, upPolicyBonus } from '../data/team'
import { ipStats } from '../data/site'
import { useSeo } from '../lib/useSeo'

export default function Funding() {
  useSeo('Funding & Labs', 'DST NIDHI PRAYAS prototype grants up to ₹10 lakh, UP Startup Policy grants, investor connects and labs at GLBCRI.')
  return (
    <>
      <PageHero eyebrow="Funding & Labs" title="Money to build, and the tools to build with" sub="Grants, prize pools and investor connects — plus AI, EV and prototyping labs on campus.">
        <ApplyButton program="pre-incubation" />
        <a href="#facilities" className="btn-outline">See the labs</a>
      </PageHero>

      <section className="container-x section">
        <SectionHeading align="left" eyebrow="Funding routes" title="Four ways GLBCRI helps you get funded" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {fundingRoutes.map((f) => (
            <article key={f.name} className={`card flex flex-col p-7 ${f.highlight ? 'ring-2 ring-gold-400' : ''}`}>
              <p className="text-3xl font-extrabold text-gold-600">{f.amount}</p>
              <h3 className="mt-2 text-lg font-bold">{f.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{f.for}</p>
              <Link to={f.cta.to} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:gap-3">
                {f.cta.label} <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="prayas" className="scroll-mt-20 bg-gold-50/50">
        <div className="container-x section grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="DST NIDHI PRAYAS" title="Prototype funding up to ₹10 lakh" />
            <p className="mt-6 leading-relaxed text-ink-soft">
              PRAYAS is a proof-of-concept grant that turns a science or technology idea into a working physical prototype within 18 months. The IP stays with you. GLBCRI is a PRAYAS Centre approved by the Department of Science and Technology, Government of India.
            </p>
            <p className="mt-4 text-sm font-semibold text-ink">Priority areas</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {prayas.priority.map((p) => <span key={p} className="chip">{p}</span>)}
            </div>
            <p className="mt-4 text-sm text-ink-soft">Preference for: {prayas.preference.join(' · ')}.</p>
            <div className="mt-8">
              <ApplyButton program="pre-incubation">Apply with PRAYAS</ApplyButton>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-bold">You can apply if…</h3>
              <ul className="mt-4 space-y-2.5">
                {prayas.eligible.map((e) => (
                  <li key={e} className="flex gap-2.5 text-sm"><Icon name="checkCircle" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />{e}</li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-bold">Not covered by PRAYAS</h3>
              <ul className="mt-4 space-y-2.5">
                {prayas.notEligible.map((e) => (
                  <li key={e} className="flex gap-2.5 text-sm text-ink-soft"><Icon name="close" className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />{e}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-mute">Building software? Apply for incubation and use the UP Startup Policy route below.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="up-policy" className="container-x section scroll-mt-20">
        <SectionHeading align="left" eyebrow="Start in UP" title="UP Startup Policy incentives" sub="As a Startin UP recognised incubator, GLBCRI helps its startups claim these state incentives." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {upPolicy.map((u) => (
            <div key={u.name} className="card p-5">
              <p className="text-xl font-extrabold text-gold-600">{u.amount}</p>
              <p className="mt-1 font-semibold">{u.name}</p>
              <p className="mt-1 text-xs text-ink-mute">{u.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-xl bg-gold-50 p-4 text-sm text-gold-800">+ {upPolicyBonus}</p>
      </section>

      <section id="facilities" className="container-x section scroll-mt-20">
        <SectionHeading eyebrow="Facilities" title="Labs and space to build in" sub="Practical, hands-on infrastructure for hardware, AI and mobility startups." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <div key={f.name} className="card overflow-hidden">
              <Photo
                src={f.image}
                alt={f.name}
                className="h-44 w-full object-cover"
                fallback={
                  <div className="grid h-44 place-items-center bg-gradient-to-br from-gold-100 to-gold-300 text-gold-800">
                    <Icon name={f.icon} className="h-12 w-12" strokeWidth={1.4} />
                  </div>
                }
              />
              <div className="p-6">
                <h3 className="font-bold">{f.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <div className="card grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">IP support</h2>
            <p className="mt-2 text-sm text-ink-soft">We help you file patents, design registrations and copyrights for what you build.</p>
          </div>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {ipStats.map((s) => (
              <div key={s.label}>
                <dd className="text-3xl font-extrabold text-gold-600">{s.value}</dd>
                <dt className="text-xs text-ink-mute">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
