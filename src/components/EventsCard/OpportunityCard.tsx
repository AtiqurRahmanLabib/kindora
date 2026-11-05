"use client";
import Image from "next/image";
import { ArrowRight, MapPin, Users } from "lucide-react";
import type { Opportunity } from "../../../type";
import Link from "next/link";

function formatDateBadge(value: string) {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${day} ${month}`;
}

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="flex flex-col rounded-xl border border-[#e3e1d4] bg-white p-1.5 shadow-[0_2px_12px_rgba(31,61,51,0.05)]">
      <div className="relative h-60 w-full overflow-hidden rounded-lg">
        {opportunity.image ? (
          <Image
            src={opportunity.image}
            alt={opportunity.title || "Opportunity image"}
            fill
            sizes="(min-width: 1280px) 30vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-sm text-gray-500">No Image Available</span>
          </div>
        )}

        <span className="absolute top-4 left-4 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#1f3d33]">
          {opportunity.category}
        </span>

        <span className="absolute right-4 bottom-6 rounded-lg bg-white px-2.5 py-2 text-xs font-bold text-[#1f3d33]">
          {formatDateBadge(opportunity.date)}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-5">
        <h3 className="text-xl font-semibold text-[#1f3d33]">
          {opportunity.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#5d6d64]">
          {opportunity.description}
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-[#707c73]">
          <MapPin className="size-4 shrink-0" />
          {opportunity.location}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#e3e1d4] px-4 py-4">
        <p className="flex items-center gap-2 text-sm text-[#707c73]">
          <Users className="size-4 shrink-0" />
          {opportunity.participants} joining
        </p>
        <Link
          href={`/upcoming-events/${opportunity._id}`}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#1f5a48] transition-opacity hover:opacity-70"
        >
          View event
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
