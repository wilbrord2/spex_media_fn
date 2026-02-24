"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineTrash,
  HiOutlineExclamationTriangle,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
  HiXMark,
  HiCheck,
  HiOutlineXCircle,
} from "react-icons/hi2";
import Image from "next/image";
import {
  getContentList,
  deleteContent,
  getCategories,
  addContentCategory,
  deleteContentCategory,
} from "@/app/actions/review";

import ArticleDetailSlideOver from "@/app/[locale]/components/admin/ArticleDetailSlideOver";
import Link from "next/link";
import { useAppContext } from "@/app/[locale]/context";
import { toast } from "sonner";

export default function MagazineDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({ totalContents: 0, pageCount: 0 });
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [catForm, setCatForm] = useState({ name: "", description: "" });
  const [catLoading, setCatLoading] = useState(false);

  const { profile } = useAppContext();
  const role = profile?.role?.toUpperCase();
  const isAdmin = role !== "CONTENT_PROVIDER";

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [contentRes, catsRes] = await Promise.all([
        getContentList(
          currentPage,
          role === "CONTENT_PROVIDER" ? "author" : "public",
        ),
        getCategories(),
      ]);

      if (contentRes) {
        setArticles(contentRes.contentList || []);
        setPageInfo({
          totalContents: contentRes.totalContents,
          pageCount: contentRes.pageCount,
        });
      }
      if (catsRes) setCategories(catsRes);
    } finally {
      setLoading(false);
    }
  }, [currentPage, role]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name) return toast.error("Name required");
    setCatLoading(true);
    const result = await addContentCategory(catForm);
    if (result.success) {
      toast.success("Category created");
      setCatForm({ name: "", description: "" });
      setIsAddingCategory(false);
      const updated = await getCategories();
      setCategories(updated || []);
    } else {
      toast.error(result.message[0] || "Failed to create category");
    }
    setCatLoading(false);
  };

  const handleDeleteCategory = async (id: number) => {
    const success = await deleteContentCategory(id);
    if (success) {
      toast.success("Category removed");
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    const result = await deleteContent(deleteConfirmId);

    if (result.success) {
      toast.success(result.message);
      setArticles(articles.filter((a) => a.id !== deleteConfirmId));
    } else {
      toast.error(result.message);
    }

    setDeleteConfirmId(null);
  };

  const stats = useMemo(
    () => ({
      total: pageInfo.totalContents,
      published: articles.filter((a) =>
        ["PUBLISHED", "APPROVED"].includes(a.status),
      ).length,
      drafts: articles.filter((a) =>
        ["DRAFT", "PENDING_REVIEW"].includes(a.status),
      ).length,
      rejected: articles.filter((a) => a.status === "REJECTED").length,
    }),
    [articles, pageInfo.totalContents],
  );

  const filteredArticles = useMemo(() => {
    return articles
      .filter((a) => {
        const matchesSearch = a.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL" || a.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [articles, searchQuery, statusFilter, sortOrder]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Magazine Desk
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Editorial workflow.
          </p>
        </div>
        <Link
          href="/dashboard/magazine/create"
          className="bg-primary text-white p-3 md:px-6 md:py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
        >
          <HiOutlinePlus strokeWidth={2.5} />{" "}
          <span className="hidden md:inline text-sm">New Article</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total"
          value={stats.total}
          icon={<HiOutlineDocumentText />}
          color="text-blue-500"
          loading={loading}
        />
        <StatCard
          title="Live"
          value={stats.published}
          icon={<HiOutlineCheckCircle />}
          color="text-emerald-500"
          loading={loading}
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<HiOutlineXCircle />}
          color="text-rose-500"
          loading={loading}
        />
        <StatCard
          title="Drafts"
          value={stats.drafts}
          icon={<HiOutlinePencilSquare />}
          color="text-amber-500"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center bg-card p-3 rounded-2xl border border-border">
            <div className="flex-1 relative w-full">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 ring-primary shadow-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <CustomDropdown
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { label: "All Status", value: "ALL" },
                  { label: "Published", value: "APPROVED" },
                  { label: "Drafts", value: "PENDING_REVIEW" },
                  { label: "Rejected", value: "REJECTED" },
                ]}
              />
              <CustomDropdown
                value={sortOrder}
                onChange={setSortOrder}
                options={[
                  { label: "Newest", value: "desc" },
                  { label: "Oldest", value: "asc" },
                ]}
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-border min-h-[300px]">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))
                : filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-4 md:p-5 hover:bg-accent/5 transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-border shrink-0 bg-accent shadow-sm">
                            <Image
                              src={article.coverImage}
                              fill
                              className="object-cover"
                              alt=""
                            />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-black text-sm md:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                              <span className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1">
                                <HiOutlineClock className="text-primary" />{" "}
                                {new Date(
                                  article.createdAt,
                                ).toLocaleDateString()}
                              </span>
                              <StatusBadge status={article.status} />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-none border-border/50 justify-between sm:justify-end">
                          <button
                            onClick={() => setSelectedArticle(article)}
                            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-md cursor-pointer hover:bg-primary/90 transition-all"
                          >
                            {isAdmin &&
                            ["PENDING_REVIEW", "PENDING"].includes(
                              article.status,
                            )
                              ? "Review"
                              : "Preview"}
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => {
                                setDeleteConfirmId(article.id);
                              }}
                              className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20"
                            >
                              <HiOutlineTrash size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between bg-accent/5">
              <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Page {currentPage} of {pageInfo.pageCount}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1 || loading}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 rounded-xl bg-card border border-border hover:bg-primary hover:text-white disabled:opacity-20 transition-all"
                >
                  <HiChevronLeft size={18} />
                </button>
                <button
                  disabled={currentPage === pageInfo.pageCount || loading}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 rounded-xl bg-card border border-border hover:bg-primary hover:text-white disabled:opacity-20 transition-all"
                >
                  <HiChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Categories
            </h2>
            {isAdmin && (
              <button
                onClick={() => setIsAddingCategory(true)}
                className="p-1.5 bg-accent hover:bg-primary hover:text-white rounded-lg transition-all"
              >
                <HiOutlinePlus size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedArticle && (
        <ArticleDetailSlideOver
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onActionSuccess={loadData}
        />
      )}
      {isAddingCategory && (
        <div className="fixed inset-0 z-150 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black uppercase">New Category</h3>
              <button
                onClick={() => setIsAddingCategory(false)}
                className="p-2 hover:bg-accent rounded-full"
              >
                <HiXMark size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                className="w-full bg-accent/50 border-none rounded-xl px-4 py-3 text-sm font-bold"
                value={catForm.name}
                onChange={(e) =>
                  setCatForm({ ...catForm, name: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                className="w-full bg-accent/50 border-none rounded-xl px-4 py-3 text-sm font-bold min-h-[100px]"
                value={catForm.description}
                onChange={(e) =>
                  setCatForm({ ...catForm, description: e.target.value })
                }
              />
              <button
                disabled={catLoading}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {catLoading ? "Creating..." : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card p-6 rounded-2xl w-full max-w-sm border border-border text-center">
            <HiOutlineExclamationTriangle
              className="mx-auto text-rose-500 mb-4"
              size={48}
            />
            <h3 className="font-black uppercase text-sm mb-2 tracking-widest">
              Are you sure?
            </h3>
            <p className="text-muted-foreground text-xs mb-6">
              This action cannot be undone. Article will be permanently deleted.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3 rounded-xl bg-accent text-xs font-black uppercase"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl bg-rose-500 text-white text-xs font-black uppercase"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomDropdown({ value, onChange, options }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find((o: any) => o.value === value)?.label;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 bg-background border border-border hover:bg-accent/10 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter transition-all min-w-[130px] shadow-sm cursor-pointer"
      >
        <span>{selectedLabel}</span>
        <HiChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-card border border-border rounded-2xl shadow-2xl z-100 p-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt: any) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-xl text-[10px] font-black uppercase transition-colors ${value === opt.value ? "bg-primary text-white" : "hover:bg-accent"}`}
            >
              {opt.label}
              {value === opt.value && <HiCheck size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="p-5 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-14 h-14 bg-accent/40 rounded-2xl" />
        <div className="space-y-3 flex-1">
          <div className="h-4 bg-accent/40 rounded w-2/3" />
          <div className="h-2 bg-accent/20 rounded w-1/4" />
        </div>
      </div>
      <div className="hidden sm:block w-24 h-10 bg-accent/40 rounded-xl" />
    </div>
  );
}

function StatCard({ title, value, icon, color, className, loading }: any) {
  return (
    <div
      className={`bg-card border border-border p-5 rounded-3xl flex items-center gap-4 hover:border-primary/50 transition-all group ${className}`}
    >
      <div
        className={`p-3 rounded-2xl bg-accent ${color} group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6`}
      >
        {icon}
      </div>
      <div>
        <p className="text-muted-foreground text-[9px] font-black uppercase tracking-[0.15em] mb-1">
          {title}
        </p>
        {loading ? (
          <div className="h-7 w-12 bg-accent/50 animate-pulse rounded-lg" />
        ) : (
          <h4 className="text-2xl font-black tracking-tight">{value}</h4>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    PUBLISHED: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    DRAFT: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    PENDING_REVIEW: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    REJECTED: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    APPROVED: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    PENDING: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };
  return (
    <span
      className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-lg border w-fit ${styles[status] || styles.DRAFT}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
