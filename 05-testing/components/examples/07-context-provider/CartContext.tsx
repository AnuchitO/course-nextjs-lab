'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface CartContextValue {
  itemCount: number
  addItem: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0)
  const addItem = () => setItemCount((c) => c + 1)

  return (
    <CartContext.Provider value={{ itemCount, addItem }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
