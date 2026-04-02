import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getListingById } from "@/data/mockListings";
import { DURATION, EASE_OUT, modalBackdrop, modalContent } from "@/lib/motion";
import { ImageGallery } from "@/components/ImageGallery";
import { HostCard } from "@/components/HostCard";
import { Button } from "@/components/Button";
import { ReviewSection } from "@/components/ReviewSection";

export function ListingDetailsPage() {
  const { id } = useParams();
  const listing = id ? getListingById(id) : undefined;
  const [descOpen, setDescOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  if (!listing) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-neutral-600">Listing not found.</p>
        <Link to="/listings" className="mt-4 inline-block font-semibold text-neutral-900 underline">
          Back to listings
        </Link>
      </div>
    );
  }

  const shortDesc = listing.description.slice(0, 220);
  const hasMore = listing.description.length > 220;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
      {/* Breadcrumbs + ratings row — wireframe alignment */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <nav className="text-sm text-neutral-500">
          <Link to="/" className="hover:text-neutral-900">
            NestRoom
          </Link>
          <span className="mx-2">›</span>
          <Link to="/listings" className="hover:text-neutral-900">
            Listings
          </Link>
          <span className="mx-2">›</span>
          <span className="text-neutral-900">{listing.location}</span>
        </nav>
        <div className="flex flex-col items-start gap-1 text-sm md:items-end">
          <p className="font-semibold text-neutral-900">
            Excellent! {listing.rating.toFixed(1)}/5
            <span className="ml-2 text-nest-yellow">★★★★★</span>
          </p>
          <p className="text-neutral-500">
            Guest rating from {listing.reviewCount}{" "}
            {listing.reviewCount === 1 ? "review" : "reviews"}
          </p>
          <button type="button" className="text-left font-semibold text-neutral-900 hover:underline md:text-right">
            Stayed here? Tell us how it was
          </button>
        </div>
      </div>

      {/* Title row + actions — left title/location, right share/save/map */}
      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            {listing.title}
          </h1>
          <p className="mt-2 flex items-start gap-2 text-neutral-600">
            <PinIcon className="mt-0.5 shrink-0 text-neutral-400" />
            {listing.address}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
          >
            <ShareIcon />
            Share
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
          >
            <HeartIcon />
            Save
          </button>
          <Button variant="inverse" className="px-6 py-2.5 text-sm">
            <MapIcon />
            Show on map
          </Button>
        </div>
      </div>

      {/* Image gallery — large left, 2×2 right; same max width as content below */}
      <div className="mt-8">
        <ImageGallery
          images={listing.images}
          alt={listing.title}
          onShowAll={() => setGalleryOpen(true)}
        />
      </div>

      {/* Left: description + units. Right: dark sticky host (reference layout). */}
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="min-w-0 space-y-14 lg:col-span-8">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900">Property description</h2>
            <div className="mt-4 text-neutral-700 leading-relaxed">
              <p>
                {descOpen || !hasMore ? listing.description : `${shortDesc}…`}
              </p>
              {hasMore ? (
                <button
                  type="button"
                  onClick={() => setDescOpen((v) => !v)}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-neutral-900 hover:underline"
                >
                  {descOpen ? "Show less" : "Read more"}
                  <ChevronIcon className={descOpen ? "rotate-180" : ""} />
                </button>
              ) : null}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900">Accommodation units</h2>
            <div className="mt-6 space-y-6">
              {listing.units.map((unit, i) => (
                <motion.article
                  key={unit.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex flex-col gap-6 overflow-hidden rounded-xl border border-neutral-100 bg-white p-5 shadow-card md:flex-row md:items-stretch"
                >
                  <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-100 md:h-auto md:w-52">
                    <img src={unit.thumbnail} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                        <span className="font-mono text-xs text-neutral-400">#{unit.id}</span>
                        <span className="text-nest-yellow">
                          {"★".repeat(Math.round(unit.rating))}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-neutral-900">{unit.title}</h3>
                      <p className="text-sm text-neutral-600">
                        {unit.guests} guests · {unit.sizeSqm} m²
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {unit.amenities.map((a) => (
                          <span
                            key={a}
                            className="rounded-full border border-neutral-100 bg-nest-surface px-3 py-1 text-xs font-semibold text-neutral-800"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <span
                            key={n}
                            className="h-7 w-7 rounded-md border border-neutral-200 bg-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 flex-col justify-center gap-3 border-t border-neutral-100 pt-4 md:w-[13.5rem] md:border-l md:border-t-0 md:pl-6 md:pt-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                      From
                    </p>
                    <p className="-mt-2 text-2xl font-bold tracking-tight text-neutral-900">
                      {listing.currency === "EUR" ? "€" : "$"}
                      {unit.pricePerNight}
                      <span className="text-base font-semibold text-neutral-500"> / night</span>
                    </p>
                    <div className="flex gap-2">
                      <Button variant="secondary" className="flex-1 py-2.5 text-xs">
                        Availability
                      </Button>
                      <Button variant="secondary" className="flex-1 py-2.5 text-xs">
                        Rates
                      </Button>
                    </div>
                    <Button className="w-full py-3.5 text-sm font-bold shadow-soft">
                      Send inquiry
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <HostCard
              name={listing.host.name}
              verified={listing.host.verified}
              memberSince={listing.host.memberSince}
              languages={listing.host.languages}
              phone={listing.host.phone}
              theme="dark"
              onContact={() => setContactOpen(true)}
            />
          </div>
        </div>
      </div>

      <ReviewSection
        listingTitle={listing.title}
        aggregateRating={listing.rating}
        reviewCount={listing.reviewCount}
      />

      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            initial={modalBackdrop.initial}
            animate={modalBackdrop.animate}
            exit={modalBackdrop.exit}
            transition={modalBackdrop.transition}
            onClick={() => setContactOpen(false)}
          >
            <motion.div
              {...modalContent}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-neutral-100 bg-white p-6 shadow-soft"
            >
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                Message {listing.host.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                This is a demo — no messages are sent. In a real app this would open a thread or
                email flow.
              </p>
              <textarea
                className="input-nest mt-4 resize-none"
                rows={4}
                placeholder="Hi, I'm interested in..."
              />
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setContactOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => setContactOpen(false)}>Send (demo)</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 p-4 backdrop-blur-md"
            initial={modalBackdrop.initial}
            animate={modalBackdrop.animate}
            exit={modalBackdrop.exit}
            transition={modalBackdrop.transition}
            onClick={() => setGalleryOpen(false)}
          >
            <motion.div
              initial={modalContent.initial}
              animate={modalContent.animate}
              exit={modalContent.exit}
              transition={{ duration: DURATION.medium, ease: EASE_OUT }}
              className="mx-auto grid max-h-[90vh] max-w-5xl gap-2 overflow-y-auto sm:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              {listing.images.map((src, i) => (
                <img key={i} src={src} alt="" className="w-full rounded-xl object-cover" />
              ))}
            </motion.div>
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setGalleryOpen(false)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="11" r="2.5" fill="currentColor" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18 3 15V4l6 3m0 11 6 3 6-3V4l-6-3m-6 18V3m6 15 6 3m-6-18v15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
