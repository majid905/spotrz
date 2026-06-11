import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS highlights (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) NULL,
        description TEXT,
        video_url VARCHAR(1000),
        thumbnail VARCHAR(1000),
        duration VARCHAR(20) DEFAULT '',
        category VARCHAR(200) DEFAULT 'Football',
        tags VARCHAR(500) DEFAULT '',
        competition VARCHAR(200) DEFAULT '',
        match_date DATE NULL,
        views INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await db.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_highlights_slug ON highlights (slug(191))
    `)
    return NextResponse.json({ ok: true, message: 'highlights table created' })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
