import { PrismaClient } from '../src/generated/prisma'
import dotenv from 'dotenv'
import { getFakeData } from '../src/data/fakedata'

// load environment variables so DATABASE_URL from .env.local is available
dotenv.config({ path: '.env.local' })
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('Reading fake data...')
  const data = await getFakeData()

  console.log('Cleaning existing data (order dependent deletion)...')
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.category.deleteMany()
  await prisma.restaurantTable.deleteMany()
  await prisma.user.deleteMany()

  console.log(`Seeding ${data.categories.length} categories...`)
  // create categories and keep a map from fake id -> real id (by name)
  const categoryMap = new Map<number, number>()
  for (const c of data.categories) {
    const created = await prisma.category.create({
      data: {
        name: c.name,
        description: c.description ?? null,
        imageUrl: c.imageUrl ?? null,
        isAvailable: Boolean(c.isAvailable),
        createdAt: c.createdAt ? new Date(c.createdAt) : undefined,
        updatedAt: c.updatedAt ? new Date(c.updatedAt) : undefined,
      },
    })
    categoryMap.set(c.id, created.id)
  }

  console.log(`Seeding ${data.menuItems.length} menu items...`)
  for (const m of data.menuItems) {
    const categoryId = categoryMap.get(m.categoryId) ?? null
    // price expected as Decimal(8,2) — pass as string with 2 decimals
    const priceStr = (typeof m.price === 'number') ? m.price.toFixed(2) : String(m.price)
    const imageUrl = m.imageUrl && String(m.imageUrl).startsWith('data:') ? null : m.imageUrl ?? null
    await prisma.menuItem.create({
      data: {
        name: m.name,
        description: m.description ?? null,
        // Prisma accepts a string for Decimal fields
        price: priceStr,
        // drop inline base64 images which are too large for the DB column
        imageUrl,
        isAvailable: Boolean(m.isAvailable),
        categoryId: categoryId as number,
        createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
        updatedAt: m.updatedAt ? new Date(m.updatedAt) : undefined,
      },
    })
  }

  console.log(`Seeding ${data.restaurantTables.length} restaurant tables...`)
  for (const t of data.restaurantTables) {
    await prisma.restaurantTable.create({
      data: {
        number: t.number,
        isAvailable: Boolean(t.isAvailable),
        createdAt: t.createdAt ? new Date(t.createdAt) : undefined,
        updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined,
      },
    })
  }

  if (data.users && data.users.length) {
    console.log(`Seeding ${data.users.length} users...`)
    for (const u of data.users) {
      await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          password: u.password ?? 'password',
          emailVerifiedAt: u.emailVerifiedAt ? new Date(u.emailVerifiedAt) : null,
          createdAt: u.createdAt ? new Date(u.createdAt) : undefined,
          updatedAt: u.updatedAt ? new Date(u.updatedAt) : undefined,
        },
      })
    }
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
