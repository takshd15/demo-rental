import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

type FeaturedRentalCardProps = {
  title: string;
  pricePerMonth: string;
  city: string;
  image: string;
  imageAlt: string;
};

export function FeaturedRentalCard({
  title,
  pricePerMonth,
  city,
  image,
  imageAlt,
}: FeaturedRentalCardProps) {
  const [imageSrc, setImageSrc] = useState(image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-card transition-shadow duration-300 hover:shadow-soft"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          onError={() =>
            setImageSrc(
              "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1400",
            )
          }
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="min-h-[3.5rem] text-lg font-semibold leading-tight text-neutral-900">
          {title}
        </h3>
        <p className="text-base font-semibold text-[#2e7d32]">
          {pricePerMonth} <span className="font-medium text-neutral-500">/month</span>
        </p>
        <p className="inline-flex items-center gap-1.5 text-sm text-neutral-600">
          <MapPin size={14} className="text-[#2e7d32]" />
          {city}
        </p>
      </div>
    </motion.article>
  );
}
