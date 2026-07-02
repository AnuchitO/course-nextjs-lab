'use client'

import { useCart } from './CartContext'

export function CartSummary() {
  const { itemCount, addItem } = useCart()

  return (
    <div>
      <p>Items in cart: {itemCount}</p>
      <button onClick={addItem}>Add item</button>
    </div>
  )
}
