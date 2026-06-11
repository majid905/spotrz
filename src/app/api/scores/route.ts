import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM live_scores ORDER BY sport, id')
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json()
    const [result] = await db.query(
      `INSERT INTO live_scores (sport,home_team,away_team,home_score,away_score,home_won,home_lost,home_draw,away_won,away_lost,away_draw,competition,match_date,match_time,status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [b.sport,b.home_team,b.away_team,b.home_score||0,b.away_score||0,b.home_won||0,b.home_lost||0,b.home_draw||0,b.away_won||0,b.away_lost||0,b.away_draw||0,b.competition||'',b.match_date||null,b.match_time||null,b.status||'live']
    )
    return NextResponse.json({ id: (result as any).insertId })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
