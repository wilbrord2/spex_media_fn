"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { ThemeSwitchButton } from "@/app/[locale]/components/switch/themeSwitcher";
import { useCartContext } from "@/app/[locale]/context";

const StoreNavbar = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { totalQuantity } = useCartContext();

  // Check if on main store page (no bookId param)
  const isStoreMainPage = !params.bookId;

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`?${params.toString()}${term ? "#browse-catalog" : ""}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/service/store"
          className="text-xl font-bold tracking-tight flex items-center gap-2"
        >
          <span className="text-foreground">Nexus</span>
          <span className="text-primary">Store</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/service"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Search & Cart */}
        <div className="flex items-center gap-4">
          {isStoreMainPage && (
            <div className="hidden md:flex items-center relative group">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input
                placeholder="Search titles, authors..."
                className="bg-foreground/5 border border-transparent focus:border-primary rounded-full py-2 pl-10 pr-4 text-sm w-48 focus:w-72 transition-all outline-none"
                defaultValue={searchParams.get("q")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          )}

          <div className="hidden md:flex">
            <ThemeSwitchButton />
          </div>

          <button className="relative p-2.5 hover:bg-foreground/5 rounded-full transition-colors text-foreground hover:text-primary">
            <FiShoppingCart size={22} />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] p-0.5 bg-red-700 border-2 border-background rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-foreground/10 bg-background p-4 flex flex-col gap-4 shadow-xl">
          {isStoreMainPage && (
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                placeholder="Search..."
                className="w-full bg-foreground/5 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none border border-transparent focus:border-primary"
                defaultValue={searchParams.get("q")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          )}
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="py-2 border-b border-foreground/5 hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/service"
              className="py-2 border-b border-foreground/5 hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="py-2 border-b border-foreground/5 hover:text-primary"
            >
              About
            </Link>
            <Link href="/contact" className="py-2 hover:text-primary">
              Contact
            </Link>
            <ThemeSwitchButton />
          </nav>
        </div>
      )}
    </nav>
  );
};

export default StoreNavbar;
