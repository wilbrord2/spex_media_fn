import { Link } from "@/i18n/navigation";
import React from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const MainServiceCard = ({
  image,
  title,
  description,
  link,
}: {
  image: string;
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <article className="group relative block rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300">
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute left-4 bottom-4 bg-white/90 dark:bg-gray-900/70 px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white">
            {title}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Learn more about this service
            </span>
            <div className="ml-4 inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white rounded-full px-3 py-2 text-sm font-semibold transition-transform transform group-hover:translate-x-1">
              <span>Explore</span>
              <FaArrowRightLong />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MainServiceCard;
