'use client'
import { useState } from 'react'

type Sport = 'FIFA' | 'BOXING' | 'UFC' | 'NFL'

const SPORTS: Sport[] = ['FIFA', 'BOXING', 'UFC', 'NFL']

const SPORT_ICONS: Record<Sport, string> = {
  FIFA: '⚽',
  BOXING: '🥊',
  UFC: '🥋',
  NFL: '🏈',
}

interface TeamData {
  name: string
  score: number
  points: number
  won: number
  lost: number
  draw: number
  color: string
}

interface MatchData {
  date: string
  time: string
  home: TeamData
  away: TeamData
  competition: string
}

const MOCK_DATA: Record<Sport, MatchData> = {
  FIFA: {
    date: 'SAT, JUNE 7',
    time: '7:30 PM (Local Time)',
    competition: 'Premier League',
    home: { name: 'Royal Thunder FC', score: 2, points: 24, won: 12, lost: 4, draw: 3, color: 'from-yellow-500 to-red-600' },
    away: { name: 'Northern Blaze United', score: 3, points: 20, won: 15, lost: 5, draw: 2, color: 'from-blue-600 to-indigo-800' },
  },
  BOXING: {
    date: 'FRI, JUNE 6',
    time: '9:00 PM (Local Time)',
    competition: 'WBC Heavyweight Championship',
    home: { name: 'Mike "Iron" Johnson', score: 5, points: 0, won: 28, lost: 2, draw: 1, color: 'from-red-700 to-rose-900' },
    away: { name: 'Carlos "El Toro" Ruiz', score: 4, points: 0, won: 25, lost: 4, draw: 2, color: 'from-yellow-600 to-orange-700' },
  },
  UFC: {
    date: 'SAT, JUNE 7',
    time: '10:00 PM (Local Time)',
    competition: 'UFC 305 · Lightweight',
    home: { name: 'Alex "Panther" Stone', score: 2, points: 0, won: 18, lost: 3, draw: 0, color: 'from-gray-600 to-gray-900' },
    away: { name: 'Marcus "Beast" Webb', score: 1, points: 0, won: 20, lost: 2, draw: 1, color: 'from-purple-700 to-indigo-900' },
  },
  NFL: {
    date: 'SUN, JUNE 8',
    time: '4:25 PM (Local Time)',
    competition: 'NFL Regular Season · Week 12',
    home: { name: 'Dallas Cowboys', score: 24, points: 0, won: 8, lost: 3, draw: 1, color: 'from-blue-700 to-blue-900' },
    away: { name: 'Green Bay Packers', score: 17, points: 0, won: 7, lost: 4, draw: 1, color: 'from-green-700 to-green-900' },
  },
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-black/40 rounded p-2 text-center">
      <div className="text-gray-400 text-[9px] sm:text-[10px] uppercase tracking-wider mb-1">{label}</div>
      <div className="text-white font-bold text-sm sm:text-base">{value}</div>
    </div>
  )
}

function TeamCard({ team }: { team: TeamData & { icon: string } }) {
  const stats = [
    ...(team.points > 0 ? [{ label: 'Pts', value: team.points }] : []),
    { label: 'Won', value: team.won },
    { label: 'Lost', value: team.lost },
    { label: 'Draw', value: team.draw },
  ]

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 text-center w-full">
      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 bg-gradient-to-br ${team.color} rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-lg`}>
        {team.icon}
      </div>
      <h3 className="text-white font-bold text-sm md:text-base mb-4 leading-tight">{team.name}</h3>
      {/* 2-col on very small, 4-col on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {stats.slice(0, 4).map(s => <StatBox key={s.label} label={s.label} value={s.value} />)}
      </div>
    </div>
  )
}

export default function LiveScoreSection() {
  const [active, setActive] = useState<Sport>('FIFA')
  const data = MOCK_DATA[active]
  const icon = SPORT_ICONS[active]

  return (
    <section
      id="live-scores"
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020810 0%, #030e07 40%, #020810 100%)' }}
    >
      {/* Background field glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-15"
          style={{ background: 'radial-gradient(ellipse at center bottom, #16a34a 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Sport Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex bg-black/50 border border-white/10 rounded-xl p-1 w-full max-w-xs sm:max-w-sm">
            {SPORTS.map(sport => (
              <button
                key={sport}
                onClick={() => setActive(sport)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold uppercase rounded-lg transition-all min-h-[44px] ${
                  active === sport
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                    : 'text-gray-400 hover:text-white active:text-white'
                }`}
              >
                <span className="text-base leading-none">{SPORT_ICONS[sport]}</span>
                <span className="hidden xs:inline tracking-widest">{sport}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Competition + Live badge */}
        <div className="flex flex-col items-center gap-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-600/50 text-red-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Live
          </div>
          <p className="text-gray-500 text-xs uppercase tracking-widest">{data.competition}</p>
        </div>

        {/* Score layout — vertical on mobile, horizontal on md+ */}
        <div className="flex flex-col md:flex-row items-center gap-4">

          {/* Home Team */}
          <TeamCard team={{ ...data.home, icon }} />

          {/* Center Score */}
          <div className="flex-shrink-0 w-full md:w-52 text-center order-first md:order-none">
            {/* Date/Time */}
            <div className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 mb-4">
              <div className="text-white text-xs font-bold uppercase tracking-widest">{data.date}</div>
              <div className="text-gray-400 text-xs mt-0.5">{data.time}</div>
            </div>

            {/* Score */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="font-oswald font-bold text-white leading-none" style={{ fontSize: 'clamp(3.5rem, 15vw, 6rem)' }}>
                {data.home.score}
              </span>
              <span className="text-gray-600 text-2xl font-light">—</span>
              <span className="font-oswald font-bold text-white leading-none" style={{ fontSize: 'clamp(3.5rem, 15vw, 6rem)' }}>
                {data.away.score}
              </span>
            </div>

            {/* Watch button */}
            <button className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-widest py-4 rounded-full transition-colors shadow-lg shadow-red-900/30 min-h-[48px]">
              Watch Live Now
            </button>
          </div>

          {/* Away Team */}
          <TeamCard team={{ ...data.away, icon }} />
        </div>
      </div>
    </section>
  )
}
