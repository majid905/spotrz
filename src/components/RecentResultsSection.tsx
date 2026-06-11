'use client'
import { useState } from 'react'

const matches = [
  { id: 1, home: '⚽', away: '🏆', homeName: 'Sportizai Titans', awayName: 'Royal Lions FC', homeScore: 4, awayScore: 3, competition: 'Champions Cup', date: 'Fri, 26 Mar', detail: { event: 'Champions Cup Semi Finals', dateStr: 'FRIDAY, 26 MARCH 2026', homeName: 'Sportizai Titans', awayName: 'Royal Lions FC', homeScorers: ["Darlene Robertson (4', 68')", "Marvin McKinney (38')", "Leslie Alexander (90+1')"], awayScorers: ["Brooklyn Simmons (12')", "Courtney Henry (56')", "Cristiano Ronaldo (88')"] } },
  { id: 2, home: '⚽', away: '🏅', homeName: 'Sportizai Titans', awayName: 'Summit Wolves', homeScore: 2, awayScore: 3, competition: 'League', date: 'Mon, 22 Mar', detail: { event: 'League Match Week 28', dateStr: 'MONDAY, 22 MARCH 2026', homeName: 'Sportizai Titans', awayName: 'Summit Wolves', homeScorers: ["Tom Baker (11')", "James Hunt (77')"], awayScorers: ["Leo Messi (34')", "Hugo Silva (56')", "Pedro Gomez (88')"] } },
  { id: 3, home: '🥇', away: '⚽', homeName: 'Iron Gate FC', awayName: 'Sportizai Titans', homeScore: 1, awayScore: 2, competition: 'Cup', date: 'Thu, 18 Mar', detail: { event: 'Cup Round of 16', dateStr: 'THURSDAY, 18 MARCH 2026', homeName: 'Iron Gate FC', awayName: 'Sportizai Titans', homeScorers: ["Ricky Martin (45')"], awayScorers: ["Marvin McKinney (20')", "Leslie Alexander (60')"] } },
  { id: 4, home: '⚽', away: '🏆', homeName: 'Sportizai Titans', awayName: 'Blue Storm FC', homeScore: 3, awayScore: 2, competition: 'League', date: 'Sun, 14 Mar', detail: { event: 'League Match Week 27', dateStr: 'SUNDAY, 14 MARCH 2026', homeName: 'Sportizai Titans', awayName: 'Blue Storm FC', homeScorers: ["Darlene Robertson (5')", "Tom Baker (30', 72')"], awayScorers: ["Jose Rivera (44')", "Marco Polo (80')"] } },
  { id: 5, home: '⚽', away: '🏅', homeName: 'Sportizai Titans', awayName: 'River Plate XI', homeScore: 5, awayScore: 1, competition: 'Friendly', date: 'Wed, 10 Mar', detail: { event: 'International Friendly', dateStr: 'WEDNESDAY, 10 MARCH 2026', homeName: 'Sportizai Titans', awayName: 'River Plate XI', homeScorers: ['Multiple scorers'], awayScorers: ["Carlos Vela (55')"] } },
  { id: 6, home: '🏆', away: '⚽', homeName: 'Northern Blaze', awayName: 'Sportizai Titans', homeScore: 0, awayScore: 2, competition: 'League', date: 'Sat, 6 Mar', detail: { event: 'League Match Week 26', dateStr: 'SATURDAY, 6 MARCH 2026', homeName: 'Northern Blaze', awayName: 'Sportizai Titans', homeScorers: [], awayScorers: ["Darlene Robertson (34')", "Marvin McKinney (89')"] } },
]

export default function RecentResultsSection() {
  const [selected, setSelected] = useState(matches[0])

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">

          {/* Left — Heading + List */}
          <div className="flex flex-col">
            <h2
              className="font-oswald font-bold text-gray-900 uppercase leading-tight mb-4 sm:mb-5 tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}
            >
              Latest Results of<br />Our Recent Match
            </h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Apart from our commitment to both personal and team growth, we provide top-notch coaching and facilities.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
              <button className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-widest px-5 sm:px-6 py-3.5 min-h-[44px] transition-colors">
                View All Results
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-900 active:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-widest px-5 sm:px-6 py-3.5 min-h-[44px] transition-colors">
                Book My Ticket
              </button>
            </div>

            {/* Match List */}
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
                    {/* Home team */}
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-base shrink-0">{m.home}</span>
                      <span className={`text-xs font-semibold truncate ${active ? 'text-gray-200' : 'text-gray-700'}`}>
                        {m.homeName}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="px-2 sm:px-3 text-center">
                      <span className={`font-oswald font-bold text-sm sm:text-base ${active ? 'text-white' : 'text-gray-900'}`}>
                        {m.homeScore}–{m.awayScore}
                      </span>
                      <div className={`text-[9px] font-semibold uppercase leading-none mt-0.5 hidden sm:block ${active ? 'text-gray-500' : 'text-gray-400'}`}>
                        {m.competition}
                      </div>
                    </div>

                    {/* Away team */}
                    <div className="flex items-center gap-1.5 min-w-0 justify-end">
                      <span className={`text-xs font-semibold truncate text-right ${active ? 'text-gray-200' : 'text-gray-700'}`}>
                        {m.awayName}
                      </span>
                      <span className="text-base shrink-0">{m.away}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right — Match Detail Card */}
          <div className="bg-gray-900 rounded-xl p-5 sm:p-8 text-white md:sticky md:top-20">
            {/* Event header */}
            <div className="text-center mb-5 sm:mb-6">
              <h3 className="font-oswald text-base sm:text-xl font-bold uppercase tracking-wider text-white mb-1">
                {selected.detail.event}
              </h3>
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest">
                {selected.detail.dateStr}
              </p>
            </div>

            {/* Teams + Score */}
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              {/* Home */}
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-orange-700 rounded-full flex items-center justify-center text-xl sm:text-3xl">
                  {selected.home}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase text-center leading-tight line-clamp-2 px-1">
                  {selected.detail.homeName}
                </span>
              </div>

              {/* Score */}
              <div className="text-center shrink-0 px-2">
                <div className="font-oswald font-bold text-white leading-none" style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)' }}>
                  {selected.homeScore}–{selected.awayScore}
                </div>
                <div className="text-gray-600 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">Full Time</div>
              </div>

              {/* Away */}
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full flex items-center justify-center text-xl sm:text-3xl">
                  {selected.away}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase text-center leading-tight line-clamp-2 px-1">
                  {selected.detail.awayName}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 mb-5" />

            {/* Scorers */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  {selected.detail.homeName}
                </h4>
                {selected.detail.homeScorers.length > 0
                  ? selected.detail.homeScorers.map((s, i) => (
                    <div key={i} className="flex items-start gap-1.5 mb-2">
                      <span className="text-red-500 text-[9px] mt-0.5 shrink-0">⚽</span>
                      <p className="text-gray-300 text-[10px] sm:text-xs leading-snug">{s}</p>
                    </div>
                  ))
                  : <p className="text-gray-600 text-xs italic">No goals</p>
                }
              </div>
              <div>
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  {selected.detail.awayName}
                </h4>
                {selected.detail.awayScorers.length > 0
                  ? selected.detail.awayScorers.map((s, i) => (
                    <div key={i} className="flex items-start gap-1.5 mb-2">
                      <span className="text-blue-400 text-[9px] mt-0.5 shrink-0">⚽</span>
                      <p className="text-gray-300 text-[10px] sm:text-xs leading-snug">{s}</p>
                    </div>
                  ))
                  : <p className="text-gray-600 text-xs italic">No goals</p>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
