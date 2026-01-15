import React, { ReactNode } from "react";
import EventNavbar from "@/app/[locale]/components/nav/eventNavbar";
import Footer from "@/app/[locale]/components/footer/footer";

const EventLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col">
      <EventNavbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default EventLayout;
