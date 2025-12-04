"use client";

import { useState } from "react";
import ContentCard from "../card/contentCard";
import { ArticlesData } from "@/app/constants";
import RedirectionBtn from "../Buttons/redirectionBtn";

const categories = [
  "All",
  "Finance",
  "Technology",
  "Agribusiness",
  "Energy",
  "Healthcare",
  "Manufacturing",
];

export default function ArticlesSection() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? ArticlesData
      : ArticlesData.filter((item) => item.category === active);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-8 dark:bg-background">
      <h2 className="text-center text-2xl font-bold mb-2">Latest Articles</h2>
      <p className="text-center mb-8">
        Stay informed with our comprehensive coverage of African business
        sectors
      </p>
      {/* Category Buttons */}
      <div className="flex justify-center gap-3 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              active === cat
                ? "bg-primary text-white dark:bg-gray-900"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Articles Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <ContentCard
            id={item.id}
            key={item.id}
            category={item.category}
            date={item.date}
            description={item.description}
            title={item.title}
            img={item.img}
            name={item.name}
          />
        ))}
      </div>
      {/* Load More */}
      <div className="flex justify-center">
        <RedirectionBtn title="Load More Articles" link="#" />
      </div>
    </section>
  );
}
