"use client";

import { useCartContext } from "@/app/[locale]/context";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import { FiLoader, FiShoppingCart } from "react-icons/fi";
import Navbar from "./navbar";

interface StoreNavbarProps {
  onCartIconClick: () => void;
}

const CartButton: React.FC<{ onCartIconClick: () => void }> = ({
  onCartIconClick,
}) => {
  const { totalQuantity } = useCartContext();

  return (
    <button
      className="relative p-2.5 hover:bg-foreground/5 rounded-full transition-colors text-foreground hover:text-primary"
      onClick={onCartIconClick}
    >
      <FiShoppingCart size={22} />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 p-0.5 bg-red-700 border-2 border-background rounded-full flex items-center justify-center text-[10px] font-bold text-white">
          {totalQuantity}
        </span>
      )}
    </button>
  );
};

const StoreNavbarContent: React.FC<StoreNavbarProps> = ({
  onCartIconClick,
}) => {
  const params = useParams();
  const isStoreMainPage = !params.bookId;

  return (
    <Navbar
      brand="Store"
      includeSearchBar={isStoreMainPage}
      searchBarPlaceholder="Search titles, authors..."
    >
      <CartButton onCartIconClick={onCartIconClick} />
    </Navbar>
  );
};

export default function StoreNavbar({ onCartIconClick }: StoreNavbarProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <FiLoader className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <StoreNavbarContent onCartIconClick={onCartIconClick} />
    </Suspense>
  );
}
