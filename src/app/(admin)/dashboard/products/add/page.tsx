"use client";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FindProductExists, getCategories, uploadFile } from "@/lib/api";
import { CirclePlus, Info, Loader, PlusSquare, Trash } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
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
import { ProductFormData } from "@/lib/formDataTypes";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { IoReload } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import { allowedTypes } from "@/components/data/core";

const PageAddProduct = () => {
  const router = useRouter();
  const [allCategories, setAllCategories] = useState([]);

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

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues: {
      descriptions: [{ title: "", description: "" }],
      images: [{ file: undefined as any }],
      keyFeatures: [{ value: "" }],
    },
  });

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

  const handleSubmitData = async (data: ProductFormData) => {
    const {
      title,
      productCode,
      images,

      brand,
      keyFeatures,
      descriptions,

      price,
      discountPrice,
      discount,

      stock,
      categoryId,
    } = data;

    const isExists = await FindProductExists({ productCode });

    if (!isExists.success) {
      toast.error(isExists?.message ?? "Product exits with this code!");
      return;
    }

    const imageFilesString: string[] = [];
    const keyFeaturesStrings: string[] = [];

    keyFeatures?.forEach((item) => keyFeaturesStrings.push(item.value));

    for (const imageFile of images) {
      if (imageFile) {
        const fileUploadData = await uploadFile(
          imageFile.file[0],
          "r2upload/products/images",
        );

        if (fileUploadData.success && fileUploadData.key) {
          imageFilesString.push(fileUploadData.key);
        }
      }
    }

    // return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
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
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const CreateProduct = await res.json();
    if (CreateProduct.success) {
      toast.success("Your Product added successfully!", {
        description: new Date().toDateString(),
        action: {
          label: "View now!",
          onClick: () => {
            router.push(`/products/${productCode}`);
          },
        },
      });

      reset();
    } else {
      toast.error(CreateProduct.message ?? "Error on product adding!");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh - 300px)] flex-center flex-col  p-2">
      <div className="flex justify-between items-center flex-wrap w-full">
        <h2 className="text-2xl font-bold font-mono">Products</h2>
        <div className="gap-1 flex items-center flex-wrap">
          <Button
            onClick={() => router.push("/dashboard/products/add")}
            // onClick={() => setOpenAddProductDialog(true)}
            variant={"outline"}
          >
            Add
          </Button>
          <Button
            //  onClick={() => loadProducts()}
            variant={"outline"}
          >
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="py-1 inline-block w-full" />
      <div className="p-4 rounded-md   w-full">
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="text-2xl font-bold font-mono text-center w-full">
              {"Add Product"}
            </h2>
          </div>
          <hr className="py-1 inline-block w-full" />
          <div className="mt-3 flex flex-col gap-2">
            {/* sec1  title  and code */}
            <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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
                  <InputErrorMessage>{errors.title?.message}</InputErrorMessage>
                )}
              </div>
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                <label htmlFor="code">Product Code:</label>
                <Input
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
                      message: "Only letters, numbers, and hyphens are allowed",
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
            <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                <label htmlFor="batchId">Select Product Category:</label>
                <Controller
                  control={control}
                  {...register("categoryId")}
                  render={({ field }) => (
                    <Combobox
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      items={allCategories}
                    >
                      <ComboboxInput placeholder="Select Category" />
                      <ComboboxContent>
                        <ComboboxEmpty>No category found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item, index) => (
                            <ComboboxItem key={index} value={item.id}>
                              <div className="flex-center gap-2">
                                <span>{item.id}</span>
                                {"-"}
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
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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
                  <InputErrorMessage>{errors.brand.message}</InputErrorMessage>
                )}
              </div>
            </div>

            {/* sec 3 -- images and key features */}
            <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
              <div className="flex flex-col justify-between items-start space-y-1 flex-1 w-full">
                <div className="flex-center w-fit gap-3">
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
                <div className="border w-full  rounded-md p-1 space-y-1">
                  {imageFields.map((item, index) => (
                    <div key={index} className="w-full">
                      <div className="flex items-center gap-2 justify-between">
                        <input
                          className="block w-full outline rounded-md   text-sm text-gray-primary file:mr-2 file:p-1 file:rounded-full file:px-2 file:border file:text-xs "
                          placeholder="Upload Image"
                          accept={"images/*"}
                          id={`title-${index}`}
                          type="file"
                          {...register(`images.${index}.file` as const, {
                            required: "An image file is required",
                            validate: {
                              // 1. Validate File Size (Max 500 KB)
                              lessThan500KB: (files) => {
                                const file = files?.[0];
                                if (!file) return true;

                                // 1kb = 1000 bytes, so 500KB = 500000 bytes
                                return (
                                  file.size <= 500000 ||
                                  "Max image size is 500 KB"
                                );
                              },

                              // 2. Validate Allowed Image Formats
                              acceptedFormats: (files) => {
                                const file = files?.[0];
                                if (!file) return true;

                                return (
                                  allowedTypes.includes(file.type) ||
                                  "Image must be jpg, jpeg, png, or webp"
                                );
                              },
                            },
                          })}
                        />
                        <Button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="flex items-center gap-1 bg-green-primary"
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
                  onClick={() => appendImageField({ file: undefined as any })}
                  variant={"default"}
                  className="bg-gray-primary"
                >
                  <CirclePlus /> Add More
                </Button>
              </div>
              <div className="flex justify-between items-start  flex-col space-y-1 flex-1 w-full">
                <label htmlFor="role">Key Features:</label>
                <div className="border w-full  rounded-md p-1 space-y-1">
                  {keyFeaturesFields.map((item, index) => (
                    <div key={index} className="w-full">
                      <div className="flex items-center justify-between gap-2">
                        <Input
                          className="block w-full text-sm text-gray-primary file:mr-2 file:p-1 file:rounded-full file:px-2 file:border file:text-xs "
                          placeholder="Enter Key Feature"
                          id={`title-${index}`}
                          type="text"
                          {...register(`keyFeatures.${index}.value` as const, {
                            required: {
                              value: true,
                              message: "Key Features is required!",
                            },
                            maxLength: {
                              value: 100,
                              message: "Max 100 characters!",
                            },
                          })}
                        />
                        <Button
                          type="button"
                          onClick={() => removekeyFeaturesField(index)}
                          className="flex items-center gap-1 bg-green-primary"
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
            <div className="grid-cols-1 space-y-1 items-start gap-3">
              <label htmlFor="description">Descriptions:</label>
              <div className="border w-full  rounded-md p-1 space-y-1">
                {descriptionsFields.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-1 flex-col sm:flex-row">
                      <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                        <Input
                          id={`title-${index}`}
                          placeholder="Enter Header"
                          {...register(`descriptions.${index}.title` as const, {
                            required: {
                              value: false,
                              message: "Description Title is required!",
                            },
                            maxLength: {
                              value: 100,
                              message: "Up to 100 character!",
                            },
                          })}
                        />
                        {errors.descriptions?.[index]?.title && (
                          <InputErrorMessage>
                            {errors.descriptions?.[index]?.title?.message}
                          </InputErrorMessage>
                        )}
                      </div>
                      <div
                        className="grid grid-cols-1 space-y-1 flex-1 w-full"
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
                            {errors.descriptions?.[index]?.description?.message}
                          </InputErrorMessage>
                        )}
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeDescriptionsField(index)}
                        className="flex items-center gap-1 bg-green-primary"
                      >
                        <RiDeleteBinFill />
                      </Button>
                    </div>
                    {/* <hr className="p-[0.2px]  bg-gray-secondary/60  " /> */}
                    <hr />
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
            <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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
                  <InputErrorMessage>{errors.price?.message}</InputErrorMessage>
                )}
              </div>
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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
            <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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
                  <InputErrorMessage>{errors.stock?.message}</InputErrorMessage>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end items-center pt-4">
            <Button disabled={isSubmitting} size={"lg"} type="submit">
              {isSubmitting && (
                <span className="animate-spin">
                  <Loader />
                </span>
              )}
              <PlusSquare />
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageAddProduct;
