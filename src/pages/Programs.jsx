import Icon from '../components/Icon'
import { ApplyButton, PageHero, SectionHeading } from '../components/ui'
import { FAQ, MentorGrid, ProgramCard } from '../components/blocks'
import { faqs } from '../data/faq'
import { mentors, programs, supportServices } from '../data/programs'
import { site } from '../data/site'
import { useSeo } from '../lib/useSeo'

export default function Programs() {
  useSeo('Programs', 'Pre-Incubation, Full Incubation, Student Startup and Acceleration programs at GLBCRI, Greater Noida.')
  return (
    <>
      <PageHero eyebrow="Programs" title="From first idea to first funding round" sub="Pick the program that fits your stage. Not sure? Apply anyway — we’ll place you in the right one.">
        <ApplyButton />
        <a href={site.bookingUrl} className="btn-outline">Book a 15-min call</a>
      </PageHero>

      <section className="container-x section">
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <SectionHeading eyebrow="Compare" title="Programs side by side" />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gold-50/60 text-xs uppercase tracking-wider text-ink-mute">
              <tr>
                <th className="p-4 font-semibold">&nbsp;</th>
                {programs.map((p) => (
                  <th key={p.id} className="p-4 font-semibold text-ink">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {[
                ['Stage', (p) => p.stage],
                ['Duration', (p) => p.duration],
                ['Workspace', (p) => (p.id === 'incubation' ? 'Dedicated desk' : 'Shared / on request')],
                ['Funding route', (p) => (p.id === 'pre-incubation' ? 'NIDHI PRAYAS, up to ₹10 L' : p.id === 'acceleration' ? 'Investor connects, demo day' : 'Grants & investor network')],
                ['Fee & equity', (p) => p.fee || 'Shared on the screening call'],
              ].map(([label, get]) => (
                <tr key={label}>
                  <th scope="row" className="p-4 font-semibold text-ink">{label}</th>
                  {programs.map((p) => (
                    <td key={p.id} className="p-4 text-ink-soft">{get(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-gold-50/50">
        <div className="container-x section">
          <SectionHeading eyebrow="Beyond the programs" title="Additional support services" sub="Every incubated startup also gets access to these." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportServices.map((s) => (
              <div key={s.title} className="card p-6 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gold-50 text-gold-700">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mentors" className="container-x section scroll-mt-20">
        <SectionHeading eyebrow="Mentors" title="Expert mentor network" sub="Guidance from industry leaders, founders and domain experts across sectors." />
        <div className="mt-12">
          <MentorGrid mentors={mentors} />
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-ink-soft">Want to guide the next generation of founders?</p>
          <a href={`mailto:${site.email}?subject=Become%20a%20mentor`} className="btn-outline mt-4">
            Become a mentor
          </a>
        </div>
      </section>
      <section id="faq" className="container-x scroll-mt-24 pb-16 sm:pb-24">
        <SectionHeading eyebrow="FAQ" title="Questions founders ask" />
        <div className="mt-10"><FAQ items={faqs} /></div>
      </section>
    </>
  )
}
