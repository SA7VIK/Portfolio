import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { PROFILE } from '../data/profile'

const STATS = [
  { value: '4', label: 'Healthcare products shipped end to end' },
  { value: '200+ GB/h', label: 'Real-time radar data processed' },
  { value: '30%', label: 'Efficiency gain in DRDO signal processing' },
  { value: 'SIH ’23', label: 'National finalist among 100,000+ participants' },
]

const ORGS = ['DRDO', 'Symbian Health', 'Ai.Tennis', 'IIT Jodhpur', 'Codeyoung', 'Google Developer Student Clubs']

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
})

const Hero: React.FC = () => {
  return (
    <section id="top" className="noise relative overflow-hidden pb-8 pt-36 sm:pt-44">
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent-500/[0.14] blur-[120px]" />
        <div className="absolute left-[12%] top-40 h-72 w-72 rounded-full bg-indigo-500/[0.08] blur-[100px]" />
      </div>

      <div className="container-x relative">
        <motion.a
          {...fade(0)}
          href="#work"
          className="group mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 text-xs text-ink-300 backdrop-blur transition-colors hover:border-white/20 hover:text-white sm:text-sm"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-white">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-400" />
            Now
          </span>
          Researcher at DRDO · 4 products shipped at Symbian Health
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <motion.h1
          {...fade(0.08)}
          className="h-display mx-auto mt-8 max-w-4xl text-center text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.25rem]"
        >
          I build AI systems
          <br className="hidden sm:block" /> that{' '}
          <span className="serif-accent text-shine pr-1">actually ship.</span>
        </motion.h1>

        <motion.p
          {...fade(0.16)}
          className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-ink-300 sm:text-lg"
        >
          I’m <span className="text-white">Satvik Singh</span>, an AI engineer who takes ideas from research to
          production — real-time radar signal processing at DRDO, and four healthcare products built from zero at
          Symbian Health.
        </motion.p>

        <motion.div {...fade(0.24)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#work" className="btn-light">
            See my work
            <ArrowDown className="h-4 w-4" />
          </a>
          <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            View resume <ArrowUpRight className="h-4 w-4 text-ink-400" />
          </a>
          <div className="ml-1 flex items-center gap-1">
            {[
              { href: PROFILE.github, icon: Github, label: 'GitHub' },
              { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${PROFILE.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="grid h-10 w-10 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.dl
          {...fade(0.34)}
          className="mx-auto mt-20 grid max-w-5xl grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] backdrop-blur-sm lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`p-5 sm:p-7 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${
                i === 2 ? 'lg:border-l' : ''
              } border-white/[0.07]`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{s.value}</dd>
              <dd className="mt-1.5 text-xs leading-snug text-ink-400 sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </motion.dl>

        {/* Org marquee */}
        <motion.div {...fade(0.44)} className="mt-14">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
            Research & engineering at
          </p>
          <div className="mask-fade-x relative mt-6 overflow-hidden">
            <div className="flex w-max animate-marquee gap-14 pr-14">
              {[...ORGS, ...ORGS].map((o, i) => (
                <span
                  key={i}
                  aria-hidden={i >= ORGS.length}
                  className="whitespace-nowrap text-lg font-semibold tracking-tight text-ink-500 transition-colors hover:text-ink-200"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
