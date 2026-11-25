import React from 'react'
import { BrainCircuit, Gauge, Layers, Workflow } from 'lucide-react'
import { Reveal, SectionHeader, SpotlightCard } from '../components/ui/primitives'
import { SKILLS } from '../data/profile'

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

        <div className="grid gap-4 md:grid-cols-2">
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
        </div>
      </div>
    </section>
  )
}

export default Skills
