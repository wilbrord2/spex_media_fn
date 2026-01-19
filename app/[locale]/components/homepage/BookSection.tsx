"use client";
import Headline from "../text/headline";
import ContentCard from "../card/contentCard";
import RedirectionBtn from "../Buttons/redirectionBtn";

const booksData = [
  {
    id: 1,
    title: "The Digital Age Marketer",
    description:
      "A comprehensive guide to navigating the modern marketing landscape.",
    img: "/images/bnreview1.jpeg",
    category: "Marketing",
    name: "John Doe",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Startup Blueprint",
    description: "From idea to execution, the ultimate startup playbook.",
    img: "/images/bnreview2.jpeg",
    category: "Business",
    name: "Jane Smith",
    date: "2022-11-20",
  },
  {
    id: 3,
    title: "Leadership in Focus",
    description: "Developing the next generation of African leaders.",
    img: "/images/bnreview3.jpeg",
    category: "Leadership",
    name: "Samuel King",
    date: "2023-01-30",
  },
  {
    id: 4,
    title: "Economic Outlook: Africa",
    description:
      "An in-depth analysis of economic trends shaping the continent.",
    img: "/images/bnreview4.jpeg",
    category: "Economics",
    name: "Adaobi Nwosu",
    date: "2023-08-01",
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
          <ContentCard
            url={`/service/store/${book.id}`}
            key={book.id}
            id={book.id}
            title={book.title}
            description={book.description}
            img={book.img}
            category={book.category}
            name={book.name}
            date={book.date}
          />
        ))}
      </div>
      <RedirectionBtn title="Visit Our Book Store" link="/service/store" />
    </div>
  );
};

export default BookSection;
