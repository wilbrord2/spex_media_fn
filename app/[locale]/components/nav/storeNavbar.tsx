"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { FiSearch, FiShoppingCart, FiLoader } from "react-icons/fi";
import { useCartContext } from "@/app/[locale]/context";
import { Navbar } from "./navbar";

interface StoreNavbarProps {
  onCartIconClick: () => void;
}

const SearchBar: React.FC<{ isStoreMainPage: boolean }> = ({
  isStoreMainPage,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`?${params.toString()}${term ? "#browse-catalog" : ""}`);
  };

  if (!isStoreMainPage) return null;

  return (
    <div className="relative flex items-center group">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" />
      <input
        placeholder="Search titles, authors..."
        className="bg-foreground/5 border border-transparent focus:border-primary rounded-full py-2 pl-10 pr-4 text-sm w-full md:w-48 md:focus:w-72 transition-all outline-none"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

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
      brand="Nexus Store"
      rightContent={[
        <SearchBar key="search" isStoreMainPage={isStoreMainPage} />,
      ]}
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
