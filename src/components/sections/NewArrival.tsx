// FeaturedProducts.tsx - Server Component
import { getFeaturedProducts } from "@/lib/dbApis/product";
import { filterProductType } from "../data/core";
import ProductsSections from "./productsSection";

// import { getProducts } from "@/lib/api";

const NewArivalsProducts = async () => {
  const filterOption: filterProductType = {
    limit: 10,
    order: "desc",
    category: "",
  };

  const featuredProducts = await getFeaturedProducts({
    category: filterOption.category,
    limit: filterOption.limit,
    order: filterOption.order,
    inStock: true, revalidate: 3,
  });
  // console.log(data);

  if (featuredProducts.length === 0) {
    return <></>;
  }

  return (
    <ProductsSections
      products={featuredProducts}
      title="New Arrivals"
      href={`/products?category=${filterOption.category}`}
      icon="star"
    />
  );
};

export default NewArivalsProducts;
