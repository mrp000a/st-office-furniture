import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import PageUsersAdmin from "./pageUsersAdmin";

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

  const totalProducts = await prisma.user.count({
    where: {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              ...(!isNaN(Number(search))
                ? [
                    {
                      id: {
                        equals: Number(search),
                      },
                    },
                  ]
                : []),
            ],
          }
        : {}),
    },
  });

  const ITEMS_PER_PAGE = 25;

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const categories = await prisma.user.findMany({
    where: {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              ...(!isNaN(Number(search))
                ? [
                    {
                      id: {
                        equals: Number(search),
                      },
                    },
                  ]
                : []),
            ],
          }
        : {}),
    },

    include: {
      _count: {
        select: {
          orders: true,
          proReviews: true,
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
    <PageUsersAdmin
      users={categories}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}

export const metadata: Metadata = {
  title: `Admin Users | ${coreInfo.name}`,
  description: coreInfo.description,
};
