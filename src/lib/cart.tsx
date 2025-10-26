"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import type { MenuItem } from '@/types'

type CartItem = {
  menuItem: MenuItem
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  add: (menuItem: MenuItem, qty?: number) => void
  remove: (id: number) => void
  update: (id: number, qty: number) => void
  clear: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(items)) } catch {}
  }, [items])

  const add = (menuItem: MenuItem, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find(i => i.menuItem.id === menuItem.id)
      if (existing) return prev.map(i => i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + qty } : i)
      return [...prev, { menuItem, quantity: qty }]
    })
  }

  const remove = (id: number) => setItems(prev => prev.filter(i => i.menuItem.id !== id))

  const update = (id: number, qty: number) => setItems(prev => prev.map(i => i.menuItem.id === id ? { ...i, quantity: qty } : i))

  const clear = () => setItems([])

  const total = items.reduce((s, it) => s + (Number(it.menuItem.price) * it.quantity), 0)

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}
