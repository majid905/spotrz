import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

const BASE_URL = 'https://spotrz.online'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/cookies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/dmca`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const [rows] = await db.query(
      `SELECT slug, id, created_at FROM blog_posts ORDER BY created_at DESC`
    ) as any
    blogPosts = (rows || []).map((p: any) => ({
      url: `${BASE_URL}/blog/${p.slug || p.id}`,
      lastModified: new Date(p.created_at),
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

  return [...staticPages, ...blogPosts, ...highlights]
}
