import { prisma } from "@/lib/prisma";
import ProductsPageTest from "./productsClient";
import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import ProductsNotFound from "@/components/common/not-found-pages/products-not-found";

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search ?? "";
  const category = params.category ?? "";
  const page = Number(params.page ?? 1);

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

  const PRODUCTS_PER_PAGE = 15;

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  // main data
  const products = await prisma.product.findMany({
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

  return (
    <ProductsPageTest
      products={productsWithRating}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}

export const metadata: Metadata = {
  title: `Products | ${coreInfo.name}`,
  description: coreInfo.description,
};
