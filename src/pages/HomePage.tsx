import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Key, MessageCircle, Search, type LucideIcon } from "lucide-react";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/Button";
import { mockListings } from "@/data/mockListings";
import {
  DURATION,
  EASE_OUT,
  homeDenseBlockVariants,
  homeFeaturedParentVariants,
  homeHeroLineVariants,
  homeHeroParentVariants,
  homeLeafSectionVariants,
  homePageRootVariants,
  staggerItem,
} from "@/lib/motion";

const steps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Browse Listings",
    description: "Filter by price and location, then open listings that match your move timeline.",
    icon: Search,
  },
  {
    title: "Connect with Owners",
    description: "Message verified hosts, ask questions, and compare units before you decide.",
    icon: MessageCircle,
  },
  {
    title: "Move In Easily",
    description: "Book dates, share details securely, and settle into your next nest with less stress.",
    icon: Key,
  },
];

const featuredGridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.02 },
  },
};

const howStepsGridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const howItWorksItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

const howCardHover = {
  y: -4,
  boxShadow:
    "0 24px 48px -18px rgba(0, 0, 0, 0.12), 0 10px 20px -10px rgba(0, 0, 0, 0.07)",
  transition: { duration: DURATION.medium, ease: EASE_OUT },
};

const roommateSamples = ["Jordan K.", "Samira L.", "Chris P."];

export function HomePage() {
  const navigate = useNavigate();
  const [heroLocation, setHeroLocation] = useState("");
  const [heroPrice, setHeroPrice] = useState("");
  const featured = mockListings.slice(0, Math.min(6, mockListings.length));

  function onHeroSearch(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (heroLocation.trim()) q.set("q", heroLocation.trim());
    if (heroPrice.trim()) q.set("max", heroPrice.replace(/\D/g, "") || heroPrice.trim());
    navigate({ pathname: "/listings", search: q.toString() ? `?${q}` : "" });
  }

  return (
    <motion.div
      className="bg-white"
      variants={homePageRootVariants}
      initial="hidden"
      animate="show"
    >
      {/* 1 — Hero — stagger parent is first root child; lines are direct children for Framer stagger */}
      <motion.section
        variants={homeHeroParentVariants}
        className="border-b border-neutral-100 bg-white page-section !pb-20 md:!pb-28"
      >
        <motion.h1
          variants={homeHeroLineVariants}
          className="max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
        >
          Find your perfect place to call home
        </motion.h1>
        <motion.p
          variants={homeHeroLineVariants}
          className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl lg:max-w-2xl"
        >
          Browse rooms, connect with roommates, and move in with ease.
        </motion.p>
        <motion.div
          variants={homeHeroLineVariants}
          className="mt-10 flex max-w-3xl flex-wrap gap-3"
        >
          <Button
            className="rounded-full px-8 py-3.5 text-base font-semibold shadow-soft"
            onClick={() => navigate("/listings")}
          >
            Explore Listings
          </Button>
          <Button
            variant="secondary"
            className="rounded-full border-2 border-neutral-900 px-8 py-3.5 text-base font-semibold"
            onClick={() => navigate("/post")}
          >
            Post a Room
          </Button>
        </motion.div>

        <motion.div variants={homeHeroLineVariants} className="mt-12 max-w-2xl">
          <form
            onSubmit={onHeroSearch}
            className="rounded-2xl border border-neutral-200 bg-nest-surface/60 p-4 shadow-card backdrop-blur-sm md:p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Quick search
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium text-neutral-700">
                Location
                <input
                  value={heroLocation}
                  onChange={(e) => setHeroLocation(e.target.value)}
                  placeholder="City or neighborhood"
                  className="input-nest mt-1.5"
                />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                Max price / night (€)
                <input
                  value={heroPrice}
                  onChange={(e) => setHeroPrice(e.target.value)}
                  placeholder="e.g. 250"
                  inputMode="numeric"
                  className="input-nest mt-1.5"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end">
              <Button type="submit" className="rounded-full px-6 py-2.5">
                Search
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.section>

      {/* 2 — Featured Rentals */}
      <motion.section variants={homeFeaturedParentVariants} className="page-section">
        <motion.div
          variants={staggerItem}
          className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Featured Rentals
            </h2>
            <p className="mt-1 text-neutral-600">Explore our latest listings</p>
          </div>
          <Link
            to="/listings"
            className="text-sm font-semibold text-neutral-900 hover:underline"
          >
            View all
          </Link>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={featuredGridVariants}
        >
          {featured.map((l, i) => (
            <ListingCard
              key={l.id}
              index={i}
              entrance="staggerChild"
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
        </motion.div>
      </motion.section>

      {/* 3 — How It Works */}
      <motion.section
        variants={homeDenseBlockVariants}
        className="border-t border-neutral-100 bg-nest-surface/50"
      >
        <div className="page-section">
          <motion.div variants={staggerItem} className="text-center md:text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              How it works
            </h2>
            <p className="mt-2 max-w-2xl text-neutral-600 md:mx-0 md:max-w-none">
              Three simple steps from search to keys — built for clarity, not clutter.
            </p>
          </motion.div>
          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8"
            variants={howStepsGridVariants}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  variants={howItWorksItem}
                  whileHover={howCardHover}
                  className="group rounded-2xl border border-neutral-100/80 bg-white p-8 text-center shadow-md shadow-neutral-200/50 md:text-left"
                >
                  <div className="mx-auto inline-flex rounded-xl bg-yellow-100 p-4 shadow-sm ring-1 ring-yellow-200/60 transition-transform duration-300 ease-out group-hover:scale-105 md:mx-0">
                    <Icon
                      size={22}
                      strokeWidth={1.75}
                      className="text-neutral-800"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* 4 — About preview */}
      <motion.section variants={homeLeafSectionVariants} className="border-t border-neutral-100 bg-white">
        <div className="page-section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Helping you find a place to call home
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              We provide rental properties with a little touch, making your search simple and
              stress-free
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                className="rounded-full px-10 py-3.5 text-base font-semibold shadow-soft"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5 — Roommate Finder preview */}
      <motion.section
        variants={homeLeafSectionVariants}
        className="border-t border-neutral-100 bg-nest-surface/40"
      >
        <div className="page-section">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                Looking for a roommate?
              </h2>
              <p className="mt-3 text-neutral-600">
                Meet people who match your budget, schedule, and lifestyle — then message securely
                before you commit to a lease.
              </p>
              <Button
                className="mt-6 rounded-full px-8 py-3.5 font-semibold shadow-soft"
                onClick={() => navigate("/roommates")}
              >
                Find Roommates
              </Button>
            </div>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row lg:w-auto lg:justify-end">
              <div className="flex -space-x-3">
                {roommateSamples.map((name) => (
                  <img
                    key={name}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`}
                    alt=""
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 rounded-full border-2 border-white bg-white shadow-card transition-transform duration-200 ease-out hover:z-10 hover:scale-105"
                  />
                ))}
              </div>
              <p className="text-center text-sm text-neutral-500 sm:text-left">
                Sample profiles — browse real matches on the roommate finder.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to action */}
      <motion.section
        variants={homeLeafSectionVariants}
        className="border-t border-neutral-100 bg-gradient-to-br from-nest-yellow/25 via-white to-nest-surface/80"
      >
        <div className="page-section">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              Ready to find your next home?
            </h2>
            <p className="mt-3 text-neutral-600">
              Jump into listings or list your space in minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                className="rounded-full px-8 py-3.5 font-semibold shadow-soft"
                onClick={() => navigate("/listings")}
              >
                Explore Listings
              </Button>
              <Button
                variant="secondary"
                className="rounded-full border-2 border-neutral-900 bg-white px-8 py-3.5 font-semibold"
                onClick={() => navigate("/post")}
              >
                Post a Room
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
