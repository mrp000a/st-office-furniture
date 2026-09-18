import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import PageCategoriesAdmin from "./pageCategories";
import CategoriesPageClient from "./categoriesClient";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    sort?: string;
  }>;
};

export default async function CategoriesPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search ?? "";
  const page = Number(params.page ?? 1);

  const allItems = await prisma.category.count({});
  const totalItems = await prisma.category.count({
    where: {
      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    },
  });

  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const categories = await prisma.category.findMany({
    where: {
      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    },

    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },

    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    // <PageCategoriesAdmin
    //   categories={categories}
    //   currentPage={page}
    //   totalPages={totalPages}
    // />
    <CategoriesPageClient
      key={11}
      totalItems={allItems}
      totalPages={totalPages}
      currentPage={page}
      categories={categories}
    />
  );
}

export const metadata: Metadata = {
  title: `Admin Categories | ${coreInfo.name}`,
  description: coreInfo.description,
};
