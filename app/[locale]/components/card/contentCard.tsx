'use client";';
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";

const ContentCard = ({
  id,
  title,
  description,
  img,
  category,
  name,
  date,
}: {
  id: number;
  title: string;
  description: string;
  img: string;
  category: string;
  name: string;
  date: string;
}) => {
  return (
    <Link href={`/review/${id}/`}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="group cursor-pointer relative w-full  border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500"
      >
        <div className="overflow-hidden rounded-t-md">
          <Image
            src={img}
            alt={title}
            className="w-full h-48 object-cover  group-hover:scale-105 transition-transform duration-500"
            width={400}
            height={192}
          />
        </div>
        <div className="absolute top-2 left-2 bg-primary group-hover:bg-secondary text-sm text-white mb-2 py-1 px-2 font-semibold rounded-full">
          {category}
        </div>
        <div className=" p-4 ">
          <h2 className="text-2xl font-semibold mb-2 dark:text-gray-300 text-primary dark:group-hover:text-primary group-hover:text-secondary transition-colors duration-500">
            {title}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4 line-clamp-3">
            {description}
          </p>
          <div className="text-sm text-gray-500 flex items-center justify-between">
            <span className="mr-4 flex items-baseline gap-1">
              <FaRegUser />
              {name}
            </span>{" "}
            <span className="flex items-center gap-1">
              <CiCalendar />
              {date}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ContentCard;
