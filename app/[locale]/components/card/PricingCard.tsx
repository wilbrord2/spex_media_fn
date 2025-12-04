import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export interface PricingCardProps {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  description: string;
  badge?: string;
  buttonText: string;
  trial?: string;
  features: string[];
}

const PricingCard = ({
  id,
  title,
  price,
  priceLabel,
  description,
  badge,
  buttonText,
  trial,
  features,
}: PricingCardProps) => {
  return (
    <div
      className={`${
        id === "pro"
          ? "lg:scale-y-130 bg-primary dark:bg-primary text-white  shadow-2xl xl:w-1/4 "
          : "bg-white w-fit"
      } p-6  dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`text-base ${
            id === "pro" ? "text-white" : "text-gray-500 dark:text-gray-400"
          } font-semibold`}
        >
          {title}
        </div>
        {badge && (
          <div className="text-white bg-[#1760bf] font-medium text-xs px-2 py-1 rounded">
            {badge}
          </div>
        )}
      </div>

      <div
        className={`text-3xl font-bold my-4 ${
          id === "pro" ? "" : "text-gray-900 dark:text-white"
        } `}
      >
        $ {price.toLocaleString()}
      </div>

      <p className="max-w-xs">{description}</p>

      <div className={`${id === "pro" ? "" : ""} py-4 w-full`}>
        <button
          className={` ${
            id === "pro" ? "bg-[#1760bf] p-2" : "bg-[#1760bf] text-white p-3"
          }  text-sm text-center font-medium rounded-lg w-full cursor-pointer hover:bg-[#1760bf]/80 duration-300`}
        >
          {buttonText}
        </button>
      </div>

      <h1 className="pb-3 font-bold">What's included:</h1>

      <ul
        className={`text-sm ${
          id === "pro" ? "" : "text-gray-700 dark:text-gray-300"
        } space-y-2`}
      >
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span
              className={`${
                id === "pro"
                  ? "text-white "
                  : "text-gray-700 dark:text-gray-300"
              } mt-1`}
            >
              <FaCheckCircle />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
