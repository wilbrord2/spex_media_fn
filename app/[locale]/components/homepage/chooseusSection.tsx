import React from "react";
import Headline from "../text/headline";
import { OurMotivesData } from "@/app/constants";
import { CiCircleCheck } from "react-icons/ci";
import ChooseusImage from "@/public/images/chooseus.jpeg";
import RedirectionBtn from "../Buttons/redirectionBtn";

const ChooseusSection = () => {
  return (
    <div className="lg:px-8 px-4 py-6 lg:py-16 space-y-16 ">
      <Headline
        title="Why Choose nexus Media?"
        description="We combine deep African market knowledge with global best practices to deliver exceptional results for our clients across the continent."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8">
        <div className="space-y-6">
          <h1 className="text-xl font-medium text-gray-600 dark:text-gray-300">
            At nexus Media, we believe in the power of authentic African voices.
            From our strategic hub in Kigali, Rwanda, we are committed to
            delivering.
          </h1>
          <div className="space-y-4">
            {OurMotivesData.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-lg">
                <CiCircleCheck className="text-primary" size={35} />
                <div className="flex items-center gap-1">
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <RedirectionBtn title="Learn More About Us" link="/about" />
        </div>
        <div className="">
          <img
            src={ChooseusImage.src}
            alt="Choose Us Image"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseusSection;
