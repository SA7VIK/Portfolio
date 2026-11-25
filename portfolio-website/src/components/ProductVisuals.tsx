import React from 'react'
import { AlertTriangle, Check, FileText, Loader2, Mic, ShieldCheck } from 'lucide-react'
import type { ProductVisual } from '../data/products'

/** Illustrative UI mocks for each product. Decorative only. */

const Frame: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <div className="relative h-full overflow-hidden rounded-xl border border-white/[0.07] bg-ink-950/80">
    <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-ink-700" />
      <span className="h-2 w-2 rounded-full bg-ink-700" />
      <span className="h-2 w-2 rounded-full bg-ink-700" />
      <span className="ml-2 font-mono text-[10px] text-ink-500">{title}</span>
    </div>
    <div className="relative h-[calc(100%-29px)]">{children}</div>
  </div>
)

const Radiology = () => (
  <Frame title="study / CT-chest · AI pre-read">
    <div className="grid h-full grid-cols-5">
      <div className="relative col-span-3 overflow-hidden border-r border-white/[0.06] bg-black">
        {/* stylised scan */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-[78%] aspect-square rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(215,215,225,0.55)_0%,rgba(150,150,160,0.25)_45%,transparent_72%)]">
            <div className="absolute left-[18%] top-[22%] h-[55%] w-[28%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.9)_35%,rgba(40,40,45,0.5)_60%,transparent_78%)]" />
            <div className="absolute right-[18%] top-[22%] h-[55%] w-[28%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.9)_35%,rgba(40,40,45,0.5)_60%,transparent_78%)]" />
            <div className="absolute left-1/2 top-[12%] h-[70%] w-[6%] -translate-x-1/2 rounded-full bg-white/30" />
            {[28, 40, 52, 64].map(t => (
              <div key={t} className="absolute left-[14%] right-[14%] h-[3%] rounded-[50%] border-t border-white/15" style={{ top: `${t}%` }} />
            ))}
            {/* finding box */}
            <div className="absolute right-[22%] top-[38%] h-[18%] w-[18%] rounded-sm border border-accent-400 shadow-[0_0_20px_rgba(255,107,44,0.5)]">
              <span className="absolute -top-4 left-0 whitespace-nowrap rounded bg-accent-500 px-1 font-mono text-[8px] text-ink-950">
                nodule · 0.91
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 h-px animate-scan bg-gradient-to-r from-transparent via-accent-400 to-transparent shadow-[0_0_12px_rgba(255,107,44,0.9)]" />
        <span className="absolute bottom-2 left-2 font-mono text-[9px] text-ink-500">W 1500 · L -600</span>
      </div>
      <div className="col-span-2 space-y-2.5 p-3">
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-400">
          <FileText className="h-3 w-3" /> Draft report
        </div>
        {['Findings', 'Impression'].map((h, i) => (
          <div key={h} className="space-y-1.5">
            <div className="font-mono text-[9px] text-accent-300">{h}</div>
            {[92, 78, i ? 54 : 85].map((w, j) => (
              <div key={j} className="h-1.5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
            ))}
          </div>
        ))}
        <div className="!mt-4 inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-mint-500/15 px-1.5 py-1 font-mono text-[9px] text-mint-400">
          <Check className="h-2.5 w-2.5" /> Ready for sign-off
        </div>
      </div>
    </div>
  </Frame>
)

const Scribe = () => (
  <Frame title="visit · recording">
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-500/20 text-accent-400">
          <Mic className="h-3 w-3" />
        </span>
        <div className="flex h-6 flex-1 items-center gap-[3px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="w-[3px] origin-center animate-wave rounded-full bg-ink-300"
              style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 7) * 0.12}s` }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] text-ink-500">04:12</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {['Subjective', 'Objective', 'Assessment', 'Plan'].map((s, i) => (
          <div key={s} className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-2">
            <div className="mb-1.5 flex items-center gap-1 font-mono text-[9px] text-ink-300">
              <span className="grid h-3.5 w-3.5 place-items-center rounded bg-white/10 text-[8px] text-white">{s[0]}</span>
              {s}
            </div>
            <div className="space-y-1">
              {[88, 70, 50 + i * 10].map((w, j) => (
                <div key={j} className="h-1 rounded-full bg-white/10" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Frame>
)

const FallGuard = () => (
  <Frame title="ward 3 · live monitoring">
    <div className="relative h-full p-3">
      <svg viewBox="0 0 300 110" className="h-[70%] w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="fg-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff6b2c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff6b2c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[22, 55, 88].map(y => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
        ))}
        <path
          d="M0 78 L20 74 L40 80 L60 72 L80 77 L100 70 L120 76 L140 73 L160 79 L175 74 L185 12 L195 96 L205 60 L220 82 L240 80 L260 83 L280 81 L300 82 L300 110 L0 110Z"
          fill="url(#fg-fill)"
        />
        <path
          d="M0 78 L20 74 L40 80 L60 72 L80 77 L100 70 L120 76 L140 73 L160 79 L175 74 L185 12 L195 96 L205 60 L220 82 L240 80 L260 83 L280 81 L300 82"
          fill="none"
          stroke="#ff8f57"
          strokeWidth="1.5"
        />
        <circle cx="185" cy="12" r="3.5" fill="#ff6b2c">
          <animate attributeName="r" values="3;6;3" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 rounded-lg border border-accent-500/30 bg-accent-500/10 px-2.5 py-2 backdrop-blur">
        <AlertTriangle className="h-4 w-4 shrink-0 text-accent-400" />
        <div className="min-w-0">
          <div className="text-[11px] font-medium text-white">Fall detected · Room 204</div>
          <div className="font-mono text-[9px] text-ink-400">Caregiver paged · 00:03 ago</div>
        </div>
        <span className="ml-auto h-2 w-2 shrink-0 animate-pulse-dot rounded-full bg-accent-500" />
      </div>
    </div>
  </Frame>
)

const Credero = () => {
  const rows: [string, 'ok' | 'pending'][] = [
    ['State medical license', 'ok'],
    ['DEA registration', 'ok'],
    ['Board certification', 'ok'],
    ['Malpractice history', 'pending'],
  ]
  return (
    <Frame title="provider / Dr. A. Rao · credentialing">
      <div className="flex h-full flex-col p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-white">
            <ShieldCheck className="h-3.5 w-3.5 text-mint-400" /> Primary-source verification
          </div>
          <span className="font-mono text-[9px] text-ink-400">3 / 4</span>
        </div>
        <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-mint-500 to-mint-400" />
        </div>
        <ul className="space-y-1.5">
          {rows.map(([label, state]) => (
            <li
              key={label}
              className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.015] px-2.5 py-1.5"
            >
              <span className="text-[11px] text-ink-200">{label}</span>
              {state === 'ok' ? (
                <span className="inline-flex items-center gap-1 font-mono text-[9px] text-mint-400">
                  <Check className="h-3 w-3" /> verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-mono text-[9px] text-accent-300">
                  <Loader2 className="h-3 w-3 animate-spin" /> checking
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  )
}

const VISUALS: Record<ProductVisual, React.FC> = {
  radiology: Radiology,
  scribe: Scribe,
  fallguard: FallGuard,
  credero: Credero,
}

export const ProductVisualFor: React.FC<{ id: ProductVisual }> = ({ id }) => {
  const V = VISUALS[id]
  return <V />
}
