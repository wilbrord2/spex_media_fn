"use client";
import Headline from "../text/headline";
import ContentCard from "../card/contentCard";
import RedirectionBtn from "../Buttons/redirectionBtn";
import { ContentItem } from "@/lib/dto";

interface BusinesReviewSectionProps {
  reviews: ContentItem[];
}

const BusinesReviewSection = ({ reviews }: BusinesReviewSectionProps) => {
  const latestReviews = [...reviews]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);
  const hasReviews = latestReviews.length > 0;

  return (
    <div className="p-8 space-y-16 flex flex-col items-center justify-center">
      <Headline
        title="This Week in Business Weekly Review"
        description="Stay informed with our curated selection of the most impactful African business stories, market analysis, and leadership insights."
      />

      {hasReviews ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {reviews.map((review) => (
              <ContentCard
                url={`/review/${review.id}`}
                key={review.id}
                id={review.id}
                title={review.title}
                description={review.content}
                img={review.coverImage}
                category={review.category.name}
                name={review.authorName || "Unknown Author"}
                date={review.createdAt}
              />
            ))}
          </div>
          <RedirectionBtn title="View All Weekly Reviews" link="/review" />
        </>
      ) : (
        <div className="flex flex-col items-center space-y-4 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No reviews available this week — stay tuned for fresh insights and
            stories coming soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default BusinesReviewSection;
