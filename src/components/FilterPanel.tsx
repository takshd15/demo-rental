import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion";

export type RentalTypeFilter = "all" | "sublet" | "full";

type Props = {
  priceMax: number;
  onPriceMaxChange: (v: number) => void;
  guests: number;
  onGuestsChange: (v: number) => void;
  locationQuery: string;
  onLocationQueryChange: (v: string) => void;
  rentalType: RentalTypeFilter;
  onRentalTypeChange: (v: RentalTypeFilter) => void;
  wifiRequired: boolean;
  onWifiRequiredChange: (v: boolean) => void;
  furnishedRequired: boolean;
  onFurnishedRequiredChange: (v: boolean) => void;
  onReset?: () => void;
  /** When true, skip entrance animation (e.g. mobile sheet already animated) */
  reducedMotion?: boolean;
};

const field =
  "block text-[11px] font-semibold uppercase tracking-wider text-neutral-500";

const inputBase =
  "mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm transition-shadow placeholder:text-neutral-400 hover:border-neutral-300 focus:border-nest-yellow/60 focus:outline-none focus:ring-2 focus:ring-nest-yellow/25";

const chip =
  "rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200";

export const FilterPanel = memo(function FilterPanel({
  priceMax,
  onPriceMaxChange,
  guests,
  onGuestsChange,
  locationQuery,
  onLocationQueryChange,
  rentalType,
  onRentalTypeChange,
  wifiRequired,
  onWifiRequiredChange,
  furnishedRequired,
  onFurnishedRequiredChange,
  onReset,
  reducedMotion,
}: Props) {
  const hasActiveFilters =
    rentalType !== "all" ||
    wifiRequired ||
    furnishedRequired ||
    priceMax < 800 ||
    guests > 2 ||
    locationQuery.trim().length > 0;

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.medium, ease: EASE_OUT }}
      className="rounded-xl border border-neutral-100/90 bg-white p-6 shadow-soft"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-neutral-900">Filters</h2>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className={`text-xs font-semibold transition-colors ${
              hasActiveFilters ? "text-neutral-900 hover:underline" : "text-neutral-400"
            }`}
            disabled={!hasActiveFilters}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label className={field} htmlFor="filter-location">
            Location or area
          </label>
          <input
            id="filter-location"
            type="text"
            value={locationQuery}
            onChange={(e) => onLocationQueryChange(e.target.value)}
            placeholder="City, neighborhood…"
            className={inputBase}
          />
        </div>

        <div className="border-t border-neutral-100 pt-6">
          <label className={field} htmlFor="filter-price">
            Max price / night
          </label>
          <input
            id="filter-price"
            type="range"
            min={40}
            max={900}
            step={10}
            value={Math.min(priceMax, 900)}
            onChange={(e) => onPriceMaxChange(Number(e.target.value))}
            className="mt-3 w-full accent-nest-yellow"
          />
          <p className="mt-2 text-sm font-medium text-neutral-900">
            €{priceMax}
            <span className="font-normal text-neutral-500"> or less</span>
          </p>
        </div>

        <div className="border-t border-neutral-100 pt-6">
          <span className={field}>Rental type</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [
                ["all", "All"],
                ["sublet", "Sublet"],
                ["full", "Full rental"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onRentalTypeChange(value)}
                className={`${chip} ${
                  rentalType === value
                    ? "border-nest-yellow bg-nest-yellow/15 text-neutral-900 shadow-sm ring-1 ring-nest-yellow/40"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6">
          <label className={field} htmlFor="filter-guests">
            Minimum guests
          </label>
          <select
            id="filter-guests"
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
            className={inputBase}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-neutral-100 pt-6">
          <span className={field}>Amenities</span>
          <ul className="mt-3 space-y-3">
            <li>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-0 py-1 transition-colors hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={wifiRequired}
                  onChange={(e) => onWifiRequiredChange(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-nest-yellow focus:ring-nest-yellow"
                />
                <span className="text-sm text-neutral-800">WiFi</span>
              </label>
            </li>
            <li>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-0 py-1 transition-colors hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={furnishedRequired}
                  onChange={(e) => onFurnishedRequiredChange(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-nest-yellow focus:ring-nest-yellow"
                />
                <span className="text-sm text-neutral-800">Furnished</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
});
