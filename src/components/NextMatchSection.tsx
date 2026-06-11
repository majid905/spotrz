'use client'
import { useState, useEffect } from 'react'

const NEXT_MATCH_DATE = new Date('2026-09-27T19:30:00')

function getCountdown(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div
        suppressHydrationWarning
        className="font-oswald font-bold text-red-600 leading-none tabular-nums"
        style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)' }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mt-2 sm:mt-3">{label}</div>
    </div>
  )
}

export default function NextMatchSection() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setCountdown(getCountdown(NEXT_MATCH_DATE))
    const id = setInterval(() => setCountdown(getCountdown(NEXT_MATCH_DATE)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #030918 0%, #0c1d3d 50%, #040d22 100%)' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-oswald font-black uppercase text-white/[0.03] whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 18vw, 14rem)', letterSpacing: '-0.04em' }}>
          NEXT MATCH
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="font-oswald font-bold text-white uppercase mb-8 tracking-tight"
          style={{ fontSize: 'clamp(2rem, 8vw, 4rem)' }}>
          Next Match
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <span className="text-2xl sm:text-3xl">⚽</span>
          <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">Liga Premier</span>
          <span className="text-2xl sm:text-3xl">🏆</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-10 mb-4">
          <span className="font-oswald font-bold text-white uppercase tracking-tight text-center"
            style={{ fontSize: 'clamp(1.1rem, 5vw, 2rem)' }}>
            Sportizai Titans
          </span>
          <span className="font-oswald text-xl sm:text-2xl font-bold text-red-600 uppercase shrink-0 bg-red-600/10 border border-red-600/30 px-4 py-1 rounded">
            VS
          </span>
          <span className="font-oswald font-bold text-white uppercase tracking-tight text-center"
            style={{ fontSize: 'clamp(1.1rem, 5vw, 2rem)' }}>
            Royal Lions FC
          </span>
        </div>
        <p className="text-gray-400 text-xs uppercase tracking-[0.15em] mb-10 sm:mb-14">
          Sunday, 27 September 2026
        </p>
        <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-sm sm:max-w-lg mx-auto">
          <CountUnit value={countdown.days} label="Days" />
          <CountUnit value={countdown.hours} label="Hours" />
          <CountUnit value={countdown.minutes} label="Minutes" />
          <CountUnit value={countdown.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  )
}
