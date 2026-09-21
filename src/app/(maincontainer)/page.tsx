import MessageForm from "@/components/common/forms/messageForm";
import { FinalCTA } from "@/components/pri-sections/finalCTA";
import { ReviewsSection } from "@/components/pri-sections/reviews";
import { StatsSection } from "@/components/pri-sections/Stats";
import { TrustStrip } from "@/components/pri-sections/TrustStrip";
import { WhySTOfficeFurniture } from "@/components/pri-sections/WhyUs";
import { WorkspaceSolutions } from "@/components/pri-sections/workspaceSol";
import FaqQuestion from "@/components/sections/faq";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HeroSectionA from "@/components/sections/HeroSectionA";
import NewArivalsProducts from "@/components/sections/NewArrival";
import SpecialCategories from "@/components/sections/SpecialCategories";

import React from "react";

const Page = () => {
  return (
    <div className="w-full  mx-auto">
      <HeroSectionA />
      <FeaturedProducts />
      <SpecialCategories />
      <TrustStrip />
      <WhySTOfficeFurniture />
      <StatsSection />
      <WorkspaceSolutions />
      <NewArivalsProducts />
      <ReviewsSection />
      <FaqQuestion />
      <div className="max-w-5xl mx-auto p-4">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-9 bg-primary" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Any other queries
          </span>
        </div>
        <MessageForm />
      </div>
      <FinalCTA />
    </div>
  );
};

export default Page;
