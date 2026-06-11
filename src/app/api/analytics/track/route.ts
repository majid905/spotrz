import { NextResponse, type NextRequest } from 'next/server'
import { db } from '@/lib/db'

function getDevice(ua: string) {
  if (/tablet|ipad|kindle|playbook/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone|ipod|blackberry|phone/i.test(ua)) return 'mobile'
  return 'desktop'
}

function getBrowser(ua: string) {
  if (/edg\//i.test(ua)) return 'Edge'
  if (/opr\/|opera/i.test(ua)) return 'Opera'
  if (/chrome/i.test(ua)) return 'Chrome'
  if (/firefox/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua)) return 'Safari'
  return 'Other'
}

function getOS(ua: string) {
  if (/windows phone/i.test(ua)) return 'Windows Phone'
  if (/android/i.test(ua)) return 'Android'
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS'
  if (/windows/i.test(ua)) return 'Windows'
  if (/mac os/i.test(ua)) return 'macOS'
  if (/linux/i.test(ua)) return 'Linux'
  return 'Other'
}

async function getGeo(ip: string) {
  const local = ['127.0.0.1','::1','localhost']
  if (!ip || local.includes(ip) || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return { country: 'Local', country_code: '--', city: 'Localhost' }
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`, {
      signal: AbortSignal.timeout(3000)
    })
    const d = await res.json()
    if (d.status === 'success') return { country: d.country, country_code: d.countryCode, city: d.city || '' }
  } catch {}
  return { country: 'Unknown', country_code: '??', city: '' }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { session_id, page_url, referrer } = body
    if (!session_id || !page_url) return NextResponse.json({ ok: false })

    const ua = req.headers.get('user-agent') || ''
    // Skip bots
    if (/bot|crawl|spider|slurp|googlebot|bingbot/i.test(ua)) return NextResponse.json({ ok: false })

    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : (req.headers.get('x-real-ip') || '127.0.0.1')
    const geo = await getGeo(ip)

    await db.query(
      `INSERT IGNORE INTO visitor_analytics
       (session_id, ip_address, country, country_code, city, device_type, browser, os, page_url, referrer)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [session_id, ip, geo.country, geo.country_code, geo.city,
       getDevice(ua), getBrowser(ua), getOS(ua), page_url, referrer || '']
    )

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
