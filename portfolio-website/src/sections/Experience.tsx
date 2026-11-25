import React from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Reveal } from '../components/ui/primitives'
import { EXPERIENCE } from '../data/profile'

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section border-t border-white/[0.05]">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Reveal className="lg:sticky lg:top-32">
            <span className="eyebrow">
              <span className="text-accent-400">03</span>
              <span className="h-px w-6 bg-ink-600" />
              Experience
            </span>
            <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl">
              From radar arrays <span className="serif-accent text-ink-300">to hospital wards.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-300">
              <p>
                I work where performance meets real-world consequence. Today I’m a Software Engineer at Symbian Health,
                building clinical AI products for healthcare teams. In between, at DRDO, I wrote the low-level
                signal-processing code behind airborne surveillance radar.
              </p>
              <p className="text-ink-400">
                The common thread: research-grade models, made fast and reliable enough to depend on.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="chip">B.Tech IT · Jabalpur Engineering College</span>
              <span className="chip">English · Hindi · German (elementary)</span>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-white/15 via-white/10 to-transparent" />
          <ol>
          {EXPERIENCE.map((e, i) => (
            <Reveal as="li" key={e.role + e.company} delay={Math.min(i, 3) * 0.04} className="relative pb-10 pl-9 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border ${
                    e.current ? 'border-accent-500/60 bg-accent-500/20' : 'border-white/15 bg-ink-900'
                  }`}
                >
                  <span className={`h-[5px] w-[5px] rounded-full ${e.current ? 'bg-accent-400' : 'bg-ink-500'}`} />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{e.role}</h3>
                  {e.current && (
                    <span className="rounded-full bg-accent-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-300">
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="text-ink-200">{e.company}</span>
                  <span className="inline-flex items-center gap-1 text-ink-500">
                    <MapPin className="h-3 w-3" />
                    {e.location}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-400">{e.summary}</p>
                {e.highlights && (
                  <ul className="mt-3 space-y-1.5">
                    {e.highlights.map(h => (
                      <li key={h} className="flex gap-2.5 text-sm text-ink-300">
                        <span className="mt-[9px] h-px w-3 shrink-0 bg-accent-500/70" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {e.link && (
                  <a
                    href={e.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm text-ink-200 transition-colors hover:text-white"
                  >
                    <span className="link-underline">{e.link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Experience
