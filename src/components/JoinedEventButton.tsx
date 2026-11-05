"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Opportunity } from "../../type";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type JoinEventButtonProps = {
  opportunity: Opportunity;
};

export default function JoinEventButton({ opportunity }: JoinEventButtonProps) {

  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoinEvent = async () => {

    if (!session?.user?.email) {
      toast.error("Please login first to join an event");
      return;
    }

    if (loading || joined) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/joined-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: String(opportunity._id),
          name: session.user.name,
          email: session.user.email,
        }),
      });

      const result = await res.json();

      if (res.status === 409) {
        setJoined(true);
        toast("You have already joined this event");
        return;
      }

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to join event");
      }

      setJoined(true);
      toast.success("You have successfully joined this event!");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Failed to join event",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoinEvent}
      disabled={loading || joined}
      className="mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1f3d33] text-[15px] font-semibold text-white transition hover:bg-[#2a5346] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Joining..." : joined ? "Already Joined" : "Join this event"}

      {!joined && <ArrowRight className="size-4" />}
    </button>
  );
}
