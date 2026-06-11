import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const isSlug = isNaN(Number(params.id))
    const field = isSlug ? 'slug' : 'id'
    const [rows] = await db.query(
      `SELECT * FROM blog_posts WHERE ${field} = ? LIMIT 1`, [params.id]
    ) as any
    if (!rows?.[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    await db.query('UPDATE blog_posts SET views = views + 1 WHERE id = ?', [rows[0].id])
    return NextResponse.json(rows[0])
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const b = await req.json()
    await db.query(
      `UPDATE blog_posts SET title=?,slug=?,excerpt=?,content=?,category=?,image_url=?,author=?,read_time=?,is_featured=? WHERE id=?`,
      [b.title, b.slug || '', b.excerpt, b.content, b.category,
       b.image_url, b.author || 'Sports Editor', b.read_time || 5,
       b.is_featured ? 1 : 0, params.id]
    )
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await db.query('DELETE FROM blog_posts WHERE id=?', [params.id])
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
