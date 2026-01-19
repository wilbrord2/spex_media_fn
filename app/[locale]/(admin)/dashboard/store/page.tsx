"use client";

import React, { useState, useMemo } from "react";
import {
  HiOutlineArrowDownTray,
  HiOutlineBookOpen,
  HiOutlineUserPlus,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePresentationChartLine,
  HiOutlineShoppingCart,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import PreviewModal from "@/app/[locale]/components/admin/PreviewModal";
import Image from "next/image";

// --- Types ---
export type BookStatus = "Pending" | "Approved" | "Rejected";

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status: BookStatus;
  img: string;
  price: string;
  submittedTime: string;
  submittedDate: string;
  description: string;
}

// --- Mock Data ---
const INITIAL_BOOKS: Book[] = [
  {
    id: 1,
    title: "The Digital Frontier",
    author: "Elena Vance",
    category: "Technology",
    price: "$14.99",
    submittedTime: "10:30 AM",
    submittedDate: "Oct 24, 2023",
    status: "Approved",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
    description: "Exploring digital societies.",
  },
  {
    id: 2,
    title: "Urban Architecture",
    author: "Marcus Thorne",
    category: "Design",
    price: "$32.50",
    submittedTime: "02:15 PM",
    submittedDate: "Nov 02, 2023",
    status: "Pending",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    description: "Sustainable city planning.",
  },
  {
    id: 3,
    title: "The Mindful Soul",
    author: "Sarah Jenkins",
    category: "Lifestyle",
    price: "$9.99",
    submittedTime: "09:00 AM",
    submittedDate: "Oct 20, 2023",
    status: "Approved",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    description: "Finding balance.",
  },
  {
    id: 4,
    title: "Economic Shifts",
    author: "Dr. Robert Chen",
    category: "Economics",
    price: "$19.99",
    submittedTime: "04:45 PM",
    submittedDate: "Sep 15, 2023",
    status: "Rejected",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
    description: "Global trade trends.",
  },
  {
    id: 5,
    title: "Galactic Voyage",
    author: "Astra Nova",
    category: "Sci-Fi",
    price: "$12.99",
    submittedTime: "11:20 AM",
    submittedDate: "Dec 05, 2023",
    status: "Pending",
    img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400",
    description: "Journey through stars.",
  },
  {
    id: 6,
    title: "Kitchen Mastery",
    author: "Chef Julian",
    category: "Cooking",
    price: "$24.00",
    submittedTime: "08:15 AM",
    submittedDate: "Dec 10, 2023",
    status: "Approved",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400",
    description: "Professional techniques.",
  },
  {
    id: 7,
    title: "Silent Echoes",
    author: "Lila Thorne",
    category: "Mystery",
    price: "$15.50",
    submittedTime: "03:40 PM",
    submittedDate: "Jan 12, 2024",
    status: "Pending",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    description: "Alpine thriller.",
  },
  {
    id: 8,
    title: "Modern Coding",
    author: "Dev Smith",
    category: "Tech",
    price: "$45.00",
    submittedTime: "10:00 AM",
    submittedDate: "Jan 15, 2024",
    status: "Approved",
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400",
    description: "Next.js Mastery.",
  },
];

const RECENT_ORDERS = [
  {
    id: "#ORD-9921",
    customer: "Alice Johnson",
    date: "Jan 18, 2024",
    amount: "$45.00",
    status: "Completed",
  },
  {
    id: "#ORD-9922",
    customer: "Bob Smith",
    date: "Jan 18, 2024",
    amount: "$12.99",
    status: "Processing",
  },
  {
    id: "#ORD-9923",
    customer: "Charlie Davis",
    date: "Jan 17, 2024",
    amount: "$32.50",
    status: "Completed",
  },
];

export default function BookStoreAdminPage() {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [initialMode, setInitialMode] = useState<"approve" | "reject">(
    "approve",
  );
  const itemsPerPage = 4;

  const filteredBooks = useMemo(() => {
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, books]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(start, start + itemsPerPage);
  }, [filteredBooks, currentPage]);

  const handleUpdateStatus = (id: number, newStatus: BookStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
    setSelectedBook(null);
  };

  const openModal = (book: Book, mode: "approve" | "reject") => {
    setInitialMode(mode);
    setSelectedBook(book);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-background text-foreground transition-colors">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-border bg-background/95">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Book Store</h2>
          <p className="text-muted-foreground text-sm font-medium">
            Manage catalog, manuscripts, and sales performance.
          </p>
        </div>
        <button className="bg-primary text-white  px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg transition-opacity hover:opacity-90 active:scale-95">
          <HiOutlineArrowDownTray /> Export Data
        </button>
      </header>

      <div className="p-4 md:p-6 space-y-8 max-w-[1500px] w-full mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            title="Total Revenue"
            value="$142,580"
            icon={<HiOutlinePresentationChartLine />}
          />
          <StatCard
            title="Live Catalog"
            value={books.filter((b) => b.status === "Approved").length}
            icon={<HiOutlineBookOpen />}
          />
          <StatCard
            title="Active Authors"
            value="56"
            icon={<HiOutlineUserPlus />}
          />
        </section>

        <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">
              Books
            </h3>
            <div className="relative w-full sm:w-80">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Filter by title or author..."
                className="w-full bg-accent/50 border border-border rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto hidden lg:block">
            <table className="w-full text-left">
              <thead className="bg-muted/50">
                <tr className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Submission Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentData.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-accent/20 transition-colors"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Image
                        src={book.img}
                        width={36}
                        height={52}
                        className="rounded border border-border object-cover"
                        alt=""
                      />
                      <span className="text-sm font-bold truncate max-w-[150px]">
                        {book.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {book.author}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold bg-accent px-2 py-1 rounded">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-sm text-primary">
                      {book.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <HiOutlineCalendarDays size={14} /> {book.submittedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={book.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(book, "approve")}
                          className="bg-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:opacity-90 transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openModal(book, "reject")}
                          className="bg-destructive/10 text-destructive px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-destructive/20 transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden p-4 grid grid-cols-1 gap-4">
            {currentData.map((book) => (
              <div
                key={book.id}
                className="bg-accent/20 border border-border rounded-xl p-4 flex flex-col gap-4"
              >
                <div className="flex gap-4">
                  <Image
                    src={book.img}
                    width={50}
                    height={70}
                    className="rounded border border-border"
                    alt=""
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold leading-tight">
                        {book.title}
                      </h4>
                      <StatusBadge status={book.status} />
                    </div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mt-1">
                      {book.author}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-black text-primary">
                        {book.price}
                      </span>
                      <span className="text-[9px] bg-accent px-1.5 py-0.5 rounded text-muted-foreground font-bold">
                        {book.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase">
                    <HiOutlineCalendarDays size={14} />
                    <span className="mr-1">Submitted on:</span>
                    {book.submittedDate}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => openModal(book, "approve")}
                      className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openModal(book, "reject")}
                      className="bg-destructive/10 text-destructive px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border flex items-center justify-between bg-muted/20">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-20 transition-all"
              >
                <HiOutlineChevronLeft />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-20 transition-all"
              >
                <HiOutlineChevronRight />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center gap-3">
            <HiOutlineShoppingCart className="text-primary text-xl" />
            <h3 className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">
              Recent Transactions
            </h3>
          </div>

          {/* 1. Desktop View: Table (Visible only on lg screens and up) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/30 text-[10px] font-black uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {RECENT_ORDERS.map((order) => (
                  <tr
                    key={order.id}
                    className="text-sm font-medium hover:bg-accent/10 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-primary font-bold">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 font-black">{order.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded-full ${
                          order.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Mobile View: Cards (Visible only on screens smaller than lg) */}
          <div className="lg:hidden p-4 grid grid-cols-1 gap-4 bg-muted/5">
            {RECENT_ORDERS.map((order) => (
              <div
                key={order.id}
                className="bg-accent/20 border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-primary font-black tracking-tight">
                    {order.id}
                  </span>
                  <span
                    className={`text-[9px] font-black px-2 py-1 rounded-full uppercase border ${
                      order.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex justify-between items-end border-t border-border/50 pt-3">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold tracking-tight">
                      {order.customer}
                    </p>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <HiOutlineCalendarDays size={12} />
                      <p className="text-[10px] font-medium">{order.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-black text-foreground">
                    {order.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedBook && (
        <PreviewModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onUpdateStatus={handleUpdateStatus}
          initialMode={initialMode}
        />
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border p-5 md:p-6 rounded-2xl flex items-center gap-4 transition-all hover:border-primary/50 shadow-sm">
      <div className="p-3 rounded-xl bg-accent text-primary">{icon}</div>
      <div>
        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">
          {title}
        </p>
        <h4 className="text-2xl md:text-3xl font-black tracking-tight">
          {value}
        </h4>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: BookStatus }) {
  const styles = {
    Approved: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    Rejected: "text-destructive bg-destructive/10 border-destructive/20",
    Pending:
      "text-orange-500 bg-orange-500/10 border-orange-500/20 animate-pulse",
  };
  return (
    <span
      className={`text-[9px] font-black uppercase px-2 py-1 rounded border whitespace-nowrap ${styles[status]}`}
    >
      {status}
    </span>
  );
}
