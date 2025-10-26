import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../generated/prisma'
import { isAdminFromCookie } from '../../../../lib/adminAuth'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const list = await prisma.restaurantTable.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json(list)
}

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const created = await prisma.restaurantTable.create({ data: {
    number: Number(body.number),
    isAvailable: body.isAvailable ?? true,
  } })
  return NextResponse.json(created)
}

export async function PATCH(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const updated = await prisma.restaurantTable.update({ where: { id: Number(body.id) }, data: {
    number: body.number !== undefined ? Number(body.number) : undefined,
    isAvailable: body.isAvailable,
  } })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const del = await prisma.restaurantTable.delete({ where: { id: Number(body.id) } })
  return NextResponse.json(del)
}
