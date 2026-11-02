import { Globe, Search, Sparkles, Users } from "lucide-react";

const stats = [
  { value: "1,240+", label: "Total Events" },
  { value: "12.8k", label: "Active Volunteers" },
  { value: "86", label: "Communities Reached" },
  { value: "94%", label: "Successful Initiatives" },
];

const features = [
  {
    number: "01",
    icon: Search,
    title: "Discover events",
    description:
      "Find thoughtful local initiatives that match your interests, schedule and values.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Create initiatives",
    description:
      "Turn a meaningful idea into an organized event with practical tools and support.",
  },
  {
    number: "03",
    icon: Users,
    title: "Join volunteers",
    description:
      "Meet neighbors who care about the same causes and build lasting connections.",
  },
  {
    number: "04",
    icon: Globe,
    title: "Track impact",
    description:
      "See the real-world difference your time and collective effort make over time.",
  },
];

const WorksKindora = () => {
  return (
    <div>
      {/* Stats strip */}
      <section className="bg-[#1f3d33]">
        <div className="mx-auto mt-16 grid max-w-360 grid-cols-2 gap-y-8 px-6 py-10 sm:px-10 lg:grid-cols-4 lg:px-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center gap-1 ${
                index > 0 ? "lg:border-l lg:border-white/15" : ""
              }`}
            >
              <p className="text-[28px] font-bold text-white">{stat.value}</p>
              <p className="text-xs font-medium tracking-[0.18em] text-[#a9bdb2] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How Kindora works */}
      <section className="bg-[#f2f0e6]">
        <div className="mx-auto max-w-360 px-6 py-20 sm:px-10 lg:px-16">
          <p className="text-xs font-bold tracking-[0.22em] text-[#2e7d6f] uppercase">
            How Kindora works
          </p>
          <h2 className="mt-5 max-w-xl text-[44px] leading-[1.1] font-semibold tracking-tight text-[#1f3d33] sm:text-[52px]">
            Good intentions, made actionable.
          </h2>
          <p className="mt-5 text-lg text-[#5d6d64]">
            Everything you need to move from an idea to meaningful community
            impact.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-2xl border border-[#e3e1d4] bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#dfe8d8] text-[#3e7c5b]">
                    <feature.icon className="size-6" />
                  </span>
                  <span className="text-sm font-medium text-[#8a958c]">
                    {feature.number}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#1f3d33]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#5d6d64]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorksKindora;
