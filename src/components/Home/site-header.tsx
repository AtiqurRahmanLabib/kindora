
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


import {
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  Leaf,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

/* ----------------------------- Data ----------------------------- */

const navLinks = [
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "Our Impact", href: "/" },
  { label: "Create Event", href: "/create-event" },
];

const profileLinks = [
  { label: "Create Event", href: "/create-event", icon: CalendarPlus },
  { label: "Manage Events", href: "/manage-events", icon: CalendarDays },
  { label: "Joined Events", href: "/joined-events", icon: CalendarCheck },
  { label: "Profile", href: "/profile", icon: UserRound },
];

const DEFAULT_AVATAR = "/avatar-nav.jpg";

type MenuUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

/* -------------------------- Theme Toggle ------------------------- */







/* -------------------------- Profile Menu ------------------------- */

function ProfileMenu({ user }: { user: MenuUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");
    setOpen(false);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/login");
            router.refresh();
          },
          onError: (context) => {
            setLogoutError(
              context.error.message || "Unable to logout."
            );
            setLoggingOut(false);
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError("Something went wrong. Please try again.");
      setLoggingOut(false);
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full bg-white py-1.5 pr-2.5 pl-1.5 shadow-sm transition hover:shadow-md dark:bg-[#263e33]"
      >
        <Image
          src={user.image || DEFAULT_AVATAR}
          alt={user.name || "Profile"}
          width={32}
          height={32}
          className="size-8 rounded-full object-cover"
        />

        <ChevronDown
          className={`size-4 text-[#1f3d33] transition-transform dark:text-[#e5eee8] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[#e3e1d4] bg-white shadow-xl dark:border-[#34483e] dark:bg-[#1f352c]">

          {/* User Info */}
          <div className="border-b border-[#e3e1d4] bg-[#f8f7f1] px-4 py-3 dark:border-[#34483e] dark:bg-[#263e33]">
            <p className="truncate text-sm font-semibold text-[#1f3d33] dark:text-[#e5eee8]">
              {user.name || "User"}
            </p>

            <p className="mt-1 break-all text-xs leading-relaxed text-[#77786e] dark:text-[#b4c4ba]">
              {user.email}
            </p>
          </div>

          {/* Profile Links */}
          <div className="p-2">
            {profileLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#344c40] transition-colors hover:bg-[#f2f0e6] dark:text-[#d3e0d7] dark:hover:bg-[#30483c]"
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-[#e3e1d4] p-2 dark:border-[#34483e]">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <LogOut size={17} strokeWidth={1.8} />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

          {logoutError && (
            <p role="alert" className="px-3 pb-3 text-xs text-red-600 dark:text-red-400">
              {logoutError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* --------------------------- Site Header ------------------------- */

export function SiteHeader() {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    // closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e3e1d4] bg-[#f2f0e6]/95 backdrop-blur-md dark:border-[#34483e] dark:bg-[#14251f]/95">

      {/* Main Navbar */}
      <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-5 sm:h-18 sm:px-8 lg:h-19.5 lg:px-16">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#1f3d33] text-[#a8c8b7] dark:bg-[#d5e5d9] dark:text-[#1f3d33]">
            <Leaf className="size-5" />
          </span>

          <span className="text-xl font-semibold tracking-tight text-[#1f3d33] sm:text-[22px] dark:text-[#e5eee8]">
            Kindora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-[15px] font-medium transition-colors ${
                  isActive
                    ? "text-[#1f3d33] dark:text-[#a8c8b7]"
                    : "text-[#4b5f56] hover:text-[#1f3d33] dark:text-[#b4c4ba] dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">

     

          {user ? (
            <ProfileMenu
              user={{
                name: user.name,
                email: user.email,
                image: user.image,
              }}
            />
          ) : (
            <Link
              href="/login"
              className="hidden px-2 text-[15px] font-semibold text-[#1f3d33] transition-opacity hover:opacity-70 sm:block dark:text-[#e5eee8]"
            >
              Log in
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex size-9 items-center justify-center rounded-full border border-[#e3e1d4] text-[#1f3d33] transition hover:bg-white lg:hidden dark:border-[#34483e] dark:text-[#e5eee8] dark:hover:bg-[#263e33]"
          >
            {menuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav className="border-t border-[#e3e1d4] px-5 py-4 sm:px-8 dark:border-[#34483e]">
            <div className="flex flex-col gap-1">

              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-[#1f3d33] dark:bg-[#263e33] dark:text-[#e5eee8]"
                        : "text-[#4b5f56] hover:bg-white hover:text-[#1f3d33] dark:text-[#b4c4ba] dark:hover:bg-[#263e33] dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {!user && (
                <>
                  <div className="my-2 border-t border-[#e3e1d4] dark:border-[#34483e]" />

                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-3 text-sm font-semibold text-[#1f3d33] transition hover:bg-white dark:text-[#e5eee8] dark:hover:bg-[#263e33]"
                  >
                    Log in
                  </Link>
                </>
              )}

              {user && (
                <>
                  <div className="my-2 border-t border-[#e3e1d4] dark:border-[#34483e]" />

                  {profileLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#344c40] transition hover:bg-white dark:text-[#d3e0d7] dark:hover:bg-[#263e33]"
                    >
                      <Icon size={17} />
                      {label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
