import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM matches ORDER BY match_date DESC')
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json()
    const [result] = await db.query(
      `INSERT INTO matches (home_team,away_team,home_score,away_score,competition_type,venue,match_date,match_time,status) VALUES (?,?,?,?,?,?,?,?,?)`,
      [b.home_team,b.away_team,b.home_score||null,b.away_score||null,b.competition_type||'LEAGUE',b.venue||'',b.match_date,b.match_time||null,b.status||'scheduled']
    )
    return NextResponse.json({ id: (result as any).insertId })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
