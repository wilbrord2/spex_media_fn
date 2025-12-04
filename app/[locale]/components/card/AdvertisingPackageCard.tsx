import React from "react";

interface AdvertisingPackageCardProps {
  title: string;
  description: string;
  pricing: string;
  classname: string;
}

const AdvertisingPackageCard = ({
  title,
  description,
  pricing,
  classname,
}: AdvertisingPackageCardProps) => {
  return (
    <div className={`rounded-lg bg-white dark:bg-gray-800 p-6 border ${classname} shadow-lg hover:shadow-md transition-shadow`}>
      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
        {pricing}
      </div>
    </div>
  );
};

export default AdvertisingPackageCard;
