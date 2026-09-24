import {
  ProductDefaultImage,
  ProfileDefaultImage,
} from "@/components/data/core";

export function getImageUrl(image?: string | null) {
  if (!image) {
    return `${process.env.NEXT_PUBLIC_URL_R2}/${ProfileDefaultImage}`;
  }

  if (image.startsWith("r2upload/")) {
    return `${process.env.NEXT_PUBLIC_URL_R2}/${image}`;
  }

  return image;
}

export function getImageUrlProduct(image?: string | null) {
  if (!image) {
    return `${process.env.NEXT_PUBLIC_URL_R2}/${ProductDefaultImage}`;
  }

  if (image.startsWith("r2upload/")) {
    return `${process.env.NEXT_PUBLIC_URL_R2}/${image}`;
  }

  return image;
}
