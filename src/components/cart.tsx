"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, remove, update, total, clear } = useCart()

  // Désactive le scroll quand le panier est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div
      className={`fixed top-[80px] md:top-[90px] right-0 h-[calc(100vh-80px)] md:h-[calc(100vh-90px)] 
                  w-full md:w-[400px] bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700
                  shadow-2xl transition-transform duration-300 z-40
                  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* HEADER DU PANIER */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Panier
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => clear()} className="text-sm text-red-600">Vider</button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* CONTENU DU PANIER */}
      <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Ton panier est vide pour l’instant 🍽️</p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((it) => (
              <div key={it.menuItem.id} className="flex items-center gap-3">
                {/* next/image inside client component can be used but keep simple <img> fallback for external/base64 images */}
                <img src={it.menuItem.imageUrl || '/images/placeholder.png'} alt={it.menuItem.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{it.menuItem.name}</div>
                  <div className="text-sm text-gray-500">{it.menuItem.price} FCFA</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="px-2 py-1 border" onClick={() => update(it.menuItem.id, Math.max(1, it.quantity - 1))}>-</button>
                    <div>{it.quantity}</div>
                    <button className="px-2 py-1 border" onClick={() => update(it.menuItem.id, it.quantity + 1)}>+</button>
                    <button className="ml-4 text-sm text-red-600" onClick={() => remove(it.menuItem.id)}>Suppr</button>
                  </div>
                </div>
                <div className="font-bold">{(Number(it.menuItem.price) * it.quantity).toFixed(0)} FCFA</div>
              </div>
            ))}

            <div className="pt-4 border-t flex items-center justify-between">
              <div className="font-semibold">Total</div>
              <div className="font-bold">{Math.round(total)} FCFA</div>
            </div>

            <div className="flex gap-2">
              <a href="/checkout" className="flex-1 text-center bg-amber-600 text-white px-4 py-2 rounded">Commander</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
