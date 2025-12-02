"use client";
import React, { useState } from "react";
import Headline from "../text/headline";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log(`Subscribed with email: ${email}`);
    setEmail("");
  };
  return (
    <div className="lg:px-8 px-4 py-6 lg:py-16 bg-slate-200 dark:bg-gray-900 space-y-8 flex flex-col items-center justify-center rounded-lg">
      <Headline
        title="Stay Ahead of African Business"
        description="Get our weekly insights, market analysis, and exclusive interviews delivered straight to your inbox. Join thousands of business leaders across Africa."
      />
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center border border-primary rounded-md overflow-hidden">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 w-4/5  focus:outline-none"
          />
          <button
            onClick={handleSubscribe}
            className="px-4 py-3 bg-primary text-sm font-bold text-white  hover:bg-primary/80 cursor-pointer"
          >
            Subscribe
          </button>
        </div>
        <p className="text-gray-600 text-sm">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSection;
