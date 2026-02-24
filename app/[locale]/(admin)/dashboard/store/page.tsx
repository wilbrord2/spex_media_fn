"use client";

import AddBookSlideOver from "@/app/[locale]/components/admin/AddBookSlideOver";
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineArchiveBox,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineExclamationTriangle,
  HiOutlineTag,
  HiXMark,
  HiCheck,
  HiChevronDown,
} from "react-icons/hi2";
import Image from "next/image";
import { toast } from "sonner";
import {
  BookResponse,
  deleteBook,
  getAdminBooks,
  getCategories,
  addCategory,
  deleteCategory,
  Book,
} from "@/app/actions/book";
import BookManageSlideOver from "@/app/[locale]/components/admin/BookManageSlideOver";

export default function BooksDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Category State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [catForm, setCatForm] = useState({ name: "", description: "" });
  const [catLoading, setCatLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [booksRes, catsRes] = await Promise.all([
        getAdminBooks(),
        getCategories(),
      ]);
      setBooks(booksRes?.books || []);
      setCategories(catsRes || []);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatLoading(true);
    const success = await addCategory(catForm);
    if (success) {
      toast.success("Category created");
      setCatForm({ name: "", description: "" });
      setIsAddingCategory(false);
      const updatedCats = await getCategories();
      setCategories(updatedCats);
    }
    setCatLoading(false);
  };

  const handleDeleteCategory = async (id: number) => {
    const success = await deleteCategory(id);
    if (success) {
      toast.success("Category removed");
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    try {
      const success = await deleteBook(deleteConfirmId);
      if (success) {
        toast.success("Book deleted successfully");
        setBooks((prev) => prev.filter((b) => b.id !== deleteConfirmId));
        setDeleteConfirmId(null);
      } else {
        toast.error("Could not delete book");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const stats = useMemo(
    () => ({
      total: books.length,
      published: books.filter((b) => b.isBookPublished).length,
      unpublished: books.filter((b) => !b.isBookPublished).length,
      lowStock: books.filter((b) => b.numberOfBooksInStock < 10).length,
    }),
    [books],
  );

  const filteredBooks = useMemo(() => {
    return books
      .filter((b) => {
        const matchesSearch = b.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL"
            ? true
            : statusFilter === "PUBLISHED"
              ? b.isBookPublished
              : !b.isBookPublished;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [books, searchQuery, statusFilter, sortOrder]);

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Book Inventory
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Manage stock and publication.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:opacity-90 transition-all"
        >
          <HiOutlinePlus strokeWidth={2.5} />
          <span className="text-sm">Add Book</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Books"
          value={stats.total}
          icon={<HiOutlineBookOpen />}
        />
        <StatCard
          title="Published"
          value={stats.published}
          icon={<HiOutlineCheckCircle />}
        />
        <StatCard
          title="Unpublished"
          value={stats.unpublished}
          icon={<HiOutlineArchiveBox />}
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStock}
          icon={<HiOutlineExclamationTriangle />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Main Content: Books List */}
        <div className="xl:col-span-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center bg-card p-3 rounded-2xl border border-border">
            <div className="flex-1 relative w-full">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title..."
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
                  { label: "Published", value: "PUBLISHED" },
                  { label: "Unpublished", value: "UNPUBLISHED" },
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
            {loading ? (
              <div className="p-20 text-center text-muted-foreground font-black uppercase text-[10px] tracking-widest">
                Loading...
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-4 hover:bg-accent/5 transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-border shrink-0">
                          <Image
                            src={book.coverImage}
                            fill
                            className="object-cover"
                            alt=""
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">
                            {book.authorName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge published={book.isBookPublished} />
                            <span className="text-[9px] font-black px-2 py-0.5 bg-accent rounded uppercase">
                              {book.numberOfBooksInStock} Unit
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedBook(book)}
                          className="p-2.5 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all"
                        >
                          <HiOutlineAdjustmentsHorizontal size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(book.id)}
                          className="p-2.5 rounded-xl bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Categories Section */}
        <div className="xl:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Genres & Categories
            </h2>
            <button
              onClick={() => setIsAddingCategory(true)}
              className="p-1.5 bg-accent hover:bg-primary hover:text-white rounded-lg transition-all"
            >
              <HiOutlinePlus size={16} />
            </button>
          </div>

          {/* <div className="bg-card border border-border rounded-2xl p-2 space-y-1">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-all border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-muted-foreground">
                    <HiOutlineTag size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase leading-none">
                      {cat.name}
                    </p>
                    <p className="text-[9px] text-muted-foreground font-medium truncate w-32">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1.5 text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  <HiOutlineTrash size={14} />
                </button>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* MODALS */}
      {isAddingCategory && (
        <div className="fixed inset-0 z-150 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black uppercase">Add Genre</h2>
              <button
                onClick={() => setIsAddingCategory(false)}
                className="p-2 hover:bg-accent rounded-full"
              >
                <HiXMark size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <input
                required
                value={catForm.name}
                onChange={(e) =>
                  setCatForm({ ...catForm, name: e.target.value })
                }
                className="w-full bg-accent/50 border-none rounded-xl px-4 py-3 text-sm font-bold"
                placeholder="Category Name"
              />
              <textarea
                value={catForm.description}
                onChange={(e) =>
                  setCatForm({ ...catForm, description: e.target.value })
                }
                className="w-full bg-accent/50 border-none rounded-xl px-4 py-3 text-sm font-bold min-h-[100px]"
                placeholder="Short Description..."
              />
              <button
                disabled={catLoading}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {catLoading ? "Creating..." : "Save Category"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-sm rounded-2xl p-6 shadow-2xl scale-in-center">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 animate-pulse">
                <HiOutlineExclamationTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">
                  Remove Book?
                </h3>
                <p className="text-xs text-muted-foreground font-medium px-4">
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex w-full gap-3 pt-2">
                <button
                  disabled={isDeleting}
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-3 rounded-xl bg-accent text-xs font-black uppercase disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={isDeleting}
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-3 rounded-xl bg-rose-500 text-white text-xs font-black uppercase flex items-center justify-center gap-2"
                >
                  {isDeleting ? "Deleting..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddBookSlideOver
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadData}
      />
      {selectedBook && (
        <BookManageSlideOver
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${published ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" : "text-orange-500 bg-orange-500/10 border-orange-500/20"}`}
    >
      {published ? "Live" : "Draft"}
    </span>
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
    <div className="bg-card border border-border p-4 rounded-2xl flex items-center gap-4 hover:border-primary/50 transition-all shadow-sm group">
      <div className="p-2.5 rounded-xl bg-accent text-muted-foreground group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-muted-foreground text-[9px] font-black uppercase tracking-widest leading-none mb-1">
          {title}
        </p>
        <h4 className="text-xl font-black tracking-tight">{value}</h4>
      </div>
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
