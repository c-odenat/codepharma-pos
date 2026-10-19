import { createContext, useContext, useState, ReactNode } from "react";
import { Product, CartItem } from "@codepharma/shared";

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyDiscount: (productId: string, discount: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  tax: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * product.unitPrice * (1 - item.discount / 100)
              }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          discount: 0,
          subtotal: quantity * product.unitPrice
        }
      ];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
              subtotal: quantity * item.product.unitPrice * (1 - item.discount / 100)
            }
          : item
      )
    );
  };

  const applyDiscount = (productId: string, discount: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              discount,
              subtotal: item.quantity * item.product.unitPrice * (1 - discount / 100)
            }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = items.reduce((sum, item) => sum + item.subtotal * (item.product.taxRate / 100), 0);
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        applyDiscount,
        clearCart,
        total,
        subtotal,
        tax
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be within CartProvider");
  return ctx;
}
