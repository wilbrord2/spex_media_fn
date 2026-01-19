import React, { ReactNode, Suspense } from "react";
import Navbar from "../components/nav/navbar";
import Footer from "../components/footer/footer";
import { FiLoader } from "react-icons/fi";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <FiLoader className="animate-spin text-primary" size={32} />
          </div>
        }
      >
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
};

export default PageLayout;
