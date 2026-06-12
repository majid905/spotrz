import { NextResponse, type NextRequest } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json()
    if (!session_id) return NextResponse.json({ ok: false })
    await db.query(
      `UPDATE visitor_analytics SET last_seen = NOW() WHERE session_id = ? ORDER BY id DESC LIMIT 1`,
      [session_id]
    )
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
