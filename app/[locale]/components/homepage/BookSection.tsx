"use client";
import { useEffect, useState } from "react";
import Headline from "../text/headline";
import BookCard from "../card/BookCard";
import RedirectionBtn from "../Buttons/redirectionBtn";
import { Book } from "../card/BookCard";
import { getAdminBooks, BookResponse } from "@/app/actions/book";

const BookSection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setError(false);
      try {
        const data: BookResponse | null = await getAdminBooks();

        if (data && data.books) {
          const mappedBooks: Book[] = data.books
            .sort(
              (a, b) =>
                new Date(b.releaseDate).getTime() -
                new Date(a.releaseDate).getTime(),
            )
            .slice(0, 4)
            .map((b) => ({
              id: b.id,
              title: b.title,
              author: b.authorName,
              image: b.coverImage,
              category: b.category?.name || "General",
              price: b.pricePhysicalBook || b.priceDigitalDownload,
              rating: b.averageRating,
              createdAt: new Date(b.createdAt),
            }));
          setBooks(mappedBooks);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-8 space-y-16 flex flex-col items-center justify-center">
      <Headline
        title="Featured Books from Our Store"
        description="Explore our curated collection of books on business, leadership, and marketing from influential authors."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <BookSkeleton key={i} />)
        ) : error ? (
          <div className="col-span-full text-center py-10 text-foreground/50 font-bold uppercase tracking-widest text-xs">
            Failed to load books. Please try again later.
          </div>
        ) : (
          books.map((book) => <BookCard book={book} key={book.id} />)
        )}
      </div>
      <RedirectionBtn title="Visit Our Book Store" link="/service/store" />
    </div>
  );
};

const BookSkeleton = () => (
  <div className="flex flex-col bg-background/70 rounded-xl overflow-hidden border border-foreground/10 h-full animate-pulse">
    <div className="relative aspect-[2/2.2] bg-foreground/5" />
    <div className="p-4 flex flex-col flex-1 space-y-3">
      <div className="h-2 w-16 bg-primary/20 rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-foreground/10 rounded" />
        <div className="h-4 w-2/3 bg-foreground/10 rounded" />
      </div>
      <div className="h-3 w-24 bg-foreground/5 rounded" />
      <div className="mt-auto flex justify-between items-center">
        <div className="h-6 w-12 bg-foreground/10 rounded" />
        <div className="h-3 w-16 bg-foreground/5 rounded" />
      </div>
    </div>
  </div>
);

export default BookSection;
