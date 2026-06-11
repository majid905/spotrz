import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

// Visit /api/setup ONCE to create the first admin user
// After creation, this route returns 403
export async function GET() {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM users')
    const count = (rows as any[])[0].count
    if (count > 0) {
      return NextResponse.json({ message: 'Setup already done. Admin exists.' }, { status: 403 })
    }
    const hash = await bcrypt.hash('admin123', 10)
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Admin', 'admin@sportz.com', hash, 'admin']
    )
    return NextResponse.json({
      success: true,
      message: 'Admin created!',
      credentials: { email: 'admin@sportz.com', password: 'admin123' },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
