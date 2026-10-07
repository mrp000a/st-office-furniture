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
import { Hero } from "@/components/pri-sections/home-hero-anim";
import { Hero2 } from "@/components/pri-sections/home-hero-2";

const Page = () => {
  return (
    <div className="mx-auto w-full">
      {/* <Hero2 products={[{ id: 122, price: 223, title: "Product", images: [""] }, { id: 12, price: 223, title: "Product", images: [""] }, { id: 129, price: 223, title: "Product", images: [""] },]} /> */}
      <Hero />
      {/* <HeroSectionA /> */}
      <FeaturedProducts />
      <SpecialCategories />
      <TrustStrip />
      <WhySTOfficeFurniture />
      <StatsSection />
      <WorkspaceSolutions />
      <NewArivalsProducts />
      <ReviewsSection />
      <div className="bg-violet-primary/20 py-6">
        <div className="mb-5 text-center">
          <span className="text-green-primary text-xs font-bold tracking-[0.2em] uppercase">
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
