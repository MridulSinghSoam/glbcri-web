import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Funding from './pages/Funding'
import Startups from './pages/Startups'
import { EventDetail, Events } from './pages/Events'
import { Gallery, Newsletters, Press } from './pages/Media'
import About from './pages/About'
import Contact from './pages/Contact'
import Apply from './pages/Apply'

function NotFound() {
  return (
    <section className="container-x section text-center">
      <p className="text-7xl font-extrabold text-gold-300">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">This page moved or doesn’t exist</h1>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn-outline">Go home</Link>
        <Link to="/apply" className="btn-primary">Apply for Incubation</Link>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="funding" element={<Funding />} />
          <Route path="startups" element={<Startups />} />
          <Route path="events" element={<Events />} />
          {/* Media tabs come before :slug so "gallery" isn't read as an event slug */}
          <Route path="events/gallery" element={<Gallery />} />
          <Route path="events/newsletters" element={<Newsletters />} />
          <Route path="events/press" element={<Press />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="apply" element={<Apply />} />
          {/* Old site URLs → new pages */}
          <Route path="index.php" element={<Home />} />
          <Route path="Participation.php" element={<Gallery />} />
          <Route path="Organized-Programs.php" element={<Gallery />} />
          <Route path="Newsletters.php" element={<Newsletters />} />
          <Route path="Media.php" element={<Press />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
