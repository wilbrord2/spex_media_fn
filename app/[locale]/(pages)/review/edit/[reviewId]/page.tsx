"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  getContentById,
  updateContent,
  getCategories,
} from "@/app/actions/review";
import { Category } from "@/lib/dto";
import { toast } from "sonner";
import Image from "next/image";
import {
  Upload,
  Plus,
  Trash2,
  ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Minus,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function EditContentPage({
  params,
}: {
  params: Promise<{ reviewId: string }>;
}) {
  const { reviewId } = use(params);
  const contentId = parseInt(reviewId);
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    link: "",
    coverImage: null as File | null,
    contentImagePairs: [] as {
      file: File | null;
      preview: string;
      description: string;
    }[],
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  useEffect(() => {
    async function fetchData() {
      const [article, cats] = await Promise.all([
        getContentById(contentId),
        getCategories(),
      ]);
      if (article) {
        setFormData({
          title: article.title,
          content: article.content,
          categoryId: article.categoryId.toString(),
          link: article.link || "",
          coverImage: null,
          contentImagePairs: (article.imageDescriptions || []).map(
            (desc: string) => ({
              file: null,
              preview: "",
              description: desc,
            }),
          ),
        });
        setCoverPreview(article.coverImage);
        if (editor && article.content) {
          editor.commands.setContent(article.content);
        }
      }
      if (cats) setCategories(cats);
      setLoading(false);
    }
    fetchData();
  }, [contentId, editor]);

  const addImagePair = () => {
    setFormData({
      ...formData,
      contentImagePairs: [
        ...formData.contentImagePairs,
        { file: null, preview: "", description: "" },
      ],
    });
  };

  const updatePair = (
    index: number,
    field: "description" | "file",
    value: any,
  ) => {
    const newPairs = [...formData.contentImagePairs];
    if (field === "file") {
      newPairs[index].file = value;
      newPairs[index].preview = value ? URL.createObjectURL(value) : "";
    } else {
      newPairs[index].description = value;
    }
    setFormData({ ...formData, contentImagePairs: newPairs });
  };

  const removePair = (index: number) => {
    setFormData({
      ...formData,
      contentImagePairs: formData.contentImagePairs.filter(
        (_, i) => i !== index,
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("content", formData.content);
    submitData.append("categoryId", formData.categoryId);
    submitData.append("link", formData.link);
    submitData.append(
      "imageDescriptions",
      JSON.stringify(formData.contentImagePairs.map((p) => p.description)),
    );

    if (formData.coverImage)
      submitData.append("coverImage", formData.coverImage);
    formData.contentImagePairs.forEach((pair) => {
      if (pair.file) submitData.append("contentImages", pair.file);
    });

    const result = await updateContent(contentId, submitData);
    if (!(result as any).error) {
      toast.success("Article updated!");
      router.push(`/review/${contentId}`);
    } else {
      toast.error("Update failed");
    }
    setUpdating(false);
  };

  if (loading)
    return <div className="p-20 text-center font-bold">Loading Editor...</div>;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">Title</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-md border dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-red-600"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Category</label>
            <select
              className="w-full p-3 rounded-md border dark:bg-gray-800 dark:border-gray-700 outline-none"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Main Cover Image</label>
          <div className="relative h-48 w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden group">
            {coverPreview && (
              <Image
                src={coverPreview}
                alt="Cover"
                fill
                className="object-cover"
              />
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <span className="bg-white text-black px-4 py-2 rounded shadow text-sm font-medium">
                Change Cover
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, coverImage: file });
                    setCoverPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* --- Tiptap Rich Text Editor --- */}
        <div className="space-y-3">
          <label className="text-sm font-bold block">Article Content</label>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden focus-within:ring focus-within:ring-gray-400 transition-all">
            {/* Toolbar */}
            <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`px-2 py-1 rounded font-bold ${editor?.isActive("heading", { level: 1 }) ? "bg-red-700 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                H1
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`px-2 py-1 rounded font-bold ${editor?.isActive("heading", { level: 2 }) ? "bg-red-700 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                H2
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={`px-2 py-1 rounded font-bold ${editor?.isActive("heading", { level: 3 }) ? "bg-red-700 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                H3
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center" />
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${editor?.isActive("bold") ? "bg-red-100 text-red-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                <Bold size={18} />
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${editor?.isActive("italic") ? "bg-red-100 text-red-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                <Italic size={18} />
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded ${editor?.isActive("blockquote") ? "bg-red-100 text-red-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                <Quote size={18} />
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center" />
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${editor?.isActive("bulletList") ? "bg-red-100 text-red-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                <List size={18} />
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
                className={`p-2 rounded ${editor?.isActive("orderedList") ? "bg-red-100 text-red-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                <ListOrdered size={18} />
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().setHorizontalRule().run()
                }
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Minus size={18} />
              </button>
            </div>
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-center border-b pb-2 gap-1.5">
            <label className="text-lg font-bold flex items-center gap-2">
              <ImageIcon size={20} /> Content Gallery
            </label>
            <button
              type="button"
              onClick={addImagePair}
              className="bg-red-50 dark:bg-red-900/20 text-red-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 hover:bg-red-100 transition"
            >
              <Plus size={16} /> Add Image
            </button>
          </div>
          <div className="grid gap-4">
            {formData.contentImagePairs.map((pair, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700 relative group"
              >
                <div className="w-full md:w-32 h-32 relative rounded bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                  {pair.preview ? (
                    <Image
                      src={pair.preview}
                      alt="content"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <label className="flex items-center justify-center h-full cursor-pointer hover:bg-gray-300 transition">
                      <Upload size={20} className="text-gray-500" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          updatePair(index, "file", e.target.files?.[0])
                        }
                      />
                    </label>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500">
                    Image Description
                  </label>
                  <textarea
                    className="w-full p-2 rounded border dark:bg-gray-900 outline-none resize-none"
                    rows={2}
                    placeholder="How does this image relate?"
                    value={pair.description}
                    onChange={(e) =>
                      updatePair(index, "description", e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePair(index)}
                  className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 shadow-md p-1.5 rounded-full text-red-500 hover:scale-110 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-4 font-bold border border-gray-300 rounded-xl hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="flex-1 py-4 bg-red-700 text-white rounded-xl hover:bg-red-800 transition disabled:opacity-50 font-bold shadow-lg shadow-red-900/20"
          >
            {updating ? "Saving Changes..." : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
}
