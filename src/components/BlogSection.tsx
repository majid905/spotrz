import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/db'

async function getLatestPosts() {
  try {
    const [rows] = await db.query(
      `SELECT id, title, slug, excerpt, category, image_url, author, read_time, created_at
       FROM blog_posts
       ORDER BY is_featured DESC, created_at DESC
       LIMIT 4`
    ) as any
    return rows || []
  } catch {
    return []
  }
}

export default async function BlogSection() {
  const posts = await getLatestPosts()
  if (!posts.length) return null

  const [featured, ...rest] = posts

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="relative text-center mb-10 sm:mb-14 overflow-hidden">
          <span
            className="absolute inset-0 flex items-center justify-center font-oswald font-black text-gray-100 select-none pointer-events-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}
            aria-hidden="true"
          >
            BLOG
          </span>
          <div className="relative z-10 py-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b-2 border-red-600 pb-1">
              Blog
            </span>
            <h2
              className="font-oswald font-bold text-gray-900 uppercase mt-3 tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}
            >
              The Latest News
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Left: small posts */}
          <div className="space-y-8">
            {rest.slice(0, 2).map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="group block">
                <div className="relative rounded-lg overflow-hidden mb-4" style={{ height: '160px', background: '#050b18' }}>
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <span className="text-4xl opacity-30">⚽</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                    {post.category}
                  </span>
                </div>
                <div className="border-l-2 border-red-600 pl-3 mb-2">
                  <span className="text-red-600 text-xs font-bold uppercase tracking-widest">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-oswald text-lg sm:text-xl font-bold text-gray-900 uppercase leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest">
                  <span>Read More</span>
                  <div className="h-px w-8 bg-red-600 group-hover:w-14 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* Right: featured/large post */}
          <Link href={`/blog/${featured.slug || featured.id}`} className="group block">
            <div className="relative rounded-lg overflow-hidden mb-4" style={{ height: '280px', background: '#050b18' }}>
              {featured.image_url ? (
                <Image
                  src={featured.image_url}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <span className="text-6xl opacity-30">⚽</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                {featured.category}
              </span>
              <span className="absolute top-3 right-3 bg-yellow-500 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                Featured
              </span>
            </div>
            <div className="border-l-2 border-red-600 pl-3 mb-2">
              <span className="text-red-600 text-xs font-bold uppercase tracking-widest">
                {new Date(featured.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
              </span>
            </div>
            <h3 className="font-oswald text-xl sm:text-2xl font-bold text-gray-900 uppercase leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
              {featured.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
            <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest">
              <span>Read More</span>
              <div className="h-px w-8 bg-red-600 group-hover:w-14 transition-all duration-300" />
            </div>
          </Link>
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors duration-200"
          >
            View All Articles
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
