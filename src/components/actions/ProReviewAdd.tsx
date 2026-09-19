"use server";

import { prisma } from "@/lib/prisma";
import { getSession, getUserId } from "@/lib/serverAuth";

export async function ProReviewAdd({
  productId,
  rating,
  note,
}: {
  productId: number;
  rating: number;
  note?: string | null;
}) {
  try {
    const sessionPromise = getSession();
    const userId = await getUserId(sessionPromise);

    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to review this product.",
      };
    }
    console.log({ userId, productId, rating, note });
    //   return;
    if (rating < 1 || rating > 5) {
      return {
        success: false,
        message: "Rating must be between 1 and 5.",
      };
    }

    const review = await prisma.proReview.upsert({
      where: {
        userId_productId: {
          userId: Number(userId),
          productId: Number(productId),
        },
      },
      update: {
        rating: Number(rating),
        note,
      },
      create: {
        userId: Number(userId),
        productId: Number(productId),
        rating: Number(rating),
        note,
      },
    });

    return {
      success: true,
      message: "Review Added",
      data: review,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "something went wrong.",
    };
  }
}
