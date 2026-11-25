import React from 'react'
import { Award, BrainCircuit, Gauge, Layers, Workflow } from 'lucide-react'
import { Reveal, SectionHeader, SpotlightCard } from '../components/ui/primitives'
import { ACHIEVEMENTS, SKILLS } from '../data/profile'

const ICONS = [Workflow, BrainCircuit, Gauge, Layers]

const Skills: React.FC = () => {
  return (
    <section id="toolkit" className="section border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="04"
          label="Toolkit"
          title={
            <>
              Research depth, <span className="serif-accent text-ink-300">product instincts.</span>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((g, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal key={g.group} delay={i * 0.05} className="flex">
                <SpotlightCard className="w-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-ink-200">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-medium text-white">{g.group}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {g.items.map(s => (
                      <span key={s} className="chip !text-[12px] !text-ink-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}

          <Reveal delay={0.2} className="flex md:col-span-2">
            <SpotlightCard className="w-full p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent-500/25 bg-accent-500/10 text-accent-300">
                  <Award className="h-4 w-4" />
                </span>
                <h3 className="font-medium text-white">Recognition</h3>
              </div>
              <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {ACHIEVEMENTS.map(a => (
                  <div key={a.title} className="border-l border-white/10 pl-4">
                    <dt className="text-sm font-medium text-ink-100">{a.title}</dt>
                    <dd className="mt-0.5 text-sm text-ink-400">{a.detail}</dd>
                  </div>
                ))}
              </dl>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Skills
