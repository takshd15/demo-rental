import { motion } from "framer-motion";
import { DURATION, EASE_OUT, imageHover } from "@/lib/motion";

type Props = {
  images: string[];
  alt: string;
  onShowAll?: () => void;
};

export function ImageGallery({ images, alt, onShowAll }: Props) {
  const main = images[0];
  const rest = images.slice(1, 5);
  while (rest.length < 4) {
    rest.push(main);
  }

  return (
    <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl sm:gap-3 md:grid-cols-4 md:grid-rows-2 md:h-[min(56vw,480px)] md:max-h-[520px]">
      <motion.div
        className="relative col-span-2 aspect-[4/3] min-h-[200px] md:col-span-2 md:row-span-2 md:aspect-auto md:h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.medium, ease: EASE_OUT }}
      >
        <motion.img
          src={main}
          alt={alt}
          className="h-full w-full object-cover"
          whileHover={imageHover}
        />
      </motion.div>

      {rest.map((src, i) => (
        <motion.div
          key={`${src}-${i}`}
          className="relative aspect-square md:aspect-auto md:h-full md:min-h-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * (i + 1), duration: DURATION.base, ease: EASE_OUT }}
        >
          <motion.img
            src={src}
            alt={`${alt} ${i + 2}`}
            className="h-full w-full object-cover"
            whileHover={imageHover}
          />
          {i === 3 && (
            <button
              type="button"
              onClick={onShowAll}
              className="absolute bottom-2 right-2 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-neutral-900 shadow-soft backdrop-blur-sm transition-transform hover:scale-[1.02] md:bottom-3 md:right-3 md:px-4 md:text-sm"
            >
              <CameraIcon />
              All photos
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
