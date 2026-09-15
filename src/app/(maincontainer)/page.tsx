import MessageForm from "@/components/common/messageForm";
import AccessoriesProducts from "@/components/sections/ChairAccessories";
import FaqQuestion from "@/components/sections/faq";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HeroSectionA from "@/components/sections/HeroSectionA";
import Imagegallery from "@/components/sections/imagegallery";
import SpecialCategories from "@/components/sections/SpecialCategories";
import VisitorsChair from "@/components/sections/VisitorsChair";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col gap-3 p-1 w-full">
      <HeroSectionA />
      <FeaturedProducts />
      <VisitorsChair />
      <SpecialCategories />
      <AccessoriesProducts />
      {/* <FeaturedProducts /> */}
      <Imagegallery />
      <div className="flex-1 flex items-stretch gap-2 max-w-384 bg-background w-full mx-auto flex-col lg:flex-row">
        <div className="flex-1 h-full bg-background">
          <FaqQuestion />
        </div>
        <div className="flex-1 h-full ">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
