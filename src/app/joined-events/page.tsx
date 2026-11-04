
import type { Metadata } from "next";
import { CalendarDays, Heart } from "lucide-react";
import {
  JoinedEventsCard,
  type JoinedEvent,
} from "@/components/EventsCard/JoinedEventsCard";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Joined events — Kindora",
  description: "Everything you've committed to, organized by event date.",
};

type JoinedEventData = {
  _id: string;
  eventId: string;
  email: string;
  name: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  joinedAt: string;
};

export default async function JoinedEventsPage() {
  // Get user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Check authentication
  if (!user?.email) {
    redirect("/login");
  }

  // Fetch joined events
  let joinedEvents: JoinedEvent[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/joined-events/${encodeURIComponent(user.email)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch joined events");
    }

    const data: JoinedEventData[] = await res.json();

    // Convert database data to card data
    joinedEvents = data.map((event) => {
      const eventDate = new Date(event.date);

      let status = "Upcoming";

      if (!isNaN(eventDate.getTime())) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (eventDate < today) {
          status = "Completed";
        } else if (eventDate < tomorrow) {
          status = "Today";
        } else {
          const weekLater = new Date(today);
          weekLater.setDate(today.getDate() + 7);

          if (eventDate < weekLater) {
            status = "This week";
          }
        }
      }

      return {
        id: event._id,
        title: event.title,
        category: event.category,
        status: status,
        location: event.location,
        date: !isNaN(eventDate.getTime())
          ? eventDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : event.date,
        image: event.image || "/signup-pack.jpg",
      };
    });

  } catch (error) {
    console.error("Joined events error:", error);
  }

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
            Everything youve committed to, organized by event date.
          </p>

          <hr className="mt-12 border-[#e3e1d4]" />

        </section>

        {/* Summary */}
        <section className="mx-auto max-w-340 px-6 sm:px-10">

          <div className="mt-10 grid gap-6 rounded-2xl border border-[#e3e1d4] bg-white px-8 py-6 sm:grid-cols-3 sm:gap-0">

            <div className="flex items-center gap-4">

              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e4ecdb] text-[#2e7d6f]">
                <Heart className="size-5" />
              </span>

              <div>
                <p className="text-lg font-semibold text-[#1f3d33]">
                  {joinedEvents.length} events
                </p>

                <p className="text-sm text-[#78847b] italic">
                  Total joined events
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 sm:border-l sm:border-[#e8e6da] sm:pl-8">

              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e4ecdb] text-[#2e7d6f]">
                <CalendarDays className="size-5" />
              </span>

              <div>
                <p className="text-lg font-semibold text-[#1f3d33]">
                  {joinedEvents.filter(
                    (event) => event.status !== "Completed"
                  ).length}
                </p>

                <p className="text-sm text-[#78847b] italic">
                  Upcoming events
                </p>
              </div>

            </div>

            <div className="flex items-center sm:border-l sm:border-[#e8e6da] sm:pl-8">

              <p className="text-[15px] text-[#78847b] italic">
                Alone we can do so little; together we can do so much.
              </p>

            </div>

          </div>

        </section>

        {/* Event listing */}
        <section className="mx-auto max-w-340 px-6 pt-12 pb-16 sm:px-10">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <h2 className="text-xl font-semibold text-[#1f3d33]">
              Your joined events
            </h2>

            <p className="text-sm text-[#78847b]">
              {joinedEvents.length} events found
            </p>

          </div>

          {joinedEvents.length > 0 ? (

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {joinedEvents.map((event) => (
                <JoinedEventsCard
                  key={event.id}
                  event={event}
                />
              ))}

            </div>

          ) : (

            <div className="mt-8 rounded-2xl border border-[#e3e1d4] bg-white px-6 py-20 text-center">

              <Heart className="mx-auto size-10 text-[#a0a89f]" />

              <h3 className="mt-4 text-xl font-semibold text-[#1f3d33]">
                No Joined Events Yet
              </h3>

              <p className="mt-2 text-sm text-[#78847b]">
                You havent joined any events yet.
                Explore opportunities and make a difference.
              </p>

              <Link
                href="/upcoming-events"
                className="mt-6 inline-flex rounded-xl bg-[#1f3d33] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a5346]"
              >
                Explore Events
              </Link>

            </div>

          )}

        </section>

      </main>
    </div>
  );
}
