
"use client";

import { ArrowRight } from "lucide-react";
import { Opportunity } from "../../type";
import { authClient } from "@/lib/auth-client";

type JoinEventButtonProps = {
  opportunity: Opportunity;
};

export default function JoinEventButton({
  opportunity,
}: JoinEventButtonProps) {
  const { data: session } = authClient.useSession();

  const handleJoinEvent = async () => {
    if (!session?.user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/manage-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: opportunity._id,
          name: session.user.name,
          email: session.user.email,
          image: opportunity.image,
          title: opportunity.title,
          location: opportunity.location,
          category: opportunity.category,
          date: opportunity.date,
          joinedAt: new Date(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to join event");
      }

      alert("You have successfully joined this event!");
      console.log(result);

    } catch (error) {
      console.error("Join event error:", error);
      alert("Failed to join event. Please try again.");
    }
  };

  return (
    <button
      onClick={handleJoinEvent}
      className="mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1f3d33] text-[15px] font-semibold text-white transition hover:bg-[#2a5346]"
    >
      Join this event
      <ArrowRight className="size-4" />
    </button>
  );
}
