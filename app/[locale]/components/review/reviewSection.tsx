"use client";

import { useState, useEffect } from "react";
import ContentCard from "../card/contentCard";
import RedirectionBtn from "../Buttons/redirectionBtn";
import { getContentList, getCategories } from "@/app/actions/review";
import { ContentItem, Category } from "@/lib/dto";

export default function ArticlesSection() {
  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<number | null>(null); // Stores Category ID, null means "All"
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initial Load: Categories only
  useEffect(() => {
    async function loadInitialData() {
      const categoriesData = await getCategories();
      if (categoriesData) {
        setCategories(categoriesData?.items || []);
      }
    }
    loadInitialData();
  }, []);

  // Fetch articles whenever Category or Page changes
  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      // Params: page, role ("public"), categoryId (active)
      const contentData = await getContentList(
        1,
        "public",
        active || undefined,
      );
      if (contentData) {
        setArticles(contentData.contentList || []);
        setPage(1); // Reset page to 1 on category change
      }
      setLoading(false);
    }
    fetchContent();
  }, [active]);

  const loadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const contentData = await getContentList(
      nextPage,
      "public",
      active || undefined,
    );

    if (contentData?.contentList?.length) {
      setArticles((prev) => [...prev, ...contentData.contentList]);
      setPage(nextPage);
    }

    setLoadingMore(false);
  };

  if (loading && page === 1)
    return <div className="text-center py-16">Loading...</div>;

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4  py-16 space-y-8 dark:bg-background">
      <h2 className="text-center text-3xl font-bold mb-4">Articles</h2>
      <p className="text-center mb-8">
        Stay informed with our comprehensive coverage of African business
        sectors
      </p>

      {/* Category Buttons */}
      <div className="flex justify-center gap-3 flex-wrap mb-10">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            active === null
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              active === cat.id
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
        {articles.length > 0 ? (
          articles.map((item) => (
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
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-600">
            No articles available yet — check back soon for fresh insights!
          </div>
        )}
      </div>

      {/* Load More */}
      {articles.length > 0 && (
        <div className="flex justify-center">
          <div onClick={loadMore}>
            <RedirectionBtn
              title={loadingMore ? "Loading..." : "Load More Articles"}
              link="#"
            />
          </div>
        </div>
      )}
    </section>
  );
}
