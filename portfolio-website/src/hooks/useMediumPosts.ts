import { useEffect, useState } from 'react'
import { BLOGS, Blog, inferSeries, inferTopic } from '../data/blogs'

const API_BASE = import.meta.env.PROD ? 'https://api.sa7vik.in' : 'http://localhost:8000'
const CACHE_KEY = 'medium-posts:v2'
const CACHE_TTL_MS = 1000 * 60 * 60 * 6

interface FeedItem {
  title: string
  description?: string
  excerpt?: string
  imageUrl?: string | null
  publishDate?: string
  publishedAt?: string
  mediumUrl: string
  tags?: string[]
  readTime?: string | number
  readMinutes?: number
}

/** Medium post IDs are the trailing hex hash of the slug. */
const postId = (url: string) => url.split('?')[0].match(/([0-9a-f]{10,})\/?$/)?.[1] ?? url

const stripHtml = (html = '') => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim()
}

const truncate = (s: string, n = 180) => (s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '…' : s)

const fromFeed = (item: FeedItem): Blog => {
  const text = item.excerpt || stripHtml(item.description)
  const minutes =
    item.readMinutes ?? (typeof item.readTime === 'number' ? item.readTime : parseInt(String(item.readTime || ''), 10))
  const date = item.publishedAt || item.publishDate
  const fallback = BLOGS.find(b => postId(b.url) === postId(item.mediumUrl))
  return {
    title: item.title,
    url: item.mediumUrl.split('?')[0],
    excerpt: fallback?.excerpt || truncate(text),
    topic: fallback?.topic || inferTopic(`${item.title} ${(item.tags || []).join(' ')}`),
    series: fallback?.series || inferSeries(item.title),
    publishedAt: date && !Number.isNaN(Date.parse(date)) ? new Date(date).toISOString() : undefined,
    readMinutes: Number.isFinite(minutes) && minutes > 0 ? minutes : undefined,
    imageUrl: item.imageUrl,
  }
}

/** Live posts first (newest first), then any older snapshot posts the RSS feed no longer returns. */
const merge = (live: Blog[]): Blog[] => {
  const seen = new Set(live.map(b => postId(b.url)))
  const sorted = [...live].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
  return [...sorted, ...BLOGS.filter(b => !seen.has(postId(b.url)))]
}

const readCache = (): Blog[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { at, posts } = JSON.parse(raw)
    return Date.now() - at < CACHE_TTL_MS && Array.isArray(posts) ? posts : null
  } catch {
    return null
  }
}

const writeCache = (posts: Blog[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), posts }))
  } catch {
    /* storage unavailable */
  }
}

export function useMediumPosts() {
  const [posts, setPosts] = useState<Blog[]>(() => readCache() ?? BLOGS)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    const timer = window.setTimeout(() => ctrl.abort(), 8000)
    fetch(`${API_BASE}/medium-blogs`, { signal: ctrl.signal })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: FeedItem[]) => {
        if (!Array.isArray(data) || data.length === 0) return
        const next = merge(data.filter(d => d?.title && d?.mediumUrl).map(fromFeed))
        setPosts(next)
        setIsLive(true)
        writeCache(next)
      })
      .catch(() => {
        /* keep snapshot */
      })
      .finally(() => window.clearTimeout(timer))
    return () => {
      window.clearTimeout(timer)
      ctrl.abort()
    }
  }, [])

  return { posts, isLive }
}
