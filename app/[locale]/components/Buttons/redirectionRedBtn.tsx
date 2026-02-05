"use client";
import { useRouter } from "@/i18n/navigation";

const RedirectionRedBtn = ({
  title,
  link,
}: {
  title: string;
  link: string;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(link)}
      className="cursor-pointer px-4 py-3 border border-secondary hover:border-secondary rounded-xl text-secondary font-semibold hover:bg-secondary hover:text-white transition-colors duration-500"
    >
      {title}
    </button>
  );
};

export default RedirectionRedBtn;
