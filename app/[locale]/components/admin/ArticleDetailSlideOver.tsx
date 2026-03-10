"use client";

import React, { useState } from "react";
import {
  HiOutlineXMark,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineTag,
} from "react-icons/hi2";
import Image from "next/image";
import { useAppContext } from "@/app/[locale]/context";
import { reviewArticle } from "@/app/actions/review";
import { toast } from "sonner";

interface Props {
  article: any;
  onClose: () => void;
  onActionSuccess?: () => void;
}

export default function ArticleDetailSlideOver({
  article,
  onClose,
  onActionSuccess,
}: Props) {
  const { profile } = useAppContext();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = profile?.role?.toUpperCase() !== "CONTENT_PROVIDER";

  const handleReview = async (
    status: "APPROVED" | "REJECTED" | "PUBLISHED",
  ) => {
    if (!feedback && status === "REJECTED") {
      toast.info("Please provide a reason for rejection.");
      return;
    }

    setIsSubmitting(true);
    const success = await reviewArticle(article.id, {
      status,
      comment: feedback,
    });

    if (success) {
      onActionSuccess?.();
      onClose();
      toast.success(`Article ${status.toLowerCase()} successfully.`);
    } else {
      toast.error("Failed to update article status.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm md:p-5 ">
      <div className="w-full max-w-[1500px] bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 md:rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-card">
          <h2 className="text-lg font-black uppercase tracking-tight">
            Article Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <HiOutlineXMark size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto  py-6 px-6 md:px-40 space-y-6">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border">
            <Image
              src={article.coverImage}
              fill
              className="object-cover"
              alt={article.title}
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <HiOutlineCalendar />{" "}
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineUser /> {article.authorName || "Unknown Author"}
              </span>
              <span className="flex items-center gap-1 text-primary">
                <HiOutlineTag /> {article.category?.name || "General"}
              </span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground border-t border-border pt-6">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Admin Editorial Actions */}
          {isAdmin && (
            <div className="mt-8 p-6 bg-accent/20 rounded-2xl border border-border space-y-4">
              {/* Approval/Rejection Step */}
              {article.status === "PENDING_REVIEW" && (
                <>
                  <h3 className="text-xs font-black uppercase tracking-widest">
                    Editorial Decision
                  </h3>
                  <textarea
                    placeholder="Provide feedback to the author (required for rejection)..."
                    className="w-full bg-background border border-border rounded-xl p-3 text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <button
                      disabled={isSubmitting}
                      onClick={() => handleReview("APPROVED")}
                      className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs uppercase shadow-lg shadow-emerald-500/20 hover:opacity-90 disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Approve"}
                    </button>
                    <button
                      disabled={isSubmitting}
                      onClick={() => handleReview("REJECTED")}
                      className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-bold text-xs uppercase shadow-lg shadow-rose-500/20 hover:opacity-90 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}

              {/* Publish Step */}
              {article.status === "APPROVED" && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600">
                    Ready to Publish
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This article has been approved. You can now publish it to
                    make it live.
                  </p>
                  <button
                    disabled={isSubmitting}
                    onClick={() => handleReview("PUBLISHED")}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-xs uppercase shadow-lg shadow-indigo-500/20 hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting ? "Publishing..." : "Publish Article Now"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
