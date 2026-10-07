// src/lib/data/products.ts

import "server-only";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

type GetFeaturedProductsOptions = {
    limit?: number;
    searchString?: string;
    category?: string;
    inStock?: boolean;
    order?: "asc" | "desc";
    revalidate?: number;
    isFeatured?: boolean
    isPopular?: boolean
};

export async function getFeaturedProducts({
    limit = 10,
    revalidate = 600,
    category,
    inStock,
    order = "desc",
    searchString,
    isFeatured = false,
    isPopular = false,
}: GetFeaturedProductsOptions) {
    const getCachedProducts = unstable_cache(
        async () => {
            const products = await prisma.product.findMany({
                take: limit,

                where: {
                    AND: [
                        searchString
                            ? {
                                title: {
                                    contains: searchString,
                                    mode: "insensitive",
                                },
                            }
                            : {},

                        category
                            ? {
                                category: {
                                    name: {
                                        contains: category,
                                        mode: "insensitive",
                                    },
                                },
                            }
                            : {},

                        inStock
                            ? {
                                stock: {
                                    gt: 0,
                                },
                            }
                            : {},
                        isFeatured
                            ? {
                                isFeatured: true
                            }
                            : {},
                        isPopular
                            ? {
                                isPopular: true
                            }
                            : {},
                    ],
                },

                include: {
                    _count: true,
                    category: true,
                },

                orderBy: {
                    createdAt: order,
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
                reviewAverages.map(
                    (item) => [item.productId, item._avg.rating ?? 0],
                ),
            );

            return products.map((product) => ({
                ...product,

                averageRating:
                    averageMap.get(product.id) ?? 0,

                price: Number(product.price),

                discountPrice: product.discountPrice
                    ? Number(product.discountPrice)
                    : null,

                discount: product.discount
                    ? Number(product.discount)
                    : null,
            }));
        },

        [
            "featured-products",
            category ?? "all",
            searchString ?? "all",
            String(limit),
            String(inStock),
            String(isFeatured),
            String(isPopular),
            order,
        ],

        {
            revalidate,
        },
    );

    return getCachedProducts();
}