import React, { useState } from 'react'
import { BookOpen, Check, Copy, Github, Linkedin, Mail } from 'lucide-react'
import { Reveal } from '../components/ui/primitives'
import { PROFILE } from '../data/profile'

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.05] pt-24 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]" />
        <div className="absolute bottom-[-20rem] left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent-500/[0.12] blur-[120px]" />
      </div>

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="text-accent-400">06</span>
            <span className="h-px w-6 bg-ink-600" />
            Contact
          </span>
          <h2 className="h-display mt-6 text-5xl leading-[1.02] sm:text-7xl">
            Let’s build <span className="serif-accent text-shine">something real.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
            Open to AI engineering roles, founding-team conversations and research collaborations. The fastest way to
            reach me is email.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${PROFILE.email}`} className="btn-light">
              <Mail className="h-4 w-4" /> {PROFILE.email}
            </a>
            <button type="button" onClick={copyEmail} className="btn-ghost" aria-live="polite">
              {copied ? <Check className="h-4 w-4 text-mint-400" /> : <Copy className="h-4 w-4 text-ink-400" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] py-8 sm:flex-row">
          <p className="text-sm text-ink-500">© {new Date().getFullYear()} Satvik Singh. Built with React & Tailwind.</p>
          <div className="flex items-center gap-1">
            {[
              { href: PROFILE.github, label: 'GitHub', icon: Github },
              { href: PROFILE.linkedin, label: 'LinkedIn', icon: Linkedin },
              { href: PROFILE.medium, label: 'Medium', icon: BookOpen },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink-400 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Contact
