import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, Sparkles, X } from 'lucide-react'
import clsx from 'clsx'
import { PROFILE } from '../data/profile'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#writing', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
]

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={clsx(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-4',
          scrolled || open
            ? 'border-white/[0.08] bg-ink-950/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        )}
      >
        <a href="#top" className="flex items-center gap-2.5 pl-1" aria-label="Satvik Singh — home">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-white text-[13px] font-bold tracking-tight text-ink-950">
            SS
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-ink-950" />
          </span>
          <span className="hidden text-sm font-medium text-white sm:block">Satvik Singh</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-sm text-ink-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-full px-3 py-1.5 text-sm text-ink-300 transition-colors hover:text-white sm:inline-flex"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href="/chatbot" className="btn-light !px-4 !py-2">
            <Sparkles className="h-3.5 w-3.5" />
            Ask my AI
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-200 hover:bg-white/[0.06] md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/[0.08] bg-ink-950/95 p-2 backdrop-blur-xl md:hidden"
          >
            {[...LINKS, { href: PROFILE.resume, label: 'Resume' }].map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base text-ink-200 hover:bg-white/[0.05] hover:text-white"
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
