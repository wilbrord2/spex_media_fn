import React, { ReactNode } from "react";

const Pageheader = ({
  title,
  description,
  quickAction,
}: {
  title: string;
  description: string;
  quickAction?: ReactNode;
}) => {
  return (
    <div className="bg-linear-to-br from-slate-900 via-slate-800  to-red-900 lg:h-[50vh]">
      <div className="max-width-container mx-auto text-center w-full flex flex-col justify-center items-center h-full gap-4 p-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto mb-8">{description}</p>
        <div className="w-full max-w-lg">{quickAction}</div>
      </div>
    </div>
  );
};

export default Pageheader;
