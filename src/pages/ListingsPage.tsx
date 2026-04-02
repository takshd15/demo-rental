import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ListingCard } from "@/components/ListingCard";
import { FilterPanel, type RentalTypeFilter } from "@/components/FilterPanel";
import { mockListings } from "@/data/mockListings";

export type ListingsSort =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "location"
  | "type";

export function ListingsPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMax, setPriceMax] = useState(800);
  const [guests, setGuests] = useState(1);
  const [rentalType, setRentalType] = useState<RentalTypeFilter>("all");
  const [wifiRequired, setWifiRequired] = useState(false);
  const [furnishedRequired, setFurnishedRequired] = useState(false);
  const [sort, setSort] = useState<ListingsSort>("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const max = searchParams.get("max");
    const q = searchParams.get("q");
    if (max) {
      const n = parseInt(max, 10);
      if (!Number.isNaN(n) && n >= 40) setPriceMax(Math.min(n, 900));
    }
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setPriceMax(800);
    setGuests(1);
    setRentalType("all");
    setWifiRequired(false);
    setFurnishedRequired(false);
    setSort("recommended");
  }, []);

  const filtered = useMemo(() => {
    let list = mockListings.filter((l) => {
      if (searchQuery.trim()) {
        const qq = searchQuery.trim().toLowerCase();
        const hay = `${l.title} ${l.location} ${l.address}`.toLowerCase();
        if (!hay.includes(qq)) return false;
      }
      if (l.pricePerNight > priceMax) return false;
      const maxG = Math.max(...l.units.map((u) => u.guests), 0);
      if (maxG < guests) return false;
      if (rentalType !== "all" && l.rentalType !== rentalType) return false;
      if (wifiRequired && !l.wifi) return false;
      if (furnishedRequired && !l.furnished) return false;
      return true;
    });

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "price-desc") list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (sort === "location") list.sort((a, b) => a.location.localeCompare(b.location, undefined, { sensitivity: "base" }));
    if (sort === "type") {
      list.sort((a, b) => {
        const o = (t: string) => (t === "sublet" ? 0 : 1);
        return o(a.rentalType) - o(b.rentalType);
      });
    }

    return list;
  }, [
    searchQuery,
    priceMax,
    guests,
    rentalType,
    wifiRequired,
    furnishedRequired,
    sort,
  ]);

  const filterProps = useMemo(
    () => ({
      priceMax,
      onPriceMaxChange: setPriceMax,
      guests,
      onGuestsChange: setGuests,
      locationQuery: searchQuery,
      onLocationQueryChange: setSearchQuery,
      rentalType,
      onRentalTypeChange: setRentalType,
      wifiRequired,
      onWifiRequiredChange: setWifiRequired,
      furnishedRequired,
      onFurnishedRequiredChange: setFurnishedRequired,
      onReset: resetFilters,
    }),
    [
      priceMax,
      guests,
      searchQuery,
      rentalType,
      wifiRequired,
      furnishedRequired,
      resetFilters,
    ],
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#fafafa]">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 md:py-10 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Browse stays
          </h1>
          <p className="mt-2 text-neutral-600">
            Curated spaces with clear pricing — filter fast, book with confidence.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(280px,320px)_1fr] lg:items-start lg:gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <FilterPanel {...filterProps} />
          </aside>

          {/* Main column */}
          <div className="min-w-0">
            {/* Mobile filters trigger */}
            <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
              <p className="text-sm text-neutral-600">
                <span className="font-semibold text-neutral-900">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "place" : "places"}
              </p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
              >
                <SlidersHorizontal size={18} strokeWidth={1.75} aria-hidden />
                Filters
              </button>
            </div>

            {/* Top bar: search + sort */}
            <div className="rounded-2xl border border-neutral-100/90 bg-white p-4 shadow-sm md:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
                <label className="relative flex-1 min-w-0">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                    <Search size={18} strokeWidth={1.75} aria-hidden />
                  </span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by city, neighborhood, or keyword"
                    className="w-full rounded-xl border border-neutral-200 bg-nest-surface/50 py-3 pl-10 pr-4 text-sm text-neutral-900 shadow-inner outline-none transition-all placeholder:text-neutral-400 focus:border-nest-yellow/50 focus:bg-white focus:ring-2 focus:ring-nest-yellow/20"
                    aria-label="Search listings"
                  />
                </label>
                <div className="flex shrink-0 items-center gap-2 md:min-w-[200px]">
                  <span className="hidden text-sm text-neutral-500 md:inline">Sort</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as ListingsSort)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm font-medium text-neutral-900 shadow-sm outline-none transition-colors hover:border-neutral-300 focus:border-nest-yellow/50 focus:ring-2 focus:ring-nest-yellow/20 md:w-auto"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="location">Location (A–Z)</option>
                    <option value="type">Rental type</option>
                  </select>
                </div>
              </div>
            </div>

            <p className="mt-6 hidden text-sm text-neutral-600 lg:block">
              <span className="font-semibold text-neutral-900">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "listing" : "listings"} match your filters
            </p>

            <motion.div
              initial={{ opacity: 0.92 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.22 }}
              className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="sync" initial={false}>
                {filtered.map((l, i) => (
                  <ListingCard
                    key={l.id}
                    index={i}
                    listGrid
                    showSave
                    id={l.id}
                    title={l.title}
                    location={l.location}
                    pricePerNight={l.pricePerNight}
                    currency={l.currency}
                    description={l.description}
                    image={l.image}
                    rating={l.rating}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 rounded-2xl border border-dashed border-neutral-200 bg-white py-16 text-center shadow-sm"
              >
                <p className="font-medium text-neutral-900">No listings match your filters</p>
                <p className="mt-2 text-sm text-neutral-500">Try widening search or clearing filters.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-full bg-nest-yellow px-6 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-nest-yellow-hover"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter modal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close filters"
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-[#fafafa] px-4 pb-8 pt-4 shadow-2xl"
            >
              <div className="mx-auto flex max-w-lg items-center justify-between pb-4">
                <span className="text-lg font-semibold text-neutral-900">Filters</span>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm"
                  aria-label="Close"
                >
                  <X size={20} strokeWidth={1.75} />
                </button>
              </div>
              <div className="mx-auto max-w-lg pb-6">
                <FilterPanel {...filterProps} reducedMotion />
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="mt-6 w-full rounded-full bg-nest-yellow py-3.5 text-sm font-semibold text-neutral-900 shadow-md hover:bg-nest-yellow-hover"
                >
                  Show {filtered.length} {filtered.length === 1 ? "result" : "results"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
