"use client";

import { useState } from "react";
import Image from "next/image";
import type { Category, MenuItem } from "@/types";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from '@/lib/cart'

export default function Menu({
  data,
}: {
  data: { categories: Category[]; menuItems: MenuItem[] };
}) {
  const { add } = useCart()
  
  function addToCart(menuItem: MenuItem) {
    add(menuItem, 1)
  }
  const { categories, menuItems } = data;
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const filteredMenuItems = selectedCategoryId
    ? menuItems.filter((item) => item.categoryId === selectedCategoryId)
    : menuItems;

  return (
    <div className="">
      {/* Categories */}
      <div className="categoryfilter h-12 w-full px-5 md:px-10 flex gap-3 items-center overflow-x-auto scrollbar-hide justify-center">
        {categories.map((categorie) => (
          <div
            key={categorie.id}
            onClick={() => setSelectedCategoryId(categorie.id)}
            className={`flex-shrink-0 px-4 py-1 rounded-full shadow-sm text-black cursor-pointer transition
              ${
                selectedCategoryId === categorie.id
                  ? "bg-amber-500 text-white"
                  : "bg-white hover:bg-amber-100"
              }`}
          >
            {categorie.name}
          </div>
        ))}
        <div
          onClick={() => setSelectedCategoryId(null)}
          className={`flex-shrink-0 px-4 py-1 rounded-full shadow-sm text-black cursor-pointer transition
            ${
              selectedCategoryId === null
                ? "bg-amber-500 text-white"
                : "bg-white hover:bg-amber-100"
            }`}
        >
          Toutes
        </div>
      </div>

      {/* Menu items */}
      <div className="category-menuitem grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-5 md:px-10">
        {filteredMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col"
          >
            {/* IMAGE */}
            <Link href={`/menu/${menuItem.id}`}>
              <div className="relative w-full h-48 md:h-56 lg:h-60 overflow-hidden">
                <Image
                  src={menuItem.imageUrl || "/images/placeholder.png"}
                  alt={menuItem.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {menuItem.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                  {menuItem.description}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-amber-600 font-bold text-lg md:text-xl">
                  {menuItem.price} FCFA
                </span>
                <div className="w-20 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition">
                  <ShoppingCart className="text-white" onClick={() => addToCart(menuItem)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
