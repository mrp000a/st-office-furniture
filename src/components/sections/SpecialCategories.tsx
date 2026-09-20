import { getCategoriesClient } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import SpecialCategoriesClient from "./SpecialCategoriesClient";
import { Category } from "@/generated/prisma";

export default async function SpecialCategories() {
  //   const categories = await prisma.category.findMany({});
  const categoriesData: {
    success: boolean;
    result: Category[];
    message: string;
  } = await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/categories`, {
    method: "GET",
    redirect: "follow",
    next: { revalidate: 600 },
  }).then((res) => res.json());

  const categories = categoriesData.result;
  if (!categoriesData.success || categories.length === 0) return <></>;

  return <div className="w-full bg-red-primary/10 py-2"><SpecialCategoriesClient categories={categories} /></div>;
}
