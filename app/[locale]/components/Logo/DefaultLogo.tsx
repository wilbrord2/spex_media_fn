"use client";

import Link from "next/link";

export default function Logo({
  withTagline = false,
  descriptor,
}: {
  withTagline?: boolean;
  descriptor?: string;
}) {
  return (
    <Link
      href="/"
      className="flex flex-col items-start relative text-[#0D1B2A] dark:text-white text-xl font-bold tracking-tight py-1"
    >
      {/* Logo Row */}
      <div className="flex items-baseline-last relative">
        {/* i */}
        <span className="flex flex-col relative -mr-0.5">
          {/* Artificial dot (theme-independent colors) */}
          <span className="w-2.5 h-2.5 rounded-full  relative animate-pulseDot bg-[linear-gradient(135deg,#1B4965_0%,#C2703E_50%,#D4A574_100%)]">
            <span className="absolute inset-0 rounded-full animate-rippleDot text-[#C2703E]" />
          </span>

          {/* i stem only (no default dot) */}
          <span className="not-italic self-center">I</span>
        </span>

        {/* nama */}
        <span className="leading-[0.85] text-2xl">nama {descriptor}</span>
      </div>

      {/* Tagline */}
      {withTagline && (
        <div className="leading-relaxed text-xs italic text-[#1B4965] dark:text-[#5FA8D3]">
          information to business insights!
        </div>
      )}
    </Link>
  );
}
