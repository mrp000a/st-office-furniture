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
import SendMessageContact from "./(otherpages)/contact/comp/sendMessageContact";

const Page = () => {
  return (
    <div className="w-full  mx-auto">
      <HeroSectionA />
      <FeaturedProducts />
      {/* <SpecialCategories /> */}
      <TrustStrip />
      <WhySTOfficeFurniture />
      <StatsSection />
      <WorkspaceSolutions />
      <NewArivalsProducts />
      <ReviewsSection />
      <div className="py-6 bg-violet-primary/20">
        <div className="text-center mb-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-primary">
            FAQ
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <FaqQuestion />
      </div>
      <SendMessageContact />
      <FinalCTA />
    </div>
  );
};

export default Page;
