import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/settings'
import { db } from '@/lib/db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog – FIFA World Cup 2026 News & Analysis',
  description: 'Latest FIFA World Cup 2026 news, team analysis, player previews, venue guides, and fan resources. Everything you need for the biggest football tournament ever.',
}

const CATEGORIES = ['All', 'General', 'Teams', 'Players', 'Venues', 'Group Stage', 'Qualifying', 'Fan Guide', 'History']

async function getPosts(category: string, page: number) {
  const limit = 9
  const offset = (page - 1) * limit
  let where = 'WHERE 1=1'
  const params: any[] = []
  if (category && category !== 'All') {
    where += ' AND category = ?'
    params.push(category)
  }
  const [[{ total }]] = await db.query(
    `SELECT COUNT(*) as total FROM blog_posts ${where}`, params
  ) as any
  const [posts] = await db.query(
    `SELECT id, title, slug, excerpt, category, image_url, author, read_time, views, is_featured, created_at
     FROM blog_posts ${where}
     ORDER BY is_featured DESC, created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  ) as any
  return { posts, total, pages: Math.ceil(total / limit) }
}

async function getFeaturedPost() {
  const [rows] = await db.query(
    `SELECT id, title, slug, excerpt, category, image_url, author, read_time, created_at
     FROM blog_posts WHERE is_featured = 1 ORDER BY created_at DESC LIMIT 1`
  ) as any
  return rows?.[0] || null
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string }
}) {
  const s = await getSiteSettings()
  const category = searchParams.category || 'All'
  const page = parseInt(searchParams.page || '1')

  const [featuredPost, { posts, total, pages }] = await Promise.all([
    category === 'All' && page === 1 ? getFeaturedPost() : Promise.resolve(null),
    getPosts(category, page),
  ])

  const gridPosts = featuredPost
    ? posts.filter((p: any) => p.id !== featuredPost.id)
    : posts

  return (
    <div className="min-h-screen" style={{ background: '#050b18' }}>
      <Navbar logoUrl={s.logo_url} siteName={s.site_name} />

      {/* Hero */}
      <section className="pt-24 pb-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            World Cup 2026
          </span>
          <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            News &amp; Analysis
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about the FIFA World Cup 2026 — teams, players, venues, and predictions.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  category === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-10">
            <Link href={`/blog/${featuredPost.slug || featuredPost.id}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden" style={{ background: '#0d1526' }}>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto min-h-[280px]">
                    <Image
                      src={featuredPost.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d1526]/80 hidden md:block" />
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      Featured
                    </span>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <span className="inline-block text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
                      {featuredPost.category}
                    </span>
                    <h2 className="font-oswald text-2xl md:text-3xl font-bold text-white uppercase leading-tight mb-3 group-hover:text-red-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                      <span className="font-semibold text-gray-400">{featuredPost.author}</span>
                      <span>·</span>
                      <span>{featuredPost.read_time} min read</span>
                      <span>·</span>
                      <span>{new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                      Read Article
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            {total} article{total !== 1 ? 's' : ''}
            {category !== 'All' ? ` in ${category}` : ''}
          </p>
          {pages > 1 && (
            <p className="text-gray-500 text-sm">Page {page} of {pages}</p>
          )}
        </div>

        {/* Grid */}
        {gridPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No articles found in this category.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {gridPosts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="group block">
                <article className="rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 duration-200" style={{ background: '#0d1526' }}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#050b18]/80 text-red-400 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-oswald text-base font-bold text-white uppercase leading-tight mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-gray-600 text-[10px]">
                      <span className="font-semibold text-gray-500">{post.author}</span>
                      <div className="flex items-center gap-2">
                        <span>{post.read_time} min</span>
                        <span>·</span>
                        <span>{post.views || 0} views</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/blog?category=${encodeURIComponent(category)}&page=${page - 1}`}
                className="px-4 py-2 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors"
                style={{ background: '#0d1526' }}
              >
                ← Prev
              </Link>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <Link
                key={p}
                href={`/blog?category=${encodeURIComponent(category)}&page=${p}`}
                className={`w-9 h-9 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                  p === page ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
                style={p !== page ? { background: '#0d1526' } : {}}
              >
                {p}
              </Link>
            ))}
            {page < pages && (
              <Link
                href={`/blog?category=${encodeURIComponent(category)}&page=${page + 1}`}
                className="px-4 py-2 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors"
                style={{ background: '#0d1526' }}
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>

      <Footer
        logoUrl={s.logo_url} siteName={s.site_name}
        socialFacebook={s.social_facebook} socialTwitter={s.social_twitter}
        socialInstagram={s.social_instagram} socialYoutube={s.social_youtube}
        contactEmail={s.contact_email}
      />
    </div>
  )
}
