"use client";
import React, { useState } from "react";
import Headline from "../text/headline";
import { subscribeToNewsletter } from "../../../actions/auth";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return toast.error("Please enter an email address");

    setLoading(true);
    const res = await subscribeToNewsletter(email);

    if (res.success) {
      toast.success("Subscribed successfully!");
      setEmail("");
    } else {
      toast.error(res.error || "Something went wrong");
    }
    setLoading(false);
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
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 w-4/5 focus:outline-none disabled:bg-gray-100"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="px-4 py-3 bg-primary text-sm font-bold text-white hover:bg-primary/80 cursor-pointer disabled:opacity-70"
          >
            {loading ? "Subscribing..." : "Subscribe"}
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
