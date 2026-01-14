/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import Image from "next/image";
import {
  FiShoppingCart,
  FiArrowRight,
  FiChevronRight,
  FiChevronLeft,
  FiFilter,
  FiGrid,
  FiList,
  FiStar,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CartContext } from "@/app/[locale]/context";

// --- Types ---
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  category: string;
  region: string;
  image: string;
  rating: number;
  badge?: string;
  badgeColor?: string;
  createdAt: Date;
}

// --- Mock Data ---
const BOOKS: Book[] = [
  {
    id: 1,
    title: "The Minimalist Mindset",
    author: "Sarah Jenkins",
    price: 18.99,
    category: "Non-Fiction",
    region: "North America",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
    rating: 4.5,
    badge: "Bestseller",
    badgeColor: "bg-primary",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: 2,
    title: "Creative Intelligence",
    author: "Bruce Nussbaum",
    price: 24.5,
    category: "Business",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
    rating: 4,
    badge: "New",
    badgeColor: "bg-emerald-500",
    createdAt: new Date("2025-01-10"),
  },
  {
    id: 3,
    title: "The Dark Forest",
    author: "Liu Cixin",
    price: 16.0,
    category: "Sci-Fi",
    region: "Asia Pacific",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800",
    rating: 5,
    createdAt: new Date("2024-12-15"),
  },
  {
    id: 4,
    title: "Code of Ethics",
    author: "Dr. A. Vance",
    price: 32.0,
    category: "Philosophy",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800",
    rating: 3.5,
    createdAt: new Date("2024-11-20"),
  },
  {
    id: 5,
    title: "Silent Waters",
    author: "Lila Thorne",
    price: 14.5,
    category: "Fiction",
    region: "North America",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800",
    rating: 5,
    badge: "Event Soon",
    badgeColor: "bg-black/60",
    createdAt: new Date("2025-01-05"),
  },
  {
    id: 6,
    title: "Galactic Empire",
    author: "R. O. Vector",
    price: 22.0,
    category: "Sci-Fi",
    region: "Asia Pacific",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800",
    rating: 4,
    createdAt: new Date("2024-12-28"),
  },
  {
    id: 7,
    title: "Urban Dreams",
    author: "Elena K.",
    price: 19.99,
    category: "Fiction",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=800",
    rating: 4.5,
    createdAt: new Date("2025-01-08"),
  },
  {
    id: 8,
    title: "Finance 101",
    author: "Mark Johnson",
    price: 35.0,
    oldPrice: 45.0,
    category: "Education",
    region: "North America",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
    rating: 5,
    badge: "Sale",
    badgeColor: "bg-red-500",
    createdAt: new Date("2025-01-12"),
  },
];

const PRICE_MIN = 0;
const PRICE_MAX = 100;

const BookStoreService: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { addToCart } = useContext(CartContext);

  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"relevance" | "newest" | "price">(
    "relevance",
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: "relevance", label: "Relevance" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "price", label: "Price: Low to High" },
  ] as const;

  const currentLabel = options.find((o) => o.value === sortBy)?.label;

  // Helper function to get unique categories and regions with counts
  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    BOOKS.forEach((book) => {
      counts[book.category] = (counts[book.category] || 0) + 1;
    });
    return counts;
  };

  const getTopCategories = (limit: number = 4) => {
    const counts = getCategoryCounts();
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
    return Object.fromEntries(sorted);
  };

  const getOtherCategoryCount = (limit: number = 4) => {
    const counts = getCategoryCounts();
    const topCategories = getTopCategories(limit);
    const otherCount = Object.entries(counts)
      .filter(([category]) => !topCategories.hasOwnProperty(category))
      .reduce((sum, [, count]) => sum + count, 0);
    return otherCount;
  };

  const getRegionCounts = () => {
    const counts: Record<string, number> = {};
    BOOKS.forEach((book) => {
      counts[book.region] = (counts[book.region] || 0) + 1;
    });
    return counts;
  };

  const getTopRegions = (limit: number = 3) => {
    const counts = getRegionCounts();
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
    return Object.fromEntries(sorted);
  };

  const getOtherRegionCount = (limit: number = 3) => {
    const counts = getRegionCounts();
    const topRegions = getTopRegions(limit);
    const otherCount = Object.entries(counts)
      .filter(([region]) => !topRegions.hasOwnProperty(region))
      .reduce((sum, [, count]) => sum + count, 0);
    return otherCount;
  };

  useEffect(() => {
    // Read from query params and set filters
    const categoryParam = searchParams.get("category");
    const regionsParam = searchParams.get("regions");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const newCategories = categoryParam
      ? categoryParam.split(",").filter(Boolean)
      : [];
    const newRegions = regionsParam
      ? regionsParam.split(",").filter(Boolean)
      : [];
    const newMinPrice = minPriceParam
      ? Math.max(PRICE_MIN, parseInt(minPriceParam))
      : PRICE_MIN;
    const newMaxPrice = maxPriceParam
      ? Math.min(PRICE_MAX, parseInt(maxPriceParam))
      : PRICE_MAX;

    if (newCategories.length > 0) setSelectedCategories(newCategories);
    if (newRegions.length > 0) setSelectedRegions(newRegions);
    if (newMinPrice > PRICE_MIN) setMinPrice(newMinPrice);
    if (newMaxPrice < PRICE_MAX) setMaxPrice(newMaxPrice);

    if (window.location.hash === "#browse-catalog") {
      const element = document.getElementById("browse-catalog");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  const updateQueryParams = (
    categories: string[],
    regions: string[],
    minPrice: number,
    maxPrice: number,
  ) => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    if (categories.length > 0) {
      params.set("category", categories.join(","));
    }
    if (regions.length > 0) {
      params.set("regions", regions.join(","));
    }
    if (minPrice > PRICE_MIN) {
      params.set("minPrice", minPrice.toString());
    }
    if (maxPrice < PRICE_MAX) {
      params.set("maxPrice", maxPrice.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  };

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    updateQueryParams(updated, selectedRegions, minPrice, maxPrice);
  };

  const handleRegionToggle = (region: string) => {
    const updated = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];
    setSelectedRegions(updated);
    updateQueryParams(selectedCategories, updated, minPrice, maxPrice);
  };

  const handlePriceChange = (newMinPrice: number, newMaxPrice: number) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    updateQueryParams(
      selectedCategories,
      selectedRegions,
      newMinPrice,
      newMaxPrice,
    );
  };
  const filteredBooks = BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = book.price >= minPrice && book.price <= maxPrice;

    const topCategories = getTopCategories();
    let categoryToCheck = book.category;

    // If book category is not in top 4, treat it as "Other"
    if (!topCategories.hasOwnProperty(book.category)) {
      categoryToCheck = "Other";
    }

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(categoryToCheck);

    const topRegions = getTopRegions();
    let regionToCheck = book.region;

    // If book region is not in top 3, treat it as "Other"
    if (!topRegions.hasOwnProperty(book.region)) {
      regionToCheck = "Other";
    }

    const matchesRegion =
      selectedRegions.length === 0 || selectedRegions.includes(regionToCheck);

    return matchesSearch && matchesPrice && matchesCategory && matchesRegion;
  });

  // Sort filtered books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "relevance") {
      // Sort by rating (descending) for relevance
      return b.rating - a.rating;
    } else if (sortBy === "newest") {
      // Sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "price") {
      // Sort by price (low to high)
      return a.price - b.price;
    }
    return 0;
  });

  const leftPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const rightPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="bg-background text-foreground min-h-screen font-sans relative">
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
              <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-white text-xs font-bold uppercase tracking-wider w-fit backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Book of the Month
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white">
                The Future of Artificial Minds
              </h1>
              <p className="text-white/80 text-lg mb-8 max-w-xl leading-relaxed">
                Explore the ethical boundaries of AI in Dr. Sarah Chen&apos;s
                groundbreaking new analysis. A must-read for tech enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/service/store/${"details"}`}
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold flex items-center gap-2 transition-all"
                >
                  View Details <FiArrowRight />
                </Link>
                <button
                  className="h-12 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-lg font-bold transition-all cursor-pointer"
                  onClick={() => addToCart(BOOKS[0])}
                >
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
              <FiFilter className="text-primary" /> Filters
            </h3>

            <FilterGroup title="Genre">
              {Object.entries(getTopCategories()).map(([category, count]) => (
                <FilterItem
                  key={category}
                  label={category}
                  count={count}
                  checked={selectedCategories.includes(category)}
                  onToggle={handleCategoryToggle}
                />
              ))}
              <FilterItem
                label="Other"
                count={getOtherCategoryCount()}
                checked={selectedCategories.includes("Other")}
                onToggle={handleCategoryToggle}
              />
            </FilterGroup>

            <FilterGroup
              title="Region"
              className="mt-8 pt-8 border-t border-foreground/20"
            >
              {Object.entries(getTopRegions()).map(([region, count]) => (
                <FilterItem
                  key={region}
                  label={region}
                  count={count}
                  checked={selectedRegions.includes(region)}
                  onToggle={handleRegionToggle}
                />
              ))}
              <FilterItem
                label="Other"
                count={getOtherRegionCount()}
                checked={selectedRegions.includes("Other")}
                onToggle={handleRegionToggle}
              />
            </FilterGroup>

            <div className="mt-8 pt-8 border-t border-foreground/20">
              <h4 className="font-semibold mb-4">Price Range</h4>

              <div className="relative h-3 w-full bg-foreground/10 rounded-full mb-4">
                {/* Progress Bar (The active track) */}
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${Math.max(0, rightPercent - leftPercent)}%`,
                  }}
                />

                {/* Hidden Range Inputs for logic */}
                {[
                  {
                    value: minPrice,
                    setter: setMinPrice,
                    limit: maxPrice - 1,
                    isMin: true,
                  },
                  {
                    value: maxPrice,
                    setter: setMaxPrice,
                    limit: minPrice + 1,
                    isMin: false,
                  },
                ].map((thumb, index) => (
                  <input
                    key={index}
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    value={thumb.value}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      const newVal = thumb.isMin
                        ? Math.min(v, thumb.limit)
                        : Math.max(v, thumb.limit);
                      const newMin = thumb.isMin ? newVal : minPrice;
                      const newMax = thumb.isMin ? maxPrice : newVal;
                      handlePriceChange(newMin, newMax);
                    }}
                    className="absolute inset-0 w-full h-3 appearance-none pointer-events-auto bg-transparent 
        /* Webkit Thumbs (Chrome, Safari, Edge) */
        [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 
        [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full 
        [&::-webkit-slider-thumb]:bg-primary 
        [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-background 
        [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
        
        /* Firefox Thumbs */
        [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-10 
        [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
        [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-background 
        [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary 
        [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                  />
                ))}
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
                  <FiFilter className="text-primary" /> Filters
                </h3>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="text-foreground/40 hover:text-foreground text-2xl"
                >
                  ×
                </button>
              </div>

              <FilterGroup title="Genre">
                {Object.entries(getTopCategories()).map(([category, count]) => (
                  <FilterItem
                    key={category}
                    label={category}
                    count={count}
                    checked={selectedCategories.includes(category)}
                    onToggle={handleCategoryToggle}
                  />
                ))}
                <FilterItem
                  label="Other"
                  count={getOtherCategoryCount()}
                  checked={selectedCategories.includes("Other")}
                  onToggle={handleCategoryToggle}
                />
              </FilterGroup>

              <FilterGroup
                title="Region"
                className="mt-8 pt-8 border-t border-foreground/20"
              >
                {Object.entries(getTopRegions()).map(([region, count]) => (
                  <FilterItem
                    key={region}
                    label={region}
                    count={count}
                    checked={selectedRegions.includes(region)}
                    onToggle={handleRegionToggle}
                  />
                ))}
                <FilterItem
                  label="Other"
                  count={getOtherRegionCount()}
                  checked={selectedRegions.includes("Other")}
                  onToggle={handleRegionToggle}
                />
              </FilterGroup>

              <div className="mt-8 pt-8 border-t border-foreground/20">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="relative h-3 w-full bg-background/80 rounded-full mb-4">
                  <div
                    className="absolute h-full bg-primary rounded-full"
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
                      handlePriceChange(v, maxPrice);
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
                      handlePriceChange(minPrice, v);
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
                className="w-full mt-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* --- Catalog Grid Area --- */}
        <section className="flex-1" id="browse-catalog">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Browse Catalog
              </h2>
              <p className="text-foreground/40 text-sm mt-1">
                Showing {sortedBooks.length} of {BOOKS.length} results
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

              <div
                className="relative flex-1 sm:flex-none order-2 md:order-1"
                ref={dropdownRef}
              >
                {/* Label/Trigger Box */}
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full  min-w-[180px] flex items-center justify-between gap-3 bg-background/80 border border-foreground/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary hover:border-foreground/50 transition-all cursor-pointer"
                >
                  <span className="font-medium">{currentLabel}</span>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* The Styled Dropdown Menu */}
                {isOpen && (
                  <ul className="absolute right-0 z-50 mt-2 w-full min-w-[180px] bg-background border border-foreground/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1.5">
                      {options.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsOpen(false);
                          }}
                          className={`
                  flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all
                  ${
                    sortBy === option.value
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                  }
                `}
                        >
                          {option.label}
                          {sortBy === option.value && <FiCheck size={14} />}
                        </li>
                      ))}
                    </div>
                  </ul>
                )}
              </div>

              {/* View mode toggle (all devices) */}
              <div className="flex bg-background/80 border border-foreground/30 rounded-lg p-1 order-1 md:order-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-all ${
                    viewMode === "grid"
                      ? "bg-primary/20 text-primary"
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
                      ? "bg-primary/20 text-primary"
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
          {sortedBooks.length === 0 ? (
            <div className="py-20 text-center text-foreground/40">
              <p className="text-lg">No books found matching your search.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {sortedBooks.map((book) => (
                <BookCard key={book.id} book={book} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-w-full">
              {sortedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  listView
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-foreground/20 pt-8 mb-20">
            <p className="text-foreground/40 text-sm">
              Showing{" "}
              <span className="text-foreground">1-{sortedBooks.length}</span> of{" "}
              {BOOKS.length}
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
  onAddToCart,
}: {
  book: Book;
  listView?: boolean;
  onAddToCart: (book: Book) => void;
}) => {
  if (listView) {
    return (
      <Link
        href={`/service/store/${book.id}`}
        className="group relative flex items-center gap-5 bg-background/70 rounded-xl overflow-hidden border border-foreground/20 hover:border-primary/50 transition-all duration-300 p-4 hover:bg-background/80"
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
              className={`absolute top-2 left-2 px-2 py-0.5 ${book.badgeColor || "bg-primary"} text-white text-[8px] font-bold rounded uppercase tracking-wider`}
            >
              {book.badge}
            </span>
          )}
        </div>

        {/* All Info - Center */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Category */}
          <span className="text-[10px] font-bold text-primary uppercase tracking-wide">
            {book.category}
          </span>

          {/* Title */}
          <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-red-700 transition-colors">
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

        <div className="absolute bottom-4 right-4  flex items-center gap-0">
          <button
            className="lg:hidden p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(book);
            }}
          >
            <FiShoppingCart size={16} />
          </button>

          <button
            className="hidden lg:flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-xs transition-all"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(book);
            }}
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
      className="group flex flex-col bg-background/70 rounded-xl overflow-hidden border border-foreground/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
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
            className={`absolute top-3 left-3 px-2 py-1 ${book.badgeColor || "bg-primary"} text-white text-[10px] font-bold rounded uppercase tracking-wider`}
          >
            {book.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-primary uppercase tracking-wide mb-1">
          {book.category}
        </span>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base leading-tight line-clamp-2 flex-1 group-hover:text-red-700 transition-colors">
            {book.title}
          </h3>
          <button
            className="p-1.5 text-foreground/40 hover:text-primary transition-colors shrink-0"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(book);
            }}
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
  onToggle,
}: {
  label: string;
  count?: number;
  checked?: boolean;
  onToggle: (label: string) => void;
}) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      className="rounded border-foreground/30 bg-background/80 text-primary focus:ring-0 focus:ring-offset-0"
      onChange={() => onToggle(label)}
    />
    <span className="text-foreground/40 group-hover:text-foreground text-sm transition-colors">
      {label}
    </span>
    {count !== undefined && count > 0 && (
      <span className="ml-auto text-[10px] text-foreground/50 bg-background/80 px-2 py-0.5 rounded-full">
        {count}
      </span>
    )}
  </label>
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
      ${active ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" : "border-foreground/20 text-foreground/40 hover:border-foreground/40 hover:text-foreground"}
      ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
  >
    {label || icon}
  </button>
);

export default BookStoreService;
