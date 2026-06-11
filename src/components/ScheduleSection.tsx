const matches = [
  { type: 'CUP', typeColor: 'bg-red-600', homeEmoji: '🏅', awayEmoji: '🏆', homeScore: 2, awayScore: 1, venue: 'Central Ford', date: 'May 2, 2026', time: '6:45 PM', status: 'finished' as const },
  { type: 'LEAGUE', typeColor: 'bg-gray-800', homeEmoji: '⚽', awayEmoji: '🥇', homeScore: null, awayScore: null, venue: 'Florida Kingdom', date: 'Jun 14, 2026', time: '7:40 PM', status: 'upcoming' as const },
  { type: 'FRIENDLY', typeColor: 'bg-gray-800', homeEmoji: '⚽', awayEmoji: '🏅', homeScore: null, awayScore: null, venue: 'Victory Park', date: 'Aug 13, 2026', time: '7:40 PM', status: 'upcoming' as const },
]

export default function ScheduleSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-oswald font-bold text-gray-900 uppercase tracking-tight mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}>
            Match Schedule
          </h2>
          <p className="text-gray-500 text-sm">Upcoming and recent fixtures across all competitions</p>
        </div>

        {/* Match Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {matches.map((m, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Type badge */}
              <div className="flex justify-center pt-5 pb-3">
                <span className={`${m.typeColor} text-white text-xs font-bold uppercase tracking-widest px-5 py-1.5`}>
                  {m.type}
                </span>
              </div>

              {/* Teams + Score */}
              <div className="flex items-center justify-center gap-5 pb-4 px-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl border border-gray-200">
                  {m.homeEmoji}
                </div>
                <div className="text-center">
                  {m.status === 'finished' ? (
                    <div className="font-oswald text-2xl font-bold text-gray-900">
                      {m.homeScore} - {m.awayScore}
                    </div>
                  ) : (
                    <div className="font-oswald text-xl font-bold text-gray-300">vs</div>
                  )}
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl border border-gray-200">
                  {m.awayEmoji}
                </div>
              </div>

              {/* Venue + Date */}
              <div className="border-t border-gray-100 px-4 py-4 text-center">
                <p className="text-gray-700 text-xs font-bold uppercase tracking-widest">{m.venue}</p>
                <p className="text-gray-400 text-xs mt-1">{m.date} · {m.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All button */}
        <div className="text-center mt-8 sm:mt-10">
          <button className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-10 sm:px-12 py-4 min-h-[48px] transition-colors w-full sm:w-auto">
            View All Matches
          </button>
        </div>
      </div>
    </section>
  )
}
