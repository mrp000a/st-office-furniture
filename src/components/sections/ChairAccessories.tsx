// FeaturedProducts.tsx - Server Component
import ProductsSections from "./productsSection";

// import { getProducts } from "@/lib/api";

const AccessoriesProducts = async () => {
  const filterOption = {
    limit: 10,
    order: "desc",
    category: "chair-accessories",
  };
  // fetch data
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL_SITE}/api/products?limit=${filterOption.limit}&order=${filterOption.order}&category=${filterOption.category}`,
    { next: { revalidate: 1 } },
  ).then((res) => res.json());

  const featuredProducts = data.result;
  // console.log(data);

  if (!data || featuredProducts.length === 0) {
    return <></>;
  }

  return (
    <ProductsSections
      products={featuredProducts}
      title="Accessories"
      href={`/products?category=${filterOption.category}`}
      icon="tools"
    />
  );
};

export default AccessoriesProducts;
