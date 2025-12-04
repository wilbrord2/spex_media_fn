import React from "react";

interface PartnerCardProps {
  name: string;
  logoUrl?: string;
}

const PartnerCard = ({ name, logoUrl }: PartnerCardProps) => {
  return (
    <div className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      {logoUrl ? (
        <img src={logoUrl} alt={name} className="h-12 object-contain" />
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold text-center">
          {name}
        </div>
      )}
    </div>
  );
};

export default PartnerCard;
