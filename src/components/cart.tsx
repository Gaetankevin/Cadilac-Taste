"use client";

import { useEffect } from "react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
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
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-600 transition"
        >
          ✕
        </button>
      </div>

      {/* CONTENU DU PANIER */}
      <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
        <p className="text-gray-600 dark:text-gray-300">
          Ton panier est vide pour l’instant 🍽️
        </p>
      </div>
    </div>
  );
}
