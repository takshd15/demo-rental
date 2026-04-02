import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { listingHeroImage } from "@/data/mockListings";
import { DURATION, EASE_OUT, staggerItem } from "@/lib/motion";

type Entrance = "inView" | "list" | "staggerChild" | "none";

type Props = {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  currency: string;
  description: string;
  image: string;
  rating?: number;
  index?: number;
  listGrid?: boolean;
  showSave?: boolean;
  /** Override auto entrance (listGrid → list, else inView) */
  entrance?: Entrance;
};

const ease = EASE_OUT;

/** Hover uses transform only; shadow is CSS to avoid animating box-shadow in JS */
const cardHover = {
  y: -4,
  scale: 1.01,
  transition: { duration: DURATION.medium, ease },
};

export const ListingCard = memo(function ListingCard({
  id,
  title,
  location,
  pricePerNight,
  currency,
  description,
  image,
  rating = 4.9,
  index = 0,
  listGrid = false,
  showSave = false,
  entrance,
}: Props) {
  const [saved, setSaved] = useState(false);
  const src = useMemo(() => listingHeroImage({ id, image }), [id, image]);
  const mode: Entrance = entrance ?? (listGrid ? "list" : "inView");

  const staggerDelay = listGrid ? index * 0.055 : index * 0.08;
  const duration = listGrid ? 0.36 : 0.38;

  let motionProps: Record<string, unknown> = {};
  let transition: Record<string, unknown> | undefined;

  if (mode === "staggerChild") {
    motionProps = { variants: staggerItem };
  } else if (mode === "none") {
    motionProps = {};
  } else if (mode === "list") {
    motionProps = {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.97, transition: { duration: DURATION.fast } },
    };
    transition = {
      opacity: { delay: staggerDelay, duration, ease },
      y: { delay: staggerDelay, duration, ease },
    };
  } else {
    motionProps = {
      initial: { opacity: 0, y: 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
    };
    transition = {
      opacity: { delay: staggerDelay, duration, ease },
      y: { delay: staggerDelay, duration, ease },
    };
  }

  return (
    <motion.article
      {...motionProps}
      transition={transition}
      whileHover={cardHover}
      className="group relative overflow-hidden rounded-2xl border border-neutral-100/90 bg-white shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-300 ease-out hover:shadow-xl hover:shadow-neutral-900/10"
    >
      <Link
        to={`/listings/${id}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-nest-yellow/50 focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-neutral-100">
          <img
            src={src}
            alt=""
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            fetchPriority={listGrid && index < 3 ? "high" : "auto"}
            className="h-full w-full object-cover transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur-sm">
            ★ {rating.toFixed(1)}
          </span>
          {showSave && (
            <button
              type="button"
              aria-label={saved ? "Remove from saved" : "Save listing"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSaved((s) => !s);
              }}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-md backdrop-blur-sm transition-transform hover:scale-105"
            >
              <Heart
                size={18}
                strokeWidth={1.75}
                className={saved ? "fill-red-500 text-red-500" : "text-neutral-700"}
              />
            </button>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold leading-snug tracking-tight text-neutral-900 group-hover:underline sm:text-[1.05rem]">
            {title}
          </h3>
          <p className="mt-2 text-base font-semibold tabular-nums text-neutral-900">
            {currency === "EUR" ? "€" : "$"}
            {pricePerNight}
            <span className="text-sm font-normal text-neutral-500"> / night</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">{location}</p>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">{description}</p>
        </div>
      </Link>
    </motion.article>
  );
});
