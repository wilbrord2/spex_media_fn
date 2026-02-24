"use client";

import { useState, useEffect } from "react";
import ContentCard from "../card/contentCard";
import RedirectionBtn from "../Buttons/redirectionBtn";
import { getContentList, getCategories } from "@/app/actions/review";
import { ContentItem, Category } from "@/lib/dto";

export default function ArticlesSection() {
  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [contentData, categoryData] = await Promise.all([
        getContentList(1),
        getCategories(),
      ]);
      if (contentData) setArticles(contentData.contentList);
      if (categoryData) setCategories(categoryData);
      setLoading(false);
    }
    loadData();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const contentData = await getContentList(nextPage);

    if (contentData?.contentList?.length) {
      setArticles((prev) => [...prev, ...contentData.contentList]);
      setPage(nextPage);
    }

    setLoadingMore(false);
  };

  const filtered =
    active === "All"
      ? articles
      : articles.filter((item) => item.category?.name === active);

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-8 dark:bg-background">
      <h2 className="text-center text-2xl font-bold mb-2">Latest Articles</h2>
      <p className="text-center mb-8">
        Stay informed with our comprehensive coverage of African business
        sectors
      </p>

      {/* Category Buttons */}
      <div className="flex justify-center gap-3 flex-wrap mb-10">
        <button
          onClick={() => setActive("All")}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            active === "All"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.name)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              active === cat.name
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <ContentCard
            id={item.id}
            key={item.id}
            url={`/review/${item.id}`}
            category={item.category?.name}
            date={new Date(item.createdAt).toLocaleDateString()}
            description={""}
            title={item.title}
            img={item.coverImage}
            name={item.authorName || "Unknown Author"}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <div onClick={loadMore}>
          <RedirectionBtn
            title={loadingMore ? "Loading..." : "Load More Articles"}
            link="#"
          />
        </div>
      </div>
    </section>
  );
}
