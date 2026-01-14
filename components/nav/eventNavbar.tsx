"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { ThemeSwitchButton } from "@/app/[locale]/components/switch/themeSwitcher";

const EventNavbar = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // Check if on main event page (no eventId param)
  const isEventMainPage = !params.eventId;

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`?${params.toString()}${term ? "#upcoming-events" : ""}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/service/event"
          className="text-xl font-bold tracking-tight flex items-center gap-2"
        >
          <span className="text-foreground">Nexus</span>
          <span className="text-primary">Events</span>
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

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          {isEventMainPage && (
            <div className="hidden md:flex items-center relative group">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input
                placeholder="Search events..."
                className="bg-foreground/5 border border-transparent focus:border-primary rounded-full py-2 pl-10 pr-4 text-sm w-48 focus:w-72 transition-all outline-none"
                defaultValue={searchParams.get("q")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          )}

          <div className="hidden md:flex">
            <ThemeSwitchButton />
          </div>

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
          {isEventMainPage && (
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                placeholder="Search events..."
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

export default EventNavbar;
