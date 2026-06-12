import { db } from '@/lib/db'
import NextMatchCountdown from './NextMatchCountdown'

async function getNextMatch() {
  try {
    const [rows] = await db.query(
      `SELECT * FROM matches
       WHERE status = 'scheduled' AND match_date >= CURDATE()
       ORDER BY match_date ASC, match_time ASC LIMIT 1`
    ) as any
    return rows?.[0] || null
  } catch { return null }
}

export default async function NextMatchSection() {
  const match = await getNextMatch()
  if (!match) return null

  const dateStr = `${match.match_date}`.split('T')[0]
  const timeStr = match.match_time ? `${match.match_time}`.substring(0, 5) : '00:00'
  const isoDateTime = `${dateStr}T${timeStr}:00`

  const displayDate = new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <section
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #030918 0%, #0c1d3d 50%, #040d22 100%)' }}
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-oswald font-black uppercase text-white/[0.03] whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 18vw, 14rem)', letterSpacing: '-0.04em' }}>
          NEXT MATCH
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="font-oswald font-bold text-white uppercase mb-6 tracking-tight"
          style={{ fontSize: 'clamp(2rem, 8vw, 4rem)' }}>
          Next Match
        </h2>

        {/* Competition badge */}
        <div className="inline-block bg-red-600/20 border border-red-600/40 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
          {match.competition_type}
        </div>

        {/* Teams */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mb-3">
          <span className="font-oswald font-bold text-white uppercase tracking-tight text-center"
            style={{ fontSize: 'clamp(1.2rem, 5vw, 2.2rem)' }}>
            {match.home_team}
          </span>
          <span className="font-oswald text-xl sm:text-3xl font-black text-red-600 uppercase shrink-0 bg-red-600/10 border border-red-600/30 px-5 py-1.5 rounded">
            VS
          </span>
          <span className="font-oswald font-bold text-white uppercase tracking-tight text-center"
            style={{ fontSize: 'clamp(1.2rem, 5vw, 2.2rem)' }}>
            {match.away_team}
          </span>
        </div>

        <p className="text-gray-400 text-xs uppercase tracking-[0.15em] mb-2">
          {displayDate}
        </p>
        {match.venue && (
          <p className="text-gray-600 text-xs mb-10 sm:mb-14">{match.venue}</p>
        )}

        {/* Countdown (client component) */}
        <NextMatchCountdown targetISO={isoDateTime} />
      </div>
    </section>
  )
}
