
import {
  CalendarDays,
  Users,
  Eye,
  Globe,
  Plus,
  Search,
  Pencil,
  Trash2,
  MapPin,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    location: "Cox's Bazar, Bangladesh",
    category: "Environment",
    date: "November 12, 2026",
    time: "09:00 AM",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500",
    status: "Published",
    participants: 45,
  },
  {
    id: 2,
    title: "Community Tree Plantation",
    location: "Barishal, Bangladesh",
    category: "Environment",
    date: "November 15, 2026",
    time: "08:30 AM",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500",
    status: "Published",
    participants: 32,
  },
  {
    id: 3,
    title: "Winter Clothes Donation",
    location: "Dhaka, Bangladesh",
    category: "Community",
    date: "November 20, 2026",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=500",
    status: "Draft",
    participants: 18,
  },
  {
    id: 4,
    title: "Free Education Campaign",
    location: "Barishal, Bangladesh",
    category: "Education",
    date: "November 25, 2026",
    time: "11:00 AM",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500",
    status: "Published",
    participants: 60,
  },
];

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

export default function ManageEventsPage() {
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
              <span className="text-sm text-[#a0a89f]">
                Search events...
              </span>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden grid-cols-[2fr_1fr_1.2fr_0.8fr_0.7fr] gap-4 border-b border-[#e7eae4] bg-[#fafbf7] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#89928a] lg:grid">
            <span>Event Details</span>
            <span>Category</span>
            <span>Date & Time</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Event Cards */}
          <div className="divide-y divide-[#e7eae4]">
            {events.map((event) => (
              <div
                key={event.id}
                className="grid grid-cols-1 items-center gap-5 px-5 py-5 transition hover:bg-[#fafbf7] sm:px-6 lg:grid-cols-[2fr_1fr_1.2fr_0.8fr_0.7fr] lg:gap-4"
              >
                {/* Event Info */}
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-[#e8eee6]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-[#1d4035]">
                      {event.title}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-xs text-[#89928a]">
                      <MapPin size={13} />
                      {event.location}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-[#89928a] lg:hidden">
                      <Users size={13} />
                      {event.participants} participants
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <span className="inline-flex rounded-full bg-[#e7f0e5] px-3 py-1.5 text-xs font-semibold text-[#327455]">
                    {event.category}
                  </span>
                </div>

                {/* Date */}
                <div>
                  <p className="flex items-center gap-2 text-sm text-[#45564c]">
                    <CalendarDays size={15} className="text-[#71907b]" />
                    {event.date}
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-xs text-[#89928a]">
                    <Clock size={14} />
                    {event.time}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                      event.status === "Published"
                        ? "bg-[#e2f1e5] text-[#327455]"
                        : "bg-[#fff1d9] text-[#a66c19]"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-start gap-2 lg:justify-end">
                  <button
                    aria-label="Edit event"
                    className="rounded-lg border border-[#e0e5dc] p-2.5 text-[#42604f] transition hover:bg-[#e8f0e5]"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    aria-label="Delete event"
                    className="rounded-lg border border-[#e0e5dc] p-2.5 text-[#c45c50] transition hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {/* <div className="flex flex-col justify-between gap-3 border-t border-[#e7eae4] bg-[#fafbf7] px-6 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-[#89928a]">
              Showing 4 of 24 events
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-[#536b5b]">
              <span className="rounded-lg bg-[#1d4035] px-3 py-2 text-white">
                1
              </span>
              <span className="rounded-lg px-3 py-2">2</span>
              <span className="rounded-lg px-3 py-2">3</span>
              <span className="rounded-lg px-3 py-2">Next →</span>
            </div>
          </div> */}
        </section>

        <p className="mt-6 text-center text-xs text-[#9aa39a]">
          © 2026 Wanderlast. Make every action count.
        </p>
      </div>
    </main>
  );
}
