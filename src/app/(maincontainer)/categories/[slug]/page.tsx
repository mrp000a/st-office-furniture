import type { Metadata, ResolvingMetadata } from "next";
// import AProductPage from "./ProductPage";
import { coreInfo } from "@/components/data/core";
import { Category } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getImageUrlProduct } from "@/lib/getImageUrl";
import ProductsNotFound from "@/components/common/not-found-pages/products-not-found";
import CategoryClient from "./CategoriesClient";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  // fetch data
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL_SITE}/api/categories/category?name=${slug}`,
  ).then((res) => res.json());

  const product: Category = data.result;

  if (!product) {
    return { title: `Category Not Found | ${coreInfo.name}` };
  }

  const productImage: string = getImageUrlProduct(product.image);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const cleanDescription =
    product.description?.substring(0, 155) ??
    "Shop By Category | St Office Furniture ";

  const pageUrl = `${process.env.NEXT_PUBLIC_URL_SITE}/categories/${slug}`;

  return {
    title: `${product.name.toUpperCase()} | ${coreInfo.name}`,
    description: cleanDescription,
    keywords: [
      product.name,
      "St office furniture",
      "office furniture",
      "buy office chair",
      "ST office",
    ],
    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: `${product.name} | ${coreInfo.name}`,
      description: cleanDescription,
      url: pageUrl,
      siteName: coreInfo.name,
      type: "website",
      images: [
        {
          url: productImage,
          width: 1000,
          height: 1000,
          alt: product.name,
        },
        ...previousImages,
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${coreInfo.name}`,
      description: cleanDescription,
      images: [productImage],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slug: category } = await params;

  if (!category) return null;
  const paramsSearch = await searchParams;

  const search = paramsSearch.search ?? "";
  // const category = paramsSearch.category ?? "";
  const page = Number(paramsSearch.page ?? 1);

  const totalProducts = await prisma.product.count({
    where: {
      ...(search
        ? {
            title: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),

      ...(category
        ? {
            category: { name: { equals: category } },
          }
        : {}),
    },
  });

  const PRODUCTS_PER_PAGE = 30;

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  

  // main data
  const products = await prisma.product.findMany({
    where: {
      category: { name: category },
      ...(search
        ? {
            title: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    },

    include: {
      _count: {
        select: {
          descriptions: true,
          reviews: true,
          orderItems: true,
          cartItems: true,
        },
      },

      category: true,
    },

    skip: (page - 1) * PRODUCTS_PER_PAGE,
    take: PRODUCTS_PER_PAGE,

    orderBy: {
      createdAt: "desc",
    },
  });

  const productIds = products.map((product) => product.id);

  const reviewAverages = await prisma.proReview.groupBy({
    by: ["productId"],
    where: {
      productId: {
        in: productIds,
      },
    },
    _avg: {
      rating: true,
    },
  });

  const averageMap = new Map(
    reviewAverages.map((item) => [item.productId, item._avg.rating ?? 0]),
  );

  const productsWithRating = products.map((product) => ({
    ...product,
    averageRating: averageMap.get(product.id) ?? 0,
    price: Number(product.price),
    discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
    discount: product.discount ? Number(product.discount) : null,
  }));

  const Categorysend = await prisma.category.findUnique({
    where: {
      name: category,
    },

    include: {
      _count: true,
      // products: true,
    },
  });

  if (!Categorysend) return <ProductsNotFound />;

  return (
    <>
      <CategoryClient
        category={Categorysend}
        products={productsWithRating}
        totalPages={totalPages}
        currentPage={page}
      />
    </>
  );
}
