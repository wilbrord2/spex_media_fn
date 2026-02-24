"use client";

import React, { useState, useEffect } from "react";
import {
  HiXMark,
  HiOutlineTrash,
  HiOutlineBookOpen,
  HiOutlineArchiveBox,
  HiOutlineCheck,
} from "react-icons/hi2";
import Image from "next/image";
import { toast } from "sonner";
import { updateStock, clearStock, toggleBookStatus } from "@/app/actions/book";

interface Props {
  book: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookManageSlideOver({
  book,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [stockValue, setStockValue] = useState<number>(
    book.numberOfBooksInStock,
  );

  // Sync state if book prop changes
  useEffect(() => {
    setStockValue(book.numberOfBooksInStock);
  }, [book]);

  const handleSaveStock = async () => {
    setLoading(true);
    const success = await updateStock(book.id, stockValue);
    if (success) {
      toast.success("Inventory updated");
      onSuccess();
    } else {
      toast.error("Failed to update stock");
    }
    setLoading(false);
  };

  const handleClearStock = async () => {
    setLoading(true);
    const success = await clearStock(book.id);
    if (success) {
      toast.success("Stock cleared");
      setStockValue(0);
      onSuccess();
    } else {
      toast.error("Failed to clear stock");
    }
    setLoading(false);
  };

  const handleStatusToggle = async () => {
    setLoading(true);
    const success = await toggleBookStatus(book.id, book.isBookPublished);
    if (success) {
      toast.success(
        book.isBookPublished ? "Book unpublished" : "Book published",
      );
      onSuccess();
    } else {
      toast.error("Failed to change status");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm md:p-5">
      {/* Overlay click */}

      <div className="w-full max-w-md bg-card h-full shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 md:rounded-2xl overflow-hidden border border-border">
        {/* Header */}
        <header className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/20">
          <h2 className="text-lg font-black uppercase tracking-tight">
            Inventory & Status
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <HiXMark size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-8">
          {/* Info Section */}
          <div className="flex gap-4 items-start">
            <div className="relative w-24 h-32 rounded-xl overflow-hidden border border-border shadow-md shrink-0">
              <Image
                src={book.coverImage}
                fill
                className="object-cover"
                alt=""
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-lg leading-tight">{book.title}</h3>
              <p className="text-xs font-bold text-primary uppercase">
                {book.authorName}
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-black bg-accent px-2 py-1 rounded text-muted-foreground uppercase">
                  {book.category?.name || "General"}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Stock Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Manual Stock Adjustment
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="number"
                  value={stockValue}
                  onChange={(e) => setStockValue(parseInt(e.target.value) || 0)}
                  className="w-full bg-accent/50 border border-border rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 ring-primary outline-none transition-all"
                  placeholder="Enter total stock..."
                />
              </div>
              <button
                disabled={loading || stockValue === book.numberOfBooksInStock}
                onClick={handleSaveStock}
                className="px-6 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <HiOutlineCheck size={18} /> Save
              </button>
            </div>

            <button
              disabled={loading || book.numberOfBooksInStock === 0}
              onClick={handleClearStock}
              className="w-full py-3 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 hover:bg-rose-500/10 transition-colors disabled:opacity-30"
            >
              <HiOutlineTrash size={16} /> Wipe Inventory
            </button>
          </div>

          {/* Visibility Toggle */}
          <div className="space-y-4 pt-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Publication Status
            </h4>
            <button
              disabled={loading}
              onClick={handleStatusToggle}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all border ${
                book.isBookPublished
                  ? "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20"
                  : "bg-emerald-500 text-white border-transparent shadow-lg shadow-emerald-500/20 hover:opacity-90"
              }`}
            >
              {book.isBookPublished ? (
                <>
                  <HiOutlineArchiveBox size={20} />{" "}
                  <span className="text-xs font-black uppercase">
                    Unpublish from Store
                  </span>
                </>
              ) : (
                <>
                  <HiOutlineBookOpen size={20} />{" "}
                  <span className="text-xs font-black uppercase">
                    Make Live on Store
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 bg-card">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-accent text-xs font-black uppercase hover:bg-accent/80 transition-all"
          >
            Finished
          </button>
        </footer>
      </div>
    </div>
  );
}
