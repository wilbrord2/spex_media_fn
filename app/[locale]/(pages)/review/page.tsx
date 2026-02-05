import React, { Suspense } from "react";
import RedirectionRedBtn from "../../components/Buttons/redirectionRedBtn";
import image from "@/public/images/bnreview1.jpeg";
import { VideoData } from "@/app/constants";
import VideoCard from "../../components/card/videoCard";
import ArticlesSection from "../../components/review/reviewSection";
import { FiLoader } from "react-icons/fi";

const BusinessReviewContent = () => {
  return (
    <>
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-red-900 lg:h-screen">
        <div className="flex items-center justify-center gap-6 p-10 max-width-container">
          <div className="flex flex-col gap-4">
            <span className="text-white w-fit bg-secondary font-semibold px-4 py-2 rounded-full shadow">
              Latest Issues-January
            </span>

            <h1 className="text-6xl font-bold text-white">
              Business Weekly Review
            </h1>
            <p className="text-gray-300 leading-relaxed max-w-3xl">
              Your essential guide to African business, featuring in-depth
              analysis, market insights, and exclusive interviews with
              continental leaders.
            </p>
            <div className="gap-4 flex flex-wrap">
              <RedirectionRedBtn title="Subscribe Now" link="#" />
              <RedirectionRedBtn title="Register Now" link="#" />
            </div>
          </div>

          <div className="max-lg:hidden bg-white dark:bg-card space-y-3 w-[50%]  group hover:rotate-0 duration-300 rotate-4 flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-4">nexus</h2>
              <p>BUSINESS WEEKLY REVIEW</p>
              <span>January 12-21, 2025 | issue#46 </span>
            </div>
            <div className="relative w-full mb-4">
              <img
                src={image.src}
                alt="Business Review"
                className="w-full h-[50vh] rounded-lg shadow-md"
              />
              <div className="absolute bg-black/30 bottom-4 left-4 text-white p-4 rounded">
                <h1 className="font-bold text-lg">Cover Story</h1>
                <p>
                  Rwanda&apos;s Digital Revolution: How the Land of a Thousand
                  Hills Became Africa&apos;s Silicon Valley
                </p>
              </div>
            </div>
            <div className="w-full">
              <ul className="">
                <li>* Banking Transformation</li>
                <li>* Agribusiness Innovation</li>
                <li>* Leadership Insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="py-20 px-8 bg-[#ECF0F3] dark:bg-gray-950">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <h2 className="text-3xl font-bold">nexus TV</h2>
          </div>

          <p className="max-w-2xl mx-auto mb-10">
            Exclusive video content featuring industry leaders, market analysis,
            and behind-the-scenes coverage of Africa’s business transformation.
          </p>

          {/* Video Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {VideoData.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
        </div>
      </section>

      
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Share Your Insights</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Become a contributor and share your expertise with our community. Write a review, an article, or an analysis on business trends in Africa.
        </p>
        <RedirectionRedBtn title="Write a Review" link="/review/create" />
      </div>

      <ArticlesSection />
    </>
  );
};

export default function BusinessReview() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <FiLoader className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <BusinessReviewContent />
    </Suspense>
  );
}
