"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Leaf, Moon, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Upcoming Events", href: "#upcoming-events" },
  { label: "Our Impact", href: "/" },
  { label: "Create Event", href: "/create-event" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e3e1d4] bg-[#f2f0e6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-5 sm:h-18 sm:px-8 lg:h-19.5 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#1f3d33] text-[#a8c8b7]">
            <Leaf className="size-5" />
          </span>

          <span className="text-xl font-semibold tracking-tight text-[#1f3d33] sm:text-[22px]">
            Kindora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center  gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-[#4b5f56] transition-colors hover:text-[#1f3d33]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Dark Mode */}
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1f3d33] shadow-sm transition hover:shadow-md sm:size-10"
          >
            <Moon className="size-4.5" />
          </button>

          {/* Desktop Login */}
          <Link
            href="/login"
            className="hidden px-2 text-[15px] font-semibold text-[#1f3d33] transition-opacity hover:opacity-70 sm:block"
          >
            Log in
          </Link>

          {/* Profile Menu */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              className="flex items-center gap-1.5 rounded-full bg-white py-1.5 pr-2.5 pl-1.5 shadow-sm transition hover:shadow-md"
            >
              <Image
                src="/avatar-nav.jpg"
                alt="Profile"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
              />

              <ChevronDown
                className={`size-4 text-[#1f3d33] transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 w-44 rounded-xl border border-[#e3e1d4] bg-white p-2 shadow-lg">
                <a
                  href="#profile"
                  className="block rounded-lg px-3 py-2 text-sm text-[#1f3d33] hover:bg-[#f2f0e6]"
                >
                  My Profile
                </a>

                <a
                  href="#settings"
                  className="block rounded-lg px-3 py-2 text-sm text-[#1f3d33] hover:bg-[#f2f0e6]"
                >
                  Settings
                </a>

                <a
                  href="#logout"
                  className="block rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Log out
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="flex size-9 items-center justify-center rounded-full border border-[#e3e1d4] text-[#1f3d33] transition hover:bg-white lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav className="border-t border-[#e3e1d4] px-5 py-4 sm:px-8">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-[#4b5f56] transition hover:bg-white hover:text-[#1f3d33]"
                >
                  {link.label}
                </a>
              ))}

              <div className="my-2 border-t border-[#e3e1d4]" />

              <a
                href="#login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-[#1f3d33] transition hover:bg-white"
              >
                Log in
              </a>

              <a
                href="#profile"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-[#1f3d33] transition hover:bg-white sm:hidden"
              >
                My Profile
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
