import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { session_id, page_url, duration } = body
    if (!session_id || !page_url || typeof duration !== 'number') return NextResponse.json({ ok: false })
    await db.query(
      'UPDATE visitor_analytics SET duration_seconds = ? WHERE session_id = ? AND page_url = ?',
      [duration, session_id, page_url]
    )
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
