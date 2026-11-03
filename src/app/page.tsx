import CommunityAction from "@/components/Home/CommunityAction";
import { HeroBanner } from "@/components/Home/hero-banner";

import WorksKindora from "@/components/Home/WorksKindora";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] bg-[#f2f0e6]">
      <main>
        <HeroBanner />
        <WorksKindora />
        <CommunityAction></CommunityAction>
      </main>
    </div>
  );
}
