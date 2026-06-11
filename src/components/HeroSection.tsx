import { db } from '@/lib/db'

interface HeroRow { title:string; description:string; button_text:string; button_link:string; image_url:string }

async function getHero(): Promise<HeroRow> {
  try {
    const [rows] = await db.query('SELECT * FROM hero_section WHERE is_active=1 LIMIT 1') as any
    if (rows && rows[0]) return rows[0]
  } catch {}
  return { title:'Join the Ultimate Football Network', description:'Step into a vibrant community of football players from around the world. Share your experiences, find teammates, and compete in challenges that test your skills.', button_text:'Learn More', button_link:'#live-scores', image_url:'' }
}

export default async function HeroSection() {
  const hero = await getHero()

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden min-h-[70vh] md:min-h-[85vh] lg:min-h-screen"
      style={{
        background: hero.image_url
          ? `linear-gradient(180deg,rgba(2,8,16,.85) 0%,rgba(4,18,32,.8) 40%,rgba(6,26,16,.8) 70%,rgba(3,14,8,.9) 100%), url(${hero.image_url}) center/cover no-repeat`
          : 'linear-gradient(180deg, #020810 0%, #041220 30%, #061a10 65%, #030e08 100%)',
      }}
    >
      {/* Stadium light spots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[15%] w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
        <div className="absolute top-10 right-[15%] w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
          style={{ background: 'linear-gradient(0deg, #1a4a1a 0%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[160px] opacity-5 border-2 border-white rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-16 md:py-20">
        {/* Badge */}
        <div className="inline-block bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-5 sm:px-8 py-2 mb-6 sm:mb-8 rounded-sm">
          Connect and Compete
        </div>

        {/* Heading */}
        <h1 className="font-oswald font-bold text-white uppercase leading-none mb-6 sm:mb-8 tracking-tight"
          style={{ fontSize: 'clamp(2rem, 10vw, 5.5rem)' }}>
          {hero.title.split('\n').map((line, i) => (
            <span key={i}>{line}{i < hero.title.split('\n').length - 1 && <br />}</span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
          {hero.description}
        </p>

        {/* CTA */}
        <a
          href={hero.button_link || '#'}
          className="inline-flex items-center justify-center border-2 border-white text-white text-xs font-bold uppercase tracking-[0.2em] px-10 py-4 min-h-[48px] hover:bg-white hover:text-gray-900 active:bg-gray-100 transition-all duration-300"
        >
          {hero.button_text}
        </a>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-8 hidden md:flex gap-2">
        {[1, 2, 3].map(n => (
          <button
            key={n}
            className={`w-10 h-10 flex items-center justify-center text-sm font-bold border transition-all ${
              n === 3
                ? 'bg-red-600 border-red-600 text-white'
                : 'border-gray-700 text-gray-500 hover:border-white hover:text-white'
            }`}
            aria-label={`Slide ${n}`}
          >
            {n}
          </button>
        ))}
      </div>
    </section>
  )
}
