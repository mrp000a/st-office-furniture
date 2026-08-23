import type { Metadata, ResolvingMetadata } from "next";
import AProductPage from "./ProductPage";
import { coreInfo, ProductDefaultImage } from "@/components/data/core";

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

  const product = data.result;

  if (!product) {
    return { title: "Product Not Found | ST Office Furniture" };
  }

  const productImage: string = product.images[0] ?? ProductDefaultImage;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const cleanDescription = product.keyFeatures.join(", ").substring(0, 160);

  const pageUrl = `${process.env.NEXT_PUBLIC_URL_SITE}/products/{id}`;
  return {
    title: `${product.title} | ${coreInfo.name}`,
    description: cleanDescription,
    keywords: [
      product.title,
      product.brand,
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
          width: 1200,
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

export default function Page({ params, searchParams }: Props) {
  return (
    <>
      <AProductPage />
    </>
  );
}
