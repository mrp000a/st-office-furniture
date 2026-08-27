import FeaturedProducts from "@/components/sections/FeaturedProducts";
import HeroSectionA from "@/components/sections/HeroSectionA";
import SpecialCategoriesPage from "@/components/sections/SpecialCategories";
import VisitorsChair from "@/components/sections/VisitorsChair";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col gap-3 p-1">
      <HeroSectionA />
      <FeaturedProducts />
      <VisitorsChair />
      <SpecialCategoriesPage />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
