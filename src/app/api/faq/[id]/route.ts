import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const b = await req.json()
    await db.query(
      `UPDATE faq SET question=?,answer=?,sort_order=?,is_active=? WHERE id=?`,
      [b.question,b.answer,b.sort_order||0,b.is_active?1:0,params.id]
    )
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await db.query('DELETE FROM faq WHERE id=?', [params.id])
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
