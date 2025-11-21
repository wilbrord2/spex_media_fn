"use client";

import { usePathname } from "@/i18n/navigation";
import Image, { StaticImageData } from "next/image";
import { useState, useRef, useEffect, FC } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export type LanguageDropDownListType = {
  label: string;
  icon?: StaticImageData;
};

interface LanguageSwicherProps {
  items: LanguageDropDownListType[];
  selected: LanguageDropDownListType;
  setSelected: (item: LanguageDropDownListType) => void;
}

const LanguageSwicher: FC<LanguageSwicherProps> = ({
  items,
  selected,
  setSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-fit min-w-[120px] ">
      {/* Trigger */}
      <button
        type="button"
        className={`border-gray-200 dark:border-gray-700 border hover:bg-gray-100 flex items-center justify-between dark:bg-gray-800  dark:text-gray-200 w-full gap-4 min-w-[130px] px-3 py-2 rounded-md  focus:outline-none cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {selected.icon && (
            <Image
              src={selected.icon}
              alt={`${selected.label} flag`}
              height={25}
              width={25}
              className="object-fill rounded-full"
            />
          )}
          <span className="text-sm font-bold ">{selected.label}</span>
        </div>
        <span>{isOpen ? <IoChevronUp /> : <IoChevronDown />}</span>
      </button>

      {/* Dropdown List */}
      <div
        className={`absolute top-full right-0 w-full mt-1 border dark:bg-slate-800 dark:border-gray-700 border-gray-300 rounded-md bg-white shadow-lg z-30 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
        }`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
              index !== items.length - 1
                ? "border-b border-gray-200 dark:border-gray-700"
                : ""
            }`}
            onClick={() => {
              setSelected(item);
              setIsOpen(false);
            }}
          >
            {selected.icon && (
              <Image
                src={selected.icon}
                alt={`${item.label} flag`}
                height={25}
                width={25}
                className="object-cover"
              />
            )}

            <span className="text-sm font-bold text-navy">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwicher;
