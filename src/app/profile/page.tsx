"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Leaf, PenLine, Check } from "lucide-react";
import Image from "next/image";

const stats = [
  { value: "14", label: "Events" },
  { value: "52h", label: "Given" },
  { value: "4", label: "Created" },
];

const causes = ["Environment", "Food security", "Community care", "Education"];

const formatMonthYear = (date?: Date | string) => {
  if (!date) return "—";

  return new Date(
    date instanceof Date ? date.getTime() : date,
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Edit mode চালু করার সময় existing data দেখাবে
  const handleEdit = () => {
    setName(user?.name || "");
    setImage(user?.image || "");
    setError("");
    setIsEditing(true);
  };

  // Cancel করলে আগের data ফিরে আসবে
  const handleCancel = () => {
    setName(user?.name || "");
    setImage(user?.image || "");
    setError("");
    setIsEditing(false);
  };

  // Profile update
  const handleSave = async () => {
    if (!name.trim()) {
      setError("Display name cannot be empty.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        setError(error.message || "Something went wrong.");
        return;
      }

      setIsEditing(false);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f7f6ef] p-10 text-[#5f6f67]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f6ef] p-10 text-[#5f6f67]">
        Please login to view your profile.
      </div>
    );
  }

  const joinedYear = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : "";

  return (
    <div className="min-h-screen bg-[#f7f6ef] px-6 py-16 md:px-34.25">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f6b52]">
          Account Settings
        </p>

        <h1 className="mt-5 text-6xl font-medium tracking-tight text-[#1e3d33]">
          Your profile
        </h1>

        <p className="mt-3 text-lg text-[#6f7c75]">
          Manage how you appear across the Kindora community.
        </p>

        <hr className="mt-12 border-[#e3e2d9]" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[330px_1fr]">
          {/* Left card */}
          <div className="h-fit overflow-hidden rounded-3xl border border-[#e3e2d9] bg-white">
            <div
              className="h-25 bg-[#1e3d33]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="flex flex-col items-center px-6 pb-6">
              <Image
                width={100}
                height={100}
                src={user.image || "https://i.pravatar.cc/200"}
                alt={user.name || "User"}
                className="-mt-12.5 h-23 w-23 rounded-full border-4 border-white object-cover"
              />

              <h2 className="mt-4 text-2xl font-medium text-[#1f2a25]">
                {user.name}
              </h2>

              <p className="text-sm text-[#6f7c75]">{user.email}</p>

              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#d9eadf] px-4 py-1.5 text-xs text-[#2f6b52]">
                <Leaf size={14} />
                Community member since {joinedYear}
              </span>
            </div>

            <div className="grid grid-cols-3 border-t border-[#e3e2d9] py-5">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`text-center ${
                    i !== 0 ? "border-l border-[#e3e2d9]" : ""
                  }`}
                >
                  <p className="text-lg font-bold text-[#1f2a25]">{s.value}</p>

                  <p className="text-xs text-[#6f7c75]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="rounded-3xl border border-[#e3e2d9] bg-white p-8 md:p-9">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-medium text-[#1f2a25]">
                  Personal information
                </h3>

                <p className="mt-1 text-sm text-[#6f7c75]">
                  Keep your contact and public details current.
                </p>
              </div>

              {/* Edit / Cancel */}
              <button
                type="button"
                onClick={() => (isEditing ? handleCancel() : handleEdit())}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl border border-[#e3e2d9] px-5 py-3 text-sm font-semibold text-[#1f2a25] transition hover:bg-[#f7f6ef] disabled:opacity-60"
              >
                <PenLine size={16} />
                {isEditing ? "Cancel" : "Edit profile"}
              </button>
            </div>

            <hr className="my-7 border-[#e3e2d9]" />

            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Full name" value={user.name} />

              <Field label="Email address" value={user.email} />

              <Field label="Home community" value="Portland, Oregon" />

              <Field
                label="Member since"
                value={formatMonthYear(user.createdAt)}
              />
            </div>

            {/* Edit mode */}
            {isEditing && (
              <>
                <hr className="my-7 border-[#e3e2d9]" />

                <h4 className="text-lg font-medium text-[#1f2a25]">
                  Update profile
                </h4>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-[#1f2a25]">
                      Display name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#e3e2d9] px-4 py-3 text-[#1f2a25] outline-none transition focus:border-[#2f6b52] focus:ring-2 focus:ring-[#2f6b52]/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1f2a25]">
                      Photo URL
                    </label>

                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://..."
                      className="mt-2 w-full rounded-xl border border-[#e3e2d9] px-4 py-3 text-[#1f2a25] outline-none transition focus:border-[#2f6b52] focus:ring-2 focus:ring-[#2f6b52]/20"
                    />
                  </div>
                </div>

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-[#1e3d33] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#16302a] disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save changes"}

                    {!saving && <Check size={16} />}
                  </button>
                </div>
              </>
            )}

            <hr className="my-7 border-[#e3e2d9]" />

            <h4 className="text-lg font-medium text-[#1f2a25]">
              Causes you care about
            </h4>

            <p className="mt-1 text-sm text-[#6f7c75]">
              Used to personalize your event recommendations.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {causes.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-[#eaefe6] px-4 py-2 text-xs text-[#1f2a25]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Field component
const Field = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-[11px] font-medium uppercase tracking-wider text-[#6f7c75]">
      {label}
    </p>

    <p className="mt-1 font-bold text-[#1f2a25]">{value || "—"}</p>
  </div>
);

export default ProfilePage;
