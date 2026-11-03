"use client";

import { ArrowRight } from "lucide-react";
import { Opportunity } from "../../type";
import { authClient } from "@/lib/auth-client";

type JoinEventButtonProps = {
  opportunity: Opportunity;
};

export default function JoinEventButton({ opportunity }: JoinEventButtonProps) {
  const { data: session } = authClient.useSession();

  console.log(session?.user);

  const handleJoinEvent = async () => {
    const res = await fetch(`http://localhost:5000/manage-events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: session?.user.name,
        email: session?.user.email,
        image: opportunity.image,
        title: opportunity.title,
        location: opportunity.location,
        category: opportunity.category,
        date: opportunity.date,
      }),
    });
    const result = await res.json();
    console.log(result);
    if (!result.ok) {
      throw new Error(result.message);
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
