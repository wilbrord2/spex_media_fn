"use client";

import React, { useState } from "react";
import {
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineNoSymbol,
  HiOutlinePencilSquare,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineArrowDownTray,
  HiOutlineTruck,
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { Book, BookStatus } from "@/app/[locale]/(admin)/dashboard/store/page";
import Image from "next/image";

interface Props {
  book: Book;
  onClose: () => void;
  onUpdateStatus: (id: number, status: BookStatus) => void;
  initialMode?: "approve" | "reject";
}

export default function PreviewModal({
  book,
  onClose,
  onUpdateStatus,
  initialMode,
}: Props) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleConfirmReject = () => {
    if (rejectionReason.trim()) {
      onUpdateStatus(book.id, "Rejected");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-300">
      <div className="bg-card border border-border w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden scale-in text-foreground">
        {/* Header */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3 overflow-hidden">
            <HiOutlineDocumentMagnifyingGlass className="text-primary text-xl sm:text-2xl shrink-0" />
            <h2 className="text-base sm:text-xl font-bold tracking-tight italic truncate">
              Review: {book.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 shrink-0"
          >
            <HiOutlineXMark size={24} className="sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
            {/* Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="aspect-2/3 w-full max-w-60 mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  src={book.img}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  width={400}
                  height={600}
                />
              </div>

              <div className="bg-muted/50 p-4 sm:p-5 rounded-2xl border border-border">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-4">
                  Submission Intel
                </p>
                <div className="space-y-3">
                  <MetaItem label="Submitted" value={book.submittedDate} />
                  <MetaItem label="Time" value={book.submittedTime} />
                  <MetaItem label="File" value="Verified EPUB" />
                </div>
              </div>
            </div>

            {/* Main Details Column */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-1">
                    Primary Author
                  </label>
                  <p className="text-lg sm:text-xl font-bold">{book.author}</p>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-1">
                    Book Genre
                  </label>
                  <p className="text-lg sm:text-xl font-bold">
                    {book.category}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-2">
                  Synopsis
                </label>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Pricing Grid */}
              <div className="space-y-3">
                <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block">
                  Proposed Revenue Tiers
                </label>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
                  <PriceTier
                    icon={<HiOutlineBookOpen className="text-blue-500" />}
                    label="Read Only"
                    price="$4.99"
                  />
                  <PriceTier
                    icon={
                      <HiOutlineArrowDownTray className="text-purple-500" />
                    }
                    label="Download"
                    price="$14.99"
                  />
                  <PriceTier
                    icon={<HiOutlineTruck className="text-orange-500" />}
                    label="Physical"
                    price="$32.50"
                  />
                </div>
              </div>

              {/* Author Stats Section */}
              <div className="space-y-3">
                <div className="">
                  <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block">
                    Author Stats
                  </div>
                </div>
                <div className="bg-background border border-border rounded-xl p-4 sm:p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AuthorStatCard
                      icon={<HiOutlineUser className="text-blue-500" />}
                      label="Total Books"
                      value="12"
                    />
                    <AuthorStatCard
                      icon={
                        <HiOutlineCurrencyDollar className="text-emerald-500" />
                      }
                      label="L-Earnings"
                      value="$42.8k"
                    />
                    <AuthorStatCard
                      icon={<HiOutlineStar className="text-orange-500" />}
                      label="Avg. Rating"
                      value="4.8/5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-8 border-t border-border bg-muted/20">
          {!isRejecting ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
              {initialMode !== "reject" && (
                <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all bg-accent sm:bg-transparent">
                  <HiOutlinePencilSquare size={18} /> Request Changes
                </button>
              )}

              {initialMode === "reject" ? (
                <button
                  onClick={() => setIsRejecting(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-all border border-destructive/20"
                >
                  <HiOutlineNoSymbol size={18} /> Reject Submission
                </button>
              ) : (
                <button
                  onClick={() => {
                    onUpdateStatus(book.id, "Approved");
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary-foreground bg-primary hover:opacity-90 shadow-xl shadow-primary/20 transition-all"
                >
                  <HiOutlineCheckCircle size={18} /> Approve Publication
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-2 text-destructive">
                <HiOutlineChatBubbleLeftEllipsis size={20} />
                <span className="text-xs font-black uppercase tracking-widest">
                  Provide Rejection Reason
                </span>
              </div>
              <textarea
                autoFocus
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="E.g., Formatting issues in Chapter 3..."
                className="w-full bg-background border border-border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-destructive/20 min-h-[100px] resize-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsRejecting(false)}
                  className="text-[10px] font-black uppercase px-4 py-2 hover:bg-muted rounded-lg"
                >
                  Back
                </button>
                <button
                  disabled={!rejectionReason.trim()}
                  onClick={handleConfirmReject}
                  className="bg-destructive text-white text-[10px] font-black uppercase px-6 py-2 rounded-lg disabled:opacity-50 transition-all shadow-lg shadow-destructive/20"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Helpers ---
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-[11px] sm:text-xs">
      <span className="text-muted-foreground font-medium">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function PriceTier({
  icon,
  label,
  price,
}: {
  icon: React.ReactNode;
  label: string;
  price: string;
}) {
  return (
    <div className="bg-background border border-border p-3 rounded-xl flex flex-row xs:flex-col items-center justify-between xs:justify-center gap-2 flex-1">
      <div className="flex items-center gap-2 xs:flex-col xs:gap-1">
        <div className="text-lg sm:text-xl">{icon}</div>
        <p className="text-[9px] text-muted-foreground font-black uppercase tracking-tight">
          {label}
        </p>
      </div>
      <p className="font-black text-sm">{price}</p>
    </div>
  );
}

function AuthorStatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-muted/30 border border-border/50 p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1">
      <div className="text-lg">{icon}</div>
      <p className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}
