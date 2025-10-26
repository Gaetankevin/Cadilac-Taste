import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../generated/prisma/index.js'

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

    // The Order.tableNumber field is a foreign key to RestaurantTable.id in Prisma schema.
    // The client sends the human-facing table "number". Resolve the table id first.
    const table = await prisma.restaurantTable.findFirst({ where: { number: Number(tableNumber) } })
    if (!table) {
      return NextResponse.json({ error: 'Table not found' }, { status: 400 })
    }

    const created = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({ data: {
        tableNumber: Number(table.id),
        total: String(total.toFixed(2)),
      } })

      for (const it of items as ItemPayload[]) {
        await tx.orderItem.create({ data: {
          orderId: order.id,
          menuItemId: Number(it.menuItemId),
          quantity: Number(it.quantity),
          subtotal: String((Number(it.price || 0) * Number(it.quantity || 0)).toFixed(2)),
        } })
      }

      return order
    })

    return NextResponse.json({ ok: true, order: created })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
