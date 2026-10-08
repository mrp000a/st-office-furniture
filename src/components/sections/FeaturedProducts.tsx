// FeaturedProducts.tsx - Server Component
import { getFeaturedProducts } from "@/lib/dbApis/product";
import { filterProductType } from "../data/core";
import ProductsSections from "./productsSection";

// import { getProducts } from "@/lib/api";

const FeaturedProducts = async () => {
  const filterOption: filterProductType = {
    limit: 10,
    order: "desc",
    category: "",
  };

  // const featuredProducts = data.result;
  const featuredProducts = await getFeaturedProducts({
    category: filterOption.category,
    limit: filterOption.limit,
    order: filterOption.order,
    isFeatured: true,
  });
  // console.log(data);

  if (featuredProducts.length === 0) {
    return <></>;
  }

  return (
    <div className="bg-violet-primary/10 w-full py-2">
      <ProductsSections
        products={featuredProducts}
        title="Featured Products"
        subTitle="Designed for better work."
        href={`/products?category=${filterOption.category}`}
        icon="star"
      />{" "}
    </div>
  );
};

export default FeaturedProducts;
