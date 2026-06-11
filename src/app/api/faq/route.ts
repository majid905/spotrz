import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM faq WHERE is_active=1 ORDER BY sort_order')
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json()
    const [result] = await db.query(
      `INSERT INTO faq (question,answer,sort_order,is_active) VALUES (?,?,?,1)`,
      [b.question,b.answer,b.sort_order||0]
    )
    return NextResponse.json({ id: (result as any).insertId })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
