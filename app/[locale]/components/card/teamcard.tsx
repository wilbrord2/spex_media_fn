// components/TeamCard.tsx
import React from "react";

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  description: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  image,
  name,
  role,
  description,
}) => {
  return (
    <div className="bg-white dark:bg-card rounded-2xl shadow-sm p-10 flex flex-col items-center text-center hover:shadow-md transition-all">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full object-cover mb-6"
      />

      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{name}</h3>

      <p className="text-primary font-medium mt-1">{role}</p>

      <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
};

export default TeamCard;
