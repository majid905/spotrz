import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const all = url.searchParams.get('all') === '1'
    const query = all
      ? 'SELECT * FROM live_streams ORDER BY sort_order ASC, created_at DESC'
      : 'SELECT * FROM live_streams WHERE is_active=1 ORDER BY sort_order ASC, created_at DESC'
    const [rows] = await db.query(query) as any
    return NextResponse.json(rows)
  } catch(e) {
    console.error('live-streams GET error:', e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json()
    const [r] = await db.query(
      `INSERT INTO live_streams (title,team1_name,team1_logo,team2_name,team2_logo,video_url,thumbnail,competition,score1,score2,stream_status,viewers,match_date,match_time,is_active,sort_order)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [b.title,b.team1_name,b.team1_logo||'',b.team2_name,b.team2_logo||'',b.video_url,b.thumbnail||'',
       b.competition||'',b.score1||'0',b.score2||'0',b.stream_status||'LIVE',b.viewers||0,
       b.match_date||null,b.match_time||null,b.is_active??1,b.sort_order||0]
    ) as any
    return NextResponse.json({ ok: true, id: r.insertId })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
