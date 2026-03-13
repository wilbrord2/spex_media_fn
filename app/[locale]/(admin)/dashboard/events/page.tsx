"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineExclamationTriangle,
  HiOutlineTag,
  HiXMark,
  HiCheck,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineMapPin,
  HiOutlineInbox,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import Image from "next/image";
import { toast } from "sonner";
import {
  deleteEvent,
  getAllAdminEvents,
  getEventCategories,
  addEventCategory,
  deleteEventCategory,
  toggleEventPublishStatus,
} from "@/app/actions/event";
import AddEventSlideOver from "@/app/[locale]/components/admin/AddEventSlideOver";

export default function EventsDashboard() {
  // --- State ---
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deleteCatConfirmId, setDeleteCatConfirmId] = useState<number | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [catPage, setCatPage] = useState(1);
  const [catPageInfo, setCatPageInfo] = useState({
    pageCount: 1,
    hasNextPage: false,
  });
  const [catForm, setCatForm] = useState({ name: "", description: "" });
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const itemsPerPage = 5;

  // --- Data Loading ---
  const loadCategoryPage = useCallback(async (page: number) => {
    setCatLoading(true);
    try {
      const catsRes = await getEventCategories(page);
      if (catsRes?.data) {
        setCategories(catsRes.data.items || []);
        setCatPageInfo({
          pageCount: catsRes.data.pageCount || 1,
          hasNextPage: !!catsRes.data.hasNextPage,
        });
      }
    } finally {
      setCatLoading(false);
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const eventsRes = await getAllAdminEvents();
      if (eventsRes?.data) setEvents(eventsRes.data);
      await loadCategoryPage(1);
    } finally {
      setLoading(false);
    }
  }, [loadCategoryPage]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // --- Handlers ---
  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    const success = await toggleEventPublishStatus(id, currentStatus);
    if (success) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === id ? { ...ev, isPublished: !currentStatus } : ev,
        ),
      );
      toast.success(currentStatus ? "Event unpublished" : "Event published");
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    const success = await addEventCategory({
      name: catForm.name,
      description: catForm.description,
    });
    if (success) {
      toast.success("Category added");
      setCatForm({ name: "", description: "" });
      setIsAddingCategory(false);
      loadCategoryPage(1);
    }
    setIsDeleting(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    const success = await deleteEvent(deleteConfirmId);
    if (success) {
      setEvents((prev) => prev.filter((e) => e.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Event removed");
    }
    setIsDeleting(false);
  };

  const handleConfirmDeleteCategory = async () => {
    if (!deleteCatConfirmId) return;
    setIsDeleting(true);
    const success = await deleteEventCategory(deleteCatConfirmId);
    if (success) {
      loadCategoryPage(catPage);
      setDeleteCatConfirmId(null);
      toast.success("Category removed");
    }
    setIsDeleting(false);
  };

  // --- Memoized Logic ---
  const stats = useMemo(
    () => ({
      total: events.length,
      published: events.filter((e) => e.isPublished).length,
      upcoming: events.filter((e) => new Date(e.eventDate) > new Date()).length,
      fullyBooked: events.filter((e) => e.currentAttendees >= e.capacity)
        .length,
    }),
    [events],
  );

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch = e.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : statusFilter === "PUBLISHED"
            ? e.isPublished
            : !e.isPublished;
      return matchesSearch && matchesStatus;
    });
  }, [events, searchQuery, statusFilter]);

  const displayedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Event Management
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Monitoring and deletion console.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
        >
          <HiOutlinePlus strokeWidth={2.5} />{" "}
          <span className="text-sm">Create Event</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Events"
          value={stats.total}
          icon={<HiOutlineCalendarDays />}
        />
        <StatCard
          title="Live Events"
          value={stats.published}
          icon={<HiOutlineCheckCircle />}
        />
        <StatCard
          title="Upcoming"
          value={stats.upcoming}
          icon={<HiOutlineClock />}
        />
        <StatCard
          title="Fully Booked"
          value={stats.fullyBooked}
          icon={<HiOutlineExclamationTriangle />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 items-center bg-card p-3 rounded-2xl border border-border">
            <div className="flex-1 relative w-full">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CustomDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: "All Status", value: "ALL" },
                { label: "Live", value: "PUBLISHED" },
                { label: "Draft", value: "DRAFT" },
              ]}
            />
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-20 text-center font-black text-[10px] tracking-widest text-muted-foreground">
                Loading...
              </div>
            ) : displayedEvents.length === 0 ? (
              <div className="p-20 text-center space-y-3">
                <HiOutlineInbox
                  size={40}
                  className="mx-auto text-muted-foreground/30"
                />
                <p className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">
                  No events found
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {displayedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 hover:bg-accent/5 group transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border shrink-0">
                          <Image
                            src={event.coverImage}
                            fill
                            className="object-cover"
                            alt=""
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm group-hover:text-primary">
                            {event.title}
                          </h3>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1">
                            <HiOutlineMapPin size={10} /> {event.location}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge published={event.isPublished} />
                            <span className="text-[9px] font-black px-2 py-0.5 bg-accent rounded uppercase">
                              {event.currentAttendees} / {event.capacity}{" "}
                              Enrolled
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleTogglePublish(event.id, event.isPublished)
                          }
                          className={`p-2.5 rounded-xl transition-all ${
                            event.isPublished
                              ? "bg-orange-500/5 text-orange-500 hover:bg-orange-500 hover:text-white"
                              : "bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                          }`}
                          title={event.isPublished ? "Unpublish" : "Publish"}
                        >
                          {event.isPublished ? (
                            <HiOutlineEyeSlash size={18} />
                          ) : (
                            <HiOutlineEye size={18} />
                          )}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(event.id)}
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

        {/* Categories Sidebar */}
        <div className="xl:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Categories
            </h2>
            <button
              onClick={() => setIsAddingCategory(true)}
              className="p-1.5 bg-accent hover:bg-primary hover:text-white rounded-lg transition-all"
            >
              <HiOutlinePlus size={16} />
            </button>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
            <div className={catLoading ? "opacity-40" : ""}>
              {categories.length === 0 && !catLoading ? (
                <div className="p-10 text-center space-y-2">
                  <p className="font-black text-[9px] uppercase tracking-widest text-muted-foreground/60">
                    No categories found
                  </p>
                </div>
              ) : (
                categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <HiOutlineTag size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase">
                          {cat.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDeleteCatConfirmId(cat.id)}
                      className="p-2 text-muted-foreground hover:text-rose-500 transition-all"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
            {/* Cat Pagination */}
            <div className="p-3 bg-accent/5 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase text-muted-foreground">
                Pg {catPage} / {catPageInfo.pageCount}
              </span>
              <div className="flex gap-1">
                <button
                  disabled={catPage === 1}
                  onClick={() => {
                    setCatPage((p) => p - 1);
                    loadCategoryPage(catPage - 1);
                  }}
                  className="p-1.5 rounded bg-card border border-border disabled:opacity-20"
                >
                  <HiChevronLeft size={12} />
                </button>
                <button
                  disabled={!catPageInfo.hasNextPage}
                  onClick={() => {
                    setCatPage((p) => p + 1);
                    loadCategoryPage(catPage + 1);
                  }}
                  className="p-1.5 rounded bg-card border border-border disabled:opacity-20"
                >
                  <HiChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {isAddingCategory && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black uppercase">Add Category</h2>
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
                className="w-full bg-accent/50 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                placeholder="Name"
              />
              <textarea
                value={catForm.description}
                onChange={(e) =>
                  setCatForm({ ...catForm, description: e.target.value })
                }
                className="w-full bg-accent/50 rounded-xl px-4 py-3 text-sm font-bold min-h-[100px] outline-none"
                placeholder="Description"
              />
              <button
                disabled={isDeleting}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs"
              >
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}

      {(deleteConfirmId || deleteCatConfirmId) && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-sm rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
              <HiOutlineExclamationTriangle size={24} />
            </div>
            <h3 className="text-lg font-black uppercase">Confirm Delete?</h3>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDeleteConfirmId(null);
                  setDeleteCatConfirmId(null);
                }}
                className="flex-1 py-3 rounded-xl bg-accent font-black text-xs uppercase"
              >
                Cancel
              </button>
              <button
                onClick={
                  deleteCatConfirmId
                    ? handleConfirmDeleteCategory
                    : handleConfirmDelete
                }
                className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-black text-xs uppercase"
              >
                {isDeleting ? "..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <AddEventSlideOver
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadInitialData}
      />
    </div>
  );
}

// --- Sub-components ---

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${published ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" : "text-orange-500 bg-orange-500/10 border-orange-500/20"}`}
    >
      {published ? "Live" : "Draft"}
    </span>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-card border border-border p-4 rounded-2xl flex items-center gap-4 shadow-sm">
      <div className="p-2.5 rounded-xl bg-accent text-muted-foreground">
        {React.cloneElement(icon, { size: 18 })}
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
  const label = options.find((o: any) => o.value === value)?.label;

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 bg-background border border-border px-4 py-2.5 rounded-xl text-xs font-black uppercase min-w-[130px]"
      >
        {label} <HiChevronDown className={isOpen ? "rotate-180" : ""} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-full bg-card border border-border rounded-xl shadow-xl z-[100] p-1">
          {options.map((opt: any) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-[10px] font-black uppercase ${value === opt.value ? "bg-primary text-white" : "hover:bg-accent"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
