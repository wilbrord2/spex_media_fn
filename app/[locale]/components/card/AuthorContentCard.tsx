"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegUser, FaTrashAlt } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { AlertTriangle } from "lucide-react";
import { deleteContent } from "@/app/actions/review";
import { toast } from "sonner";

const AuthorContentCard = ({
  id,
  title,
  img,
  category,
  name,
  date,
  url,
  onDelete, // New prop
}: {
  id: number;
  title: string;
  img: string;
  category: string;
  name: string;
  date: string;
  url: string;
  onDelete: (id: number) => void; // New prop type
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    setIsDeleting(true);
    const success = await deleteContent(id);
    if (success) {
      toast.success("Article deleted successfully");
      onDelete(id); // Triggers the animation by updating parent state
    } else {
      toast.error("Failed to delete article");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="relative"
    >
      <Link href={url}>
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="group cursor-pointer relative w-full border border-gray-200 dark:border-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 bg-white dark:bg-gray-900 overflow-hidden"
        >
          <div className="overflow-hidden h-48 relative">
            <Image
              src={img}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-red-700 text-xs text-white py-1 px-3 font-bold rounded-full shadow-lg">
              {category}
            </div>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <h2 className="text-lg font-bold dark:text-gray-200 text-gray-900 group-hover:text-red-700 transition-colors duration-300 line-clamp-2 min-h-14">
              {title}
            </h2>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col gap-1 text-[10px] uppercase tracking-wider font-bold text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FaRegUser className="text-red-700" />
                  {name}
                </span>
                <span className="flex items-center gap-1.5">
                  <CiCalendar className="text-red-700 text-sm" />
                  {new Date(date).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteModal(true);
                }}
                className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaTrashAlt size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* --- Delete Confirmation Modal --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Are you sure?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You are about to delete this article. This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-1.5 px-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-1.5 px-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AuthorContentCard;
