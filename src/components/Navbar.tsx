import { useState } from "react";
import { Home, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rentals", href: "#rentals" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-2xl font-semibold text-neutral-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f4e9] text-[#2e7d32]">
            <Home size={20} strokeWidth={2.25} />
          </span>
          <span className="text-[1.55rem] leading-none">NestRoom</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#post-room"
            className="rounded-lg bg-[#2e7d32] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#256a2a]"
          >
            Post Your Room
          </a>
          <button
            type="button"
            className="rounded-lg border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            Sign In
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-100 bg-white md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#post-room"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-lg bg-[#2e7d32] px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Post Your Room
            </a>
            <button
              type="button"
              className="rounded-lg border border-neutral-300 px-3 py-2 text-center text-sm font-semibold text-neutral-800"
            >
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
