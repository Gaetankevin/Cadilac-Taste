import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../generated/prisma'
import { isAdminFromCookie } from '../../../../lib/adminAuth'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const list = await prisma.order.findMany({ orderBy: { id: 'desc' }, include: { orderItems: true } })
  return NextResponse.json(list)
}

export async function PATCH(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const data: Record<string, unknown> = {}
  if (body.status) data.status = body.status
  if (body.total !== undefined) data.total = (typeof body.total === 'number') ? body.total.toFixed(2) : String(body.total)
  const updated = await prisma.order.update({ where: { id: Number(body.id) }, data })
  return NextResponse.json(updated)
}
