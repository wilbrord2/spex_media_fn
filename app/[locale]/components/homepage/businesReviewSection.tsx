"use client";
import Headline from "../text/headline";
import ContentCard from "../card/contentCard";
import { BusinesReviewData } from "@/app/constants";
import RedirectionBtn from "../Buttons/redirectionBtn";

const BusinesReviewSection = () => {
  return (
    <div className="p-8 space-y-16 flex flex-col items-center justify-center">
      <Headline
        title="This Week in Business Weekly Review"
        description="Stay informed with our curated selection of the most impactful African business stories, market analysis, and leadership insights."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {BusinesReviewData.map((review, index) => (
          <ContentCard
            key={review.id}
            id={review.id}
            title={review.title}
            description={review.description}
            img={review.img.src}
            category={review.category}
            name={review.name}
            date={review.date}
          />
        ))}
      </div>
      <RedirectionBtn title="View All Weekly Reviews" link="/review" />
    </div>
  );
};

export default BusinesReviewSection;
