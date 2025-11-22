import Image from "next/image";
import { PlayCircle } from "lucide-react";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  views: string;
  duration: string;
}

export default function VideoCard({
  thumbnail,
  title,
  views,
  duration,
}: VideoCardProps) {
  return (
    <div className="group text-start p-2 w-full max-w-sm cursor-pointer">
      <div className="relative h-48 w-full rounded-xl overflow-hidden">
        <Image src={thumbnail} alt={title} fill className="object-cover group-hover:scale-110 group-hover:grayscale-0 grayscale transition-transform duration-300" />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="text-white" size={60} strokeWidth={1.2} />
        </div>

        {/* Duration Tag */}
        <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {duration}
        </span>
      </div>

      <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-secondary">{title}</h3>
      <p className="text-gray-500 text-sm">{views} views</p>
    </div>
  );
}
