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
    <div className="flex flex-col gap-3 p-1">
      <HeroSectionA />
      <FeaturedProducts />
      <VisitorsChair />
      <SpecialCategories />
      <AccessoriesProducts />
      {/* <FeaturedProducts /> */}
      <Imagegallery />
      <FaqQuestion />
    </div>
  );
};

export default Home;
