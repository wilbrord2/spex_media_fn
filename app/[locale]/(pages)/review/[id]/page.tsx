"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import {
  getContentById,
  getComments,
  postComment,
  getContentList,
  deleteContent,
  BackendError,
} from "@/app/actions/review";
import { ContentItem, CommentRes, CommentInput } from "@/lib/dto";
import { toast } from "sonner";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";

const ContentDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const contentId = parseInt(id);

  const [content, setContent] = useState<ContentItem | null>(null);
  const [comments, setComments] = useState<CommentRes[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function loadPageData() {
      setIsLoading(true);
      const [article, articleComments, allContent] = await Promise.all([
        getContentById(contentId),
        getComments(contentId),
        getContentList(1),
      ]);

      if (article) {
        setContent(article);
        setComments(articleComments);
        if (allContent) {
          const related = allContent.contentList
            .filter(
              (item) =>
                item.categoryId === article.categoryId &&
                item.id !== article.id,
            )
            .slice(0, 3);
          setRelatedArticles(related);
        }
      }
      setIsLoading(false);
    }
    loadPageData();
  }, [contentId]);

  const confirmDelete = async () => {
    setIsDeleting(true);
    const success = await deleteContent(contentId);
    if (success) {
      toast.success("Article deleted successfully");
      router.push("/review");
    } else {
      toast.error("Failed to delete article");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const commentData: CommentInput = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      comment: formData.comment,
    };

    const result = await postComment(contentId, commentData);

    if (!(result as BackendError).error) {
      const updatedComments = await getComments(contentId);
      setComments(updatedComments);
      setFormData({ name: "", email: "", phone: "", comment: "" });
      toast.success("Comment added");
    } else {
      toast.error((result as BackendError).message || "Failed to post comment");
    }
    setIsSubmitting(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  if (!content)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg">Article not found</div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-red-700 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative">
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

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <button
          onClick={() => router.push(`/review/edit/${contentId}`)}
          className="p-4 bg-primary/95 text-white rounded-full shadow-2xl hover:bg-primary transition-all hover:scale-110 active:scale-95"
          title="Edit Article"
        >
          <Pencil size={24} />
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="p-4 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-all hover:scale-110 active:scale-95"
          title="Delete Article"
        >
          <Trash2 size={24} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
        <Image
          src={content.coverImage}
          alt={content.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white px-4 text-center">
            {content.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-semibold rounded-full uppercase tracking-wider">
            {content.category.name}
          </span>
          <span className="ml-4 text-sm text-gray-500 font-medium">
            {new Date(content.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </article>

        {/* Comment Form */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6">Leave a Comment</h3>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                placeholder="Name"
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                placeholder="Email"
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                placeholder="Phone Number"
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
            </div>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleFormChange}
              required
              rows={4}
              placeholder="Your thoughts..."
              className="w-full p-2 border rounded dark:bg-gray-800"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-red-700 text-white rounded hover:bg-red-800 disabled:opacity-50 font-bold transition"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>

        {/* Recent Comments */}
        <div className="mt-12 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Comments ({comments.length})
          </h3>
          {comments.slice(0, 3).map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center font-bold">
                  {comment.fullName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {comment.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => router.push(`/review/${article.id}`)}
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded mb-2 uppercase">
                      {article.category.name}
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetails;
