import type { Metadata } from "next";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { OpportunityCard } from "@/components/EventsCard/OpportunityCard";
import type { Opportunity } from "../../../type";

export const metadata: Metadata = {
  title: "Upcoming events — Kindora",
  description:
    "Explore hands-on opportunities created by neighbors and trusted community organizers.",
};

const filterChips = [
  "All",
  "Environment",
  "Donation",
  "Food & Care",
  "Cleanup",
  "Education",
];

function OpportunitiesFallback() {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {filterChips.map((chip) => (
        <span
          key={chip}
          className="h-113 animate-pulse rounded-xl border border-[#e3e1d4] bg-white/70"
        />
      ))}
    </div>
  );
}

async function OpportunitiesSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/opportunities`);
  if (!res.ok) {
    throw new Error(`Failed to load opportunities (status ${res.status})`);
  }
  const opportunities = (await res.json()) as Opportunity[];

  const sorted = [...opportunities].sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="relative block max-w-full sm:w-82.5">
          <Search className="absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-[#8a958c]" />
          <input
            type="search"
            name="q"
            placeholder="Search events or locations"
            aria-label="Search events or locations"
            className="h-12 w-full rounded-lg border border-[#dcdacd] bg-white pr-3.5 pl-11 text-[15px] text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
          />
        </label>

        <div className="flex flex-wrap gap-2.5">
          {filterChips.map((chip, index) => (
            <button
              key={chip}
              type="button"
              className={`flex h-11 items-center rounded-full px-4 text-sm font-medium transition ${
                index === 0
                  ? "bg-[#1f3d33] text-white"
                  : "border border-[#dcdacd] bg-white text-[#1f3d33] hover:bg-[#faf9f3]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-bold text-[#1f3d33]">
          {sorted.length} opportunities
        </p>
        <p className="text-sm text-[#707c73]">Sorted by: Soonest</p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((opportunity) => (
          <OpportunityCard
            key={opportunity._id}
            opportunity={opportunity}
          />
        ))}
      </div>
    </>
  );
}

const UpcomingEventsPage = () => {
  return (
    <div className="font-family-name:var(--font-geist-sans)">
      <section className="border-b border-[#e3e1d4] bg-[#edefe8]">
        <div className="mx-auto max-w-340 px-6 py-20 text-center sm:px-10">
          <p className="text-xs font-bold tracking-[0.22em] text-[#2e7d6f] uppercase">
            Find your next good deed
          </p>
          <h1 className="mt-4 text-[56px] leading-[1.08] font-semibold tracking-tight text-[#1f3d33] sm:text-[68px]">
            Upcoming events
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#5d6d64]">
            Explore hands-on opportunities created by neighbors and trusted
            community organizers.
          </p>
        </div>
      </section>

      <main className="bg-[#f2f0e6]">
        <div className="mx-auto max-w-340 px-6 py-16 sm:px-10">
          <Suspense fallback={<OpportunitiesFallback />}>
            <OpportunitiesSection />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default UpcomingEventsPage;
