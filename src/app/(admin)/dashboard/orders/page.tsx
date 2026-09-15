import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import { OrderStatus } from "@/generated/prisma";
import PageOrders from "./pageOrders";

type Props = {
  searchParams: Promise<{
    search?: string;
    status?: OrderStatus;
    page?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status ?? "";
  const page = Number(params.page ?? 1);

  const totalProducts = await prisma.order.count({
    where: {
      ...(search
        ? {
            receiverName: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),

      ...(status
        ? {
            status: { equals: status },
          }
        : {}),
    },
  });

  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const products = await prisma.order.findMany({
    where: {
      ...(search
        ? {
            receiverName: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),

      ...(status
        ? {
            status: { equals: status },
          }
        : {}),
    },

    include: {
      _count: {
        select: {
          items: true,
        },
      },

      user: true,
    },

    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,

    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    subtotal: Number(product.subtotal),
    discountAmount: product.discountAmount
      ? Number(product.discountAmount)
      : null,
    total: product.total ? Number(product.total) : null,
    shippingCost: product.shippingCost ? Number(product.shippingCost) : null,
    paidAmount: product.paidAmount ? Number(product.paidAmount) : null,
  }));

  return (
    <PageOrders
      orders={serializedProducts}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}

export const metadata: Metadata = {
  title: `Admin Orders | ${coreInfo.name}`,
  description: coreInfo.description,
};
