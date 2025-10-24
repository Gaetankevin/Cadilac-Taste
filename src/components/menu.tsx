"use client";

import { useState } from "react";
import Image from "next/image";
import type { Category, MenuItem } from "@/types";
import Link from "next/link";

export default function Menu({
  data,
}: {
  data: { categories: Category[]; menuItems: MenuItem[] };
}) {
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
          <Link key={menuItem.id} href={`/menu/${menuItem.id}`}>
            <div
              
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
            >
              <Image
                src={menuItem.imageUrl || "/images/placeholder.png"}
                alt={menuItem.name}
                width={400}
                height={160}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  {menuItem.name}
                </h3>
                <p className="mt-2 font-bold text-amber-600">
                  {menuItem.price} FCFA
                </p>
                <button className="mt-2 bg-amber-600 text-white font-bold py-2 px-4 rounded-lg">
                  Ajouter
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
