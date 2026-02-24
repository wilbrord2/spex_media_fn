"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineUserPlus,
  HiOutlineMagnifyingGlass,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCheckBadge,
  HiOutlineClock,
  HiOutlineNoSymbol,
  HiChevronDown,
  HiCheck,
} from "react-icons/hi2";
import {
  approveAuthor,
  Author,
  getAuthorsList,
  rejectAuthor,
} from "@/app/actions/authors";

/* ================= TYPES ================= */

type SearchOption = "" | "UserId" | "PhoneNumber" | "Name" | "Email";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchOption, setSearchOption] = useState<SearchOption>("Name");
  const [searchValue, setSearchValue] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({ totalUsers: 0, pageCount: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);

  /* ================= API ================= */

  const loadAuthors = useCallback(
    async (searchOption?: string) => {
      setLoading(true);

      const res = await getAuthorsList({
        page: currentPage,
        search: searchValue,
        searchOptions: searchOption || "All",
        status: statusFilter === "All" ? "" : statusFilter,
        sorting: sortOrder,
      });

      if (res) {
        setAuthors(res.userInfoList || []);
        setPageInfo({ totalUsers: res.totalUsers, pageCount: res.pageCount });
      }

      setLoading(false);
    },
    [currentPage, searchValue, searchOption, statusFilter, sortOrder],
  );

  const handleAction = async (id: number, type: "approve" | "reject") => {
    setProcessingId(id);
    const success =
      type === "approve" ? await approveAuthor(id) : await rejectAuthor(id);
    if (success) await loadAuthors();
    setProcessingId(null);
  };

  const handleSearch = () => {
    if (!searchOption || !searchValue.trim()) return;
    setCurrentPage(1);
    loadAuthors(searchOption);
  };

  useEffect(() => {
    loadAuthors();
  }, [currentPage, statusFilter, sortOrder]);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            Content Creators Directory
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm font-medium">
            Manage and verify platform content providers.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Authors"
          value={pageInfo.totalUsers}
          icon={<HiOutlineUsers />}
          color="text-blue-500"
        />
        <StatCard
          title="Account Approved"
          value={
            authors.filter((a) => a.verification_status === "APPROVED").length
          }
          icon={<HiOutlineCheckBadge />}
          color="text-emerald-500"
        />
        <StatCard
          title="Account Pending"
          value={
            authors.filter((a) => a.verification_status === "PENDING").length
          }
          icon={<HiOutlineClock />}
          color="text-amber-500"
        />
        <StatCard
          title="Account Rejected"
          value={
            authors.filter((a) => a.verification_status === "REJECTED").length
          }
          icon={<HiOutlineNoSymbol />}
          color="text-rose-500"
        />
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center bg-card p-3 rounded-2xl border border-border">
        {/* Search (edge-to-edge layout) */}
        <div className="lg:col-span-5 flex items-stretch border border-border rounded-xl bg-background">
          {/* Input */}
          <input
            type="text"
            placeholder={`Search by ${
              searchOption === "UserId"
                ? "ID"
                : searchOption === "PhoneNumber"
                  ? "Phone"
                  : searchOption.toLowerCase()
            }...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 px-4 py-2.5  text-sm outline-none rounded-l-xl min-w-0"
          />

          {/* Combined Search + Dropdown Button */}
          <div className="flex items-stretch border-l border-border rounded-r-xl relative">
            {/* Search Icon */}
            <button
              onClick={handleSearch}
              disabled={!searchOption || !searchValue.trim()}
              className="px-3 py-2 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <HiOutlineMagnifyingGlass className="size-4" />
            </button>

            {/* Dropdown Arrow */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="px-3 py-2 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all rounded-r-xl"
            >
              <HiChevronDown
                className={`size-4 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Options */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border rounded-2xl shadow-2xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150">
                {[
                  { label: "Name", value: "Name" },
                  { label: "User ID", value: "UserId" },
                  { label: "Phone", value: "PhoneNumber" },
                  { label: "Email", value: "Email" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSearchOption(opt.value as SearchOption);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-[12px] font-black uppercase hover:bg-accent ${
                      searchOption === opt.value ? "bg-primary text-white" : ""
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="lg:col-span-7 flex gap-2 justify-end">
          <CustomDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            className="rounded-xl"
            options={[
              { label: "All Status", value: "All" },
              { label: "Approved", value: "Approved" },
              { label: "Pending", value: "Pending" },
              { label: "Rejected", value: "Rejected" },
            ]}
          />

          <CustomDropdown
            value={sortOrder}
            onChange={setSortOrder}
            className="rounded-xl"
            options={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
            ]}
          />
        </div>
      </div>

      {/* Authors List */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 bg-muted/30 border-b border-border text-[12px] font-black text-muted-foreground uppercase px-6 py-4">
          <div className="col-span-2">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Phone</div>
          <div className="col-span-2 text-center">Account Status</div>
          <div className="col-span-1 text-center">Created</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-border">
          {loading ? (
            <div className="p-20 text-center text-muted-foreground animate-pulse font-bold uppercase text-xs tracking-widest">
              Fetching Authors...
            </div>
          ) : authors.length > 0 ? (
            authors.map((user) => (
              <div
                key={user.id}
                className="p-4 md:px-6 md:py-4 hover:bg-accent/5 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Mobile */}
                  <div className="md:hidden flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black border border-primary/20 text-lg">
                      {user.name[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold truncate">
                        {user.name}
                      </span>
                      <span className="text-[12px] text-muted-foreground flex items-center gap-1">
                        <HiOutlineEnvelope /> {user.email}
                      </span>
                      <span className="text-[12px] text-muted-foreground flex items-center gap-1">
                        <HiOutlinePhone /> {user.phone}
                      </span>
                    </div>
                  </div>
                  {/* Desktop */}
                  <div className="hidden md:flex md:col-span-2 items-center gap-3">
                    <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black border border-primary/20 text-xs">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="text-[13px] font-bold truncate">
                      {user.name}
                    </span>
                  </div>
                  <div className="hidden md:block md:col-span-3 text-[13px] text-muted-foreground truncate">
                    {user.email}
                  </div>
                  <div className="hidden md:block md:col-span-2 text-[13px] text-muted-foreground">
                    {user.phone}
                  </div>
                  {/* Status */}{" "}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    {" "}
                    <span className="md:hidden text-xs font-bold text-muted-foreground uppercase">
                      {" "}
                      Account:{" "}
                    </span>{" "}
                    <StatusBadge status={user.verification_status} />{" "}
                  </div>{" "}
                  {/* Created */}{" "}
                  <div className="md:col-span-1 flex items-center justify-between md:justify-center">
                    {" "}
                    <span className="md:hidden text-xs font-bold text-muted-foreground uppercase">
                      {" "}
                      Created:{" "}
                    </span>{" "}
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      {new Date(user.created_at).toLocaleDateString()}{" "}
                    </span>{" "}
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2">
                    {user.verification_status !== "APPROVED" && (
                      <button
                        disabled={processingId === user.id}
                        onClick={() => handleAction(user.id, "approve")}
                        className="flex-1 md:flex-none px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white text-[11px] font-black uppercase transition-all disabled:opacity-50"
                      >
                        {processingId === user.id ? "..." : "Approve"}
                      </button>
                    )}
                    {user.verification_status !== "REJECTED" && (
                      <button
                        disabled={processingId === user.id}
                        onClick={() => handleAction(user.id, "reject")}
                        className="flex-1 md:flex-none px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white text-[11px] font-black uppercase transition-all disabled:opacity-50"
                      >
                        {processingId === user.id ? "..." : "Reject"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-muted-foreground text-sm font-medium italic">
              No authors found.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 pt-4">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">
          {pageInfo.totalUsers} Authors found
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 text-xs font-bold uppercase bg-card border border-border rounded-lg disabled:opacity-30"
          >
            Prev
          </button>
          <button
            disabled={currentPage >= pageInfo.pageCount}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 text-xs font-bold uppercase bg-primary text-white rounded-lg disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon, color, className = "" }: any) {
  return (
    <div
      className={`bg-card border border-border p-4 rounded-2xl flex items-center justify-between ${className}`}
    >
      <div>
        <p className="text-[9px] font-black uppercase text-muted-foreground mb-1 tracking-widest">
          {title}
        </p>
        <h3 className="text-xl font-black">{value}</h3>
      </div>
      <div className={`text-2xl ${color} opacity-40`}>{icon}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    APPROVED: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    PENDING: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    REJECTED: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  };
  return (
    <span
      className={`text-[9px] font-black uppercase px-2 py-1 rounded-md border ${
        styles[status] || styles.PENDING
      }`}
    >
      {status}
    </span>
  );
}

function CustomDropdown({ value, onChange, options, className }: any) {
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
        className={`flex items-center justify-between gap-3 bg-background border border-border hover:bg-accent/10 px-4 py-2.5 text-xs font-black uppercase tracking-tighter transition-all min-w-fit cursor-pointer border-r ${className} rounded-l-xl`}
      >
        <span>{selectedLabel || "Search By"}</span>
        <HiChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
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
              className={`w-full cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-xl text-[10px] font-black uppercase transition-colors ${
                value === opt.value
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
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
