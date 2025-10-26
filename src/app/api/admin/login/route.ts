import { NextRequest, NextResponse } from 'next/server'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body || {}
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin not configured' }, { status: 500 })
    }
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const res = NextResponse.json({ ok: true })
      // set httpOnly cookie
      res.headers.set('Set-Cookie', `admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24}`)
      return res
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
