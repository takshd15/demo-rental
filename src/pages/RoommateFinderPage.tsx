import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { DURATION, EASE_OUT, staggerContainer, staggerItem } from "@/lib/motion";

const profiles = [
  {
    name: "Jordan K.",
    age: 27,
    budget: "€600–800",
    area: "City center",
    bio: "Product designer, quiet weekdays, loves cooking.",
  },
  {
    name: "Samira L.",
    age: 24,
    budget: "€500–650",
    area: "Near transit",
    bio: "Grad student, early riser, looking for tidy flatmates.",
  },
  {
    name: "Chris P.",
    age: 31,
    budget: "€700–900",
    area: "Waterfront",
    bio: "Engineer, weekend hikes, non-smoker.",
  },
] as const;

const cardHover = {
  y: -4,
  transition: { duration: DURATION.fast, ease: EASE_OUT },
};

type Profile = (typeof profiles)[number];

const RoommateCard = memo(function RoommateCard({ p }: { p: Profile }) {
  const avatarSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(p.name)}`;

  return (
    <motion.article
      variants={staggerItem}
      whileHover={cardHover}
      className="flex flex-col rounded-2xl border border-neutral-100/90 bg-white p-6 shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-200 ease-out hover:shadow-lg hover:shadow-neutral-900/10"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-200 ring-2 ring-white shadow-sm">
          <img
            src={avatarSrc}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h2 className="font-semibold tracking-tight text-neutral-900">{p.name}</h2>
          <p className="text-sm text-neutral-500">
            {p.age} yrs · {p.area}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-neutral-800">Budget {p.budget}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{p.bio}</p>
      <Button variant="secondary" className="mt-6 w-full py-2.5">
        Connect (demo)
      </Button>
    </motion.article>
  );
});

export function RoommateFinderPage() {
  return (
    <div className="page-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.medium, ease: EASE_OUT }}
        className="max-w-2xl"
      >
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Roommate finder
        </h1>
        <p className="mt-2 leading-relaxed text-neutral-600">
          Browse people looking to share — demo profiles only. Filters coming soon on this view.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {profiles.map((p) => (
          <RoommateCard key={p.name} p={p} />
        ))}
      </motion.div>
    </div>
  );
}
