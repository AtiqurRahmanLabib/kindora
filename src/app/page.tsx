import { HeroBanner } from "@/components/site/hero-banner";
import { SiteHeader } from "@/components/site/site-header";
import WorksKindora from "@/components/WorksKindora";

export default function Home() {
  return (
    <div className="bg-[#f2f0e6] font-[family-name:var(--font-geist-sans)]">
      <SiteHeader />
      <main>
        <HeroBanner />
        <WorksKindora />
      </main>
    </div>
  );
}
