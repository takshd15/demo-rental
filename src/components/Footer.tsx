import { BriefcaseBusiness, Building2, Facebook, Instagram, Linkedin, ShieldCheck } from "lucide-react";

const trustItems = [
  { label: "Trusted Service", icon: ShieldCheck },
  { label: "Expert Advice", icon: BriefcaseBusiness },
  { label: "Easy Rentals", icon: Building2 },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  return (
    <footer id="contact" className="mt-auto border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 border-b border-neutral-200 pb-6 md:justify-between">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2 text-neutral-700">
                <Icon size={18} className="text-[#2e7d32]" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <span>© 2021 NestRoom</span>
            <a href="#" className="hover:text-neutral-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-900">
              Terms &amp; Conditions
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 md:justify-end">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
