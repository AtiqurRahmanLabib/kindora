import Image from "next/image";
import { ChevronDown, Leaf, Moon } from "lucide-react";

const navLinks = [
  { label: "Upcoming Events", href: "#upcoming-events" },
  { label: "Our Impact", href: "#our-impact" },
  { label: "Create Event", href: "#create-event" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[#e3e1d4] bg-[#f2f0e6]">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#1f3d33] text-[#a8c8b7]">
            <Leaf className="size-5" />
          </span>
          <span className="text-[22px] font-semibold tracking-tight text-[#1f3d33]">
            Kindora
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-[#4b5f56] transition-colors hover:text-[#1f3d33]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle dark mode"
            className="flex size-10 items-center justify-center rounded-full bg-white text-[#1f3d33] shadow-sm transition hover:shadow-md"
          >
            <Moon className="size-[18px]" />
          </button>

          <a
            href="#login"
            className="px-2 text-[15px] font-semibold text-[#1f3d33] transition-opacity hover:opacity-70"
          >
            Log in
          </a>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-white py-1.5 pr-2.5 pl-2 shadow-sm transition hover:shadow-md"
            aria-label="Open profile menu"
          >
            <Image
              src="/avatar-nav.jpg"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <ChevronDown className="size-4 text-[#1f3d33]" />
          </button>
        </div>
      </div>
    </header>
  );
}
