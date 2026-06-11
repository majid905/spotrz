import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM site_settings LIMIT 1') as any
    return NextResponse.json(rows?.[0] || {})
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { site_title, meta_description, favicon_url, logo_url, site_name,
            social_facebook, social_twitter, social_instagram, social_youtube,
            contact_email, contact_phone, contact_address } = body
    await db.query(
      `UPDATE site_settings SET site_title=?, meta_description=?, favicon_url=?, logo_url=?,
       site_name=?, social_facebook=?, social_twitter=?, social_instagram=?, social_youtube=?,
       contact_email=?, contact_phone=?, contact_address=? WHERE id=1`,
      [site_title, meta_description, favicon_url, logo_url, site_name,
       social_facebook, social_twitter, social_instagram, social_youtube,
       contact_email, contact_phone, contact_address]
    )
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
