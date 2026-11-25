export type BlogTopic = 'AI Engineering' | 'Distributed Systems' | 'Signal Processing' | 'Math'

export interface Blog {
  title: string
  url: string
  excerpt: string
  topic: BlogTopic
  series?: string
  publishedAt?: string // ISO date; filled in by the live feed when available
  readMinutes?: number
  imageUrl?: string | null
}

/**
 * Snapshot of articles on medium.com/@sa7vik, newest first.
 * The Writing section shows this immediately and then replaces it with the live
 * RSS feed from the backend (/medium-blogs) when that responds. Add new posts at the top.
 */
export const BLOGS: Blog[] = [
  {
    title: 'How We Suppress Jamming in Defense Radar Using MVDR (Without Losing the Target)',
    url: 'https://medium.com/@sa7vik/how-we-suppress-jamming-in-defense-radar-using-mvdr-without-losing-the-target-51d964031d95',
    excerpt:
      'Adaptive beamforming in practice: how MVDR places nulls on jammers while keeping gain on the target, and the trade-offs that show up on real hardware.',
    topic: 'Signal Processing',
  },
  {
    title: 'Why Your Computer Can’t Tell Time (And How Atomic Clocks Are Quietly Saving the World)',
    url: 'https://medium.com/@sa7vik/why-your-computer-cant-tell-time-and-how-atomic-clocks-are-quietly-saving-the-world-442d13d31cc3',
    excerpt:
      'Clock drift, NTP, and why ordering events across machines is one of the hardest problems in distributed systems.',
    topic: 'Distributed Systems',
  },
  {
    title: 'How Big Tech Keeps Your Data Safe: Replication in Distributed Systems',
    url: 'https://medium.com/@sa7vik/how-big-tech-keeps-your-data-safe-replication-in-distributed-systems-d63a12ecf12a',
    excerpt:
      'Leader–follower, multi-leader and leaderless replication explained, with the consistency trade-offs each one makes.',
    topic: 'Distributed Systems',
  },
  {
    title: 'AI Engineering Simplified III — Inconsistency and Hallucination',
    url: 'https://medium.com/@sa7vik/ai-engineering-simplified-iii-inconsitency-and-hellucination-a2caa1405a31',
    excerpt:
      'Why language models give different answers to the same question, why they make things up, and what engineers can do about it.',
    topic: 'AI Engineering',
    series: 'AI Engineering Simplified',
  },
  {
    title: 'AI Engineering Simplified II — Understanding the Training Journey of AI Models',
    url: 'https://medium.com/@sa7vik/ai-engineering-simplified-ii-understanding-the-training-journey-of-ai-models-79e2206e9f2f',
    excerpt:
      'Pre-training, fine-tuning and preference alignment: the stages a model goes through before it reaches your API call.',
    topic: 'AI Engineering',
    series: 'AI Engineering Simplified',
  },
  {
    title: 'AI Engineering Simplified I — Basics of LLMs',
    url: 'https://medium.com/@sa7vik/ai-engineering-simplified-i-basics-of-llms-8a5f9e2d794d',
    excerpt:
      'Tokens, embeddings, attention and sampling: a ground-up introduction to how large language models work.',
    topic: 'AI Engineering',
    series: 'AI Engineering Simplified',
  },
  {
    title: 'Cracking Linear Algebra: Part 2',
    url: 'https://medium.com/@sa7vik/cracking-linear-algebra-part-2-8df0ccd2e3a4',
    excerpt:
      'The linear algebra that keeps coming up in GATE and in machine learning, worked through problem by problem.',
    topic: 'Math',
    series: 'Cracking Linear Algebra',
  },
]

const TOPIC_RULES: [BlogTopic, RegExp][] = [
  ['Signal Processing', /radar|signal|mvdr|beamform|jamm|dsp/i],
  ['Distributed Systems', /distributed|replication|clock|consensus|database|system design/i],
  ['Math', /algebra|calculus|probability|\bgate\b|\bmath/i],
  ['AI Engineering', /.*/],
]

export const inferTopic = (text: string): BlogTopic =>
  TOPIC_RULES.find(([, re]) => re.test(text))![0]

export const inferSeries = (title: string): string | undefined => {
  const m = title.match(/^(.+?)\s+(?:part\s+)?([IVX]+|\d+)(?:\s*[—–:-]|\s*$)/i)
  if (!m) return undefined
  const name = m[1].replace(/[:—–-]\s*$/, '').trim()
  return name.length > 4 ? name : undefined
}
