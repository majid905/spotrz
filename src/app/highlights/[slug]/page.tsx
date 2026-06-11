import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VideoPlayer from '@/components/VideoPlayer'
import { getSiteSettings } from '@/lib/settings'
import { db } from '@/lib/db'
import type { Metadata } from 'next'

async function getHighlight(slug: string) {
  const isId = !isNaN(Number(slug))
  const field = isId ? 'id' : 'slug'
  const [rows] = await db.query(
    `SELECT * FROM highlights WHERE ${field} = ? AND is_active = 1 LIMIT 1`, [slug]
  ) as any
  return rows?.[0] || null
}

async function getRelated(category: string, excludeId: number) {
  const [rows] = await db.query(
    `SELECT id, title, slug, thumbnail, duration, competition, views, created_at
     FROM highlights WHERE is_active = 1 AND id != ?
     ORDER BY created_at DESC LIMIT 4`,
    [excludeId]
  ) as any
  return rows || []
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const h = await getHighlight(params.slug)
  if (!h) return { title: 'Highlight Not Found' }

  const title = `${h.title} – Match Highlights | Spotrz`
  const description = h.description || `Watch ${h.title} video highlights. ${h.competition ? `${h.competition}.` : ''} Full match highlights on Spotrz.`
  const imageUrl = h.thumbnail || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'
  const pageUrl = `https://spotrz.online/highlights/${h.slug || h.id}`

  return {
    title,
    description,
    keywords: [
      h.title, 'match highlights', 'football highlights', 'soccer highlights',
      h.competition, h.category, 'World Cup 2026', 'spotrz'
    ].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Spotrz',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: h.title }],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: { canonical: pageUrl },
  }
}

export default async function HighlightPage({ params }: { params: { slug: string } }) {
  const [s, h] = await Promise.all([getSiteSettings(), getHighlight(params.slug)])
  if (!h) notFound()

  await db.query('UPDATE highlights SET views = views + 1 WHERE id = ?', [h.id])

  const related = await getRelated(h.category, h.id)
  const pageUrl = `https://spotrz.online/highlights/${h.slug || h.id}`
  const imageUrl = h.thumbnail || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: h.title,
    description: h.description || `Watch ${h.title} highlights on Spotrz.`,
    thumbnailUrl: imageUrl,
    uploadDate: new Date(h.created_at).toISOString(),
    duration: h.duration ? `PT${h.duration.replace(':', 'M')}S` : undefined,
    contentUrl: h.video_url,
    embedUrl: h.video_url,
    publisher: {
      '@type': 'Organization',
      name: 'Spotrz',
      url: 'https://spotrz.online',
    },
    url: pageUrl,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: h.views || 0,
    },
  }

  return (
    <div className="min-h-screen" style={{ background: '#050b18' }}>
      <Navbar logoUrl={s.logo_url} siteName={s.site_name} />

      {/* JSON-LD structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb — helps Google understand site structure */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4 pt-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#highlights" className="hover:text-white transition-colors">Highlights</Link>
            <span>/</span>
            <span className="text-gray-400 line-clamp-1">{h.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="rounded-2xl overflow-hidden mb-5">
                {h.video_url ? (
                  <VideoPlayer url={h.video_url} title={h.title} />
                ) : (
                  <div
                    className="relative w-full flex items-center justify-center"
                    style={{
                      paddingBottom: '56.25%',
                      background: 'linear-gradient(135deg, #0a2010 0%, #041a08 100%)'
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-7 h-7 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <p className="text-gray-500 text-sm">Video coming soon</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & meta */}
              <h1 className="font-oswald text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase leading-tight mb-3">
                {h.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-4">
                {h.competition && (
                  <span className="bg-red-600/20 text-red-400 font-bold px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider">
                    {h.competition}
                  </span>
                )}
                {h.category && (
                  <span className="bg-white/5 text-gray-400 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider">
                    {h.category}
                  </span>
                )}
                {h.duration && <span>{h.duration}</span>}
                <span>·</span>
                <span>{h.views || 0} views</span>
                {h.match_date && (
                  <>
                    <span>·</span>
                    <span>{new Date(h.match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </>
                )}
              </div>

              {h.description && (
                <p className="text-gray-400 text-sm leading-relaxed mb-5 border-l-4 border-red-600 pl-4">
                  {h.description}
                </p>
              )}

              {/* Tags */}
              {h.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {h.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean).map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold text-gray-500 bg-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Share</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(h.title)}&url=${encodeURIComponent(pageUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X / Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(h.title + ' ' + pageUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar — more highlights */}
            <div className="lg:col-span-1">
              <h2 className="font-oswald text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                More Highlights
              </h2>
              <div className="space-y-3">
                {related.map((r: any) => (
                  <Link key={r.id} href={`/highlights/${r.slug || r.id}`} className="group flex gap-3 items-start">
                    <div className="relative w-28 flex-shrink-0 rounded-lg overflow-hidden aspect-video">
                      {r.thumbnail ? (
                        <Image
                          src={r.thumbnail}
                          alt={r.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: '#0d1526' }}>
                          <svg className="w-5 h-5 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      )}
                      {r.duration && (
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {r.duration}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                        {r.title}
                      </p>
                      {r.competition && (
                        <p className="text-gray-600 text-[10px] mt-1">{r.competition}</p>
                      )}
                      <p className="text-gray-600 text-[10px] mt-0.5">{r.views || 0} views</p>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/#highlights"
                className="mt-5 block text-center text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider"
              >
                View All Highlights →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer
        logoUrl={s.logo_url} siteName={s.site_name}
        socialFacebook={s.social_facebook} socialTwitter={s.social_twitter}
        socialInstagram={s.social_instagram} socialYoutube={s.social_youtube}
        contactEmail={s.contact_email}
      />
    </div>
  )
}
