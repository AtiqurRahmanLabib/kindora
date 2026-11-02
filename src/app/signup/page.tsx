import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Globe,
  Leaf,
  Moon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sign up — Kindora",
  description:
    "Create your account and find meaningful ways to help close to home.",
};

const SignupPage = () => {
  return (
    <div className="grid min-h-screen gap-4 bg-[#faf9f3] p-3 sm:p-4 lg:grid-cols-2 font-[family-name:var(--font-geist-sans)]">
      {/* Left: image panel */}
      <div className="relative min-h-[420px] overflow-hidden rounded-2xl">
        <Image
          src="/signup-pack.jpg"
          alt="Volunteers packing boxes with donated food and supplies"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Dark gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/70" />

        <div className="absolute inset-0 flex flex-col p-8 sm:p-10">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#4b8b5f] text-white">
              <Leaf className="size-5" />
            </span>
            <span className="text-[22px] font-semibold tracking-tight text-white">
              Kindora
            </span>
          </a>

          <blockquote className="mt-auto mb-8 max-w-lg text-[34px] leading-[1.25] font-bold text-white sm:text-[40px]">
            “The best way to find yourself is to lose yourself in the service
            of others.”
          </blockquote>
          <p className="max-w-md text-[15px] leading-relaxed text-white/85">
            Join a community where every hour, idea and helping hand counts.
          </p>
        </div>
      </div>

      {/* Right: form column */}
      <div className="flex flex-col px-6 pb-10 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between pt-2">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#1f3d33] transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Back home
          </a>
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="flex size-10 items-center justify-center rounded-full bg-[#f2f0e6] text-[#1f3d33] transition hover:shadow-md"
          >
            <Moon className="size-[18px]" />
          </button>
        </div>

        <div className="mx-auto my-auto w-full max-w-md py-16">
          <p className="text-xs font-bold tracking-[0.22em] text-[#2e7d6f] uppercase">
            Join the community
          </p>
          <h1 className="mt-4 text-[44px] leading-[1.1] font-semibold tracking-tight text-[#1f3d33] sm:text-[48px]">
            Start making a difference.
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#5d6d64]">
            Create your account and find meaningful ways to help close to home.
          </p>

          <form className="mt-9 grid gap-5" action="#">
            <label className="grid gap-2">
              <span className="text-[13px] font-bold text-[#1f3d33]">
                Full name <span className="font-bold">*</span>
              </span>
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Maya Anderson"
                className="h-12 w-full rounded-lg border border-[#dcdacd] bg-white px-3.5 text-[15px] text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-[13px] font-bold text-[#1f3d33]">
                Email address <span className="font-bold">*</span>
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-12 w-full rounded-lg border border-[#dcdacd] bg-white px-3.5 text-[15px] text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-[13px] font-bold text-[#1f3d33]">
                Photo URL
              </span>
              <input
                type="url"
                name="photoUrl"
                placeholder="https://example.com/photo.jpg"
                className="h-12 w-full rounded-lg border border-[#dcdacd] bg-white px-3.5 text-[15px] text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-[13px] font-bold text-[#1f3d33]">
                Password <span className="font-bold">*</span>
              </span>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="h-12 w-full rounded-lg border border-[#dcdacd] bg-white px-3.5 text-[15px] text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
              />
            </label>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1f3d33] text-[15px] font-semibold text-white transition hover:bg-[#2a5346]"
            >
              Create account
              <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="mt-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#e3e1d4]" />
            <span className="text-[13px] text-[#707c73]">or continue with</span>
            <span className="h-px flex-1 bg-[#e3e1d4]" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-[#dcdacd] bg-white text-[15px] font-semibold text-[#1f3d33] transition hover:bg-[#faf9f3]"
            >
              <Globe className="size-[18px] text-[#1f3d33]" />
              Google
            </button>
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-[#dcdacd] bg-white text-[15px] font-semibold text-[#1f3d33] transition hover:bg-[#faf9f3]"
            >
              <Code className="size-[18px] text-[#1f3d33]" />
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-[#707c73]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-[#1f5a48] transition-opacity hover:opacity-70"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
