import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import PageCategoriesAdmin from "./pageMessagesAdmin";
// import PageCategoriesAdmin from "./pageCategories";

type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
    sort?: string;
  }>;
};

export default async function CategoriesPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status === "read" ? true : false;
  const page = Number(params.page ?? 1);

  const totalProducts = await prisma.message.count({
    where: {
      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
      ...(status
        ? {
            isRead: status,
          }
        : {}),
    },
  });

  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const categories = await prisma.message.findMany({
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

    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <PageCategoriesAdmin
      categories={categories}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}

export const metadata: Metadata = {
  title: `Admin Categories | ${coreInfo.name}`,
  description: coreInfo.description,
};
