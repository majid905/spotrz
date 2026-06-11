import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const [rows] = await db.query('SELECT * FROM live_streams WHERE id=?', [params.id]) as any
    if (!rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const b = await req.json()
    await db.query(
      `UPDATE live_streams SET title=?,team1_name=?,team1_logo=?,team2_name=?,team2_logo=?,
       video_url=?,thumbnail=?,competition=?,score1=?,score2=?,stream_status=?,viewers=?,
       match_date=?,match_time=?,is_active=?,sort_order=? WHERE id=?`,
      [b.title,b.team1_name,b.team1_logo||'',b.team2_name,b.team2_logo||'',b.video_url,
       b.thumbnail||'',b.competition||'',b.score1||'0',b.score2||'0',b.stream_status||'LIVE',
       b.viewers||0,b.match_date||null,b.match_time||null,b.is_active??1,b.sort_order||0,params.id]
    )
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await db.query('DELETE FROM live_streams WHERE id=?', [params.id])
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
