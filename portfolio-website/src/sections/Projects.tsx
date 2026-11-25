import React from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { Reveal, SectionHeader, SpotlightCard } from '../components/ui/primitives'
import { PROFILE, PROJECTS } from '../data/profile'

const Projects: React.FC = () => {
  return (
    <section id="projects" className="section border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Independent projects"
          title={
            <>
              Things I build <span className="serif-accent text-ink-300">on the side.</span>
            </>
          }
          action={
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Github className="h-4 w-4" /> All repositories
            </a>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.map((p, i) => {
            const href = p.liveUrl || p.githubUrl
            const external = href?.startsWith('http')
            return (
              <Reveal key={p.title} delay={i * 0.05} className="flex">
                <SpotlightCard className="flex w-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.02] font-mono text-sm text-white">
                        {p.title.charAt(0)}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} source code`}
                          className="relative z-10 grid h-8 w-8 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {href && (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          aria-label={`Open ${p.title}`}
                          className="relative z-10 grid h-8 w-8 place-items-center rounded-full text-ink-400 transition-all hover:bg-white/[0.06] hover:text-white group-hover:text-accent-400"
                        >
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-ink-400 sm:text-[15px]">{p.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {p.tags.map(t => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
