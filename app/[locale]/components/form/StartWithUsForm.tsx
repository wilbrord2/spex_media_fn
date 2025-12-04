"use client";

import React, { useState } from "react";

export default function StartWithUsForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");

    try {
      // Placeholder: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full px-4 py-2 rounded-md border border-blue-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email address"
          type="email"
          className="w-full px-4 py-2 rounded-md border border-blue-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone (optional)"
          className="w-full px-4 py-2 rounded-md border border-blue-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company / Organization (optional)"
          className="w-full px-4 py-2 rounded-md border border-blue-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        rows={5}
        placeholder="Tell us briefly what you'd like to achieve or the service you're interested in..."
        className="w-full px-4 py-3 rounded-md border border-blue-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-red-800 transition"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Request a Starter Pack"}
        </button>

        {status === "success" && (
          <span className="text-green-600">
            Thanks — we will contact you shortly.
          </span>
        )}
        {status === "error" && (
          <span className="text-red-600">Please fill the required fields.</span>
        )}
      </div>
    </form>
  );
}
