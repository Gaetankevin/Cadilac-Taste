'use client';
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getFakeData } from "@/data";
import Image from "next/image";
import type { MenuItem as MenuItemType } from "@/types";

export default function MenuItemPage() {
  const { menuid } = useParams(); // récupère l'id depuis l'URL
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);

  useEffect(() => {
    async function fetchMenuItem() {
      const data = await getFakeData();
      const foundItem = data.menuItems.find(
        (item) => item.id === Number(menuid)
      );
      setMenuItem(foundItem || null);
    }

    fetchMenuItem();
  }, [menuid]);

  if (!menuItem) {
    return <div className="p-10 text-center">Menu introuvable...</div>;
  }

  return (
    <div className="pt-20 px-5 md:px-10 max-w-4xl mx-auto">
      <Image
        src={menuItem.imageUrl || "/images/placeholder.png"}
        alt={menuItem.name}
        width={800}
        height={400}
        className="w-full h-80 object-cover rounded-lg shadow-md"
      />
      <h1 className="mt-5 text-3xl font-bold text-gray-800 dark:text-gray-100">
        {menuItem.name}
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">{menuItem.description}</p>
      <p className="mt-3 font-bold text-amber-600 text-xl">{menuItem.price} FCFA</p>
      <button className="mt-5 bg-amber-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-700 transition">
        Ajouter
      </button>
    </div>
  );
}
