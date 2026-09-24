"use client";

import Image from "next/image";
import {
  ChevronRight,
  Edit,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "@/generated/prisma";
import SearchLayout from "@/components/common/searchLayout";
import { BiCategory } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import PageAddCategory from "../_dash_components/common/addCategory";
import PaginationLayout from "@/components/common/paginationLayout";
import { deleteCategories } from "@/lib/api";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoReload } from "react-icons/io5";
import { getImageUrlProduct } from "@/lib/getImageUrl";

// const categories = [
//   {
//     id: 1,
//     name: "Office Chairs",
//     description:
//       "Ergonomic and comfortable chairs designed for modern office workspaces.",
//     image: "/images/categories/office-chair.jpg",
//     products: 24,
//   },
//   {
//     id: 2,
//     name: "Executive Chairs",
//     description:
//       "Premium executive chairs with stylish designs and superior comfort.",
//     image: "/images/categories/executive-chair.jpg",
//     products: 12,
//   },
//   {
//     id: 3,
//     name: "Visitor Chairs",
//     description:
//       "Comfortable and durable chairs for visitors, reception areas and meetings.",
//     image: "/images/categories/visitor-chair.jpg",
//     products: 18,
//   },
//   {
//     id: 4,
//     name: "Gaming Chairs",
//     description:
//       "High-performance chairs designed for gaming, streaming and long sessions.",
//     image: "/images/categories/gaming-chair.jpg",
//     products: 9,
//   },
//   {
//     id: 5,
//     name: "Sofas",
//     description:
//       "Modern sofas suitable for offices, lounges, waiting areas and receptions.",
//     image: "/images/categories/sofa.jpg",
//     products: 15,
//   },
//   {
//     id: 6,
//     name: "Chair Accessories",
//     description:
//       "Useful accessories and replacement parts for office and executive chairs.",
//     image: "/images/categories/accessories.jpg",
//     products: 21,
//   },
// ];

export default function CategoriesPageClient({
  categories,
  currentPage,
  totalPages,
  totalItems,
}: {
  categories: (Category & { _count: { products: number } })[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const { confirm } = useAlertDialog();
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false);
  // const [categories, setCategories] = useState<Category[] | null>(null);
  const [editCategoryData, setEditCategoryData] = useState<{
    name: string;
    description?: string | undefined;
    imageString: string;
    id: number;
  } | null>(null);

  return (
    <div className="w-full space-y-6 p-3">
      {/* Header */}
      <div className="flex gap-4 flex-wrap items-center justify-between w-full">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="h-4 w-4" />
            <span>Administration</span>
            <ChevronRight className="h-4 w-4" />
            <span>Categories</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Categories</h1>

            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {totalItems}
            </span>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Organize your products into categories.
          </p>
        </div>

        {/* Add Category */}
        <div className="flex items-center gap-2">
          <div className="w-full flex-1">
            <SearchLayout />
          </div>
          <Button
            onClick={() => setOpenAddCategory((e) => !e)}
            variant={"default"}
          >
            <Plus className="size-4" />
            Add
          </Button>
          <Button onClick={() => router.refresh()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>

      {/* Search / Filter */}
      {/* <div className="flex  items-center gap-3  w-full">
        <div className="w-full flex-1">
          <SearchLayout />
        </div>

        <div className="flex  flex-row  h-10 items-center gap-2 rounded-lg border bg-background px-4 text-sm text-muted-foreground">
          <FolderOpen className="size-4" />
          <span className="text-nowrap">{categories.length} Categories</span>
        </div>
      </div> */}

      {/* Category Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map(
          ({ id, name, description, _count, createdAt, image, updatedAt }) => (
            <div
              key={id}
              className="group overflow-hidden rounded-xl bg-violet-primary/5 border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                {image ? (
                  <Image
                    src={getImageUrlProduct(image)}
                    alt={image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  //   <div>{image}</div>
                  <BiCategory className="h-full w-full" />
                )}

                {/* Product Count */}
                <div className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur">
                  {_count.products} products
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{name}</h2>

                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                      {description}
                    </p>

                    <div className="text-xs text-gray-primary">
                      {new Date(createdAt).toDateString()}
                    </div>
                  </div>

                  {/* More */}
                  <button
                    type="button"
                    title="More options"
                    className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t pt-3">
                  <Button
                    onClick={() => {
                      setEditCategoryData({
                        name,
                        id,
                        description: description ?? "",
                        imageString: image ?? "",
                      });
                      setOpenEditCategory(true);
                    }}
                    className="flex-1"
                    variant={"outline"}
                  >
                    <Edit className="size-3.5" />
                    Edit
                  </Button>
                  <Button
                    onClick={async () => {
                      const a = await confirm({
                        title: "This action can't be undone!",
                        description: "Are you sure? Delete the category",
                      });
                      if (!a) return;
                      await deleteCategories({ id, name });
                      router.refresh();
                    }}
                    className=" "
                    variant={"destructive"}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                  {/*<button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition hover:bg-muted"
            >
                <Edit className="size-3.5" />
                Edit
            </button>

            <button
                type="button"
                title="Delete category"
                className="flex size-8 items-center justify-center rounded-md border text-destructive transition hover:bg-destructive/10"
            >
                <Trash2 className="size-3.5" />
            </button> */}
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <FolderOpen className="size-5 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-semibold">No categories found</h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Create your first category to start organizing your products.
          </p>

          <button
            type="button"
            className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="size-4" />
            Add Category
          </button>
        </div>
      )}

      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />

      {/* all dialogs  */}
      <>
        {/* add category dialog */}
        <Dialog
          open={openAddCategory}
          onOpenChange={setOpenAddCategory}
          // modal={false}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Make changes to your product here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <PageAddCategory
                setOpenAddCategory={setOpenAddCategory}
                saveButtonText="Add Category"
              />
            </div>
          </DialogContent>
        </Dialog>
        {/* edit category dialog */}
        <Dialog
          open={openEditCategory}
          onOpenChange={setOpenEditCategory}
          // modal={false}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Make changes to your category here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <PageAddCategory
                isEdit={true}
                id={editCategoryData?.id}
                setOpenAddCategory={setOpenEditCategory}
                name={editCategoryData?.name}
                description={editCategoryData?.description}
                oldImage={editCategoryData?.imageString}
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}
