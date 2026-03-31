import { type ReactNode, createContext, useContext, useState } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: (n: number) => void;
  incrementCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
  incrementCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const incrementCart = () => setCartCount((prev) => prev + 1);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, incrementCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
