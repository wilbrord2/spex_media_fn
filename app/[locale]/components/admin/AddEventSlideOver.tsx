"use client";

import React, { useState, useEffect } from "react";
import { HiOutlineXMark, HiOutlineCloudArrowUp } from "react-icons/hi2";
import { addEvent, getEventCategories } from "@/app/actions/event";
import { toast } from "sonner";

export default function AddEventSlideOver({ isOpen, onClose, onSuccess }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      getEventCategories().then(
        (data) => data && setCategories(data.data?.items || []),
      );
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await addEvent(new FormData(e.currentTarget));
    if (result.success) {
      toast.success("Event Created!");
      onSuccess();
      onClose();
    } else {
      toast.error(result.error?.error);
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm md:p-5">
      <div className="w-full max-w-lg bg-background h-full shadow-2xl flex flex-col md:rounded-2xl overflow-hidden border-l border-border">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <header className="px-5 py-3 border-b border-border flex items-center justify-between bg-card">
            <h2 className="text-lg font-black uppercase tracking-tight">
              Create Event
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-full"
            >
              <HiOutlineXMark size={24} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
            <InputField label="Event Title" name="title" required />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Date" name="eventDate" type="date" required />
              <InputField label="Time" name="eventTime" type="time" required />
            </div>
            <InputField
              label="Location"
              name="location"
              placeholder="Address or URL"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground">
                  Category
                </label>
                <select
                  name="categoryId"
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none"
                >
                  <option value="">Select...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                label="Max Capacity"
                name="capacity"
                type="number"
                required
              />
            </div>

            <InputField
              label="Speakers"
              name="speakers"
              placeholder="Comma separated names"
            />

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-muted-foreground">
                Full Description
              </label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full bg-background border border-border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground">
                Banner Image
              </label>
              <label className="w-full border border-dashed border-border rounded-2xl p-8 flex flex-col items-center cursor-pointer bg-accent/10 hover:bg-accent/20 transition-colors">
                <HiOutlineCloudArrowUp
                  size={24}
                  className="text-muted-foreground mb-2"
                />
                <span className="text-[10px] font-black uppercase">
                  Upload Cover
                </span>
                <input
                  type="file"
                  name="coverImage"
                  className="hidden"
                  accept="image/*"
                  required
                  onChange={(e) =>
                    setPreview(
                      e.target.files?.[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : null,
                    )
                  }
                />
              </label>
              {preview && (
                <img
                  src={preview}
                  className="w-full h-32 object-cover rounded-xl mt-2 border"
                />
              )}
            </div>
          </div>

          <footer className="p-6 bg-card border-t border-border">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Launch Event"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-muted-foreground">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-accent/30 border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
