"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  HiOutlineShoppingBag,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineShieldCheck,
  HiBars3BottomLeft,
  HiOutlineDocumentText,
  HiOutlineUsers,
} from "react-icons/hi2";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ThemeSwitchButton } from "../../components/switch/themeSwitcher";
import { useAppContext } from "../../context";
import { logout } from "@/app/actions/auth";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const { profile, setProfile } = useAppContext();

  const handleLogout = () => {
    setProfile(null);
    toast.success("Successfully logged out!");
    logout();
  };
  const role = profile?.role?.toUpperCase();

  // 1. Define Navigation with Role Access
  const ecosystemNav = useMemo(() => {
    const items = [
      {
        name: "Content Creators",
        icon: <HiOutlineUsers />,
        href: "/dashboard/authors",
        roles: ["ADMIN"],
      },
      {
        name: "Inama Magazine",
        icon: <HiOutlineDocumentText />,
        href: "/dashboard/magazine",
        roles: ["ADMIN", "CONTENT_PROVIDER"],
      },
      {
        name: "Inama Books",
        icon: <HiOutlineShoppingBag />,
        href: "/dashboard/store",
        roles: ["ADMIN"],
      },
    ];

    return items.filter((item) => item.roles.includes(role || "ADMIN"));
  }, [role]);

  // 2. Security: Redirect if user hits an unauthorized route
  useEffect(() => {
    if (!role) return;

    const restrictedRoutes = {
      CONTENT_PROVIDER: ["/dashboard/store", "/dashboard/authors"],
    };

    const userRestricted =
      restrictedRoutes[role as keyof typeof restrictedRoutes];

    if (userRestricted?.some((route) => pathname.startsWith(route))) {
      router.push("/dashboard/magazine");
    }
  }, [pathname, role, router]);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out transform
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto hide-scrollbar">
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-6">
              {/* Logo Section */}
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="bg-primary/15 flex items-center justify-center rounded-lg size-10 text-primary shrink-0">
                  <HiOutlineShieldCheck size={24} />
                </div>
                <Link href={`/`} className="flex flex-col min-w-0">
                  <h1 className="text-sidebar-foreground text-sm font-bold leading-tight truncate">
                    Inama Media
                  </h1>
                  <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                    {role?.replace("_", " ")} Mode
                  </p>
                </Link>
              </div>

              {/* Navigation Sections */}
              <nav className="flex flex-col gap-1">
                {ecosystemNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <span className="text-lg shrink-0">{item.icon}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-2">
              <div className="mt-4 flex items-center gap-2 font-bold px-3">
                <ThemeSwitchButton />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {theme} Mode
                </span>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/30 border border-sidebar-border my-2">
                <div className="size-9 rounded-full bg-primary/10 text-primary shrink-0 flex items-center justify-center font-bold">
                  {profile?.name ? profile.name[0].toUpperCase() : "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sidebar-foreground text-sm font-bold truncate">
                    {profile?.name}
                  </p>
                  <p className="text-muted-foreground text-[10px] font-bold truncate">
                    {profile?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive p-2 transition-colors"
                >
                  <HiOutlineArrowLeftOnRectangle size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="lg:hidden flex items-center justify-between py-2 px-4 border-b bg-background/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-foreground hover:bg-muted rounded-lg"
            >
              <HiBars3BottomLeft size={24} />
            </button>
            <span className="font-bold text-sm tracking-tight">
              Inama Media
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth relative">
          {children}
        </main>
      </div>
    </div>
  );
}
