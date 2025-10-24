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
    description: "Repas chauds et copieux pour satisfaire toutes les faims",
    imageUrl: "/images/plats.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 2,
    name: "Entrées",
    description: "Petits plaisirs salés pour bien commencer le repas",
    imageUrl: "/images/entrees.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 3,
    name: "Desserts",
    description: "Douceurs sucrées et gourmandises pour finir sur une note sucrée",
    imageUrl: "/images/desserts.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 4,
    name: "Boissons",
    description: "Boissons fraîches, cocktails, jus naturels et sodas",
    imageUrl: "/images/boissons.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 5,
    name: "Spécialités locales",
    description: "Plats traditionnels inspirés de notre terroir et de nos saveurs africaines",
    imageUrl: "/images/specialites-locales.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 6,
    name: "Grillades",
    description: "Viandes, poissons et fruits de mer grillés à la perfection",
    imageUrl: "/images/grillades.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 7,
    name: "Pâtes et Riz",
    description: "Délices à base de riz, spaghettis, penne et sauces variées",
    imageUrl: "/images/pates-riz.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 8,
    name: "Burgers & Sandwichs",
    description: "Snack rapides et savoureux pour les petites faims",
    imageUrl: "/images/burgers.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 9,
    name: "Salades",
    description: "Fraîcheur et équilibre avec nos salades composées",
    imageUrl: "/images/salades.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  },
  {
    id: 10,
    name: "Petit-déjeuner",
    description: "Café, viennoiseries, omelettes et jus frais pour bien démarrer la journée",
    imageUrl: "/images/petit-dejeuner.png",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItems: []
  }
];


const menuItems: MenuItem[] = [
  // --- PLATS PRINCIPAUX ---
  {
    id: 1,
    categoryId: 1,
    name: "Poulet DG",
    description: "Poulet sauté aux plantains mûrs, légumes et sauce maison",
    price: 3500,
    imageUrl: "/images/poulet-dg.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 2,
    categoryId: 1,
    name: "Poisson braisé",
    description: "Poisson frais grillé au feu de bois, accompagné de plantains et sauce pimentée",
    price: 4000,
    imageUrl: "/images/poisson-braise.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 3,
    categoryId: 1,
    name: "Sauté de bœuf aux légumes",
    description: "Morceaux de bœuf tendres cuits avec des légumes croquants",
    price: 3800,
    imageUrl: "/images/boeuf-legumes.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- ENTRÉES ---
  {
    id: 4,
    categoryId: 2,
    name: "Beignets de crevettes",
    description: "Crevettes croustillantes servies avec une sauce tartare maison",
    price: 2000,
    imageUrl: "/images/beignets-crevettes.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 5,
    categoryId: 2,
    name: "Salade de légumes grillés",
    description: "Légumes grillés marinés dans une vinaigrette citronnée",
    price: 1800,
    imageUrl: "/images/salade-legumes.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- DESSERTS ---
  {
    id: 6,
    categoryId: 3,
    name: "Fondant au chocolat",
    description: "Cœur fondant au chocolat noir servi avec une boule de glace vanille",
    price: 2500,
    imageUrl: "/images/fondant-chocolat.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 7,
    categoryId: 3,
    name: "Tiramisu maison",
    description: "Crème mascarpone et biscuit imbibé de café doux",
    price: 2200,
    imageUrl: "/images/tiramisu.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- BOISSONS ---
  {
    id: 8,
    categoryId: 4,
    name: "Jus d’ananas frais",
    description: "Pur jus d’ananas pressé sur place",
    price: 1000,
    imageUrl: "/images/jus-ananas.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 9,
    categoryId: 4,
    name: "Cocktail sans alcool",
    description: "Mélange fruité et rafraîchissant, parfait pour toutes les occasions",
    price: 1500,
    imageUrl: "/images/cocktail.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- SPÉCIALITÉS LOCALES ---
  {
    id: 10,
    categoryId: 5,
    name: "Ndolé crevettes",
    description: "Feuilles d’amertume mijotées avec des crevettes et pâte d’arachide",
    price: 4000,
    imageUrl: "/images/ndole-crevettes.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 11,
    categoryId: 5,
    name: "Taro sauce jaune",
    description: "Taro pilé servi avec sauce jaune traditionnelle du Nord-Ouest",
    price: 4500,
    imageUrl: "/images/taro-sauce-jaune.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- GRILLADES ---
  {
    id: 12,
    categoryId: 6,
    name: "Brochettes de bœuf",
    description: "Morceaux de bœuf grillés accompagnés de sauce épicée",
    price: 2500,
    imageUrl: "/images/brochettes-boeuf.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 13,
    categoryId: 6,
    name: "Côtelettes d’agneau",
    description: "Agneau mariné et grillé avec herbes aromatiques",
    price: 4800,
    imageUrl: "/images/cotelettes-agneau.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- PÂTES ET RIZ ---
  {
    id: 14,
    categoryId: 7,
    name: "Spaghetti bolognaise",
    description: "Pâtes fraîches servies avec sauce tomate à la viande hachée",
    price: 3000,
    imageUrl: "/images/spaghetti-bolognaise.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 15,
    categoryId: 7,
    name: "Riz cantonais",
    description: "Riz sauté aux œufs, jambon et petits pois",
    price: 3200,
    imageUrl: "/images/riz-cantonais.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- BURGERS & SANDWICHS ---
  {
    id: 16,
    categoryId: 8,
    name: "Cheeseburger Cadillac",
    description: "Pain brioché, steak haché, fromage fondant et sauce spéciale maison",
    price: 2800,
    imageUrl: "/images/cheeseburger.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 17,
    categoryId: 8,
    name: "Sandwich thon crudités",
    description: "Pain frais garni de thon, salade, tomates et mayonnaise",
    price: 2200,
    imageUrl: "/images/sandwich-thon.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- SALADES ---
  {
    id: 18,
    categoryId: 9,
    name: "Salade César",
    description: "Salade croquante, poulet grillé, croûtons et parmesan",
    price: 2500,
    imageUrl: "/images/salade-cesar.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 19,
    categoryId: 9,
    name: "Salade de fruits frais",
    description: "Mélange de fruits de saison coupés et servis frais",
    price: 1800,
    imageUrl: "/images/salade-fruits.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },

  // --- PETIT-DÉJEUNER ---
  {
    id: 20,
    categoryId: 10,
    name: "Omelette complète",
    description: "Œufs, oignons, tomates, jambon et fromage, servis avec pain grillé",
    price: 2000,
    imageUrl: "/images/omelette.jpg",
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: undefined,
    orderItems: []
  },
  {
    id: 21,
    categoryId: 10,
    name: "Petit-déjeuner continental",
    description: "Café, croissant, jus de fruit et œuf au plat",
    price: 2500,
    imageUrl: "/images/petit-dejeuner-continental.jpg",
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
