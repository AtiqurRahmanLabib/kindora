import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Leaf,
  MapPin,
  TreePine,
  Users,
} from "lucide-react";
import { OpportunityCard } from "@/components/OpportunityCard";
import type { Opportunity } from "../../../../type";

// Pre-generate the known event paths at build time so valid pages block
// before responding (correct 404 status for removed/invalid IDs).
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/opportunities`);
    if (!res.ok) return [];
    const opportunities = (await res.json()) as Opportunity[];
    return opportunities.map((opportunity) => ({ id: opportunity._id }));
  } catch {
    // API unavailable during build: fall back to runtime rendering
    return [];
  }
}

// This route blocks on request-time data (`no-store` fetch + params) so
// missing IDs can return a proper 404 status instead of a streamed
// not-found UI inside a 200 response.
export const instant = false;

async function getCachedOpportunityForMetadata(id: string) {
  "use cache";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/opportunities/${id}`,
      { next: { revalidate: 120 } }
    );
    if (res.ok) {
      return (await res.json()) as Opportunity;
    }
  } catch {
    // fall through to default metadata when the API is unavailable
  }
  return null;
}

export async function generateMetadata({
  params,
}: PageProps<"/upcoming-events/[id]">): Promise<Metadata> {
  const { id } = await params;
  const opportunity = await getCachedOpportunityForMetadata(id);
  if (opportunity) {
    return {
      title: `${opportunity.title} — Kindora`,
      description: opportunity.description,
    };
  }
  return { title: "Event details — Kindora" };
}

const EventDetails = async ({
  parameters,
}: {
  parameters: Promise<{ id: string }>;
}) => {
  const { id } = await parameters;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/opportunities/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const opportunity = (await res.json()) as Opportunity;

  // "You might also like" — same list endpoint, excluding the current event
  const related = await fetch(`${process.env.NEXT_PUBLIC_API}/opportunities`, {
    next: { revalidate: 60 },
  })
    .then((res) => res.json() as Promise<Opportunity[]>)
    .catch(() => [] as Opportunity[]);
  const recommendations = related
    .filter((item) => item._id !== opportunity._id)
    .slice(0, 3);

  const spotsFilledPercent = Math.min(
    100,
    Math.round((opportunity.participants / opportunity.totalSpots) * 100)
  );
  const spotsRemaining = opportunity.totalSpots - opportunity.participants;

  const heroDate = new Date(opportunity.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const sidebarDate = new Date(opportunity.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="bg-[#f2f0e6]">
      <div className="mx-auto max-w-[1360px] px-6 py-10 sm:px-10 lg:px-16">
        {/* Hero panel */}
        <div className="relative mt-5 h-[480px] overflow-hidden rounded-2xl">
          <Image
            src={opportunity.image}
            alt={opportunity.title}
            fill
            priority
            sizes="(min-width: 1360px) 1250px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/70" />

          <div className="absolute right-0 bottom-0 left-0 p-8 sm:p-10">
            <span className="inline-flex rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#1f3d33]">
              {opportunity.category}
            </span>
            <h1 className="mt-4 max-w-2xl text-[52px] leading-[1.05] font-semibold tracking-tight text-white">
              {opportunity.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-6 text-[15px] text-white/95">
              <span className="flex items-center gap-2">
                <Calendar className="size-4" />
                {heroDate}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4" />
                {opportunity.location}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Left column */}
          <div>
            {/* Organizer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#e4ecdb] text-[#2e5b43]">
                  <TreePine className="size-5" />
                </span>
                <span>
                  <span className="block text-[13px] text-[#707c73]">
                    Organized by
                  </span>
                  <span className="block text-[17px] font-semibold text-[#1f3d33]">
                    {opportunity.organizer}
                  </span>
                </span>
              </div>
              {opportunity.verifiedOrganizer && (
                <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#2e7d6f]">
                  <Check className="size-4" />
                  Verified organizer
                </p>
              )}
            </div>

            <div className="mt-6 border-t border-[#e3e1d4]" />

            {/* About */}
            <h2 className="mt-8 text-[34px] leading-tight font-semibold tracking-tight text-[#1f3d33]">
              {opportunity.details.heading}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[#5d6d64]">
              {opportunity.details.about}
            </p>

            {/* Impact */}
            <div className="mt-8 rounded-2xl bg-[#e4ecdb] p-7">
              <p className="flex items-center gap-3 text-[17px] font-bold text-[#2e5b43]">
                <Leaf className="size-5 shrink-0" />
                {opportunity.details.impactTitle}
              </p>
              <p className="mt-3 pl-8 text-[15px] leading-relaxed text-[#2e5b43]/90">
                {opportunity.details.impactDescription}
              </p>
            </div>

            {/* What to bring */}
            <h3 className="mt-10 text-xl font-semibold text-[#1f3d33]">
              What to bring
            </h3>
            <ul className="mt-5 space-y-4">
              {opportunity.details.whatToBring.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[15px] text-[#5d6d64]"
                >
                  <Check className="size-4 shrink-0 text-[#4b8b5f]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="rounded-2xl border border-[#e3e1d4] bg-white p-7 shadow-[0_4px_24px_rgba(31,61,51,0.06)] lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-[#1f3d33]">
              Event information
            </h2>

            <div className="mt-7 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e4ecdb] text-[#2e5b43]">
                  <Calendar className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#8a958c] uppercase">
                    Date &amp; time
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-[#1f3d33]">
                    {sidebarDate}
                  </p>
                  <p className="mt-0.5 text-sm text-[#707c73]">
                    {opportunity.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e4ecdb] text-[#2e5b43]">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#8a958c] uppercase">
                    Location
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-[#1f3d33]">
                    {opportunity.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e4ecdb] text-[#2e5b43]">
                  <Users className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#8a958c] uppercase">
                    Community
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-[#1f3d33]">
                    {opportunity.participants} people are joining
                  </p>
                  <p className="mt-0.5 text-sm text-[#707c73]">
                    {spotsRemaining} spaces remaining
                  </p>
                </div>
              </div>
            </div>

            {/* Spots progress */}
            <div className="mt-7">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e3d8]">
                <div
                  className="h-full rounded-full bg-[#2e5b43]"
                  style={{ width: `${spotsFilledPercent}%` }}
                />
              </div>
              <p className="mt-2.5 text-[13px] text-[#707c73]">
                {opportunity.participants} of {opportunity.totalSpots} spots
                filled
              </p>
            </div>

            <button
              type="button"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1f3d33] text-[15px] font-semibold text-white transition hover:bg-[#2a5346]"
            >
              Join this event
              <ArrowRight className="size-4" />
            </button>
            <p className="mt-4 text-center text-[13px] text-[#707c73]">
              {opportunity.price === "Free"
                ? "Free to join"
                : `${opportunity.price} per volunteer`}{" "}
              &middot; Confirmation sent by email
            </p>
          </aside>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-24">
            <p className="text-xs font-bold tracking-[0.22em] text-[#2e7d6f] uppercase">
              Keep exploring
            </p>
            <h2 className="mt-4 text-[56px] leading-[1.08] font-semibold tracking-tight text-[#1f3d33] sm:text-[64px]">
              You might also like
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((item) => (
                <OpportunityCard key={item._id} opportunity={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

const Page = ({ params }: PageProps<"/upcoming-events/[id]">) => {
  return (
    <div className="bg-[#f2f0e6] font-[family-name:var(--font-geist-sans)]">
      <div className="px-4 pt-4">
        <a
          href="/upcoming-events"
          className="mx-auto flex max-w-[1360px] items-center gap-2 text-sm font-medium text-[#1f3d33] transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="size-4" />
          Back to events
        </a>
      </div>

      <EventDetails parameters={params} />
    </div>
  );
};

export default Page;
