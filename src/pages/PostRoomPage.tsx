import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { DURATION, EASE_OUT } from "@/lib/motion";

export function PostRoomPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviews((p) => [...p, ...urls].slice(0, 8));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="page-section max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.medium, ease: EASE_OUT }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          List your space
        </h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-neutral-600">
          Add details and photos. This demo saves nothing — upload is local preview only.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-nest-surface/50 p-8 text-center transition-colors hover:border-neutral-300">
            <label className="cursor-pointer">
              <span className="text-sm font-semibold text-neutral-900">Upload images</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
              <p className="mt-2 text-xs text-neutral-500">PNG, JPG — up to 8 files for preview</p>
            </label>
            {previews.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {previews.map((src) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt=""
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: DURATION.base, ease: EASE_OUT }}
                    className="aspect-square rounded-xl object-cover shadow-card"
                  />
                ))}
              </div>
            )}
          </div>

          <label className="label-nest">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-nest"
              placeholder="Sunlit studio near the park"
            />
          </label>

          <label className="label-nest">
            Location
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-nest"
            />
          </label>

          <label className="label-nest">
            Nightly price (€)
            <input
              type="number"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-nest"
            />
          </label>

          <label className="label-nest">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="input-nest resize-none"
            />
          </label>

          <Button type="submit" className="px-8 py-3">
            Publish listing (demo)
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
