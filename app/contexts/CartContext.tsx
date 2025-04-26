"use client";
import { createContext, useState, useCallback } from "react";
import { CartItem, ExtendedCartItem } from "@/interfaces/interfaces";
import { getCart } from "@/utils/api";

//Definicja typu dla kontekstu
interface CartContextType {
  cart: (CartItem | ExtendedCartItem)[];
  setCart: React.Dispatch<
    React.SetStateAction<(CartItem | ExtendedCartItem)[]>
  >;
  refreshCart: () => Promise<void>;
}

// Domyślna wartość kontekstu
const defaultContext: CartContextType = {
  cart: [],
  setCart: () => {}, // Pusta funkcja jako placeholder
  refreshCart: async () => {},
};

const CartContext = createContext<CartContextType>(defaultContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<(CartItem | ExtendedCartItem)[]>([]);

  //Z callback żeby nie wywoływał się w nieskończoność, wywoła się jeśli odpowiednie zależności się zmienią (setCart)
  const refreshCart = useCallback(async () => {
    try {
      const data = await getCart();
      setCart(data.cart);
    } catch (error) {
      console.error("Can't fetch data", error);
    }
  }, [setCart]);

  return (
    <CartContext.Provider value={{ cart, setCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
