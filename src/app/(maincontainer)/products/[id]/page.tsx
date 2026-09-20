import type { Metadata, ResolvingMetadata } from "next";
import AProductPage from "./ProductPage";
import {
  coreInfo,
  ProductDefaultImage,
  ProductItemType,
} from "@/components/data/core";
import { Category, Product, ProductDescription } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

type ProductCombo = ProductItemType & {
  descriptions: ProductDescription[];
  category: Category;
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL_SITE}/api/products/product?productCode=${id}`,
  ).then((res) => res.json());

  const product: Product = data.result;

  if (!product) {
    return { title: "Product Not Found | ST Office Furniture" };
  }

  const productImage: string = product.images[0] ?? ProductDefaultImage;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const cleanDescription = product.keyFeatures.join(", ").substring(0, 155);

  const pageUrl = `${process.env.NEXT_PUBLIC_URL_SITE}/products/${id}`;
  return {
    title: `${product.title} | ${coreInfo.name}`,
    description: cleanDescription,
    keywords: [
      product.title,
      product.brand ?? "St office furniture",
      "office furniture",
      "buy office chair",
      "ST office",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${product.title} | ${coreInfo.name}`,
      description: cleanDescription,
      url: pageUrl,
      siteName: coreInfo.name,
      type: "website",
      images: [
        {
          url: productImage,
          width: 800,
          height: 630,
          alt: product.title,
        },
        ...previousImages,
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ${coreInfo.name}`,
      description: cleanDescription,
      images: [productImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  // fetch data
  // const data = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL_SITE}/api/products/product?productCode=${id}`,
  // ).then((res) => res.json());

  // const product: ProductCombo = data.result;

  // if (!product) {
  //   return <></>;
  // }
  // console.log(product);

  const product = await prisma.product.findUnique({
    where: {
      productCode: id,
    },

    include: {
      category: true,
      descriptions: true,
      reviews: {
        take: 15,
        include: {
          user: {
            select: { name: true, image: true, email: true },
          },
        },
        orderBy: [{ updatedAt: "desc" }, { rating: "desc" }],
      },
      _count: true,
    },
  });

  if (!product) {
    return null;
  }

  const reviewStats = await prisma.proReview.aggregate({
    where: {
      productId: product.id,
    },

    _avg: {
      rating: true,
    },

    _count: {
      rating: true,
    },
  });

  const productWithRating = {
    ...product,
    price: Number(product.price),
    discount: Number(product.discount),
    discountPrice: Number(product.discountPrice),
    averageRating: reviewStats._avg.rating ?? 0,
    reviewCount: reviewStats._count.rating,
  };

  return (
    <>
      <AProductPage product={productWithRating} />
    </>
  );
}
