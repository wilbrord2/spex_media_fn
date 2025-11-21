import React from "react";

const Headline = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <h1 className="font-bold text-2xl lg:text-4xl text-primary ">{title}</h1>
      <p className="font-normal text-base lg:text-lg text-slate-600 dark:text-gray-300 max-w-xl">
        {description}
      </p>
    </div>
  );
};

export default Headline;
