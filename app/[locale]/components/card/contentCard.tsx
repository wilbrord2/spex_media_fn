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
  url,
}: {
  id: number;
  title: string;
  description: string;
  img: string;
  category: string;
  name: string;
  date: string;
  url?: string;
}) => {
  return (
    <Link href={`${url}`}>
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
        <div className=" p-4 flex flex-col gap-3 h-32">
          <h2 className="text-xl font-semibold mb-2 dark:text-gray-300 text-primary dark:group-hover:text-primary group-hover:text-secondary transition-colors duration-500 line-clamp-2 flex-1">
            {title}
          </h2>
          <div className="text-xs text-gray-500 flex items-center justify-between">
            <span className="mr-4 flex items-baseline gap-1">
              <FaRegUser size={15} />
              {name}
            </span>{" "}
            <span className="flex items-center gap-1">
              <CiCalendar size={20} />
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ContentCard;
