import React from "react";
import RedirectionRedBtn from "../../components/Buttons/redirectionRedBtn";
import image from "@/public/images/bnreview1.jpeg";

const BusinessReview = () => {
  return (
    <div className="bg-linear-to-br from-slate-900 via-slate-800 to-red-900 h-screen">
      <div className="flex items-center justify-center p-10 max-width-container">
        <div className="flex flex-col gap-4">
          <span className="text-white w-fit bg-secondary font-semibold px-4 py-2 rounded-full shadow">
            Latest Issues-January
          </span>

          <h1 className="text-6xl font-bold text-white">
            Business Weekly Review
          </h1>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            Your essential guide to African business, featuring in-depth
            analysis, market insights, and exclusive interviews with continental
            leaders.
          </p>
          <div className="space-x-4">
            <RedirectionRedBtn title="Subscribe Now" link="#" />
            <RedirectionRedBtn title="Register Now" link="#" />
          </div>
        </div>

        <div className="bg-white dark:bg-card space-y-3 w-[50%]  group hover:rotate-0 duration-300 rotate-4 flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">SPeX</h2>
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
                Rwanda's Digital Revolution: How the Land of a Thousand Hills
                Became Africa's Silicon Valley
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
  );
};

export default BusinessReview;
