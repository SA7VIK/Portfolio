import React from 'react'
import clsx from 'clsx'
import { Reveal, SectionHeader, SpotlightCard } from '../components/ui/primitives'
import { ProductVisualFor } from '../components/ProductVisuals'
import { SYMBIAN_PRODUCTS } from '../data/products'

const PIPELINE = ['Problem discovery', 'Model R&D', 'Backend & APIs', 'Product UI', 'Deploy & iterate']

// Bento layout on large screens: 3 + 2 / 2 + 3
const SPANS = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3']

const Work: React.FC = () => {
  return (
    <section id="work" className="section">
      <div className="container-x">
        <SectionHeader
          index="01"
          label="Selected work · Symbian Health"
          title={
            <>
              Four healthcare products.
              <br />
              <span className="serif-accent text-ink-300">Zero to production.</span>
            </>
          }
          description={
            <>
              At <span className="text-white">Symbian Health</span>, where I’m currently a Software Engineer, I’ve owned
              each of these products end to end: scoping the problem with clinicians, building the models, writing
              the backend and the interface, and running it in production.
            </>
          }
        />

        {/* Ownership pipeline */}
        <Reveal className="mb-6">
          <ol className="card-surface flex flex-wrap items-center gap-x-2 gap-y-3 px-4 py-3.5 sm:px-5">
            <li className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">What I owned</li>
            {PIPELINE.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-ink-200 sm:text-[13px]">
                  <span className="font-mono text-[10px] text-accent-400">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </span>
                {i < PIPELINE.length - 1 && <span className="hidden h-px w-4 bg-ink-600 sm:block" />}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {SYMBIAN_PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06} className={clsx(SPANS[i], 'flex')}>
              <SpotlightCard className="flex w-full flex-col p-3">
                <div className="h-56 sm:h-60">
                  <ProductVisualFor id={p.id} />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{p.category}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-500/20 bg-mint-500/10 px-2 py-0.5 font-mono text-[10px] text-mint-400">
                      <span className="h-1 w-1 rounded-full bg-mint-400" /> Shipped
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">{p.name}</h3>
                  <p className="mt-1 text-[15px] text-ink-200">{p.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">{p.description}</p>
                  <div className="mt-auto pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.scope.map(s => (
                        <span key={s} className="chip !text-ink-200">
                          {s}
                        </span>
                      ))}
                      {p.stack.map(s => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
