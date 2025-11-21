"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-fit px-3 py-2 font-bold text-sm rounded-md border dark:bg-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="lg:hidden">
        {theme === "dark" ? "☀️ Light Theme" : "🌑 Dark Theme"}
      </span>
      <span className=" hidden lg:flex text-lg">
        {theme === "dark" ? <CiLight /> : <MdDarkMode />}
      </span>
    </button>
  );
}
