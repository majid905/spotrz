import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const b = await req.json()
    await db.query(
      `UPDATE live_scores SET sport=?,home_team=?,away_team=?,home_score=?,away_score=?,home_won=?,home_lost=?,home_draw=?,away_won=?,away_lost=?,away_draw=?,competition=?,match_date=?,match_time=?,status=? WHERE id=?`,
      [b.sport,b.home_team,b.away_team,b.home_score,b.away_score,b.home_won,b.home_lost,b.home_draw,b.away_won,b.away_lost,b.away_draw,b.competition,b.match_date,b.match_time,b.status, params.id]
    )
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await db.query('DELETE FROM live_scores WHERE id=?', [params.id])
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
