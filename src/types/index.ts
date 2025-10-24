// =============================
// TYPES UTILISABLES DANS TON APP
// =============================

export interface User {
  id?: number;
  name: string;
  email: string;
  emailVerifiedAt?: Date | null;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface RestaurantTable {
  id: number;
  number: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
}

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  menuItems?: MenuItem[];
}

export interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  description?: string | null;
  price: number; // Decimal remplacé par number
  imageUrl?: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  orderItems?: OrderItem[];
}

export interface Order {
  id: number;
  tableNumber: number;
  status: OrderStatus;
  total?: number | null;
  createdAt: Date;
  updatedAt: Date;
  restaurantTable?: RestaurantTable;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  subtotal?: number | null;
  createdAt: Date;
  updatedAt: Date;
  order?: Order;
  menuItem?: MenuItem;
}

export enum OrderStatus {
  pending = "pending",
  processing = "processing",
  completed = "completed",
  cancelled = "cancelled"
}
