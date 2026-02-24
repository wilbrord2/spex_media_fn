"use client";

import React, { useState, useEffect } from "react";
import { HiOutlineXMark, HiOutlineCloudArrowUp } from "react-icons/hi2";
import { addBook } from "@/app/actions/book";
import { getCategories } from "@/app/actions/review";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBookSlideOver({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [previews, setPreviews] = useState<{ cover?: string }>({});

  // Fetch categories when slideover opens
  useEffect(() => {
    if (isOpen) {
      const loadCats = async () => {
        const data = await getCategories();
        if (data) setCategories(data);
      };
      loadCats();
    }
  }, [isOpen]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const file = e.target.files?.[0];
    if (file && key === "coverImage") {
      setPreviews({ cover: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const result = await addBook(formData);
      if (result.success) {
        toast.success("Book saved successfully!");
        onSuccess();
        onClose();
      } else {
        toast.error(result.error || "Submission failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm md:p-5">
      {/* <div className="absolute inset-0" onClick={onClose} /> */}

      <div className="w-full max-w-lg bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 md:rounded-2xl overflow-hidden border-l border-border">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <header className="px-5 py-3 border-b border-border flex items-center justify-between bg-card">
            <h2 className="text-lg font-black uppercase tracking-tight">
              Add New Book
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <HiOutlineXMark size={24} />
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
            <div className="space-y-4">
              <InputField label="Book Title" name="title" required />
              <InputField label="Author Name" name="authorName" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* CATEGORY DROPDOWN */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground">
                  Category
                </label>
                <select
                  name="categoryId"
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select...</option>
                  {/* {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))} */}
                </select>
              </div>

              <InputField label="Language" name="language" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Pages"
                name="numberOfPages"
                type="number"
                required
              />
              <InputField
                label="Release Date"
                name="releaseDate"
                type="date"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground">
                Pricing ($)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <InputField
                  name="pricePhysicalBook"
                  type="number"
                  step="0.01"
                  placeholder="Physical"
                />
                <InputField
                  name="priceDigitalDownload"
                  type="number"
                  step="0.01"
                  placeholder="Digital"
                />
                <InputField
                  name="priceReadOnPlatform"
                  type="number"
                  step="0.01"
                  placeholder="Platform"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Stock"
                name="numberOfBooksInStock"
                type="number"
                required
              />
              <InputField label="Region" name="primaryRegion" required />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-muted-foreground">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={3}
                className="w-full bg-background border border-border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block">
                  Cover Image
                </label>
                <div className="flex items-center gap-4">
                  {previews.cover && (
                    <img
                      src={previews.cover}
                      className="w-12 h-16 object-cover rounded-xl border border-border"
                      alt=""
                    />
                  )}
                  <label className="flex-1 border border-dashed border-border rounded-2xl p-4 flex flex-col items-center cursor-pointer bg-accent/10 hover:bg-accent/20 transition-colors">
                    <HiOutlineCloudArrowUp size={20} />
                    <span className="text-[10px] font-black uppercase">
                      Select Image
                    </span>
                    <input
                      type="file"
                      name="coverImage"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "coverImage")}
                      required
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block">
                  Manuscript
                </label>
                <label className="w-full border border-dashed border-border rounded-2xl p-4 flex flex-col items-center cursor-pointer bg-accent/10 hover:bg-accent/20 transition-colors">
                  <span className="text-[10px] font-black uppercase">
                    Upload PDF/EPUB
                  </span>
                  <input
                    type="file"
                    name="manuscript"
                    className="hidden"
                    accept=".pdf,.epub"
                    required
                  />
                </label>
              </div>
            </div>
            {/* Footer */}
            <footer className="p-6 bg-card">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? "Uploading..." : "Save to Catalog"}
              </button>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-[10px] font-black uppercase text-muted-foreground">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full bg-accent/30 border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
