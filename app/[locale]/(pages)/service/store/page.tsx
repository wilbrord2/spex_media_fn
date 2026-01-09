"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import {
  FiSearch,
  FiShoppingCart,
  FiArrowRight,
  FiChevronRight,
  FiChevronLeft,
  FiFilter,
  FiGrid,
  FiList,
  FiStar,
} from "react-icons/fi";
import Link from "next/link";

// --- Types ---
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

// --- Mock Data ---
const BOOKS: Book[] = [
  {
    id: 1,
    title: "The Minimalist Mindset",
    author: "Sarah Jenkins",
    price: 18.99,
    category: "Non-Fiction",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
    rating: 4.5,
    badge: "Bestseller",
    badgeColor: "bg-blue-600",
  },
  {
    id: 2,
    title: "Creative Intelligence",
    author: "Bruce Nussbaum",
    price: 24.5,
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
    rating: 4,
    badge: "New",
    badgeColor: "bg-emerald-500",
  },
  {
    id: 3,
    title: "The Dark Forest",
    author: "Liu Cixin",
    price: 16.0,
    category: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800",
    rating: 5,
  },
  {
    id: 4,
    title: "Code of Ethics",
    author: "Dr. A. Vance",
    price: 32.0,
    category: "Philosophy",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800",
    rating: 3.5,
  },
  {
    id: 5,
    title: "Silent Waters",
    author: "Lila Thorne",
    price: 14.5,
    category: "Fiction",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800",
    rating: 5,
    badge: "Event Soon",
    badgeColor: "bg-black/60",
  },
  {
    id: 6,
    title: "Galactic Empire",
    author: "R. O. Vector",
    price: 22.0,
    category: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800",
    rating: 4,
  },
  {
    id: 7,
    title: "Urban Dreams",
    author: "Elena K.",
    price: 19.99,
    category: "Fiction",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=800",
    rating: 4.5,
  },
  {
    id: 8,
    title: "Finance 101",
    author: "Mark Johnson",
    price: 35.0,
    oldPrice: 45.0,
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
    rating: 5,
    badge: "Sale",
    badgeColor: "bg-red-500",
  },
];

const PRICE_MIN = 0;
const PRICE_MAX = 100;

const BookStoreService: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(85);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const leftPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const rightPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="bg-background text-foreground min-h-screen font-sans relative">
      <div className="sticky top-18 z-40 max-w-[1440px] mx-auto px-4 lg:px-10 py-5 bg-background/80 backdrop-blur-sm ">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">Book Store</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop search */}
            <div className="hidden md:flex items-center max-w-md w-[360px] relative group">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-blue-500 transition-colors" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background/80 border border-foreground/30 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-all"
                placeholder="Search titles, authors..."
              />
            </div>

            {/* Mobile search icon */}
            <button
              className="md:hidden p-2.5 bg-background/80 rounded-lg"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
            >
              <FiSearch size={18} />
            </button>

            {/* Cart */}
            <IconButton icon={<FiShoppingCart size={20} />} />
          </div>
        </div>

        {/* Mobile search overlay */}
        {searchOpen && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background/90 border border-foreground/30 rounded-lg py-3 pl-10 pr-12 text-sm focus:outline-none focus:border-blue-500 transition-all"
                placeholder="Search titles, authors..."
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/40 px-3 py-1 rounded hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Hero Section --- */}
      <header className="bg-background w-full mt-4">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6">
          <div className="relative w-full rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end p-8 md:p-16 bg-background/95 group">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000"
                alt="Library"
                fill
                className="object-cover  group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider w-fit backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Book of the Month
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                The Future of{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                  Artificial Minds
                </span>
              </h1>
              <p className="text-foreground/70 text-lg mb-8 max-w-xl leading-relaxed">
                Explore the ethical boundaries of AI in Dr. Sarah Chen&apos;s
                groundbreaking new analysis. A must-read for tech enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/service/store/${"details"}`}
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-2 transition-all"
                >
                  View Details <FiArrowRight />
                </Link>
                <button className="h-12 px-8 bg-foreground/10 hover:bg-foreground/20 backdrop-blur-md border border-foreground/10 rounded-lg font-bold transition-all">
                  Add to Cart — $24.99
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8 flex flex-col lg:flex-row gap-12">
        {/* --- Sidebar Filters (Desktop) --- */}
        <aside className="hidden lg:block w-60 shrink-0 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FiFilter className="text-blue-500" /> Filters
            </h3>

            <FilterGroup title="Genre">
              <FilterItem label="Fiction" count={128} checked />
              <FilterItem label="Non-Fiction" count={85} />
              <FilterItem label="Sci-Fi" count={64} />
              <FilterItem label="Biography" count={42} />
            </FilterGroup>

            <FilterGroup
              title="Region"
              className="mt-8 pt-8 border-t border-foreground/20"
            >
              <FilterItem label="North America" />
              <FilterItem label="Europe" />
              <FilterItem label="Asia Pacific" />
            </FilterGroup>

            <div className="mt-8 pt-8 border-t border-foreground/20">
              <h4 className="font-semibold mb-4">Price Range</h4>

              <div className="relative h-3 w-full bg-background/80 rounded-full mb-4">
                <div
                  className="absolute h-full bg-blue-500 rounded-full"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${Math.max(0, rightPercent - leftPercent)}%`,
                  }}
                />
                {/* thumbs are inputs */}
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={minPrice}
                  onChange={(e) => {
                    const v = Math.min(Number(e.target.value), maxPrice - 1);
                    setMinPrice(v);
                  }}
                  className="absolute inset-0 w-full h-3 appearance-none pointer-events-auto bg-transparent"
                />
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={maxPrice}
                  onChange={(e) => {
                    const v = Math.max(Number(e.target.value), minPrice + 1);
                    setMaxPrice(v);
                  }}
                  className="absolute inset-0 w-full h-3 appearance-none pointer-events-auto bg-transparent"
                />
              </div>

              <div className="flex justify-between text-xs text-foreground/40">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* --- Mobile Filter Modal --- */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setFiltersOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FiFilter className="text-blue-500" /> Filters
                </h3>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="text-foreground/40 hover:text-foreground text-2xl"
                >
                  ×
                </button>
              </div>

              <FilterGroup title="Genre">
                <FilterItem label="Fiction" count={128} checked />
                <FilterItem label="Non-Fiction" count={85} />
                <FilterItem label="Sci-Fi" count={64} />
                <FilterItem label="Biography" count={42} />
              </FilterGroup>

              <FilterGroup
                title="Region"
                className="mt-8 pt-8 border-t border-foreground/20"
              >
                <FilterItem label="North America" />
                <FilterItem label="Europe" />
                <FilterItem label="Asia Pacific" />
              </FilterGroup>

              <div className="mt-8 pt-8 border-t border-foreground/20">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="relative h-3 w-full bg-background/80 rounded-full mb-4">
                  <div
                    className="absolute h-full bg-blue-500 rounded-full"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${Math.max(0, rightPercent - leftPercent)}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    value={minPrice}
                    onChange={(e) => {
                      const v = Math.min(Number(e.target.value), maxPrice - 1);
                      setMinPrice(v);
                    }}
                    className="absolute inset-0 w-full h-3 appearance-none pointer-events-auto bg-transparent"
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    value={maxPrice}
                    onChange={(e) => {
                      const v = Math.max(Number(e.target.value), minPrice + 1);
                      setMaxPrice(v);
                    }}
                    className="absolute inset-0 w-full h-3 appearance-none pointer-events-auto bg-transparent"
                  />
                </div>
                <div className="flex justify-between text-xs text-foreground/40">
                  <span>${minPrice}</span>
                  <span>${maxPrice}</span>
                </div>
              </div>

              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full mt-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* --- Catalog Grid Area --- */}
        <section className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Browse Catalog
              </h2>
              <p className="text-foreground/40 text-sm mt-1">
                Showing 1-8 of 342 results
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
              {/* Filter button (mobile) */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-background/80 border border-foreground/30 rounded-lg text-sm hover:border-foreground/50 transition-all"
              >
                <FiFilter size={16} /> Filters
              </button>

              <select className="bg-background/80 border border-foreground/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer flex-1 sm:flex-none order-2 md:order-1">
                <option>Relevance</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
              </select>

              {/* View mode toggle (all devices) */}
              <div className="flex bg-background/80 border border-foreground/30 rounded-lg p-1 order-1 md:order-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-600/20 text-blue-500"
                      : "text-foreground/40 hover:text-foreground"
                  }`}
                  title="Grid view"
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-all ${
                    viewMode === "list"
                      ? "bg-blue-600/20 text-blue-500"
                      : "text-foreground/40 hover:text-foreground"
                  }`}
                  title="List view"
                >
                  <FiList size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {BOOKS.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-w-lg">
              {BOOKS.map((book) => (
                <BookCard key={book.id} book={book} listView />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-foreground/20 pt-8 mb-20">
            <p className="text-foreground/40 text-sm">
              Showing <span className="text-foreground">1-8</span> of 342
            </p>
            <div className="flex items-center gap-2">
              <PaginationButton icon={<FiChevronLeft />} disabled />
              <PaginationButton label="1" active />
              <PaginationButton label="2" />
              <PaginationButton label="3" />
              <span className="text-foreground/60 px-2">...</span>
              <PaginationButton label="24" />
              <PaginationButton icon={<FiChevronRight />} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// --- Sub-components ---

const BookCard = ({
  book,
  listView = false,
}: {
  book: Book;
  listView?: boolean;
}) => {
  if (listView) {
    return (
      <Link
        href={`/service/store/${book.id}`}
        className="group relative flex items-center gap-5 bg-background/70 rounded-xl overflow-hidden border border-foreground/20 hover:border-blue-500/50 transition-all duration-300 p-4 hover:bg-background/80"
      >
        {/* Book Image - Left */}
        <div className="relative w-24 h-32 shrink-0 overflow-hidden bg-background/95 rounded-lg">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          {book.badge && (
            <span
              className={`absolute top-2 left-2 px-2 py-0.5 ${book.badgeColor || "bg-blue-600"} text-foreground text-[8px] font-bold rounded uppercase tracking-wider`}
            >
              {book.badge}
            </span>
          )}
        </div>

        {/* All Info - Center */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Category */}
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">
            {book.category}
          </span>

          {/* Title */}
          <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-blue-500 transition-colors">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-foreground/50 text-xs">{book.author}</p>

          {/* Rating */}
          <div className="flex text-amber-500 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                className={
                  i < Math.floor(book.rating) ? "" : "text-foreground/40"
                }
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold">${book.price}</span>
            {book.oldPrice && (
              <span className="text-foreground/50 text-xs line-through">
                ${book.oldPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart - Bottom Right Corner (mobile) / Top Right (desktop) */}
        <div className="absolute bottom-4 right-4  flex items-center gap-0">
          {/* Small devices: icon only */}
          <button className="lg:hidden p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
            <FiShoppingCart size={16} />
          </button>

          {/* Large devices: icon + text */}
          <button
            className="hidden lg:flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-all"
            onClick={(e) => e.preventDefault()}
          >
            <FiShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/service/store/${book.id}`}
      className="group flex flex-col bg-background/70 rounded-xl overflow-hidden border border-foreground/20 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[2/2.2] overflow-hidden bg-background/95">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        {book.badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 ${book.badgeColor || "bg-blue-600"} text-foreground text-[10px] font-bold rounded uppercase tracking-wider`}
          >
            {book.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide mb-1">
          {book.category}
        </span>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base leading-tight line-clamp-2 flex-1 group-hover:text-blue-500 transition-colors">
            {book.title}
          </h3>
          <button
            className="p-1.5 text-foreground/40 hover:text-blue-400 transition-colors shrink-0"
            onClick={(e) => e.preventDefault()}
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
        <p className="text-foreground/40 text-sm mb-4">{book.author}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">${book.price}</span>
            {book.oldPrice && (
              <span className="text-foreground/50 text-xs line-through">
                ${book.oldPrice}
              </span>
            )}
          </div>
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                className={
                  i < Math.floor(book.rating) ? "" : "text-foreground/60"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const FilterGroup = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
      {title}
    </h4>
    <div className="space-y-3">{children}</div>
  </div>
);

const FilterItem = ({
  label,
  count,
  checked = false,
}: {
  label: string;
  count?: number;
  checked?: boolean;
}) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      defaultChecked={checked}
      className="rounded border-foreground/30 bg-background/80 text-blue-600 focus:ring-0 focus:ring-offset-0"
    />
    <span className="text-foreground/40 group-hover:text-foreground text-sm transition-colors">
      {label}
    </span>
    {count && (
      <span className="ml-auto text-[10px] text-foreground/50 bg-background/80 px-2 py-0.5 rounded-full">
        {count}
      </span>
    )}
  </label>
);

const IconButton = ({ icon }: { icon: ReactNode }) => (
  <button className="p-2.5 bg-background/80 text-foreground rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition-all">
    {icon}
  </button>
);

const PaginationButton = ({
  label,
  icon,
  active,
  disabled,
}: {
  label?: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    className={`size-10 flex items-center justify-center rounded-lg border transition-all text-sm font-medium
      ${active ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" : "border-foreground/20 text-foreground/40 hover:border-foreground/40 hover:text-foreground"}
      ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
  >
    {label || icon}
  </button>
);

export default BookStoreService;
