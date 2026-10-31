import Icon from '../components/Icon'
import { ApplyButton, Initials, PageHero, Photo, SectionHeading } from '../components/ui'
import { MentorGrid } from '../components/blocks'
import { recognitions, site } from '../data/site'
import { team } from '../data/team'
import { mentors } from '../data/programs'
import { useSeo } from '../lib/useSeo'
import { Link } from 'react-router-dom'
import { PressStrip } from './Media'

export default function About() {
  useSeo('About', 'GLBCRI is the innovation hub of GL Bajaj Group, Greater Noida — an MSME-recognised Business Incubator and DST NIDHI PRAYAS Centre.')
  return (
    <>
      <PageHero eyebrow="About GLBCRI" title={site.tagline} sub="GLBCRI is set up by GL Bajaj Institute of Technology and Management to turn ideas from students, faculty and outside founders into companies — through mentorship, labs, funding routes and a network of industry partners.">
        <ApplyButton />
      </PageHero>

      <section className="container-x section grid gap-6 md:grid-cols-2">
        <div className="card p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-600 text-white"><Icon name="rocket" /></span>
          <h2 className="mt-5 text-2xl font-extrabold">Our mission</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">Build the support, infrastructure and mentoring that let students, faculty and founders turn innovations into prototypes and companies.</p>
        </div>
        <div className="card p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-600 text-white"><Icon name="spark" /></span>
          <h2 className="mt-5 text-2xl font-extrabold">Our vision</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">Create job creators, and become a self-sustaining incubator for ideas of national and societal importance.</p>
        </div>
      </section>

      <section className="bg-gold-50/50">
        <div className="container-x section">
          <SectionHeading eyebrow="Recognitions" title="Trusted by government and industry" />
          <ol className="relative mx-auto mt-12 max-w-3xl border-l-2 border-gold-200 pl-8">
            {recognitions.map((r) => (
              <li key={r.title} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border-4 border-white bg-gold-500" />
                <p className="text-xs font-bold text-gold-700">{r.year}</p>
                <h3 className="mt-1 font-bold">{r.title}</h3>
                <p className="text-sm text-ink-soft">{r.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="In the press" title="GLBCRI in the news" align="left" />
          <Link to="/events/press" className="btn-outline shrink-0">All press coverage <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10"><PressStrip /></div>
      </section>

      <section id="team" className="container-x section scroll-mt-20">
        <SectionHeading eyebrow="Team" title="The people you’ll work with" sub="Meet the team behind GLBCRI. Reach out to any of us." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="card p-6 text-center">
              <Photo src={m.photo} alt={m.name} className="mx-auto h-24 w-24 rounded-full object-cover object-top" fallback={<Initials name={m.name} className="mx-auto h-20 w-20 text-xl" />} />
              <h3 className="mt-4 font-bold">{m.name}</h3>
              <p className="text-sm text-gold-700">{m.role}</p>
              <div className="mt-3 flex justify-center gap-2">
                {m.email && <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`} className="grid h-8 w-8 place-items-center rounded-full bg-ink/[0.04] text-ink-soft hover:text-gold-700"><Icon name="mail" className="h-4 w-4" /></a>}
                {m.linkedin && <a href={m.linkedin} aria-label={`${m.name} on LinkedIn`} className="grid h-8 w-8 place-items-center rounded-full bg-ink/[0.04] text-ink-soft hover:text-gold-700"><Icon name="linkedin" className="h-4 w-4" /></a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <SectionHeading eyebrow="Mentors" title="Expert mentor network" />
        <div className="mt-12"><MentorGrid mentors={mentors} /></div>
      </section>
    </>
  )
}
