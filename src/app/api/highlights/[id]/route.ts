import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const isSlug = isNaN(Number(params.id))
    const field = isSlug ? 'slug' : 'id'
    const [rows] = await db.query(
      `SELECT * FROM highlights WHERE ${field} = ? LIMIT 1`, [params.id]
    ) as any
    if (!rows?.[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    await db.query('UPDATE highlights SET views = views + 1 WHERE id = ?', [rows[0].id])
    return NextResponse.json(rows[0])
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const b = await req.json()
    const slug = b.slug || b.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 200)
    await db.query(
      `UPDATE highlights SET
        title=?, slug=?, description=?, video_url=?, thumbnail=?, duration=?,
        category=?, tags=?, competition=?, match_date=?, is_active=?, sort_order=?
       WHERE id=?`,
      [b.title, slug, b.description || '', b.video_url || '', b.thumbnail || '',
       b.duration || '', b.category || 'Football', b.tags || '',
       b.competition || '', b.match_date || null,
       b.is_active ? 1 : 0, b.sort_order || 0, params.id]
    )
    return NextResponse.json({ success: true, slug })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await db.query('DELETE FROM highlights WHERE id=?', [params.id])
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
