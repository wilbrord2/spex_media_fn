"use client";
import Headline from "../text/headline";
import BookCard from "../card/BookCard";
import RedirectionBtn from "../Buttons/redirectionBtn";
import { Book } from "../card/BookCard";

const booksData: Book[] = [
  {
    id: 1,
    title: "The Digital Age Marketer",
    author: "John Doe",
    image: "/images/bnreview1.jpeg",
    category: "Marketing",
    price: 19.99,
    rating: 4,
  },
  {
    id: 2,
    title: "Startup Blueprint",
    author: "Jane Smith",
    image: "/images/bnreview2.jpeg",
    category: "Business",
    price: 24.99,
    rating: 5,
  },
  {
    id: 3,
    title: "Leadership in Focus",
    author: "Samuel King",
    image: "/images/bnreview3.jpeg",
    category: "Leadership",
    price: 29.99,
    rating: 4.5,
  },
  {
    id: 4,
    title: "Economic Outlook: Africa",
    author: "Adaobi Nwosu",
    image: "/images/bnreview4.jpeg",
    category: "Economics",
    price: 39.99,
    rating: 4,
  },
];

const BookSection = () => {
  return (
    <div className="p-8 space-y-16 flex flex-col items-center justify-center">
      <Headline
        title="Featured Books from Our Store"
        description="Explore our curated collection of books on business, leadership, and marketing from influential authors."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {booksData.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
      <RedirectionBtn title="Visit Our Book Store" link="/service/store" />
    </div>
  );
};

export default BookSection;
