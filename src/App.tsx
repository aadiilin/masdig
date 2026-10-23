import { useEffect, useRef, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import './styles.css'

const MARQUEE_ITEMS = [
  'BRAND & POSTER DESIGN', 'WEB & UI/UX', 'SEO OPTIMIZATION',
  'SEO-DRIVEN AD CAMPAIGNS', 'MOTION GRAPHICS', 'SERVING CLIENTS WORLDWIDE',
]

const SERVICES: { n: string; t: string; d: string; tags: string[]; wide?: boolean }[] = [
  {
    n: '01', t: 'Brand & Poster Design',
    d: 'Posters, campaign visuals, event identities, logos and full brand systems — bold typographic work that gets remembered, not ignored.',
    tags: ['Posters', 'Identity', 'Logos', 'Editorial'],
  },
  {
    n: '02', t: 'Web & UI/UX',
    d: 'High-end dark-grade websites with motion, micro-interactions and premium finish — fast, responsive, pixel-faithful on every device.',
    tags: ['Landing pages', 'Web apps', 'Portfolio sites'],
  },
  {
    n: '03', t: 'SEO Optimization',
    d: 'Technical + content SEO done properly: audits, keywords, metadata, schema, performance tuning, and analytics you can actually read.',
    tags: ['Audits', 'Keywords', 'Schema', 'Performance'],
  },
  {
    n: '04', t: 'SEO-Driven Ad Campaigns',
    d: 'Search & social campaigns built on keyword intelligence — Google Ads and Meta creatives that compound with your organic growth.',
    tags: ['Google Ads', 'Meta', 'Creatives'],
  },
  {
    n: '05', t: 'Motion & Content', wide: true,
    d: 'Motion graphics, brand films and content design that keep feeds alive.',
    tags: ['Reels', 'Motion', 'Social sets'],
  },
]

const STEPS = [
  { n: '01', t: 'Discover', d: 'A focused call. We map goals, audience and timeline — no forms longer than your patience.' },
  { n: '02', t: 'Design', d: 'Direction, concepts, iterations. You see real work early — not slides about work.' },
  { n: '03', t: 'Build', d: 'Clean code, tuned performance, SEO baked in from the first commit.' },
  { n: '04', t: 'Grow', d: 'Launch, measure, refine — SEO and ad campaigns keep pushing the score up.' },
]

const STATS = [
  { v: '24', s: 'h', l: 'reply time' },
  { v: '10', s: '+', l: 'services in one house' },
  { v: '100', s: '%', l: 'custom-built work' },
  { v: '∞', s: '', l: 'worldwide clients' },
]

function useReveal() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const els = root.current ? Array.from(root.current.querySelectorAll('.rv')) : []
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return root
}

function spotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${(e.clientX - r.left) / r.width * 100}%`)
  el.style.setProperty('--my', `${(e.clientY - r.top) / r.height * 100}%`)
}

export default function App() {
  const root = useReveal()
  const marquee = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div ref={root}>
      <div className="orbs"><i /><i /><i /></div>
      <div className="grid-lines" />
      <div className="grain" />

      <nav className="top">
        <a href="/" className="wordmark">MASDIG<span className="dot" /></a>
        <div className="links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#growth">Growth</a>
          <a href="#contact">Contact</a>
        </div>
        <span className="badge">● Available Q4</span>
      </nav>

      <section className="hero">
        <div className="wrap">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.76, 0, 0.24, 1] }}>
            <div className="kicker">Official launch — October 2026</div>
            <h1 className="giant"><span className="grad">MASDIG</span></h1>
          </motion.div>
          <motion.div className="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .25 }}>
            <em>design</em><span className="sep">·</span>
            <em>web</em><span className="sep">·</span>
            <em>SEO</em><span className="sep">·</span>
            <em>digital ads</em><span className="sep">·</span>
            <em>worldwide</em>
          </motion.div>
          <motion.p className="lede" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .4 }}>
            An independent design venture by <strong>Mohammed Adil S</strong> — one studio with one
            standard. High-end posters, brand identities, websites, and search-first growth:
            from a coastal town in Kerala to clients anywhere on the map.
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .55 }}>
            <a className="btn solid" href="mailto:adilsarvadka@gmail.com?subject=Project%20inquiry%20—%20MASDIG">Start a project</a>
            <a className="btn ghost" href="#services">Explore services</a>
          </motion.div>
        </div>
        <div className="scroll-cue">scroll</div>
      </section>

      <div className="marquee">
        <div className="track">
          {marquee.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      <section id="services">
        <div className="wrap">
          <div className="shead rv">
            <h2>what we <i>actually do</i></h2>
            <span className="idx">— capabilities</span>
          </div>
          <div className="bento">
            {SERVICES.map((s) => (
              <article key={s.n} className={`card rv ${s.wide ? 'wide' : ''}`} onMouseMove={spotlight}>
                <span className="glow" />
                <div className="num">/{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="chips">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead rv">
            <h2>how a project <i>runs</i></h2>
            <span className="idx">— process</span>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div key={s.n} className="step rv">
                <span className="n">STEP {s.n}</span>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="growth" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead rv">
            <h2>the <i>standards</i></h2>
            <span className="idx">— by the numbers</span>
          </div>
          <div className="stats">
            {STATS.map((st) => (
              <div key={st.l} className="stat rv">
                <div className="v">{st.v}<em>{st.s}</em></div>
                <div className="l">{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="vband rv">
            <em>Looking for the portfolio? A decade-grade poster archive lives on the studio site.</em>
            <a href="https://aadiilin.vercel.app/work" target="_blank" rel="noreferrer">View the work ↗</a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="wrap">
          <h2 className="big rv">Let&rsquo;s build <i>something</i> extraordinary</h2>
          <div className="row rv">
            <a className="btn solid" href="mailto:adilsarvadka@gmail.com?subject=Project%20inquiry%20—%20MASDIG">Email the studio</a>
            <a className="btn ghost" href="https://wa.me/918137802554" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div className="mail rv">
            <a href="mailto:adilsarvadka@gmail.com">adilsarvadka@gmail.com</a>
            <span>+91 81378 02554 · Kasaragod, Kerala, India · working worldwide</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <a href="/" className="wordmark">MASDIG<span className="dot" /></a>
          <span className="note">© 2025–2026 MASDIG — design · web · SEO · ads. All rights reserved.</span>
          <div className="soc">
            <a href="https://aadiilin.vercel.app" target="_blank" rel="noreferrer">Portfolio</a>
            <a href="https://www.instagram.com/aadiil.in" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/aadiilin-freelance-company-627741446" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
