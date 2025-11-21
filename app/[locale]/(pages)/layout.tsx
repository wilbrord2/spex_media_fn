import React, { ReactNode } from "react";
import Navbar from "../components/nav/navbar";
import Footer from "../components/footer/footer";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
