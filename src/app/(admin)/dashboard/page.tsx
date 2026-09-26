import React from "react";
// import ProfileHome from "./PageProduct";
import { prisma } from "@/lib/prisma";
import AdminDashboardPage from "./pageDash";

const page = async () => {
  // dashboard summary =================================================================
  const totalOrdersSum = await prisma.order.count({});
  const totalCustomerSum = await prisma.user.count({});
  const totalRevenueSum = await prisma.order.aggregate({
    where: { status: { equals: "DELIVERED" } },
    _sum: { total: true },
    _count: { _all: true },
  });
  const totalProductSum = await prisma.product.count({});

  const dashboardSummary = {
    revenue: Number(totalRevenueSum._sum.total),
    revenueGrowth: 18.6,

    orders: totalOrdersSum,
    ordersGrowth: 12.4,

    customers: totalCustomerSum,
    customersGrowth: 9.8,

    products: totalProductSum,
    productsGrowth: 5.2,

    pendingOrders: 20,
    lowStock: 9,
    outOfStock: 3,
    reviews: 42,
  };
  //   sales data
  const deliveredSalesDataRaw = await prisma.monthlyDeliveredSales.findMany({
    orderBy: { month: "desc" },
    take: 12,
  });

  // Create a lookup from database results
  const salesByMonth = new Map(
    deliveredSalesDataRaw.map((item) => {
      const date = new Date(item.month!);

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`;

      return [
        key,
        {
          order_count: Number(item.order_count ?? 0),
          total_sales: Number(item.total_sales ?? 0),
        },
      ];
    }),
  );

  // Generate the last 12 months
  const deliveredSalesData = Array.from({ length: 12 }, (_, index) => {
    const date = new Date();

    // Start from current month and go backwards
    date.setDate(1);
    date.setMonth(date.getMonth() - index);

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}`;

    const data = salesByMonth.get(key);

    return {
      month: date.toDateString().split(" ")[1],
      order_count: data?.order_count ?? 0,
      total_sales: data?.total_sales ?? 0,
    };
  }).reverse();

  //   recent orders ================================================
  const recentOrdersRaw = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  const recentOrders = recentOrdersRaw.map(
    ({
      id,
      receiverEmail,
      receiverName,
      receiverPhone,
      total,
      status,
      createdAt,
    }) => {
      return {
        id: id,
        customer: receiverName,
        email: receiverEmail ?? receiverPhone,
        amount: Number(total),
        status,
        date: createdAt.toDateString(),
      };
    },
  );

  //  products low ======================================================================
  const lowStockProductsRaw = await prisma.product.findMany({
    where: { stock: { gt: 0, lt: 20 } },
    orderBy: { stock: "asc" },
    include: {
      category: { select: { name: true } },
      _count: true,
      orderItems: {
        select: { qty: true },
        where: { order: { status: "DELIVERED" } },
      },
    },
    take: 10,
  });

  const lowStockProducts = lowStockProductsRaw.map(
    ({
      id,
      title,
      productCode,
      images,
      price,
      discountPrice,
      discount,
      orderItems,
      category,
      _count,

      stock,
    }) => {
      const totalSold = orderItems.reduce((total, item) => total + item.qty, 0);
      return {
        id: id,
        name: title,
        code: productCode,
        category: category?.name ?? "N/A",
        sold: totalSold,
        stock: stock,
        rating: _count.reviews,
        image: images[0],
        price: Number(discount ? (discountPrice ?? 0) : price),
      };
    },
  );
  //  products low ======================================================================
  const topStockProductsRaw = await prisma.topDeliveredProducts.findMany({
    take: 10,
    where: {},
    orderBy: { sold: "desc" },
  });
  const outOfStockProduct = await prisma.product.count({
    where: { stock: { equals: 0 } },
  });

  const topStockProducts = topStockProductsRaw.map((item) => {
    return {
      ...item,
      name: item.title,
      category: item.category ?? "N/A",
      rating: Number(item.rating),
      price: Number(item.price),
      image: item.image ?? "",
    };
  });

  //  order statuses ======================================================================
  const activitiesRaw = await prisma.activityLog.findMany({
    where: {
      type: {
        in: [
          "ORDER",
          "USER",
          "SYSTEM",
          "REVIEW",
          "PRODUCT",
          "CATEGORY",
          "PAYMENT",
        ],
      },
    },
    select: {
      id: true,
      type: true,
      title: true,
      description: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  //  order statuses ======================================================================
  const orderStatuses = await prisma.order.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const totalOrders = orderStatuses.reduce(
    (total, item) => total + item._count._all,
    0,
  );
  const resultOrderStatuses = orderStatuses.map((item) => {
    const count = item._count._all;

    return {
      status: item.status,
      count,
      percentage: totalOrders
        ? Number(((count / totalOrders) * 100).toFixed(2))
        : 0,
    };
  });

  return (
    <div>
      <AdminDashboardPage
        dashboardSummary={dashboardSummary}
        recentOrders={recentOrders}
        orderStatusData={resultOrderStatuses}
        salesData={deliveredSalesData}
        lowStockProducts={lowStockProducts}
        topProducts={topStockProducts}
        recentActivities={activitiesRaw}
        outOfStockProduct={outOfStockProduct}
      />
    </div>
  );
};

export default page;
