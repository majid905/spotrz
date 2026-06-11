import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [[todayRow]] = await db.query(`SELECT COUNT(*) as cnt FROM visitor_analytics WHERE DATE(created_at)=CURDATE()`) as any
    const [[totalRow]] = await db.query(`SELECT COUNT(*) as cnt FROM visitor_analytics`) as any
    const [[avgRow]] = await db.query(`SELECT ROUND(AVG(duration_seconds)) as v FROM visitor_analytics WHERE duration_seconds>0`) as any
    const [countries] = await db.query(`SELECT country, country_code, COUNT(*) as cnt FROM visitor_analytics GROUP BY country, country_code ORDER BY cnt DESC LIMIT 12`) as any
    const [devices] = await db.query(`SELECT device_type, COUNT(*) as cnt FROM visitor_analytics GROUP BY device_type ORDER BY cnt DESC`) as any
    const [browsers] = await db.query(`SELECT browser, COUNT(*) as cnt FROM visitor_analytics GROUP BY browser ORDER BY cnt DESC LIMIT 6`) as any
    const [pages] = await db.query(`SELECT page_url, COUNT(*) as cnt FROM visitor_analytics GROUP BY page_url ORDER BY cnt DESC LIMIT 10`) as any
    const [weekly] = await db.query(`SELECT DATE(created_at) as day, COUNT(*) as cnt FROM visitor_analytics WHERE created_at>=DATE_SUB(CURDATE(),INTERVAL 6 DAY) GROUP BY DATE(created_at) ORDER BY day`) as any
    const [recent] = await db.query(`SELECT id,country,country_code,city,device_type,browser,os,page_url,referrer,duration_seconds,created_at FROM visitor_analytics ORDER BY created_at DESC LIMIT 30`) as any

    return NextResponse.json({
      today: todayRow.cnt,
      total: totalRow.cnt,
      avgDuration: avgRow.v || 0,
      countries,
      devices,
      browsers,
      pages,
      weekly,
      recent,
    })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
