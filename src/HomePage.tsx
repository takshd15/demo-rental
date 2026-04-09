import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FeaturedRentalCard } from "@/components/FeaturedRentalCard";
import { InquirySection } from "@/components/InquirySection";

const heroSlides = [
  {
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Modern cozy living room with warm natural light",
  },
  {
    image:
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Bright open-plan living room with clean modern design",
  },
  {
    image:
      "https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Contemporary rental living space with large windows",
  },
];

const featuredRentals = [
  {
    title: "Modern Apartment in City Center",
    pricePerMonth: "€1,250",
    city: "Amsterdam",
    image:
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Modern apartment living room in Amsterdam",
  },
  {
    title: "Cozy Canal House",
    pricePerMonth: "€1,800",
    city: "Utrecht",
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Cozy canal-side townhouse exterior in Utrecht",
  },
  {
    title: "Stylish Studio with Balcony",
    pricePerMonth: "€950",
    city: "Rotterdam",
    image:
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Stylish studio interior with balcony view in Rotterdam",
  },
  {
    title: "Spacious Family Home",
    pricePerMonth: "€2,200",
    city: "The Hague",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Spacious family house with garden in The Hague",
  },
];

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-neutral-900">
      <section id="home" className="relative min-h-[68vh] overflow-hidden md:min-h-[72vh]">
        <AnimatePresence mode="wait">
          <motion.img
            key={heroSlides[activeSlide].image}
            src={heroSlides[activeSlide].image}
            alt={heroSlides[activeSlide].alt}
            initial={{ opacity: 0.25, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.15, scale: 1.03 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/45" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 text-center text-white md:px-6 md:pb-24 md:pt-28 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Find Your Perfect Nest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg md:text-2xl"
          >
            Your ideal home is just a click away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#rentals"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2e7d32] px-8 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#256a2a]"
            >
              Browse Rooms
              <ArrowRight size={16} />
            </a>
            <a
              href="#inquiry"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/70 bg-white/10 px-8 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              Describe Your Ideal Nest
            </a>
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeSlide ? "w-7 bg-white" : "w-2.5 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="rentals" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Featured Rentals
        </h2>
        <p className="mt-2 text-neutral-600">Explore our latest listings</p>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredRentals.map((listing) => (
            <FeaturedRentalCard
              key={listing.title}
              title={listing.title}
              pricePerMonth={listing.pricePerMonth}
              city={listing.city}
              image={listing.image}
              imageAlt={listing.imageAlt}
            />
          ))}
        </div>
      </section>

      <InquirySection />

      <section id="post-room" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-soft md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Have a room to rent?
              </h2>
              <p className="mt-3 text-neutral-600 md:text-lg">
                Post your room in minutes and find the right tenant.
              </p>
              <button
                type="button"
                className="mt-7 inline-flex h-12 items-center justify-center rounded-lg bg-[#2e7d32] px-8 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#256a2a]"
              >
                Post Your Room
              </button>
            </motion.div>

            <ul className="space-y-3 rounded-xl bg-[#f3f9f4] p-5 text-sm text-neutral-700 md:min-w-[320px]">
              <li className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2e7d32]" />
                Reach verified tenants
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2e7d32]" />
                Fast responses
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2e7d32]" />
                Easy listing process
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#f8fbf8] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-xl bg-white p-8 shadow-card"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">About NestRoom</h2>
            <p className="mt-3 text-lg text-neutral-700">
              Helping you find the perfect place to call home.
            </p>
            <p className="mt-5 max-w-xl text-neutral-600">
              We provide trusted rental properties with a personal touch. Browse curated listings,
              compare neighborhoods, and if you can&apos;t find the right match, share your ideal
              nest requirements and we&apos;ll assist you directly.
            </p>
            <button
              type="button"
              className="mt-8 rounded-lg bg-[#2e7d32] px-7 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#256a2a]"
            >
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="overflow-hidden rounded-xl shadow-soft"
          >
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=80"
              alt="Happy couple discussing home choices on a tablet"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#2e7d32] to-[#1f5e24] px-6 py-14 text-center text-white shadow-soft md:px-10">
          <h2 className="text-4xl font-semibold tracking-tight">Get Started Today</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">
            Looking for your new home? Browse listings now or submit your requirements and let us
            help you find the right place faster.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-[#1f5e24] transition-all hover:-translate-y-0.5 hover:bg-[#f0f8f0]"
          >
            Browse Listings
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
