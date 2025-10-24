"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import Cart from "@/components/cart";
import Link from "next/link";
export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  return (
    <header className="w-full h-15 md:h-20 bg-white dark:bg-black border-b dark:border-gray-500 px-5 md:px-10">
      <div className="grid grid-cols-[0.6fr_5fr_0.5fr] w-full h-full items-center">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logocadilac.png"
              alt="logo Cadillac Taste"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="hidden md:block text-lg font-semibold text-gray-800 dark:text-gray-100">
              Cadillac Taste
            </span>
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="flex justify-center">
          <input
            type="search"
            placeholder="Search..."
            className="border border-gray-400 dark:border-gray-900 hover:border-amber-700 rounded-lg px-3 py-2 w-4/5 focus:outline-none focus:ring-2 focus:ring-[#501500] dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        {/* CART */}
        <div className="flex justify-end" onClick={toggleCart}>
          <ShoppingCart className="w-6 h-6 text-[#501500]" />
        </div>

        {/* PANIER */}
        <Cart isOpen={isCartOpen} onClose={toggleCart} />
      </div>
    </header>
  );
}
