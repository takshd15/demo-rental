import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { DURATION, EASE_OUT, modalBackdrop, modalContent } from "@/lib/motion";

type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
};

const initial: Review[] = [
  {
    id: "1",
    author: "Alex M.",
    rating: 5,
    date: "Mar 2026",
    text: "Flawless stay — exactly as pictured. Host was responsive and check-in was smooth.",
  },
];

type Props = {
  listingTitle: string;
  aggregateRating: number;
  reviewCount: number;
};

export function ReviewSection({ listingTitle, aggregateRating, reviewCount }: Props) {
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setReviews((r) => [
      {
        id: `rev-${Date.now()}`,
        author: "You",
        rating,
        date: new Date().toLocaleString("en", { month: "short", year: "numeric" }),
        text: text.trim(),
      },
      ...r,
    ]);
    setText("");
    setOpen(false);
  }

  return (
    <section className="mt-12 border-t border-neutral-100 pt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl">
            Reviews
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            {aggregateRating.toFixed(1)} ★ · {reviewCount} reviews for {listingTitle}
          </p>
        </div>
        <Button variant="secondary" className="shrink-0" onClick={() => setOpen(true)}>
          Write a review
        </Button>
      </div>

      <ul className="mt-8 space-y-4">
        {reviews.map((rev, i) => (
          <motion.li
            key={rev.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: DURATION.base, ease: EASE_OUT }}
            className="rounded-xl border border-neutral-100 bg-nest-surface/60 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-neutral-900">{rev.author}</p>
              <span className="text-sm text-neutral-500">{rev.date}</span>
            </div>
            <p className="mt-1 text-sm text-nest-yellow">
              {"★".repeat(rev.rating)}
              <span className="text-neutral-300">{"★".repeat(5 - rev.rating)}</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{rev.text}</p>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            initial={modalBackdrop.initial}
            animate={modalBackdrop.animate}
            exit={modalBackdrop.exit}
            transition={modalBackdrop.transition}
            onClick={() => setOpen(false)}
          >
            <motion.form
              {...modalContent}
              onClick={(e) => e.stopPropagation()}
              onSubmit={submit}
              className="w-full max-w-md rounded-2xl border border-neutral-100 bg-white p-6 shadow-soft"
            >
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Your review</h3>
              <label className="label-nest mt-4">
                Rating
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="input-nest"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} stars
                    </option>
                  ))}
                </select>
              </label>
              <label className="label-nest mt-3">
                Comment
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="input-nest resize-none"
                  placeholder="Share your experience..."
                />
              </label>
              <div className="mt-5 flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
