
import Image from "next/image";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import type { Opportunity } from "../../type";

type EventCardProps = {
  event: Opportunity;
  onEdit: (event: Opportunity) => void;
  onDelete: (id: string) => void;
};

export default function EventCard({
  event,
  onEdit,
  onDelete,
}: EventCardProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 border-b border-[#e0e4dc] px-6 py-4 last:border-b-0 md:grid-cols-[2fr_0.8fr_1fr_0.6fr_auto]">
      {/* Event information */}
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-[#e8eee6]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#1d3930]">
            {event.title}
          </h3>
          <p className="truncate text-xs text-[#758078]">
            {event.location}
          </p>
        </div>
      </div>

      {/* Category */}
      <div>
        <span className="inline-flex rounded-full bg-[#deebdc] px-3 py-1.5 text-xs font-semibold text-[#246447]">
          {event.category}
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-[#69756e]">
        <CalendarDays size={15} />
        <span>
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Status */}
      <div>
        <span className="inline-flex rounded-full bg-[#deebdc] px-3 py-1 text-xs font-semibold text-[#28744f]">
          Published
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(event)}
          aria-label="Edit event"
          className="rounded-lg border border-[#dce2da] p-2 text-[#263d33] transition hover:bg-[#edf2eb]"
        >
          <Pencil size={17} />
        </button>

        <button
          onClick={() => onDelete(event._id)}
          aria-label="Delete event"
          className="rounded-lg border border-[#dce2da] p-2 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}
