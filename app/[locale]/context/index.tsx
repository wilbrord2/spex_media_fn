"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { toast } from "sonner";
import {User} from "@/app/actions/auth";

// --- App Context ---
interface AppContextValue {
  activeModalId: string | null;
  setActiveModalId: (id: string | null) => void;
  profile: User | null;
  setProfile: (user: User | null) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export function useAppContext() {
  return useContext(AppContext);
}

// --- Cart Context ---
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  rating: number;
  badge?: string;
  badgeColor?: string;
}

export interface CartItem extends Book {
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (item: Book) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue>(
  {} as CartContextValue,
);

export function useCartContext() {
  return useContext(CartContext);
}

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    toast.success("Book added to cart");
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === itemId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function ContextProvider({ children, initialUser }: PropsWithChildren & { initialUser: User | null }) {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [profile, setProfile] = useState<User | null>(initialUser);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeModalId,
        setActiveModalId,
        profile,
        setProfile,
      }}
    >
      <CartProvider>{children}</CartProvider>
    </AppContext.Provider>
  );
}

export default ContextProvider;
