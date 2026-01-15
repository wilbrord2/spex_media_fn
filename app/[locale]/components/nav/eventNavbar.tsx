"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { FiSearch, FiLoader } from "react-icons/fi";
import { Navbar } from "@/app/[locale]/components/nav/navbar";

// Search component to be passed as rightContent
const SearchComponent = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`?${params.toString()}${term ? "#upcoming-events" : ""}`);
  };

  return (
    <div className="relative flex items-center group">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" />
      <input
        placeholder="Search events..."
        className="bg-foreground/5 border border-transparent focus:border-primary rounded-full py-2 pl-10 pr-4 text-sm w-full md:w-48 md:focus:w-72 transition-all outline-none"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

const EventNavbarContent = () => {
  const params = useParams();
  const isEventMainPage = !params.eventId;

  const leftContent = (
    <Link
      href="/service/event"
      className="text-xl font-bold tracking-tight flex items-center gap-2"
    >
      <span className="text-foreground">Nexus</span>
      <span className="text-primary">Events</span>
    </Link>
  );

  return (
    <Navbar
      leftContent={leftContent}
      rightContent={isEventMainPage ? [<SearchComponent key="search" />] : []}
    />
  );
};

export default function EventNavbar() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <FiLoader className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <EventNavbarContent />
    </Suspense>
  );
}