import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    await db.query('INSERT IGNORE INTO newsletter_subscribers (email) VALUES (?)', [email])
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC') as any
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
