'use client';

import { useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, title: 'Sample Product', price: 50, quantity: 1 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="list-group">
          {cartItems.map(item => (
            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.title}</span>
              <span>{item.quantity} x ${item.price}</span>
            </div>
          ))}
          <div className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary mt-3">Checkout</button>
        </div>
      )}
    </div>
  );
}
