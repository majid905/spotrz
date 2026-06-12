'use client'
import { useState } from 'react'

interface Match {
  id: number
  home_team: string
  away_team: string
  home_score: number
  away_score: number
  competition_type: string
  venue: string
  match_date: string
  match_time: string
}

export default function RecentResultsClient({ matches }: { matches: Match[] }) {
  const [selected, setSelected] = useState(matches[0])

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

  const homeWon = selected.home_score > selected.away_score
  const awayWon = selected.away_score > selected.home_score
  const isDraw = selected.home_score === selected.away_score

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">

          {/* Left — List */}
          <div className="flex flex-col">
            <h2 className="font-oswald font-bold text-gray-900 uppercase leading-tight mb-4 tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}>
              Latest Results of<br />Our Recent Match
            </h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              The most recent FIFA World Cup 2026 and international match results. Click any result to see details.
            </p>

            {/* Match list */}
            <div className="space-y-1.5">
              {matches.map(m => {
                const active = selected.id === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className={`w-full grid items-center px-3 sm:px-4 py-3 rounded-lg transition-all text-left min-h-[52px] active:opacity-80 ${
                      active ? 'bg-gray-900' : 'bg-white hover:bg-gray-100'
                    }`}
                    style={{ gridTemplateColumns: '1fr auto 1fr' }}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`text-xs font-semibold truncate ${active ? 'text-gray-200' : 'text-gray-700'}`}>
                        {m.home_team}
                      </span>
                    </div>
                    <div className="px-2 sm:px-3 text-center">
                      <span className={`font-oswald font-bold text-sm sm:text-base ${active ? 'text-white' : 'text-gray-900'}`}>
                        {m.home_score ?? '–'}–{m.away_score ?? '–'}
                      </span>
                      <div className={`text-[9px] font-semibold uppercase leading-none mt-0.5 hidden sm:block truncate max-w-[80px] ${active ? 'text-gray-500' : 'text-gray-400'}`}>
                        {m.competition_type.replace('FIFA WC 2026 ', 'WC ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0 justify-end">
                      <span className={`text-xs font-semibold truncate text-right ${active ? 'text-gray-200' : 'text-gray-700'}`}>
                        {m.away_team}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right — Detail Card */}
          <div className="bg-gray-900 rounded-xl p-5 sm:p-8 text-white md:sticky md:top-20">
            <div className="text-center mb-5">
              <h3 className="font-oswald text-base sm:text-lg font-bold uppercase tracking-wider text-white mb-1">
                {selected.competition_type}
              </h3>
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest">
                {fmtDate(selected.match_date)}
              </p>
              {selected.venue && (
                <p className="text-gray-600 text-[10px] mt-1">{selected.venue}</p>
              )}
            </div>

            {/* Teams + Score */}
            <div className="flex items-center justify-between gap-3 mb-6">
              {/* Home */}
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg font-bold ${homeWon ? 'bg-red-600' : 'bg-white/10'}`}>
                  {selected.home_team.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase text-center leading-tight line-clamp-2">
                  {selected.home_team}
                </span>
              </div>

              {/* Score */}
              <div className="text-center shrink-0 px-2">
                <div className="font-oswald font-bold text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
                  {selected.home_score ?? '?'}–{selected.away_score ?? '?'}
                </div>
                <div className={`text-[10px] uppercase tracking-widest mt-1 font-bold ${isDraw ? 'text-yellow-500' : homeWon ? 'text-green-500' : 'text-red-500'}`}>
                  {isDraw ? 'Draw' : homeWon ? `${selected.home_team} Win` : `${selected.away_team} Win`}
                </div>
                <div className="text-gray-600 text-[9px] uppercase tracking-widest mt-0.5">Full Time</div>
              </div>

              {/* Away */}
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg font-bold ${awayWon ? 'bg-blue-600' : 'bg-white/10'}`}>
                  {selected.away_team.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase text-center leading-tight line-clamp-2">
                  {selected.away_team}
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 text-center">
              <p className="text-gray-600 text-xs">
                {selected.match_time ? `Kick-off: ${selected.match_time.substring(0,5)}` : ''} · {selected.venue || ''}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
