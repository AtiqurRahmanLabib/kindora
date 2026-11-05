
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collageImages = [
  {
    src: "/c-action-food.jpg",
    alt: "Volunteers unloading boxes of donated food from a truck",
  },
  {
    src: "/c-action-farm.jpg",
    alt: "People working together in a rural green field",
  },
  {
    src: "/c-action-beach.jpg",
    alt: "Volunteers cleaning a sandy beach",
  },
];

const CommunityAction = () => {
  const largeImage = collageImages[0];
  const smallImages = collageImages.slice(1);

  return (
    <section className="overflow-hidden bg-[#f2f0e6]">
      <div className="mx-auto max-w-360 px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24">

        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1fr_1.45fr] lg:gap-16 xl:gap-20">

          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.22em] text-[#2e7d6f] uppercase sm:text-sm">
              Community in action
            </p>

            <h2 className="mt-5 text-4xl leading-[1.1] font-semibold tracking-tight text-[#1f3d33] sm:mt-6 sm:text-5xl lg:text-[52px] xl:text-[60px]">
              People helping people. That&rsquo;s the whole idea.
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#5d6d64] sm:mt-7 sm:text-lg">
              Every photograph holds a simple truth: when we show up for one
              another, neighborhoods become places of possibility.
            </p>

            <a
              href="#upcoming-events"
              className="mt-7 inline-flex h-11 items-center gap-2.5 rounded-lg border border-[#dcdacd] bg-white px-5 text-sm font-semibold text-[#1f3d33] transition hover:bg-[#faf9f3] sm:mt-9 sm:text-[15px]"
            >
              Find your place
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.45fr_1fr] sm:gap-3 sm:h-100 md:h-115 lg:h-110 xl:h-130">

            <div className="relative h-75 overflow-hidden rounded-2xl sm:h-full">
              <Image
                src={largeImage.src}
                alt={largeImage.alt}
                fill
                priority
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 60vw, 45vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:grid-rows-2">
              {smallImages.map((image) => (
                <div
                  key={image.src}
                  className="relative h-37.5 overflow-hidden rounded-2xl sm:h-full"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 30vw, 25vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-2xl bg-[#1f3d33] px-5 py-10 sm:mt-20 sm:rounded-3xl sm:px-8 sm:py-12 md:px-12 lg:mt-24 lg:px-14 lg:py-16">

          <div className="pointer-events-none absolute -top-40 -right-20 size-72 rounded-full border border-white/15 sm:right-10 sm:size-96" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-10">

            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-[#a9bdb2] uppercase">
                A little good news
              </p>

              <h3 className="mt-4 text-2xl leading-snug font-semibold tracking-tight text-white sm:text-3xl lg:text-[36px]">
                Community stories, in your inbox.
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#b9c8bd] sm:text-[15px]">
                Monthly inspiration, local opportunities and evidence that
                small actions add up.
              </p>
            </div>

            <form
              className="flex w-full flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row sm:items-center sm:rounded-full sm:p-2 lg:justify-self-end lg:max-w-xl"
              action="#"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
                className="h-11 min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm text-[#1f3d33] outline-none placeholder:text-[#8a958c] sm:text-[15px]"
              />

              <button
                type="submit"
                className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#1f3d33] px-6 text-sm font-semibold text-white transition hover:bg-[#2a5346] sm:text-[15px]"
              >
                Subscribe
                <ArrowRight className="size-4" />
              </button>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CommunityAction;
