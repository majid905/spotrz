import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

const BASE_URL = 'https://espnsports.online'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: now, changeFrequency: 'hourly',  priority: 1.0 },
    { url: `${BASE_URL}/blog`,              lastModified: now, changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${BASE_URL}/about`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terms`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/cookies`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE_URL}/dmca`,              lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]

  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const [rows] = await db.query(
      `SELECT slug, id, updated_at, created_at FROM blog_posts ORDER BY created_at DESC`
    ) as any
    blogPosts = (rows || []).map((p: any) => ({
      url: `${BASE_URL}/blog/${p.slug || p.id}`,
      lastModified: new Date(p.updated_at || p.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {}

  let highlights: MetadataRoute.Sitemap = []
  try {
    const [rows] = await db.query(
      `SELECT slug, id, created_at FROM highlights WHERE is_active = 1 ORDER BY created_at DESC`
    ) as any
    highlights = (rows || []).map((h: any) => ({
      url: `${BASE_URL}/highlights/${h.slug || h.id}`,
      lastModified: new Date(h.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {}

  let liveStreams: MetadataRoute.Sitemap = []
  try {
    const [rows] = await db.query(
      `SELECT id, created_at FROM live_streams WHERE is_active = 1 ORDER BY created_at DESC`
    ) as any
    liveStreams = (rows || []).map((s: any) => ({
      url: `${BASE_URL}/live/${s.id}`,
      lastModified: new Date(s.created_at),
      changeFrequency: 'always' as const,
      priority: 0.9,
    }))
  } catch {}

  return [...staticPages, ...liveStreams, ...blogPosts, ...highlights]
}
