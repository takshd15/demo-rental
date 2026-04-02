import { motion } from "framer-motion";
import { Button } from "./Button";
import { DURATION, EASE_OUT } from "@/lib/motion";

type Props = {
  name: string;
  verified?: boolean;
  memberSince: string;
  languages: string[];
  phone: string;
  onContact?: () => void;
  /** Dark sidebar style (listing page reference) */
  theme?: "light" | "dark";
};

export function HostCard({
  name,
  verified = true,
  memberSince,
  languages,
  phone,
  onContact,
  theme = "light",
}: Props) {
  const isDark = theme === "dark";

  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT, delay: 0.06 }}
      className={
        isDark
          ? "rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-soft"
          : "rounded-xl border border-neutral-100 bg-white p-6 shadow-soft"
      }
    >
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <div
            className={`h-16 w-16 overflow-hidden rounded-full ring-2 shadow-card ${
              isDark ? "ring-neutral-700" : "ring-white"
            }`}
          >
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          {verified && (
            <span
              className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-neutral-900"
              title="Verified"
              aria-label="Verified host"
            >
              <CheckIcon />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {verified && !isDark && (
            <span className="inline-flex items-center rounded-full bg-nest-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neutral-600">
              Verified host
            </span>
          )}
          {verified && isDark && (
            <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-400">
              Verified host
            </span>
          )}
          <p className={`mt-1 text-lg font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
            {name}
          </p>
          <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
            Host since {memberSince}
          </p>
        </div>
      </div>

      <div className={`mt-5 border-t pt-5 ${isDark ? "border-white/10" : "border-neutral-100"}`}>
        <p
          className={`text-xs font-semibold uppercase tracking-wide ${
            isDark ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          Languages
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className={`inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg border px-2 text-xs font-bold ${
                isDark
                  ? "border-white/15 bg-neutral-800 text-neutral-100"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700"
              }`}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <p className={`mt-4 text-sm ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
        <span className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}>Tel:</span>{" "}
        {phone}
      </p>

      <button
        type="button"
        className={`mt-3 flex items-center gap-1 text-sm font-semibold hover:underline ${
          isDark ? "text-white" : "text-neutral-900"
        }`}
      >
        More about the host
        <ChevronDown className="rotate-[-90deg]" />
      </button>

      {isDark ? (
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContact}
          className="mt-5 w-full rounded-xl border border-white/25 bg-transparent py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
        >
          Contact host
        </motion.button>
      ) : (
        <Button variant="primary" className="mt-5 w-full py-3 text-base" onClick={onContact}>
          Contact host
        </Button>
      )}
    </motion.aside>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
