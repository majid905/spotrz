'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function genSessionId() {
  return 'v' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return

    let sid = sessionStorage.getItem('_sportz_sid')
    if (!sid) { sid = genSessionId(); sessionStorage.setItem('_sportz_sid', sid) }

    const key = sid + '|' + pathname
    const startTime = Date.now()

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: key, page_url: pathname, referrer: document.referrer }),
    }).catch(() => {})

    const sendDuration = () => {
      const duration = Math.floor((Date.now() - startTime) / 1000)
      if (duration < 1) return
      const blob = new Blob(
        [JSON.stringify({ session_id: key, page_url: pathname, duration })],
        { type: 'application/json' }
      )
      navigator.sendBeacon('/api/analytics/duration', blob)
    }

    window.addEventListener('beforeunload', sendDuration)
    return () => window.removeEventListener('beforeunload', sendDuration)
  }, [pathname])

  return null
}
