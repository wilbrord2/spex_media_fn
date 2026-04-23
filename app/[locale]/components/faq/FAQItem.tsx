"use client";
import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      open={isOpen}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
    >
      <summary
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className="font-semibold text-gray-900 dark:text-white flex justify-between items-center"
      >
        {question}
        <span
          className={`text-primary transition-transform ${isOpen ? "rotate-45" : ""}`}
        >
          +
        </span>
      </summary>
      <p className="text-gray-600 dark:text-gray-400 mt-4">{answer}</p>
    </details>
  );
}
