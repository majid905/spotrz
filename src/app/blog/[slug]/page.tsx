import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import { getSiteSettings } from '@/lib/settings'
import { db } from '@/lib/db'
import type { Metadata } from 'next'

async function getPost(slug: string) {
  const isId = !isNaN(Number(slug))
  const field = isId ? 'id' : 'slug'
  const [rows] = await db.query(
    `SELECT * FROM blog_posts WHERE ${field} = ? LIMIT 1`, [slug]
  ) as any
  return rows?.[0] || null
}

async function getRelatedPosts(category: string, excludeId: number) {
  const [rows] = await db.query(
    `SELECT id, title, slug, excerpt, category, image_url, author, read_time, created_at
     FROM blog_posts WHERE category = ? AND id != ?
     ORDER BY created_at DESC LIMIT 3`,
    [category, excludeId]
  ) as any
  return rows || []
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} – Spotrz World Cup 2026`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image_url ? [post.image_url] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image_url ? [post.image_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [s, post] = await Promise.all([getSiteSettings(), getPost(params.slug)])
  if (!post) notFound()

  const related = await getRelatedPosts(post.category, post.id)

  const postUrl = `https://espnsports.online/blog/${post.slug || post.id}`

  return (
    <div className="min-h-screen" style={{ background: '#050b18' }}>
      <Navbar logoUrl={s.logo_url} siteName={s.site_name} />

      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full mt-16">
        <Image
          src={post.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-[#050b18]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-4xl mx-auto">
          <Link
            href={`/blog?category=${encodeURIComponent(post.category)}`}
            className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3"
          >
            {post.category}
          </Link>
          <h1 className="font-oswald text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Ad below hero image */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="hidden md:block"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={728} height={90} /></div>
        <div className="md:hidden"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} /></div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 text-xs mb-8 pb-8 border-b border-white/10">
          <span className="font-semibold text-gray-300">{post.author}</span>
          <span>·</span>
          <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.read_time} min read</span>
          <span>·</span>
          <span>{post.views} views</span>
        </div>

        {/* Excerpt */}
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 font-medium border-l-4 border-red-600 pl-4">
          {post.excerpt}
        </p>

        {/* In-content ad — high RPM spot */}
        <div className="my-8 flex justify-center">
          <div className="hidden md:block"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={728} height={90} /></div>
          <div className="md:hidden"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} /></div>
        </div>

        {/* Content */}
        <div
          className="blog-content prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Ad after article content */}
        <div className="my-8">
          <div className="hidden md:block"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={728} height={90} /></div>
          <div className="md:hidden"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} /></div>
        </div>

        {/* Share */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-4">Share This Article</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share on X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Share on Facebook
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + postUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </article>

      {/* Ad before related posts */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="hidden md:block"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={728} height={90} /></div>
        <div className="md:hidden"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} /></div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="border-t border-white/10 pt-10">
            <h2 className="font-oswald text-xl font-bold text-white uppercase tracking-wide mb-6">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((rel: any) => (
                <Link key={rel.id} href={`/blog/${rel.slug || rel.id}`} className="group block">
                  <div className="rounded-xl overflow-hidden" style={{ background: '#0d1526' }}>
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={rel.image_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80'}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-oswald text-sm font-bold text-white uppercase leading-tight group-hover:text-red-400 transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-gray-600 text-[10px] mt-2">{rel.read_time} min read</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
          </svg>
          Back to Blog
        </Link>
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
