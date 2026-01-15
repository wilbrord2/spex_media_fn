"use client";

import React, { PropsWithChildren, ReactNode, Suspense, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ThemeSwitchButton } from "../switch/themeSwitcher";
import LocaleSwitcher from "../switch/LocaleSwitcher";
import { FiMenu, FiX, FiLoader } from "react-icons/fi";
import { useAppContext } from "../../context";
import { useTranslations } from "next-intl";

// Type definitions for navbar configuration
interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

interface NavbarProps extends PropsWithChildren {
  brand?: string;
  navItems?: NavItem[];
  leftContent?: ReactNode;
  rightContent?: ReactNode[];
  onMobileMenuOpen?: () => void;
  onMobileMenuClose?: () => void;
}

interface NavbarContentProps extends NavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Desktop Navigation Links Component
const DesktopNavLinks: React.FC<{
  items: NavItem[];
  readonly defaultItems: NavItem[];
}> = ({ items, defaultItems }) => {
  // const t = useTranslations("NavItems");

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
  // const t = useTranslations("NavItems");

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
  brand = "Nexus Media",
  navItems = [],
  leftContent,
  rightContent = [],
  isOpen,
  setIsOpen,
  children,
}) => {
  const { setActiveModalId } = useAppContext();
  const t = useTranslations("NavItems");
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

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {leftContent ? (
            leftContent
          ) : (
            <Link
              href="/"
              className="text-xl font-bold tracking-tight flex items-center gap-2"
            >
              <span className="text-foreground">Nexus</span>
              <span className="text-primary">
                {brand?.split(" ")[1] || "Media"}
              </span>
            </Link>
          )}
        </div>

        {/* Center Section - Desktop Only */}
        <div className="hidden lg:flex">
          <DesktopNavLinks items={navItems} defaultItems={defaultItems} />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Default Right Content */}
          <div className="hidden md:flex items-center gap-3">
            {rightContent &&
              rightContent.length > 0 &&
              rightContent.map((content, index) => (
                <div key={index}>{content}</div>
              ))}
            <>
              <LocaleSwitcher />
              <ThemeSwitchButton />
            </>
            {children}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {children}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-foreground/10 bg-background p-4 flex flex-col gap-4 shadow-xl">
          {rightContent &&
            rightContent.length > 0 &&
            rightContent.map((content, index) => (
              <div key={index}>{content}</div>
            ))}
          <MobileNavLinks
            items={navItems}
            defaultItems={defaultItems}
            onClose={handleMobileMenuClose}
          />
          <div className="flex flex-col gap-3 pt-2">
            <>
              <LocaleSwitcher />
              <ThemeSwitchButton />
            </>
          </div>
        </div>
      )}
    </nav>
  );
};

// Main Navbar Component with Suspense
const Navbar = (props: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <FiLoader className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <NavbarContent {...props} isOpen={isOpen} setIsOpen={setIsOpen}>
        {props.children}
      </NavbarContent>
    </Suspense>
  );
};

// Preset: Default Main Page Navbar
const MainNavbar = () => {
  return <Navbar brand="Nexus Media" />;
};

export { Navbar };
export default MainNavbar;
