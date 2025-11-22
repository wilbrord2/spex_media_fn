"use client";

import { useState } from "react";
import ContentCard from "../card/contentCard";
import { ArticlesData } from "@/app/constants";

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
    <section className="w-full max-w-6xl mx-auto py-16">
      <h2 className="text-center text-2xl font-bold mb-2">Latest Articles</h2>
      <p className="text-center text-gray-600 mb-8">
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
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((item, index) => (
          <ContentCard
            key={index}
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
      <div className="flex justify-center mt-10">
        <button className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition">
          Load More Articles
        </button>
      </div>
    </section>
  );
}
