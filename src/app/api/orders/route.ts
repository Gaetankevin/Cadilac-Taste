import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tableNumber, items } = body
    if (!tableNumber || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 })
    }

    // compute total and create order + items in transaction
  type ItemPayload = { menuItemId: number; quantity: number; price?: number | string }
  const total = items.reduce((s: number, it: ItemPayload) => s + (Number(it.price || 0) * Number(it.quantity || 0)), 0)

  const created = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({ data: {
        tableNumber: Number(tableNumber),
        total: String(total.toFixed ? total.toFixed(2) : total),
      } })

      for (const it of items as ItemPayload[]) {
        await tx.orderItem.create({ data: {
          orderId: order.id,
          menuItemId: Number(it.menuItemId),
          quantity: Number(it.quantity),
          subtotal: String((Number(it.price) * Number(it.quantity)).toFixed(2)),
        } })
      }

      return order
    })

    return NextResponse.json({ ok: true, order: created })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
