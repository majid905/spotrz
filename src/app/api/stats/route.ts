import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [[m]] = await db.query('SELECT COUNT(*) as c FROM matches') as any
    const [[l]] = await db.query("SELECT COUNT(*) as c FROM live_scores WHERE status='live'") as any
    const [[b]] = await db.query('SELECT COUNT(*) as c FROM blog_posts') as any
    const [[f]] = await db.query('SELECT COUNT(*) as c FROM faq') as any
    const [[u]] = await db.query('SELECT COUNT(*) as c FROM users') as any
    const [recent] = await db.query(
      'SELECT id,home_team,away_team,home_score,away_score,competition_type,match_date,status FROM matches ORDER BY created_at DESC LIMIT 5'
    )
    return NextResponse.json({ matches: m.c, live: l.c, blogs: b.c, faqs: f.c, users: u.c, recent })
  } catch (e: any) {
    return NextResponse.json({ matches:0,live:0,blogs:0,faqs:0,users:0,recent:[], error: e.message })
  }
}
