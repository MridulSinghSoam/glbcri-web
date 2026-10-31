# GLBCRI Website — V1

The redesigned website for **GL Bajaj Centre for Research and Incubation (GLBCRI)**.
The site has one goal: get startups to **apply for incubation**.

Built with **Vite + React + React Router + Tailwind CSS**. Colours come from the GLBCRI logo: brown `#513529`, orange `#D98C39`, yellow `#FAD157`. Headings use Plus Jakarta Sans, body text uses Inter.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the build locally
```

## Pages

| URL | Page | Job |
|---|---|---|
| `/` | Home | Hero with stage picker → About & impact → "Already building?" → Startups → News & events (tabs) → Instagram → Team, labs & mentors |
| `/programs` | Programs | 4 program cards, comparison table, support services, mentors |
| `/funding` | Funding & Labs | NIDHI PRAYAS (up to ₹10 L), other funding routes, labs, IP support |
| `/startups` | Startups | Success stories, filterable portfolio, testimonials |
| `/events`, `/events/:slug` | Events | Upcoming first, past as an archive, event detail with countdown |
| `/events/gallery` | Gallery | 26 albums (where we showcased / programs we ran), photo mosaic, full-screen viewer |
| `/events/newsletters` | Newsletters | Latest issue, past issues (links to the PDFs/flipbook on glbcri.org), subscribe |
| `/events/press` | In the press | 24 newspaper clippings grouped into 7 stories, full-screen viewer |
| `/about` | About | Mission, recognitions timeline, team, mentors |
| `/contact` | Contact | Message form, address, map, quick actions |
| `/apply` | Apply | 3-step application form |

The 4 "Events & Media" pages share one tab bar (`MediaTabs`). Old URLs (`Participation.php`, `Organized-Programs.php`, `Newsletters.php`, `Media.php`) open the matching new page.

Every page has an **Apply for Incubation** button (navbar, pre-footer band and sticky mobile bar).

## Folder structure

```
src/
  data/         ← ALL content lives here (edit these, not the components)
    site.js       contact details, socials, headline stats, recognitions
    programs.js   programs, stages, benefits, apply steps, mentors
    events.js     events (upcoming/past is computed from today's date)
    startups.js   portfolio + testimonials
    team.js       team, facilities, funding routes
    faq.js
    media.js      gallery albums, newsletters, press clippings
  lib/
    api.js        submitApplication(), submitContact(), subscribe()
    instagram.js  fetches posts from /api/instagram (or a feed URL)
    events.js     date helpers: upcoming, past, next event
    useSeo.js     per-page <title> and description
  components/
    Layout.jsx    announcement bar, navbar, pre-footer CTA, footer, mobile CTA
    blocks.jsx    Countdown, EventCard, ProgramCard, InstagramFeed, FAQ, …
    ui.jsx        Logo, Eyebrow, SectionHeading, PageHero, ApplyButton
  pages/          one file per page
api/
  instagram.js  Vercel serverless function (keeps the Instagram token secret)
```

## Set up before launch

Copy `.env.example` to `.env` and fill in what you have.

### 1. Where applications go
GLBCRI already collects applications on **Incubexa**. By default (`applyMode: 'incubexa'` in `src/data/site.js`), `/apply` explains the steps and hands off to that form.
To use the site's own 3-step form instead, set `applyMode: 'native'` and then
set `VITE_FORM_ENDPOINT` to a form service URL (Formspree, Web3Forms or a Google Apps Script that writes to a Sheet).
Without it, the site runs in **demo mode**: submissions are saved in the browser only, and the success screen says so.

### 2. Instagram feed (@glbajaj_cri)
Meta shut down the old Instagram Basic Display API on **4 Dec 2024**, so:
1. Switch @glbajaj_cri to a **Professional** (Business or Creator) account.
2. At developers.facebook.com, create an app with **Instagram API with Instagram Login**, add the account and generate a **long-lived token**.
3. On Vercel, add `IG_ACCESS_TOKEN` under Project → Settings → Environment Variables.

`/api/instagram` fetches the latest posts and caches them for 1 hour. The token never reaches the browser.
**No backend?** Use a service like Behold and set `VITE_INSTAGRAM_FEED_URL` to its JSON URL.
If neither is set, the section shows branded fallback tiles that link to the Instagram page.

### 3. Content to confirm
Search the code for `CONFIRM` — each one marks a fact to check with the GLBCRI team (startup count, program fees and equity, mentor names, the booking link, office hours, the AKTU award date, and so on).
Gallery/press: 89 photos and clippings are bundled in `public/images/glbcri/gallery` and `/press`. A few photos from the old pages were left out on purpose because they feature public figures (ministers, the Governor); ask the team whether they want any of those back.
Photos: real GLBCRI photos and logos are bundled in `public/images/glbcri/` (taken from glbcri.org, plus the AKTU award photo you provided). To swap one for a sharper original, replace the file and keep the same name.

## Deploy
**Vercel** (recommended): import the repo. `vercel.json` already sends every route to `index.html` and keeps `/api/*` for the function.
**Netlify**: also works; move `api/instagram.js` to `netlify/functions/` and add a redirect rule.

---

## How it's built (interview-ready)

**"Walk me through the architecture."**
It's a single-page React app. React Router handles 8 routes inside one shared `Layout`, which holds the navbar, footer and the CTAs that appear on every page. All content lives in plain JS data files in `src/data`, and the components only render it. That separation is deliberate: V2 adds an admin panel, and then those data files get replaced by API calls without touching the UI.

**"How did you optimise for conversion?"**
I audited the old site, which had 11 equal menu items, with "Incubate Us" buried among them. I benchmarked incubators like NSRCEL, FITT IIT Delhi and AIC-BIMTECH. Then I designed around one action: there's an Apply button in the navbar, a pre-footer band and a sticky mobile bar. The home page answers four questions in order: what's happening now, what do I get, is it for me, and how do I apply. Stage cards and program buttons deep-link to `/apply?program=…`, so the form arrives pre-filled.

**"Why a 3-step form?"**
Long forms lose people. Splitting it into You → Startup → Support makes each screen short, validates step by step, and saves a draft in localStorage so a founder can come back later. The pitch deck is optional, so idea-stage founders aren't blocked.

**"How do events stay up to date?"**
Upcoming vs past is calculated from today's date in `lib/events.js`. The announcement bar, the home page event strip and the countdown all read the same "next event", so an event moves to the archive by itself the day after it ends. The old site's biggest problem was a stale events list.

**"How does the Instagram feed work, and why a serverless function?"**
Since Dec 2024, only Business/Creator accounts can feed a website, and that needs an access token. A token in React code is public, so it lives in a Vercel function that calls the Instagram Graph API and caches for an hour. React only calls `/api/instagram`. If that fails, the UI shows fallback tiles, so the page never has an empty box.

**"Where do form submissions go?"**
Every form goes through one module, `lib/api.js`. Today it posts to a form service that emails the team. In V2 that same function will post to our own backend, and no component changes. That's the point of the abstraction.

**"How do the Gallery and Press pages work?"**
They're data-driven too: `media.js` lists albums (title, date, place, photos) and press clippings grouped by story. One `Lightbox` component powers both pages. It's a fixed overlay with prev/next, arrow-key and Esc support, and a body scroll lock. I put Gallery, Newsletters and Press as tabs under Events because they're all records of the same activity, and that cuts the top menu from 11 items to 6. The routes `/events/gallery` etc. are declared before `/events/:slug`, so React Router doesn't treat "gallery" as an event ID.

**"Accessibility and SEO?"**
There's a skip-to-content link, semantic landmarks, labelled inputs, `aria-pressed`/`aria-checked` on toggle buttons, and visible focus rings. Each page sets its own `<title>` and meta description through a small `useSeo` hook.

## V2 (next)
An admin panel for events (add/edit), the operations team, programs and startups, an applications inbox, and a traffic dashboard (add the GA4 tag in V1 so data starts collecting now).
