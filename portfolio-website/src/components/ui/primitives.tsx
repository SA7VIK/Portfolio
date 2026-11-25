import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export const Reveal: React.FC<{
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
  as?: 'div' | 'li'
}> = ({ children, delay = 0, className, y = 16, as = 'div' }) => {
  const M = as === 'li' ? motion.li : motion.div
  return (
  <M
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </M>
  )
}

export const SectionHeader: React.FC<{
  index: string
  label: string
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
}> = ({ index, label, title, description, action, className }) => (
  <div className={clsx('mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between', className)}>
    <Reveal className="max-w-2xl">
      <span className="eyebrow">
        <span className="text-accent-400">{index}</span>
        <span className="h-px w-6 bg-ink-600" />
        {label}
      </span>
      <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">{description}</p>}
    </Reveal>
    {action && <Reveal delay={0.1}>{action}</Reveal>}
  </div>
)

/** Card that draws a soft spotlight following the cursor. */
export const SpotlightCard: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { as?: 'div' | 'a'; href?: string; target?: string; rel?: string }
> = ({ as = 'div', className, children, ...rest }) => {
  const ref = React.useRef<HTMLElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const Comp = as as React.ElementType
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      className={clsx('card-surface group overflow-hidden', className)}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,107,44,0.09), transparent 60%)',
        }}
      />
      {children}
    </Comp>
  )
}
