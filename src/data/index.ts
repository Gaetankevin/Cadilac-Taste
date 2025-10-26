"use server";
import type {
  Category,
  MenuItem,
  Order,
  OrderItem,
  RestaurantTable,
  User,
} from "@/types";

export async function getData() {
  const users: User[] = [];
  const restaurantTables: RestaurantTable[] = [];
  const categories: Category[] = [];
  const menuItems: MenuItem[] = [];
  const orders: Order[] = [];
  const orderItems: OrderItem[] = [];
  const allCategories: Category[] = [];

  async function getAllCategories() {
    const fakeData = await fetch("http://localhost:3000/api/fakedata");
    const data = await fakeData.json();
    return data;
  }

  async function getAllMenuItems() {
    const fakeData = await fetch("http://localhost:3000/api/fakedata");
    const data = await fakeData.json();
    return data;
  }

  return {
    users,
    restaurantTables,
    categories,
    menuItems,
    orders,
    orderItems,
    allCategories,
    getAllCategories,
    getAllMenuItems,
  };
}
