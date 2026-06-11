import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const b = await req.json()
    await db.query(
      `UPDATE matches SET home_team=?,away_team=?,home_score=?,away_score=?,competition_type=?,venue=?,match_date=?,match_time=?,status=? WHERE id=?`,
      [b.home_team,b.away_team,b.home_score||null,b.away_score||null,b.competition_type,b.venue,b.match_date,b.match_time||null,b.status,params.id]
    )
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await db.query('DELETE FROM matches WHERE id=?', [params.id])
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
