import { db } from '@/lib/db'

interface Match {
  id: number
  home_team: string
  away_team: string
  home_score: number | null
  away_score: number | null
  competition_type: string
  venue: string
  match_date: string
  match_time: string
  status: string
}

async function getSchedule(): Promise<Match[]> {
  try {
    const [rows] = await db.query(
      `SELECT id, home_team, away_team, home_score, away_score,
              competition_type, venue, match_date, match_time, status
       FROM matches
       ORDER BY
         CASE WHEN status = 'scheduled' THEN 0 ELSE 1 END,
         match_date ASC, match_time ASC
       LIMIT 12`
    ) as any
    return rows || []
  } catch { return [] }
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtTime(t: string) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 || 12
  return `${h12}:${m} ${ampm}`
}

export default async function ScheduleSection() {
  const matches = await getSchedule()
  if (!matches.length) return null

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-oswald font-bold text-gray-900 uppercase tracking-tight mb-2"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}>
            Match Schedule
          </h2>
          <p className="text-gray-500 text-sm">FIFA World Cup 2026 fixtures and upcoming matches</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {matches.map(m => {
            const upcoming = m.status === 'scheduled'
            const finished = m.status === 'finished'
            const compShort = m.competition_type.replace('FIFA WC 2026 ', 'WC ').replace('CHAMPIONS_LEAGUE', 'UCL')

            return (
              <div key={m.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Badge */}
                <div className="flex justify-center pt-5 pb-3">
                  <span className={`text-white text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-full ${
                    finished ? 'bg-gray-700' : 'bg-red-600'
                  }`}>
                    {compShort}
                  </span>
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between gap-2 px-5 pb-4">
                  {/* Home */}
                  <div className="flex-1 text-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 mx-auto mb-1 border border-gray-200">
                      {m.home_team.slice(0, 3).toUpperCase()}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-1">{m.home_team}</p>
                  </div>

                  {/* Score / VS */}
                  <div className="text-center px-2 shrink-0">
                    {finished ? (
                      <>
                        <div className="font-oswald text-2xl font-bold text-gray-900">
                          {m.home_score} – {m.away_score}
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">FT</div>
                      </>
                    ) : (
                      <div className="font-oswald text-xl font-bold text-gray-300">vs</div>
                    )}
                  </div>

                  {/* Away */}
                  <div className="flex-1 text-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 mx-auto mb-1 border border-gray-200">
                      {m.away_team.slice(0, 3).toUpperCase()}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-1">{m.away_team}</p>
                  </div>
                </div>

                {/* Venue + Date */}
                <div className="border-t border-gray-100 px-4 py-3 text-center">
                  {m.venue && (
                    <p className="text-gray-600 text-[10px] font-medium truncate mb-0.5">{m.venue}</p>
                  )}
                  <p className="text-gray-400 text-xs">
                    {fmtDate(m.match_date)}
                    {m.match_time ? ` · ${fmtTime(m.match_time)}` : ''}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <p className="text-gray-400 text-xs">Showing upcoming fixtures · Times may vary</p>
        </div>
      </div>
    </section>
  )
}
