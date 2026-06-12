'use client'
import { useState, useEffect } from 'react'

function getCountdown(iso: string) {
  const diff = new Date(iso).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div suppressHydrationWarning
        className="font-oswald font-bold text-red-600 leading-none tabular-nums"
        style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)' }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mt-2 sm:mt-3">{label}</div>
    </div>
  )
}

export default function NextMatchCountdown({ targetISO }: { targetISO: string }) {
  const [cd, setCd] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setCd(getCountdown(targetISO))
    const id = setInterval(() => setCd(getCountdown(targetISO)), 1000)
    return () => clearInterval(id)
  }, [targetISO])

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-sm sm:max-w-lg mx-auto">
      <Unit value={cd.days} label="Days" />
      <Unit value={cd.hours} label="Hours" />
      <Unit value={cd.minutes} label="Minutes" />
      <Unit value={cd.seconds} label="Seconds" />
    </div>
  )
}
