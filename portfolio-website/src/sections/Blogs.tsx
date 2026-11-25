import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Cpu, Network, Radar, Sigma } from 'lucide-react'
import clsx from 'clsx'
import { Reveal, SectionHeader } from '../components/ui/primitives'
import { useMediumPosts } from '../hooks/useMediumPosts'
import type { Blog, BlogTopic } from '../data/blogs'
import { PROFILE } from '../data/profile'

const TOPIC_STYLE: Record<BlogTopic, { icon: React.FC<{ className?: string }>; hue: string; text: string }> = {
  'AI Engineering': { icon: Cpu, hue: '255,107,44', text: 'text-accent-300' },
  'Distributed Systems': { icon: Network, hue: '129,140,248', text: 'text-indigo-300' },
  'Signal Processing': { icon: Radar, hue: '74,222,154', text: 'text-mint-400' },
  Math: { icon: Sigma, hue: '244,114,182', text: 'text-pink-300' },
}

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined

const partOf = (b: Blog) => {
  if (!b.series) return undefined
  const m = b.title.slice(b.series.length).match(/\b([IVX]+|\d+)\b/i)
  return m ? `Part ${m[1].toUpperCase()}` : undefined
}

const Meta: React.FC<{ b: Blog; className?: string }> = ({ b, className }) => {
  const s = TOPIC_STYLE[b.topic]
  const part = partOf(b)
  const bits = [
    // The title already names the series, so the label only needs the part number.
    b.series ? (b.title.toLowerCase().startsWith(b.series.toLowerCase()) && part ? `Series · ${part}` : b.series) : b.topic,
    formatDate(b.publishedAt),
    b.readMinutes ? `${b.readMinutes} min read` : undefined,
  ].filter(Boolean) as string[]
  return (
    <div className={clsx('flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-ink-500', className)}>
      {bits.map((x, i) => (
        <React.Fragment key={x}>
          {i > 0 && <span className="text-ink-700">·</span>}
          <span className={i === 0 ? s.text : undefined}>{x}</span>
        </React.Fragment>
      ))}
    </div>
  )
}

/** Generated cover art per topic so every post looks consistent, image or not. */
const Cover: React.FC<{ b: Blog; size?: 'lg' | 'sm' }> = ({ b, size = 'lg' }) => {
  const { icon: Icon, hue } = TOPIC_STYLE[b.topic]
  return (
    <div
      className={clsx(
        'relative overflow-hidden border border-white/[0.07] bg-ink-950',
        size === 'lg' ? 'aspect-[16/9] rounded-xl sm:aspect-[2/1]' : 'h-14 w-14 shrink-0 rounded-xl sm:h-16 sm:w-16'
      )}
      style={{
        backgroundImage: `radial-gradient(120% 90% at 85% 0%, rgba(${hue},0.32), transparent 55%), radial-gradient(80% 80% at 0% 100%, rgba(${hue},0.12), transparent 60%)`,
      }}
    >
      {size === 'lg' && b.imageUrl && (
        <img
          src={b.imageUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity transition-transform duration-700 group-hover:scale-[1.03]"
          onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      )}
      <div className="bg-dots absolute inset-0 opacity-60" />
      {size === 'lg' ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
          <Icon className="absolute right-6 top-6 h-10 w-10 text-white/70" />
          <span
            aria-hidden
            className="absolute bottom-3 left-5 select-none whitespace-nowrap font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] italic leading-none text-white/[0.12]"
          >
            {b.topic}
          </span>
          <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-200 backdrop-blur">
            Latest
          </span>
        </>
      ) : (
        <Icon className="absolute inset-0 m-auto h-5 w-5 text-white/75" />
      )}
    </div>
  )
}

const Blogs: React.FC = () => {
  const { posts, isLive } = useMediumPosts()
  const [topic, setTopic] = useState<BlogTopic | 'All'>('All')
  const [expanded, setExpanded] = useState(false)

  const topics = useMemo(() => {
    const counts = new Map<BlogTopic, number>()
    posts.forEach(p => counts.set(p.topic, (counts.get(p.topic) || 0) + 1))
    return [...counts.entries()].sort((a, b) => b[1] - a[1])
  }, [posts])

  const filtered = topic === 'All' ? posts : posts.filter(p => p.topic === topic)
  const [featured, ...rest] = filtered
  const LIST_LIMIT = 5
  const visible = expanded ? rest : rest.slice(0, LIST_LIMIT)

  return (
    <section id="writing" className="section border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="05"
          label="Writing"
          title={
            <>
              Notes from the <span className="serif-accent text-ink-300">engine room.</span>
            </>
          }
          description="I write on Medium about AI engineering, distributed systems and the signal processing behind defence radar — explained from first principles."
          action={
            <a href={PROFILE.medium} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <BookOpen className="h-4 w-4" /> Follow on Medium
            </a>
          }
        />

        {/* Topic filter */}
        <Reveal className="mb-8">
          <div role="tablist" aria-label="Filter articles by topic" className="flex flex-wrap items-center gap-2">
            {(['All', ...topics.map(([t]) => t)] as const).map(t => {
              const count = t === 'All' ? posts.length : topics.find(([x]) => x === t)?.[1]
              const active = topic === t
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setTopic(t)
                    setExpanded(false)
                  }}
                  className={clsx(
                    'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                    active
                      ? 'border-white/20 bg-white text-ink-950'
                      : 'border-white/[0.08] bg-white/[0.02] text-ink-300 hover:border-white/15 hover:text-white'
                  )}
                >
                  {t}
                  <span className="font-mono text-[10px] text-ink-500">{count}</span>
                </button>
              )
            })}
            {isLive && (
              <span className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] text-ink-500 sm:inline-flex">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-400" /> Synced from Medium
              </span>
            )}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={topic}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4 lg:grid-cols-12"
          >
            {featured && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface group flex flex-col p-3 transition-colors hover:border-white/15 lg:col-span-7"
              >
                <Cover b={featured} />
                <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                  <Meta b={featured} />
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[1.75rem]">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-400">{featured.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-white">
                    Read on Medium
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            )}

            {rest.length > 0 && (
              <div className="card-surface flex flex-col lg:col-span-5">
              <ul className="divide-y divide-white/[0.06]">
                {visible.map(b => (
                  <li key={b.url}>
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-4 transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-white/[0.025] sm:p-5"
                    >
                      <Cover b={b} size="sm" />
                      <div className="min-w-0 flex-1">
                        <Meta b={b} />
                        <h4 className="mt-1.5 text-[15px] font-medium leading-snug text-ink-100 transition-colors group-hover:text-white">
                          {b.title}
                        </h4>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </a>
                  </li>
                ))}
              </ul>
              {rest.length > LIST_LIMIT && (
                <button
                  type="button"
                  onClick={() => setExpanded(x => !x)}
                  className="mt-auto border-t border-white/[0.06] px-5 py-3.5 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400 transition-colors hover:text-white"
                >
                  {expanded ? 'Show fewer' : `Show all ${rest.length + 1} articles`}
                </button>
              )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Blogs
