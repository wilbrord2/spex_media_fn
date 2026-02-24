"use client";

import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ThemeSwitchButton } from "../switch/themeSwitcher";
import LocaleSwitcher from "../switch/LocaleSwitcher";
import { FiMenu, FiX, FiSearch, FiUser } from "react-icons/fi";
import { useAppContext } from "../../context";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/app/actions/auth";
import Logo from "../Logo/DefaultLogo";

// Type definitions for navbar configuration
interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

interface BaseNavbarProps extends PropsWithChildren {
  brand?: string;
  navItems?: NavItem[];
  leftContent?: ReactNode;
}

type SearchBarProps = {
  includeSearchBar?: boolean;
  searchBarPlaceholder?: string;
};

type NavbarProps = BaseNavbarProps & SearchBarProps;

type NavbarContentProps = BaseNavbarProps &
  SearchBarProps & {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  };

const SearchBar: React.FC<SearchBarProps> = ({
  includeSearchBar,
  searchBarPlaceholder,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`?${params.toString()}${term ? "#browse-catalog" : ""}`);
  };

  if (!includeSearchBar) return null;

  return (
    <div className="relative flex items-center group">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" />
      <input
        placeholder={searchBarPlaceholder}
        className="bg-foreground/5 border border-transparent focus:border-primary rounded-full py-2 pl-10 pr-4 text-sm w-full md:w-48 md:focus:w-72 transition-all outline-none"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

// Desktop Navigation Links Component
const DesktopNavLinks: React.FC<{
  items: NavItem[];
  readonly defaultItems: NavItem[];
}> = ({ items, defaultItems }) => {
  const allItems = [...defaultItems, ...items];

  return (
    <ul className="flex items-center gap-8">
      {allItems.map((item) => {
        if (item.submenu) {
          return (
            <li key={item.href} className="relative group">
              <Link
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors pb-1 border-b-2 border-transparent group-hover:border-primary"
              >
                {item.label}
              </Link>
              <div className="absolute left-0 mt-2 w-56 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-1 group-hover:translate-y-0 transition-all z-50 border border-foreground/10">
                <div className="flex flex-col py-1">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className="px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-foreground/5 transition-colors"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

// Mobile Navigation Links Component
const MobileNavLinks: React.FC<{
  items: NavItem[];
  readonly defaultItems: NavItem[];
  onClose: () => void;
}> = ({ items, defaultItems, onClose }) => {
  const allItems = [...defaultItems, ...items];

  return (
    <nav className="flex flex-col gap-2">
      {allItems.map((item) => {
        if (item.submenu) {
          return (
            <div key={item.href} className="w-full">
              <Link
                href={item.href}
                onClick={onClose}
                className="py-2 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-foreground/5"
              >
                {item.label}
              </Link>
              <div className="pl-4 flex flex-col">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.href}
                    href={subitem.href}
                    onClick={onClose}
                    className="text-sm text-foreground py-2 hover:text-primary transition-colors"
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="py-2 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-foreground/5"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

// Navbar Content Component
const NavbarContent: React.FC<NavbarContentProps> = ({
  includeSearchBar,
  searchBarPlaceholder,
  brand,
  navItems = [],
  leftContent,
  isOpen,
  setIsOpen,
  children,
}) => {
  const { setActiveModalId, profile, setProfile } = useAppContext();
  const t = useTranslations("NavItems");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleLogout = () => {
    setProfile(null);
    setIsProfileOpen(false);
    toast.success("Successfully logged out!");
    logout();
  };

  const handleMobileMenuClose = () => {
    setIsOpen(false);
    setActiveModalId(null);
  };

  const defaultItems: NavItem[] = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    {
      label: t("services"),
      href: "/service",
      submenu: [
        { label: "Media and Publishing", href: "/service/publishing" },
        { label: "Book Store", href: "/service/store" },
        { label: "Event Management", href: "/service/event" },
      ],
    },
    { label: t("contact"), href: "/contact" },
  ];

  const profileMenuItems = (
    <ul className="py-1">
      <li>
        <Link
          href="/#"
          className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          Profile Settings
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/magazine"
          className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          Dashboard
        </Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-background backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
        {/* Left Section */}
        <Logo descriptor={brand} />
        {/* Center Section - Desktop Only */}
        <div className="hidden lg:flex">
          <DesktopNavLinks items={navItems} defaultItems={defaultItems} />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Default Right Content */}
          <div className="hidden md:flex items-center gap-3">
            <SearchBar
              includeSearchBar={includeSearchBar}
              searchBarPlaceholder={searchBarPlaceholder}
            />

            <LocaleSwitcher />
            <ThemeSwitchButton />
            {children}
            {profile ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  <span className="flex items-center justify-center bg-primary text-white size-8 rounded-full uppercase font-bold cursor-pointer">
                    {profile.name.split(" ")[0][0]}
                  </span>
                </button>
                {isProfileOpen && (
                  <div className="hidden lg:block absolute top-12 right-0 w-48  bg-white border-gray-200 dark:border-gray-700 border  dark:bg-gray-800  dark:text-gray-200 rounded-md shadow-lg z-50">
                    {profileMenuItems}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-primary text-white px-3 py-2 text-sm font-medium rounded-lg transition-colors w-full"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-4">
            {children}
            {profile ? (
              <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <span className="flex items-center justify-center bg-primary text-white size-7 rounded-full uppercase font-bold">
                  {profile.name.split(" ")[0][0]}
                </span>
              </button>
            ) : (
              <Link
                href="/auth"
                className="text-sm font-medium hover:text-primary transition-colors bg-primary/40 text-white p-2 rounded-full"
              >
                <FiUser size={16} />
              </Link>
            )}

            <button
              className="text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Profile Drawer */}
      {isProfileOpen && (
        <div
          className="lg:hidden fixed top-16 left-0 w-full bg-background shadow-lg p-4 z-40"
          onClick={() => setIsProfileOpen(false)}
        >
          {profileMenuItems}
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-foreground/10 bg-background p-4 flex flex-col gap-4 shadow-xl">
          <SearchBar
            includeSearchBar={includeSearchBar}
            searchBarPlaceholder={searchBarPlaceholder}
          />

          <MobileNavLinks
            items={navItems}
            defaultItems={defaultItems}
            onClose={handleMobileMenuClose}
          />
          <div className="flex flex-col gap-3 pt-2">
            <LocaleSwitcher />
            <ThemeSwitchButton />
          </div>
        </div>
      )}
    </nav>
  );
};

// Main Navbar Component
const Navbar = (props: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContent {...props} isOpen={isOpen} setIsOpen={setIsOpen}>
      {props.children}
    </NavbarContent>
  );
};

export default Navbar;
