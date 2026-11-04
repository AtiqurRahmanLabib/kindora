"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, Pencil, Trash2, MapPin } from "lucide-react";
import type { Opportunity } from "../../../type";

type EventCardProps = {
  event: Opportunity;
};

export default function EventCard({ event }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const isValidDate =
    event.date && !Number.isNaN(new Date(event.date).getTime());

  const formattedDate = isValidDate
    ? new Date(event.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date unavailable";

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`,
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const res = await fetch(
        `http://localhost:5000/manage-events/${event._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      setIsDeleted(true);
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Hide deleted event from UI
  if (isDeleted) return null;

  return (
    <article className="grid grid-cols-1 gap-4 border-b border-[#e0e4dc] px-4 py-5 transition-colors hover:bg-[#fafbf9] sm:px-6 md:grid-cols-2 md:items-center lg:grid-cols-[2fr_0.8fr_1fr_0.6fr_auto]">
      {/* Event Information */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-[#e8eee6] sm:h-16 sm:w-20">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title || "Event image"}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-[#758078]">
              No Image
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-[#1d3930] sm:text-base">
            {event.title}
          </h3>

          <p className="mt-1 flex items-center gap-1 truncate text-xs text-[#758078]">
            <MapPin size={13} className="shrink-0" />
            <span className="truncate">{event.location}</span>
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center justify-between md:justify-start lg:block">
        <span className="text-xs text-[#758078] lg:hidden">Category</span>

        <span className="inline-flex rounded-full bg-[#deebdc] px-3 py-1.5 text-xs font-semibold text-[#246447]">
          {event.category}
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center justify-between text-sm text-[#69756e] md:justify-start">
        <span className="text-xs text-[#758078] md:hidden">Date</span>

        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="shrink-0" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between md:justify-start lg:block">
        <span className="text-xs text-[#758078] lg:hidden">Status</span>

        <span className="inline-flex rounded-full bg-[#deebdc] px-3 py-1 text-xs font-semibold text-[#28744f]">
          Published
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 border-t border-[#e0e4dc] pt-3 md:col-span-2 lg:col-span-1 lg:border-0 lg:pt-0">
        <button
          type="button"
          onClick={() => console.log("Edit event:", event._id)}
          aria-label={`Edit ${event.title}`}
          className="rounded-lg border border-[#dce2da] p-2.5 text-[#263d33] transition hover:bg-[#edf2eb]"
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label={`Delete ${event.title}`}
          className="rounded-lg border border-[#dce2da] p-2.5 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? (
            <span className="text-xs">...</span>
          ) : (
            <Trash2 size={17} />
          )}
        </button>
      </div>
    </article>
  );
}
