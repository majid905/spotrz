import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where = all ? '' : 'WHERE is_active = 1'
    const [rows] = await db.query(
      `SELECT id, title, slug, description, video_url, thumbnail, duration, category, tags,
              competition, match_date, views, is_active, sort_order, created_at
       FROM highlights ${where}
       ORDER BY sort_order ASC, created_at DESC
       ${all ? '' : `LIMIT ${limit}`}`
    )
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json()
    const slug = b.slug || b.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 200)
    const [result] = await db.query(
      `INSERT INTO highlights
        (title, slug, description, video_url, thumbnail, duration, category, tags, competition, match_date, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [b.title, slug, b.description || '', b.video_url || '', b.thumbnail || '',
       b.duration || '', b.category || 'Football', b.tags || '',
       b.competition || '', b.match_date || null,
       b.is_active !== false ? 1 : 0, b.sort_order || 0]
    )
    return NextResponse.json({ id: (result as any).insertId, slug })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
