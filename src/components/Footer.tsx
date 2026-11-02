import { Camera, Leaf, Mail, MapPin, Network, UserRound } from "lucide-react";

const footerLinkGroups = [
  {
    heading: "Explore",
    links: [
      { label: "Upcoming events", href: "#upcoming-events" },
      { label: "Create an event", href: "#create-event" },
      { label: "Joined events", href: "#joined-events" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Our impact", href: "#our-impact" },
      { label: "Your profile", href: "#your-profile" },
      { label: "Organizer tools", href: "#organizer-tools" },
    ],
  },
];

const socialLinks = [
  { icon: Camera, label: "Instagram", href: "#instagram" },
  { icon: UserRound, label: "Facebook", href: "#facebook" },
  { icon: Network, label: "LinkedIn", href: "#linkedin" },
];

const Footer = () => {
  return (
    <footer className="bg-[#17281f]">
      <div className="mx-auto max-w-360 px-6 pt-16 pb-8 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#4b8b5f] text-white">
                <Leaf className="size-5" />
              </span>
              <span className="text-[22px] font-semibold tracking-tight text-white">
                Kindora
              </span>
            </a>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-[#b9c8bd]">
              Bringing neighbors together to build healthier, kinder and more
              resilient communities.
            </p>
            <div className="mt-6 flex items-center gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-[#b9c8bd] transition-colors hover:text-white"
                >
                  <social.icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {footerLinkGroups.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="text-[15px] font-semibold text-white">
                {group.heading}
              </h3>
              <ul className="mt-6 space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[15px] text-[#b9c8bd] transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Stay in touch
            </h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-[#b9c8bd]" />
                <a
                  href="mailto:hello@kindora.org"
                  className="text-[15px] text-[#b9c8bd] transition-colors hover:text-white"
                >
                  hello@kindora.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-[#b9c8bd]" />
                <span className="text-[15px] text-[#b9c8bd]">
                  18 Willow Street, Portland
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[#8fa397]">
            &copy; 2025 Kindora. Together we make a difference.
          </p>
          <p className="flex gap-1.5 text-[13px] text-[#8fa397]">
            <a href="#privacy" className="transition-colors hover:text-white">
              Privacy
            </a>
            {" - "}
            <a href="#terms" className="transition-colors hover:text-white">
              Terms
            </a>
            {" - "}
            <a href="#accessibility" className="transition-colors hover:text-white">
              Accessibility
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
