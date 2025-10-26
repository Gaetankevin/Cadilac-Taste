import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../generated/prisma/index.js'
import { isAdminFromCookie } from '../../../../lib/adminAuth'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const list = await prisma.menuItem.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json(list)
}

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const priceStr = (typeof body.price === 'number') ? body.price.toFixed(2) : String(body.price)
  const created = await prisma.menuItem.create({ data: {
    name: body.name,
    description: body.description ?? null,
    price: priceStr,
    imageUrl: body.imageUrl ?? null,
    isAvailable: body.isAvailable ?? true,
    categoryId: Number(body.categoryId)
  } })
  return NextResponse.json(created)
}

export async function PATCH(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const data: Record<string, unknown> = {}
  if (body.name !== undefined) data.name = body.name
  if (body.description !== undefined) data.description = body.description
  if (body.price !== undefined) data.price = (typeof body.price === 'number') ? body.price.toFixed(2) : String(body.price)
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl
  if (body.isAvailable !== undefined) data.isAvailable = body.isAvailable
  if (body.categoryId !== undefined) data.categoryId = Number(body.categoryId)
  const updated = await prisma.menuItem.update({ where: { id: Number(body.id) }, data })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  const cookie = req.headers.get('cookie')
  if (!isAdminFromCookie(cookie)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const del = await prisma.menuItem.delete({ where: { id: Number(body.id) } })
  return NextResponse.json(del)
}
