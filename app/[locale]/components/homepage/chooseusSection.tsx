import React from "react";
import Headline from "../text/headline";
import { OurMotivesData } from "@/app/constants";
import { FiCheck } from "react-icons/fi";
import ChooseusImage from "@/public/images/chooseus.jpeg";
import RedirectionBtn from "../Buttons/redirectionBtn";

const ChooseusSection = () => {
  return (
    <div className="lg:px-8 px-4 py-6 lg:py-20 space-y-16">
      <Headline
        title="Why Choose Inama?"
        description="We combine deep African market knowledge with global best practices to deliver exceptional results for our clients across the continent."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content Section */}
        <div className="space-y-8 order-2 lg:order-1">
          {/* Introduction Text */}
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 font-medium">
              At Inama Media, we believe in the power of authentic African
              voices.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              From our strategic hub in Kigali, Rwanda, we are committed to
              delivering exceptional media and advisory services that amplify
              African narratives and drive meaningful business impact.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OurMotivesData.map((feature, index) => (
              <div
                key={index}
                className="group relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-2">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                    <FiCheck className="text-primary w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <RedirectionBtn title="Learn More About Us" link="/about" />
          </div>
        </div>

        {/* Image Section */}
        <div className="order-1 lg:order-2">
          <div className="relative group">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5 rounded-xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <img
                src={ChooseusImage.src}
                alt="Inama Media - Why Choose Us"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseusSection;
