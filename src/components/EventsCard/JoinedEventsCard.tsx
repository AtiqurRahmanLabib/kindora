import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, MapPin } from "lucide-react";

export type JoinedEvent = {
  id: string;
  title: string;
  category: string;
  status: string;
  location: string;
  date: string;
  image: string;
};

export function JoinedEventsCard({ event }: { event: JoinedEvent }) {
  const isUpcoming = event.status === "Upcoming";

  return (
    <article className="grid overflow-hidden rounded-2xl border border-[#e3e1d4] bg-white shadow-[0_1px_2px_rgba(31,61,51,0.04)] sm:grid-cols-[210px_1fr]">
      {/* Cover image */}
      <div className="relative h-44 sm:h-full sm:min-h-64">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 640px) 210px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#e4ecdb] px-3.5 py-1.5 text-[13px] font-semibold text-[#2e5b43]">
            {event.category}
          </span>
          <span
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
              isUpcoming
                ? "bg-[#f0efe3] text-[#6f7b71]"
                : "bg-[#f7e8c8] text-[#8a5a1f]"
            }`}
          >
            {event.status}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#1f3d33]">
          {event.title}
        </h3>

        <div className="mt-3 space-y-2 text-sm text-[#78847b]">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {event.location}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" aria-hidden />
            {event.date}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8e6da] pt-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-[#2e7d6f]">
            <Check className="size-4" aria-hidden />
            You&rsquo;re joining
          </p>
          <Link
            href="/upcoming-events"
            className="flex items-center gap-2 rounded-lg border border-[#dcdacd] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f3d33] transition hover:bg-[#f5f4ea]"
          >
            View details
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
