import AccessoriesProducts from "@/components/sections/ChairAccessories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HeroSectionA from "@/components/sections/HeroSectionA";
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
    </div>
  );
};

export default Home;
