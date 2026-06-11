import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const category = searchParams.get('category') || ''
    const search = searchParams.get('search') || ''
    const featured = searchParams.get('featured') || ''
    const offset = (page - 1) * limit

    let where = 'WHERE 1=1'
    const params: any[] = []

    if (category && category !== 'All') {
      where += ' AND category = ?'
      params.push(category)
    }
    if (search) {
      where += ' AND (title LIKE ? OR excerpt LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    if (featured === '1') {
      where += ' AND is_featured = 1'
    }

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total FROM blog_posts ${where}`, params
    ) as any

    const [rows] = await db.query(
      `SELECT id, title, slug, excerpt, category, image_url, author, read_time, views, is_featured, created_at
       FROM blog_posts ${where}
       ORDER BY is_featured DESC, created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    )

    return NextResponse.json({
      posts: rows,
      total,
      page,
      pages: Math.ceil(total / limit)
    })
  } catch (e: any) {
    return NextResponse.json({ posts: [], total: 0, page: 1, pages: 0 })
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json()
    const [result] = await db.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, author, read_time, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [b.title, b.slug || '', b.excerpt || '', b.content || '',
       b.category || '', b.image_url || '', b.author || 'Sports Editor',
       b.read_time || 5, b.is_featured ? 1 : 0]
    )
    return NextResponse.json({ id: (result as any).insertId })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
