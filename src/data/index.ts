'use server';

import { 
  User, 
  RestaurantTable, 
  Order, 
  OrderItem, 
  MenuItem, 
  Category, 
  OrderStatus
} from "@/types";

export async function getFakeData() {

  const users: User[] = [
    {
      id: 1,
      name: "Gaetan",
      email: "g@gmail.com",
      emailVerifiedAt: null,
      password: "hashed_password",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Papa",
      email: "p@gmail.com",
      emailVerifiedAt: null,
      password: "hashed_password",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Ludovick",
      email: "ludo@gmail.com",
      emailVerifiedAt: null,
      password: "hashed_password",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const restaurantTables: RestaurantTable[] = [
    {
      id: 1,
      number: 1,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      orders: []
    }
  ];

  const categories: Category[] = [
    {
      id: 1,
      name: "Plats principaux",
      description: "Repas chauds et complets",
      imageUrl: "/images/plats.png",
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      menuItems: []
    }
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      categoryId: 1,
      name: "Poulet DG",
      description: "Poulet sauté aux plantains",
      price: 3500,
      imageUrl: "/images/poulet-dg.jpg",
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: undefined,
      orderItems: []
    }
  ];

  const orders: Order[] = [
    {
      id: 1,
      tableNumber: 1,
      status: OrderStatus.pending,
      total: 7000,
      createdAt: new Date(),
      updatedAt: new Date(),
      restaurantTable: undefined,
      orderItems: []
    }
  ];

  const orderItems: OrderItem[] = [
    {
      id: 1,
      orderId: 1,
      menuItemId: 1,
      quantity: 2,
      subtotal: 7000,
      createdAt: new Date(),
      updatedAt: new Date(),
      order: undefined,
      menuItem: undefined
    }
  ];

  return {
    users,
    restaurantTables,
    categories,
    menuItems,
    orders,
    orderItems
  };
}
