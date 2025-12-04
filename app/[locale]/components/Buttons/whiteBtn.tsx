import Link from "next/link";

const WhiteBtn = ({ title, link, className }: { title: string; link: string; className?: string }) => {
  return (
    <Link
      href={link}
      className={`px-4 py-3 w-full rounded-full font-semibold transition-colors duration-500 border border-gray-300 ${className}`}
    >
      {title}
    </Link>
  );
};

export default WhiteBtn;
