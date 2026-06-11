import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM hero_section WHERE is_active = 1 ORDER BY id DESC LIMIT 1')
    return NextResponse.json((rows as any[])[0] || null)
  } catch {
    return NextResponse.json(null)
  }
}

export async function PUT(req: Request) {
  try {
    const { title, description, button_text, button_link, image_url } = await req.json()
    await db.query(
      'UPDATE hero_section SET title=?, description=?, button_text=?, button_link=?, image_url=? WHERE id=1',
      [title, description, button_text, button_link, image_url]
    )
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
