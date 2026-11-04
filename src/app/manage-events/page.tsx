import { auth } from "@/lib/auth";
import { CalendarDays, Users, Eye, Globe, Plus, Search } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Opportunity } from "../../../type";
import EventCard from "../../components/EventsCard/ManageEventCard";

const stats = [
  {
    title: "Total Events",
    value: "24",
    icon: CalendarDays,
    description: "+4 this month",
  },
  {
    title: "Total Participants",
    value: "1,284",
    icon: Users,
    description: "Across all events",
  },
  {
    title: "Total Views",
    value: "8,492",
    icon: Eye,
    description: "+12% this month",
  },
  {
    title: "Communities",
    value: "12",
    icon: Globe,
    description: "Active communities",
  },
];

export const instant = false;

export default async function ManageEventsPage() {
  // 1. Get user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // 2. Check authentication
  if (!user?.email) {
    redirect("/login");
  }

  // 3. Fetch only logged-in user's events
  let events: Opportunity[] = [];

  try {
    const res = await fetch(
      `http://localhost:5000/manage-events/${user.email}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    events = await res.json();
  } catch (error) {
    console.error("Manage events error:", error);
  }

  return (
    <main className="min-h-screen bg-[#f7f7ef] px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#dce2d8] pb-9 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#438263]">
              Organizer Dashboard
            </p>

            <h1 className="text-4xl font-medium tracking-tight text-[#1d4035] sm:text-5xl">
              Manage Events
            </h1>

            <p className="mt-3 text-sm text-[#78847b] sm:text-base">
              Manage your events, track participants and make an impact.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1d4035] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2b5948]"
          >
            <Plus size={18} />
            Create New Event
          </Link>
        </div>

        {/* Statistics */}
        <section className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-[#e0e5dc] bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#78847b]">
                    {stat.title}
                  </p>

                  <div className="rounded-xl bg-[#e8f0e5] p-2.5 text-[#327455]">
                    <Icon size={20} />
                  </div>
                </div>

                <h2 className="mt-4 text-3xl font-bold text-[#1d4035]">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-[#39815e]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Events Section */}
        <section className="mt-9 overflow-hidden rounded-2xl border border-[#e0e5dc] bg-white">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-5 border-b border-[#e7eae4] p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-[#1d4035]">
                Your Events
              </h2>

              <p className="mt-1 text-sm text-[#89928a]">
                View and manage all your created events.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#e0e5dc] bg-[#fafbf7] px-4 py-3 sm:w-72">
              <Search size={17} className="text-[#78847b]" />

              <span className="text-sm text-[#a0a89f]">Search events...</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden grid-cols-[2fr_0.8fr_1fr_0.6fr_auto] gap-4 border-b border-[#e7eae4] bg-[#fafbf7] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#89928a] lg:grid">
            <span>Event Details</span>
            <span>Category</span>
            <span>Date</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Event Cards */}
          <div className="divide-y divide-[#e7eae4]">
            {events.length > 0 ? (
              events.map((event) => <EventCard key={event._id} event={event} />)
            ) : (
              <div className="px-6 py-16 text-center">
                <CalendarDays
                  size={36}
                  className="mx-auto mb-3 text-[#a0a89f]"
                />

                <h3 className="text-lg font-semibold text-[#1d4035]">
                  No Events Found
                </h3>

                <p className="mt-2 text-sm text-[#89928a]">
                  You havent created any events yet.
                </p>

                <Link
                  href="/create-event"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1d4035] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2b5948]"
                >
                  <Plus size={16} />
                  Create Your First Event
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
