"use client";

import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiStar } from "react-icons/fi";

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  category: string;
  region?: string;
  image: string;
  rating: number;
  badge?: string;
  badgeColor?: string;
  createdAt?: Date;
}

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link
      href={`/service/store/${book.id}`}
      className="group flex flex-col bg-background/70 rounded-xl overflow-hidden border border-foreground/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 h-full"
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
            className={`absolute top-3 left-3 px-2 py-1 ${
              book.badgeColor || "bg-primary"
            } text-white text-[10px] font-bold rounded uppercase tracking-wider`}
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
          {/* Add to cart button is removed as per instruction */}
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

export default BookCard;