import React from "react";
import StoreNavbar from "@/components/nav/storeNavbar";
import Footer from "../components/footer/footer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground">
      <StoreNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
