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
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -4 }}
        className="group cursor-pointer relative w-full h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 bg-white dark:bg-slate-800"
      >
        {/* Image Container with Aspect Ratio */}
        <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            priority={false}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/0 to-black/20 group-hover:from-black/10 transition-all duration-500" />
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-primary group-hover:bg-secondary text-xs text-white py-1.5 px-3 font-semibold rounded-full shadow-md transition-colors duration-300 z-10">
          {category}
        </div>

        {/* Content Container */}
        <div className="p-5 flex flex-col justify-between min-h-48 gap-3">
          {/* Title */}
          <h2 className="text-2xl group-hover:text-secondary font-bold leading-tight dark:text-gray-100 text-gray-900 dark:group-hover:text-secondary transition-colors duration-500 shrink-0">
            {title}
          </h2>

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <span className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <FaRegUser size={14} className="text-primary" />
              <span className="font-medium truncate">{name}</span>
            </span>
            <span className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <CiCalendar size={16} className="text-primary shrink-0" />
              <span className="font-medium">
                {new Date(date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ContentCard;
