'use client'
import { useRouter } from "@/i18n/navigation";

const RedirectionBtn = ({ title, link }: { title: string; link: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(link)}
      className="cursor-pointer px-4 py-3 border border-primary hover:border-primary rounded-xl text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-500"
    >
      {title}
    </button>
  );
};

export default RedirectionBtn;
