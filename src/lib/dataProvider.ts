import { getFakeData } from "@/data/fakedata";
import type {
  MenuItem as MenuItemType,
  Category as CategoryType,
  RestaurantTable,
} from "@/types";

// Prisma Client (generated)
// Import the generated client entry exp  licitly (include .
// js to help bundlers resolve it)
import { PrismaClient } from "../generated/prisma/index.js";

// create singleton prisma client (avoid multiple instances in dev)
declare global {
  var __prisma__: PrismaClient | undefined;
}

const prisma: PrismaClient = global.__prisma__ ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.__prisma__ = prisma;

const useFake = process.env.USE_FAKE_DATA === "true";

export async function getMenu() {
  if (useFake) {
    const data = await getFakeData();
    return data;
  }

  const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });
  const menuItems = await prisma.menuItem.findMany({ orderBy: { id: "asc" } });
  // Prisma returns Decimal for price; convert typing via unknown to avoid TS Decimal/number mismatch here.
  return { categories, menuItems } as unknown as {
    categories: CategoryType[];
    menuItems: MenuItemType[];
  };
}

export async function getMenuItemById(id: number) {
  if (useFake) {
    const data = await getFakeData();
    return data.menuItems.find((m) => m.id === Number(id)) || null;
  }
  const item = await prisma.menuItem.findUnique({ where: { id: Number(id) } });
  return item;
}

export async function getTables() {
  if (useFake) {
    const data = await getFakeData();
    return data.restaurantTables;
  }
  const tables: RestaurantTable[] = await prisma.restaurantTable.findMany({
    orderBy: { id: "asc" },
  });
  return tables;
}

// placeholder for order creation - can be expanded later
export async function createOrder(payload: {
  tableNumber: number;
  items: { menuItemId: number; quantity: number }[];
}) {
  if (useFake) {
    // for fake mode we just return a mock object
    const total = payload.items.reduce((s, it) => s + it.quantity * 0, 0);
    return {
      id: Date.now(),
      tableNumber: payload.tableNumber,
      status: "pending",
      total,
    };
  }

  const order = await prisma.order.create({
    data: {
      tableNumber: payload.tableNumber,
      status: "pending",
      total: 0,
      orderItems: {
        create: payload.items.map((it) => ({
          menuItemId: it.menuItemId,
          quantity: it.quantity,
        })),
      },
    },
    include: { orderItems: true },
  });
  // optionally calculate total and update
  const itemsWithPrice = await prisma.orderItem.findMany({
    where: { orderId: order.id },
    include: { menuItem: true },
  });
  const total = itemsWithPrice.reduce(
    (s, it) => s + Number(it.menuItem?.price || 0) * it.quantity,
    0
  );
  await prisma.order.update({ where: { id: order.id }, data: { total } });
  return await prisma.order.findUnique({
    where: { id: order.id },
    include: { orderItems: true },
  });
}

export const providerMode = useFake ? "fake" : "db";
