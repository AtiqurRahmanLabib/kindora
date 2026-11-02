import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Create a community event — Kindora",
  description:
    "Share your idea, set the details, and invite neighbors to make it happen with you.",
};

const categoryOptions = [
  "Community support",
  "Environment & cleanup",
  "Education & mentoring",
  "Seniors & care",
  "Food security",
  "Neighborhood beautification",
];

const CreateEventPage = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Page hero */}
      <section className="border-b border-[#e3e1d4] bg-[#edefe8]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 text-center sm:px-10">
          <p className="text-xs font-bold tracking-[0.22em] text-[#2e7d6f] uppercase">
            Organizer studio
          </p>
          <h1 className="mt-4 text-[56px] leading-[1.08] font-semibold tracking-tight text-[#1f3d33] sm:text-[68px]">
            Create a community event
          </h1>
          <p className="mt-4 text-lg text-[#5d6d64]">
            Share your idea, set the details, and invite neighbors to make it
            happen with you.
          </p>
        </div>
      </section>

      {/* Form */}
      <main className="bg-[#f2f0e6]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 lg:grid lg:grid-cols-[300px_1fr] lg:gap-14">
          {/* Sidebar */}
          <aside className="max-lg:mb-10">
            <span className="inline-flex rounded-full bg-[#dfe8d8] px-3 py-1 text-xs font-semibold text-[#2e5b43]">
              Step 1 of 1
            </span>
            <h2 className="mt-5 text-[34px] leading-[1.15] font-semibold tracking-tight text-[#1f3d33]">
              Tell us about your event.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5d6d64]">
              A clear, thoughtful listing helps volunteers understand how they
              can contribute.
            </p>

            <div className="mt-7 border-t border-[#dcdacd] pt-7">
              <p className="flex items-center gap-2 text-[15px] font-semibold text-[#2e7d6f]">
                <Sparkles className="size-4" />
                A tip for great events
              </p>
              <p className="mt-2 pl-6 text-[13px] leading-relaxed text-[#707c73]">
                Be specific about the activity, accessibility, and what
                volunteers should expect on the day.
              </p>
            </div>
          </aside>

          {/* Form card */}
          <form
            className="rounded-2xl border border-[#e3e1d4] bg-white p-8 shadow-[0_2px_16px_rgba(31,61,51,0.05)] sm:p-10"
            action="#"
          >
            {/* Section 01 — Event basics */}
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#dfe8d8] text-sm font-semibold text-[#2e5b43]">
                01
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[#1f3d33]">
                  Event basics
                </h3>
                <p className="mt-0.5 text-sm text-[#707c73]">
                  Give your initiative a name and clear purpose.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6">
              <label className="grid gap-2">
                <span className="text-[13px] font-semibold text-[#1f3d33]">
                  Event title <span className="font-bold">*</span>
                </span>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Neighborhood winter coat drive"
                  className="h-11 w-full rounded-lg border border-[#dcdacd] bg-white px-3.5 text-[15px] text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-semibold text-[#1f3d33]">
                  Description <span className="font-bold">*</span>
                </span>
                <textarea
                  name="description"
                  required
                  rows={6}
                  placeholder="Tell volunteers what you'll do together and why it matters..."
                  className="w-full resize-y rounded-lg border border-[#dcdacd] bg-white px-3.5 py-3 text-[15px] leading-relaxed text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-semibold text-[#1f3d33]">
                  Category <span className="font-bold">*</span>
                </span>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="h-11 w-full rounded-lg border border-[#dcdacd] bg-white px-3 text-[15px] text-[#1f3d33] outline-none transition focus:border-[#3e7c5b]"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Section 02 — Place & time */}
            <div className="mt-10 flex items-start gap-4">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#dfe8d8] text-sm font-semibold text-[#2e5b43]">
                02
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[#1f3d33]">
                  Place &amp; time
                </h3>
                <p className="mt-0.5 text-sm text-[#707c73]">
                  Help people plan how and when to join.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[13px] font-semibold text-[#1f3d33]">
                  Location <span className="font-bold">*</span>
                </span>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Venue or meeting point"
                  className="h-11 w-full rounded-lg border border-[#dcdacd] bg-white px-3.5 text-[15px] text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-semibold text-[#1f3d33]">
                  Event date <span className="font-bold">*</span>
                </span>
                <input
                  type="date"
                  name="date"
                  required
                  className="h-11 w-full rounded-lg border border-[#dcdacd] bg-white px-3.5 text-[15px] text-[#1f3d33] outline-none transition focus:border-[#3e7c5b]"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-2">
              <label
                htmlFor="thumbnail-url"
                className="text-[13px] font-semibold text-[#1f3d33]"
              >
                Thumbnail URL
              </label>
              <input
                id="thumbnail-url"
                type="url"
                name="thumbnailUrl"
                placeholder="https://images.example.com/event.jpg"
                className="h-11 w-full rounded-lg border border-[#dcdacd] bg-white px-3.5 text-[15px] text-[#1f3d33] outline-none transition placeholder:text-[#8a958c] focus:border-[#3e7c5b]"
              />
            </div>

            {/* Actions */}
            <div className="mt-10 flex items-center justify-end gap-3 border-t border-[#e3e1d4] pt-7">
              <button
                type="button"
                className="h-12 rounded-xl px-4 text-[15px] font-semibold text-[#1f3d33] transition hover:bg-[#f2f0e6]"
              >
                Save as draft
              </button>
              <button
                type="submit"
                className="flex h-12 items-center gap-2.5 rounded-xl bg-[#1f3d33] px-6 text-[15px] font-semibold text-white shadow-[0_6px_20px_rgba(31,61,51,0.25)] transition hover:bg-[#2a5346]"
              >
                Create event
                <ArrowRight className="size-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateEventPage;
