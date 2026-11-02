import Image from "next/image";
import { ArrowRight, Heart, Plus, Sparkles } from "lucide-react";
import bannerImg from '../../../public/assests/bannerImage.png'

const avatars = [
  { src: "/avatar-1.jpg", alt: "Neighbor portrait" },
  { src: "/avatar-2.jpg", alt: "Neighbor portrait" },
  { src: "/avatar-3.jpg", alt: "Neighbor portrait" },
];

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#f2f0e6]">
      <div className="mx-auto grid max-w-360 items-center gap-14 px-6 pt-16 pb-24 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-16 xl:pt-20">
        {/* Left: copy */}
        <div>
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-[#2e7d6f] uppercase">
            <Sparkles className="size-4" />
            Community begins with you
          </p>

          <h1 className="mt-6 text-[64px] leading-[1.04] font-semibold tracking-tight text-[#1f3d33] sm:text-[76px] xl:text-[88px]">
            Small Actions.
            <br />
            <span className="text-[#3e7c5b]">Greater</span>
            <br />
            <span className="font-bold text-[#3e7c5b] italic">Impact.</span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#5d6d64]">
            Find meaningful ways to help close to home. Kindora brings people,
            ideas and local initiatives together—so every act of care can grow.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#upcoming-events"
              className="flex h-12 items-center gap-2.5 rounded-xl bg-[#1f3d33] px-6 text-[15px] font-semibold text-white transition hover:bg-[#2a5346]"
            >
              Explore events
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#create-event"
              className="flex h-12 items-center gap-2.5 rounded-xl border border-[#dcdacd] bg-white px-6 text-[15px] font-semibold text-[#1f3d33] transition hover:bg-[#faf9f3]"
            >
              <Plus className="size-4" />
              Create event
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex">
              {avatars.map((avatar, index) => (
                <Image
                  key={avatar.src}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={38}
                  height={38}
                  className={`size-9.5 rounded-full object-cover ring-2 ring-[#f2f0e6] ${
                    index > 0 ? "-ml-3" : ""
                  }`}
                />
              ))}
            </div>
            <p className="text-[15px] text-[#5d6d64]">
              <span className="font-semibold text-[#1f3d33]">12,000+</span>{" "}
              neighbors already involved
            </p>
          </div>
        </div>

        {/* Right: visual */}
        <div className="relative">
          {/* Decorative outline circle */}
          <div className="pointer-events-none absolute -right-16 -bottom-24 size-105 rounded-full border-2 border-[#9dbfae]" />
          <div className="relative">
            <Image
              src={bannerImg}
              alt="Volunteers planting seedlings together outdoors"
              width={820}
              height={920}
              preload
              className="h-120 w-full rounded-[64px] object-cover sm:h-140 lg:h-160"
            />

            {/* Floating stat card: impact */}
            <div className="absolute top-10 -right-4 flex items-center gap-3 rounded-2xl bg-white py-4 pr-6 pl-4 shadow-[0_12px_32px_rgba(31,61,51,0.12)] sm:-right-10">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#e4efe4] text-[#3e7c5b]">
                <Heart className="size-5" />
              </span>
              <span>
                <span className="block text-lg leading-tight font-bold text-[#1f3d33]">
                  92%
                </span>
                <span className="block text-sm text-[#707c73]">
                  Feel more connected
                </span>
              </span>
            </div>

            {/* Floating stat card: joined */}
            <div className="absolute -bottom-8 -left-4 flex items-center gap-3 rounded-2xl bg-white py-4 pr-6 pl-4 shadow-[0_12px_32px_rgba(31,61,51,0.12)] sm:-left-10">
              <span className="flex">
                <span className="size-7 rounded-full bg-[#e4efe4]" />
                <span className="-ml-2 size-7 rounded-full bg-[#e8c9a8]" />
                <span className="-ml-2 size-7 rounded-full bg-[#2b2626]" />
              </span>
              <span>
                <span className="block text-lg leading-tight font-bold text-[#1f3d33]">
                  248 joined
                </span>
                <span className="block text-sm text-[#707c73]">
                  This week
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
