import { FormEvent, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLink =
  "text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors";

const mainNav: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Home", end: true },
  { to: "/listings", label: "Listings" },
  { to: "/roommates", label: "Roommates" },
  { to: "/post", label: "Post a room" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    const q = search.trim();
    navigate({ pathname: "/listings", search: q ? `?q=${encodeURIComponent(q)}` : "" });
    setOpen(false);
  }

  return (
    <motion.header
      initial={false}
      animate={{
        opacity: scrolled ? 0 : 1,
        y: scrolled ? -16 : 0,
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-md ${
        scrolled ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900"
        >
          <span aria-hidden>🏡</span>
          <span className="hidden sm:inline">NestRoom</span>
        </Link>

        {/* Center search — desktop / tablet */}
        <form
          onSubmit={onSearchSubmit}
          className="mx-auto hidden min-w-0 max-w-md flex-1 items-center md:mx-4 md:flex lg:mx-6 lg:max-w-xl"
        >
          <div className="flex h-10 w-full items-center overflow-hidden rounded-full border border-neutral-200 bg-nest-surface pl-3 shadow-sm focus-within:border-nest-yellow/40 focus-within:ring-2 focus-within:ring-nest-yellow/20">
            <span className="pointer-events-none flex text-neutral-400">
              <SearchIcon />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search cities, neighborhoods…"
              className="min-w-0 flex-1 border-0 bg-transparent py-2 pl-2 pr-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-0"
              aria-label="Search listings"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nest-yellow text-neutral-900 shadow-sm hover:bg-nest-yellow-hover"
              aria-label="Search"
            >
              <SearchIcon className="h-4 w-4" />
            </motion.button>
          </div>
        </form>

        {/* Main nav — desktop */}
        <nav
          className="hidden items-center gap-1 lg:flex xl:gap-2"
          aria-label="Main navigation"
        >
          {mainNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `${navLink} whitespace-nowrap rounded-lg px-2 py-2 xl:px-2.5 ${
                  isActive ? "bg-nest-surface text-neutral-900 font-semibold" : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions — large screens only (avoids crowding with search on tablet) */}
        <div className="hidden shrink-0 items-center gap-1 lg:flex">
          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            Sign up
          </Link>
          <Link
            to="/post"
            className="rounded-full bg-nest-yellow px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-nest-yellow-hover"
          >
            List your space
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-neutral-100 bg-white lg:hidden"
          >
            <div className="space-y-3 px-4 py-4">
              <form onSubmit={onSearchSubmit} className="flex gap-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search listings…"
                  className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-nest-surface px-3 py-2.5 text-sm focus:border-nest-yellow/50 focus:outline-none focus:ring-2 focus:ring-nest-yellow/20"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nest-yellow text-neutral-900 shadow-sm"
                  aria-label="Search"
                >
                  <SearchIcon className="h-4 w-4" />
                </motion.button>
              </form>
              <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
                {mainNav.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      `${navLink} rounded-lg px-3 py-2.5 ${isActive ? "bg-nest-surface font-semibold text-neutral-900" : ""}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>
              <div className="flex flex-col gap-2 border-t border-neutral-100 pt-3">
                <Link
                  to="/login"
                  className="rounded-xl border border-neutral-200 py-2.5 text-center text-sm font-medium text-neutral-800"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-neutral-900 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Link>
                <Link
                  to="/post"
                  className="rounded-xl bg-nest-yellow py-2.5 text-center text-sm font-semibold text-neutral-900"
                  onClick={() => setOpen(false)}
                >
                  List your space
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function SearchIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15ZM21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
