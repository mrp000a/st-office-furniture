"use client";
import {
  InputErrorMessage,
  NoItemsFound,
} from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { deleteFile, getCategories, uploadFile } from "@/lib/api";
import { CirclePlus, Info, Loader } from "lucide-react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { validateImageFile } from "@/lib/image-upload-limits";

import { useParams, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { ProductFormData, AdminProductItem } from "@/lib/formDataTypes";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoReload } from "react-icons/io5";
import Link from "next/link";
import { MdOutlineSave } from "react-icons/md";
import { ProductDescription } from "@/generated/prisma";
import { getImageUrlProduct } from "@/lib/getImageUrl";

const PageEditProduct = ({
  // productCode,
  setOpenDialog,
}: {
  // productCode: string | null;
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { id } = useParams();
  const router = useRouter();
  const [productCode, setProductCode] = useState<string | string[] | null>(
    id ?? null,
  );
  const [item, setItem] = useState<
    (AdminProductItem & { descriptions: ProductDescription[] }) | null
  >(null);
  const [initialValueofItem, setInitialValueofItem] = useState<string | null>(
    null,
  );
  const [allCategories, setAllCategories] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<
    ProductFormData & { oldImages: string[]; deletedImageKeys: string[] }
  >({
    defaultValues: {
      descriptions: [{ title: "", description: "" }],
      images: [],
      oldImages: [],
      deletedImageKeys: [],
      keyFeatures: [{ value: "" }],
    },
  });

  const formValues = useWatch({ control });

  const loadProduct = useCallback(async () => {
    if (!productCode) return;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const data = await fetch(
        `/api/products/product?productCode=${productCode}`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        },
      );
      const res = await data.json();
      if (res.success) {
        setItem(res.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [productCode]);

  const loadCategories = async () => {
    const CategoriesData = await getCategories();
    if (CategoriesData.success && Array.isArray(CategoriesData.result)) {
      const formattedCategories = CategoriesData.result?.map(
        (item: { name: string; id: string }) => {
          return { name: item.name, id: item.id };
        },
      );
      setAllCategories(formattedCategories);
    }
  };

  useEffect(() => {
    const a = async () => {
      loadCategories();
    };
    a();
  }, []);

  useEffect(() => {
    const a = async () => {
      const productId = id;
      setProductCode(productId ?? null);
    };
    a();
  }, [id]);

  // set item
  useEffect(() => {
    const a = async () => {
      if (!item) return;
      reset({
        title: item?.title,
        productCode: item?.productCode,
        price: Number(item?.price),
        discount: Number(item?.discount),
        discountPrice: Number(item?.discountPrice),
        stock: Number(item?.stock),
        brand: item?.brand ?? "",
        categoryId: item?.categoryId?.toString(),
        descriptions: item?.descriptions?.map((e) => {
          return { title: e.title, description: e.description };
        }),
        oldImages: item.images,
        keyFeatures: item?.keyFeatures.map((e) => {
          return { value: e };
        }),
      });

      setInitialValueofItem(JSON.stringify({
        title: item?.title,
        productCode: item?.productCode,
        price: Number(item?.price),
        discount: Number(item?.discount),
        discountPrice: Number(item?.discountPrice),
        stock: Number(item?.stock),
        brand: item?.brand ?? "",
        categoryId: item?.categoryId?.toString(),
        descriptions: item?.descriptions?.map((e) => {
          return { title: e.title, description: e.description };
        }),
        oldImages: item.images,
        keyFeatures: item?.keyFeatures.map((e) => {
          return { value: e };
        }),
      }));
    };
    a();
  }, [item, reset]);

  useEffect(() => {
    const a = async () => {
      loadProduct();
    };
    a();
  }, [loadProduct]);

  // array fields
  const {
    fields: descriptionsFields,
    append: appendDescriptionsField,
    remove: removeDescriptionsField,
  } = useFieldArray({
    control,
    name: "descriptions",
  });
  const {
    fields: keyFeaturesFields,
    append: appendKeyFeaturesField,
    remove: removekeyFeaturesField,
  } = useFieldArray({
    control,
    name: "keyFeatures",
  });
  const {
    fields: imageFields,
    append: appendImageField,
    remove: removeImageField,
  } = useFieldArray({
    control,
    name: "images",
  });

  const removeExistingImage = (index: number) => {
    const imageKey = getValues(`oldImages.${index}`);

    // Keep track of the R2 object that needs deletion
    const dik = getValues("deletedImageKeys") ?? [];

    setValue("deletedImageKeys", [...dik, imageKey]);

    // Remove it from what the user sees
    const images = getValues("oldImages") ?? [];

    setValue(
      "oldImages",
      images.filter((_, i) => i !== index),
    );
  };

  const handleSubmitData = async (
    data: ProductFormData & { oldImages: string[]; deletedImageKeys: string[] },
  ) => {
    const {
      title,
      productCode,
      images,
      oldImages,
      deletedImageKeys,

      brand,
      keyFeatures,
      descriptions,

      price,
      discountPrice,
      discount,

      stock,
      categoryId,
    } = data;

    if (!productCode || !item?.id) {
      toast.error("Can't get Product Code and Id!", {
        description: "Something went wrong. Please try again!",
      });
      return;
    }

    const imageFilesString: string[] = [];
    const keyFeaturesStrings: string[] = [];

    for (const image of oldImages) {
      if (image) {
        imageFilesString.push(image);
      }
    }

    keyFeatures?.forEach((item) => keyFeaturesStrings.push(item.value));

    if (images && images.length > 0) {
      for (const imageFile of images) {
        const file = imageFile.file?.[0];
        if (file) {
          const fileUploadData = await uploadFile(file, "r2upload/products/images");

          if (fileUploadData.success && fileUploadData.key) {
            imageFilesString.push(fileUploadData.key);
          }
        }
      }
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: item?.id,
      title,
      productCode,
      images: imageFilesString,

      brand,
      keyFeatures: keyFeaturesStrings,
      descriptions,

      price,
      discountPrice,
      discount,

      stock,
      categoryId,
    });

    const res = await fetch("/api/products", {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const UpdateProduct = await res.json();
    if (UpdateProduct.success) {
      if (deletedImageKeys && deletedImageKeys.length > 0) {
        for (const e of deletedImageKeys) {
          if (!e) return;
          await deleteFile(e);
        }
      }
      toast.success("Your Product updated successfully!", {
        description: new Date().toDateString(),
        action: {
          label: "View now!",
          onClick: () => {
            router.push(`/products/${productCode}`);
          },
        },
      });

      // router.push("/dashboard/products");
      router.refresh();
      const timer = setTimeout(() => {
        router.back();
        clearTimeout(timer);
      }, 500);
    } else {
      toast.error(UpdateProduct.message ?? "Error on product adding!");
    }
  };

  return (
    <div className="min-h-[calc(100vh - 300px)] flex-center w-full flex-col space-y-1">
      <div className="box-border flex w-full flex-wrap items-center justify-between">
        <h2 className="font-mono text-2xl font-bold">Products</h2>
        <div className="flex flex-wrap items-center gap-1">
          <Button variant={"default"} asChild>
            <Link href={"/dashboard/products/add"}>
              <CirclePlus /> <span>Add </span>
            </Link>
          </Button>
          <Button variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr />
      <div className="w-full">
        <h3 className="text-lg font-semibold">Edit Product</h3>
      </div>
      {productCode && item ? (
        <div className="w-full rounded-md">
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="flex flex-col gap-2">
              {/* sec1  title  and code */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                  <label htmlFor="title">Title:</label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter Product Title"
                    {...register("title", {
                      required: {
                        value: true,
                        message: "Title is Required!",
                      },
                    })}
                  />
                  {errors?.title && (
                    <InputErrorMessage>
                      {errors.title?.message}
                    </InputErrorMessage>
                  )}
                </div>
                <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                  <label htmlFor="code">Product Code:</label>
                  <Input
                    disabled
                    id="code"
                    type="text"
                    placeholder="Enter Product Code"
                    {...register("productCode", {
                      required: {
                        value: true,
                        message: "Product Code is Required!",
                      },
                      pattern: {
                        // RegEx strictly allowing letters, numbers, and hyphens
                        value: /^[a-zA-Z0-9-_]+$/,
                        message:
                          "Only letters, numbers, and hyphens are allowed",
                      },
                    })}
                  />
                  {errors?.productCode && (
                    <InputErrorMessage>
                      {errors.productCode.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>

              {/* sec2 --- category & brand  */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                  <label htmlFor="batchId">Select Product Category:</label>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <Combobox
                        value={field.value ?? ""}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        items={allCategories}
                      >
                        <ComboboxInput placeholder="Select Category" />

                        <ComboboxContent className="">
                          <ComboboxEmpty>No category found.</ComboboxEmpty>

                          <ComboboxList className={"z-50"}>
                            {(item) => (
                              <ComboboxItem key={item.id} value={item.id}>
                                <div className="flex items-center gap-2">
                                  <span>{item.id}</span>
                                  <span>-</span>
                                  <span>{item.name}</span>
                                </div>
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    )}
                  />
                  {errors?.categoryId && (
                    <InputErrorMessage>
                      {errors.categoryId.message}
                    </InputErrorMessage>
                  )}
                </div>
                <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                  <label htmlFor="brand">Brand:</label>
                  <Input
                    placeholder="Enter Brand Name"
                    type="text"
                    id="brand"
                    {...register("brand", {
                      maxLength: {
                        value: 50,
                        message: "Max 50 characters!",
                      },
                    })}
                  />
                  {errors?.brand && (
                    <InputErrorMessage>
                      {errors.brand.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>

              {/* sec 3 -- images and key features */}
              <div className="box-border flex w-full flex-col items-start gap-4 sm:flex-row">
                <div className="flex w-full flex-1 flex-col items-start justify-between space-y-1">
                  <div className="flex-center gap-3">
                    <label htmlFor="image">Images:</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button type="button" size={"sm"} variant="outline">
                          <Info />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start">
                        <PopoverHeader>
                          <PopoverTitle>Image Validation</PopoverTitle>
                          <PopoverDescription>
                            Max size 500kb. Allowed types: jpg, jpeg, png, webp.
                          </PopoverDescription>
                        </PopoverHeader>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="w-full space-y-1 rounded-md border p-1">
                    <div className="">
                      {/* item &&
                      item.images &&
                      item.images.length > 0 &&
                      item.images */}
                      {formValues.oldImages &&
                        formValues.oldImages.length > 0 &&
                        formValues.oldImages.map((item, index) => (
                          <div
                            className="flex flex-wrap items-center justify-between gap-2"
                            key={index}
                          >
                            <div className="relative h-8 w-8">
                              <Image
                                unoptimized
                                fill
                                src={getImageUrlProduct(item)}
                                alt=""
                                className="object-cover"
                              />
                            </div>
                            <div className="line-clamp-1 flex-1">{item}</div>

                            <Button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="bg-green-primary flex items-center gap-1"
                            >
                              <RiDeleteBinFill />
                              {/* <span>Delete</span> */}
                            </Button>
                          </div>
                        ))}
                    </div>
                    {imageFields.map((item, index) => (
                      <div key={index} className="w-full">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            className="text-gray-primary block w-full rounded-md text-sm outline file:mr-2 file:rounded-full file:border file:p-1 file:px-2 file:text-xs"
                            placeholder="Upload Image"
                            accept="image/jpeg,image/png,image/webp"
                            id={`title-${index}`}
                            type="file"
                            {...register(`images.${index}.file` as const, {
                              required: "An image file is required",
                              validate: (files) => {
                                const file = files?.[0];
                                if (!file) return true;
                                return (
                                  validateImageFile(
                                    file,
                                    "r2upload/products/images",
                                  ) ?? true
                                );
                              },
                            })}
                          />
                          <Button
                            type="button"
                            onClick={() => removeImageField(index)}
                            variant={"default"}
                            className="bg-green-primary"
                          >
                            <RiDeleteBinFill />
                          </Button>
                        </div>
                        {errors.images?.[index]?.file && (
                          <InputErrorMessage>
                            {errors.images?.[index]?.file?.message}
                          </InputErrorMessage>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    onClick={() => appendImageField({ file: null })}
                    variant={"default"}
                    className="bg-gray-primary"
                  >
                    <CirclePlus /> Add More
                  </Button>
                </div>
                <div className="flex w-full flex-1 flex-col items-start justify-between space-y-1">
                  <label htmlFor="role">Key Features:</label>
                  <div className="w-full space-y-1 rounded-md border p-1">
                    {keyFeaturesFields.map((item, index) => (
                      <div key={index} className="w-full">
                        <div className="flex items-center justify-between gap-2">
                          <Input
                            className="text-gray-primary block w-full text-sm file:mr-2 file:rounded-full file:border file:p-1 file:px-2 file:text-xs"
                            placeholder="Enter Key Feature"
                            id={`title-${index}`}
                            type="text"
                            {...register(
                              `keyFeatures.${index}.value` as const,
                              {
                                required: {
                                  value: true,
                                  message: "Key Features is required!",
                                },
                                maxLength: {
                                  value: 100,
                                  message: "Max 100 characters!",
                                },
                              },
                            )}
                          />
                          <Button
                            type="button"
                            onClick={() => removekeyFeaturesField(index)}
                            variant={"default"}
                            className="bg-green-primary"
                          >
                            <RiDeleteBinFill />
                          </Button>
                        </div>
                        {errors.keyFeatures?.[index]?.value && (
                          <InputErrorMessage>
                            {errors.keyFeatures?.[index]?.value?.message}
                          </InputErrorMessage>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    onClick={() => appendKeyFeaturesField({ value: "" })}
                    variant={"default"}
                    className="bg-gray-primary"
                  >
                    <CirclePlus /> Add More
                  </Button>
                </div>
              </div>

              {/* sec4 - descriptions  */}
              <div className="grid-cols-1 items-start gap-3 space-y-1">
                <label htmlFor="description">Descriptions:</label>
                <div className="w-full space-y-1 rounded-md border p-1">
                  {descriptionsFields.map((item, index) => (
                    <div key={index}>
                      <div className="flex flex-col items-start justify-between gap-1 sm:flex-row">
                        <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                          <Input
                            id={`title-${index}`}
                            placeholder="Enter title"
                            {...register(
                              `descriptions.${index}.title` as const,
                              {
                                required: {
                                  value: false,
                                  message: "Description Title is required!",
                                },
                                maxLength: {
                                  value: 100,
                                  message: "Up to 100 character!",
                                },
                              },
                            )}
                          />
                          {errors.descriptions?.[index]?.title && (
                            <InputErrorMessage>
                              {errors.descriptions?.[index]?.title?.message}
                            </InputErrorMessage>
                          )}
                        </div>
                        <div
                          className="grid w-full flex-1 grid-cols-1 space-y-1"
                          key={index}
                        >
                          <Textarea
                            id="description"
                            className="max-h-28"
                            placeholder="Enter Description..."
                            {...register(
                              `descriptions.${index}.description` as const,
                              {
                                required: {
                                  value: false,
                                  message: "Description is required!",
                                },
                              },
                            )}
                          />
                          {errors.descriptions?.[index]?.description && (
                            <InputErrorMessage>
                              {
                                errors.descriptions?.[index]?.description
                                  ?.message
                              }
                            </InputErrorMessage>
                          )}
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeDescriptionsField(index)}
                          variant={"default"}
                          className="bg-green-primary max-sm:self-end"
                        >
                          <RiDeleteBinFill />
                        </Button>
                      </div>
                      <hr className="bg-gray-secondary/80 my-2 p-[0.5px] sm:hidden" />
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    appendDescriptionsField({ title: "", description: "" })
                  }
                  variant={"default"}
                  className="bg-gray-primary"
                >
                  <CirclePlus /> Add More
                </Button>
              </div>

              {/* sec 5 --- price & discount price */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                  <label htmlFor="price">Price:</label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter Price"
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Price is Required!",
                      },
                    })}
                  />
                  {errors?.price && (
                    <InputErrorMessage>
                      {errors.price?.message}
                    </InputErrorMessage>
                  )}
                </div>
                <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                  <label htmlFor="discountPrice">Discount Price:</label>
                  <Input
                    id="discountPrice"
                    type="number"
                    placeholder="Enter Discount Price"
                    {...register("discountPrice", {
                      required: {
                        value: false,
                        message: "Discount Price is Required!",
                      },
                    })}
                  />
                  {errors?.discountPrice && (
                    <InputErrorMessage>
                      {errors.discountPrice?.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>

              {/* sec 6 --- discount & stock */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                  <label htmlFor="discount">Discount:</label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="Enter Discount"
                    {...register("discount", {
                      required: {
                        value: false,
                        message: "Discount is Required!",
                      },
                    })}
                  />
                  {errors?.discount && (
                    <InputErrorMessage>
                      {errors.discount?.message}
                    </InputErrorMessage>
                  )}
                </div>
                <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                  <label htmlFor="stock">Stock:</label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="Enter Product Stock"
                    {...register("stock", {
                      required: {
                        value: true,
                        message: "Product Stock is Required!",
                      },
                    })}
                  />
                  {errors?.stock && (
                    <InputErrorMessage>
                      {errors.stock?.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-wrap justify-end gap-3 pt-4">
              <Button
                onClick={() => setOpenDialog && setOpenDialog(false)}
                variant="outline"
                type="button"
                size={"lg"}
              >
                Cancel
              </Button>
              <Button
                disabled={
                  isSubmitting ||
                  initialValueofItem === JSON.stringify(formValues)
                }
                type="submit"
                size={"lg"}
              >
                {isSubmitting && (
                  <span className="animate-spin">
                    <Loader />
                  </span>
                )}
                <MdOutlineSave />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <NoItemsFound />
      )}
    </div>
  );
};

export default PageEditProduct;
