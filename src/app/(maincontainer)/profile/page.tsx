import React from "react";
import ProfileHome from "./PageProduct";
import { prisma } from "@/lib/prisma";
import { getSession, getUserId } from "@/lib/serverAuth";

const page = async () => {
  const sessionPromise = getSession();
  const getuserid = await getUserId(sessionPromise);

  const userId = Number(getuserid);

  const userData = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      cart: { select: { _count: true } },
      orders: { take: 7, orderBy: { createdAt: "desc" } },
      _count: { select: { orders: true, proReviews: true } },
    },
  });

  const completedOrders = await prisma.order.count({
    where: { userId: userId, status: "DELIVERED" },
  });
  const pendingOrders = await prisma.order.count({
    where: {
      userId: userId,
      status: { notIn: ["CANCELLED", "DELIVERED", "RETURNED"] },
    },
  });

  const sanitizedOrders = userData?.orders.map((item) => {
    return {
      id: item.id,
      status: item.status,
      createdAt: item.createdAt,
      total: Number(item.total),
    };
  });

  return (
    <div>
      <ProfileHome
        stats={{
          completedOrders: completedOrders,
          orders: userData?._count?.orders,
          pendingOrders: pendingOrders,
          wishlist: userData?.cart?._count?.items,
        }}
        user={{
          name: userData?.name,
          address: userData?.address,
          email: userData?.email,
          createdAt: userData?.createdAt,
          gender: userData?.gender,
          id: userData?.id,
          image: userData?.image,
          phone: userData?.phone,
          role: userData?.role,
          verified: userData?.emailVerified,
        }}
        recentOrders={sanitizedOrders ?? []}
        // recentOrders={[{id, status, createdAt, orderNumber, total}]}
      />
    </div>
  );
};

export default page;
