"use client";
import { Link, useRouter } from "@/i18n/navigation";
import { ThemeSwitchButton } from "../switch/themeSwitcher";
import LocaleSwitcher from "../switch/LocaleSwitcher";
import Logo from "@/public/logo/spexlogo.png";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { motion } from "motion/react";
import { useState } from "react";
import RightModal from "../model/rightSideModel";
import { useAppContext } from "../../context";
import CenterModal from "../model/centerModel";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const { setActiveModalId } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const t = useTranslations("NavItems");
  const s = useTranslations("Search");
  const navitems = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("reviews"), href: "/review" },
    { label: t("services"), href: "/service" },
    { label: t("insights"), href: "/insight" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full flex items-center justify-between py-2 px-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700">
      {/* desktop navbar */}
      <div className="hidden lg:flex items-center justify-between w-full">
        <Link href="/">
          <Image
            src={Logo}
            alt="Spex Logo"
            height={40}
            width={120}
            className="object-cover"
          />
        </Link>

        <div className="flex items-center gap-6 xl:gap-8">
          {navitems.map((item) => {
            if (item.href === "/service") {
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className="text-gray-600 font-semibold text-start hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 text-sm hover:font-bold border-b-2 duration-500 hover:transition-colors border-transparent pb-1 hover:border-b-2 hover:border-red-700"
                  >
                    {item.label}
                  </Link>

                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-1 group-hover:translate-y-0 transition-all z-50 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col py-1">
                      <Link
                        href="/service/publishing"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        Media and Publishing
                      </Link>
                      <Link
                        href="/service/store"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        Book Store
                      </Link>
                      <Link
                        href="/service/event"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        Event Management
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 font-semibold text-start  hover:text-gray-900 dark:text-gray-300 dark:hover:text-white  py-2 text-sm hover:font-bold border-b-2 duration-500 hover:transition-colors border-transparent pb-1  hover:border-b-2 hover:border-red-700"
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setActiveModalId("search-modal")}
            className="cursor-pointer flex items-center gap-2 hover:text-red-700 border-b hover:bg-red-100/20 hover:border-red-700 duration-500 transition-all border-gray-300 rounded-md px-2 py-3"
          >
            <IoIosSearch size={16} className="cursor-pointer " />
            <span className="lg:hidden xl:flex text-xs">
              {s("placeholder")}
            </span>
          </motion.div>
          <LocaleSwitcher />
          <ThemeSwitchButton />
        </div>
      </div>

      {/* mobile navbar */}
      <div className="lg:hidden flex items-center justify-between w-full">
        <Link href="/">
          <Image
            src={Logo}
            alt="Spex Logo"
            height={40}
            width={120}
            className="object-cover"
          />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModalId("mobile-menu")}
            aria-label="Open menu"
            className="p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
              <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
              <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
              <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <RightModal id="mobile-menu">
        <div className="flex flex-col gap-4 w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setActiveModalId("search-modal")}
            className="cursor-pointer w-full flex items-center gap-2 hover:text-red-700 border-b hover:bg-red-100/20 hover:border-red-700 duration-500 transition-all border-gray-300 rounded-md px-2 py-3"
          >
            <IoIosSearch size={16} className="cursor-pointer " />
            <span className="text-xs">Search...</span>
          </motion.div>

          <div className="flex flex-col items-start gap-2 w-full">
            {navitems.map((item) => {
              if (item.href === "/service") {
                return (
                  <div key={item.href} className="w-full">
                    <Link
                      href={item.href}
                      onClick={() => setActiveModalId(null)}
                      className="text-gray-600 font-semibold text-start hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 text-sm hover:font-bold border-b-2 duration-500 hover:transition-colors border-transparent pb-1 hover:border-b-2 hover:border-red-700"
                    >
                      {item.label}
                    </Link>

                    <div className="pl-4 flex flex-col">
                      <Link
                        href="/service/publishing"
                        onClick={() => setActiveModalId(null)}
                        className="text-gray-600 text-sm py-2 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        Media and Publishing
                      </Link>
                      <Link
                        href="/service/store"
                        onClick={() => setActiveModalId(null)}
                        className="text-gray-600 text-sm py-2 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        Book Store
                      </Link>
                      <Link
                        href="/service/event"
                        onClick={() => setActiveModalId(null)}
                        className="text-gray-600 text-sm py-2 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      >
                        Event Management
                      </Link>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveModalId(null)}
                  className="text-gray-600 font-semibold text-start  hover:text-gray-900 dark:text-gray-300 dark:hover:text-white  py-2 text-sm hover:font-bold border-b-2 duration-500 hover:transition-colors border-transparent pb-1  hover:border-b-2 hover:border-red-700"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <LocaleSwitcher />
          <ThemeSwitchButton />
        </div>
      </RightModal>

      <CenterModal id="search-modal">
        <div className="flex flex-col gap-2 bg-white dark:bg-slate-500 p-4 rounded-md w-full justify-center">
          <div className="w-full max-w-lg sm:min-w-sm md:min-w-lg flex items-center gap-2 bg-white dark:bg-slate-800 duration-500 transition-all border border-gray-600 dark:border-gray-600 rounded-md px-2 py-3">
            <IoIosSearch size={16} className="cursor-pointer " />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={s("placeholder")}
              className="w-full bg-transparent outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("Searching for:", searchQuery);
                  setSearchQuery("");
                  setActiveModalId(null);
                  router.push(`/insight${searchQuery}`);
                }
              }}
            />
          </div>
          <span className="text-xs text-center">{s("pressEnter")}</span>
        </div>
      </CenterModal>
    </div>
  );
};

export default Navbar;
