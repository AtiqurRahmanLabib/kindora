import type { Metadata } from "next";
import { ChevronDown, Clock, Heart } from "lucide-react";
import {
  JoinedEventsCard,
  type JoinedEvent,
} from "@/components/JoinedEventsCard";

export const metadata: Metadata = {
  title: "Joined events — Kindora",
  description: "Everything you\u2019ve committed to, organized by event date.",
};

const joinedEvents: JoinedEvent[] = [
  {
    id: "1",
    title: "Winter Warmth Distribution",
    category: "Donation",
    status: "This week",
    location: "Riverside Community Hall",
    date: "December 14, 2025",
    image: "/signup-pack.jpg",
  },
  {
    id: "2",
    title: "Grow a Greener City",
    category: "Environment",
    status: "Upcoming",
    location: "Northwood Public Park",
    date: "December 20, 2025",
    image: "/c-action-farm.jpg",
  },
  {
    id: "3",
    title: "Community Pantry Drive",
    category: "Food & Care",
    status: "Upcoming",
    location: "Kindora Central Hub",
    date: "January 8, 2026",
    image: "/c-action-food.jpg",
  },
  {
    id: "4",
    title: "Clean Shores, Clear Future",
    category: "Cleanup",
    status: "Upcoming",
    location: "Brighton Shoreline",
    date: "January 17, 2026",
    image: "/c-action-beach.jpg",
  },
];

export default function JoinedEventsPage() {
  return (
    <div className="font-family-name:var(--font-geist-sans) bg-[#f2f0e6]">
      <main>
        {/* Page header */}
        <section className="mx-auto max-w-340 px-6 pt-16 sm:px-10">
          <p className="text-xs font-bold tracking-[0.22em] text-[#2e7d6f] uppercase">
            Your volunteering
          </p>
          <h1 className="mt-4 text-[56px] leading-[1.08] font-semibold tracking-tight text-[#1f3d33] sm:text-[68px]">
            Joined events
          </h1>
          <p className="mt-4 text-lg text-[#5d6d64]">
            Everything you&rsquo;ve committed to, organized by event date.
          </p>
          <hr className="mt-12 border-[#e3e1d4]" />
        </section>

        {/* Summary stats */}
        <section className="mx-auto max-w-340 px-6 sm:px-10" aria-label="Volunteering summary">
          <div className="mt-10 grid gap-6 rounded-2xl border border-[#e3e1d4] bg-white px-8 py-6 sm:grid-cols-3 sm:gap-0">
            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e4ecdb] text-[#2e7d6f]">
                <Heart className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-semibold text-[#1f3d33]">6 events</p>
                <p className="text-sm text-[#78847b] italic">Joined this year</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:border-l sm:border-[#e8e6da] sm:pl-8">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e4ecdb] text-[#2e7d6f]">
                <Clock className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-semibold text-[#1f3d33]">23 hours</p>
                <p className="text-sm text-[#78847b] italic">Community time</p>
              </div>
            </div>

            <div className="flex items-center sm:border-l sm:border-[#e8e6da] sm:pl-8">
              <p className="text-[15px] text-[#78847b] italic">
                &ldquo;Alone we can do so little; together we can do so much.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Event listing */}
        <section className="mx-auto max-w-340 px-6 pt-12 pb-16 sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#1f3d33]">Coming up</h2>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm text-[#78847b] transition hover:text-[#1f3d33]"
            >
              Sorted by event date
              <ChevronDown className="size-4" aria-hidden />
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {joinedEvents.map((event) => (
              <JoinedEventsCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
