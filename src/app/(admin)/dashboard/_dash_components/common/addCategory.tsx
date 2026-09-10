"use client";
import { InputErrorMessage} from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteFile, FindCategoryExists, uploadFile } from "@/lib/api";
import {  Info, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { CategoryFormData } from "@/lib/formDataTypes";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Textarea } from "@/components/ui/textarea";
import { allowedTypes } from "@/components/data/core";

const PageAddCategory = ({
  load,
  setOpenAddCategory,
  saveButtonText = "Save",
  id,
  name = "",
  description = "",
  oldImage = "",
  isEdit = false,
}: {
  load?: () => Promise<void>;
  setOpenAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  saveButtonText?: string;
  id?: number;
  name?: string;
  description?: string;
  oldImage?: string;
  isEdit?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    defaultValues: { name, description, image: undefined },
  });

  const handleSubmitData = async (data: CategoryFormData) => {
    const { name, image, description } = data;

    const userExists = await FindCategoryExists({ name });

    if (!userExists.success) {
      toast.error(userExists?.message);
      return;
    }

    let fileData = null;

    if (image && image[0] !== undefined) {
      fileData = await uploadFile(image[0], "r2upload/category/images");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name,
      image: fileData?.key,
      description,
    });

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const createCategory: {
      success: boolean;
      result?: object;
      message: string;
    } = await res.json();
    if (createCategory.success) {
      toast.success("Category add success fully!");
      reset();
      if (load) load();
      setOpenAddCategory(false);
    }
  };

  const handleSubmitDataEdit = async (data: CategoryFormData) => {
    const { name, image, description } = data;

    const userExists = await FindCategoryExists({ name, id: Number(id) });

    if (!userExists.success) {
      toast.error("Category not exists!");
      return;
    }

    let fileData = null;

    if (image && image[0] !== undefined) {
      fileData = await uploadFile(image[0], "r2upload/category/images");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: id,
      name,
      image: fileData?.key,
      description,
    });

    const res = await fetch("/api/categories", {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const createCategory: {
      success: boolean;
      result?: object;
      message: string;
    } = await res.json();

    if (createCategory.success) {
      toast.success("Category add success fully!");
      if (fileData?.key) await deleteFile(oldImage);

      reset();
      if (load) load();
      setOpenAddCategory(false);
    }
  };

  return (
    <div className="w-full   flex-center">
      <div className="rounded-md w-full flex-col sm:flex-row flex items-stretch overflow-hidden">
        <div className="w-full">
          <form
            onSubmit={handleSubmit(
              isEdit ? handleSubmitDataEdit : handleSubmitData,
            )}
          >
            <div className="mt-3 flex flex-col gap-2">
              {/* sec1  */}
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="firstName">Name:</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is Required!",
                      },
                    })}
                  />
                  {errors?.name && (
                    <InputErrorMessage>
                      {errors.name?.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>
              {/* sec2 */}
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="description">Description:</label>
                  <Textarea
                    id="description"
                    placeholder="Enter Category Description"
                    {...register("description", {
                      maxLength: {
                        value: 300,
                        message: "Max 20 characters.",
                      },
                    })}
                  />
                  {errors?.description && (
                    <InputErrorMessage>
                      {errors.description.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>

              {/* sec 5 */}
              <div className="flex items-start justify-between gap-4 flex-col ">
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <div className="flex-center w-fit gap-3">
                    <label htmlFor="image">Image:</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size={"sm"} variant="outline">
                          <Info />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start">
                        <PopoverHeader>
                          <PopoverDescription>
                            Max size of image 200kb. Allowed types: jpg, jpeg,
                            png, webp.
                          </PopoverDescription>
                        </PopoverHeader>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <input
                    id="image"
                    type="file"
                    className="block w-full text-sm text-gray-primary file:mr-4 file:p-2 file:rounded-full file:px-4 file:border file:text-xs "
                    placeholder="Upload Image"
                    {...register("image", {
                      validate: {
                        // 1. Validate File Size (Max 500 KB)
                        lessThan500KB: (files) => {
                          const file = files?.[0];
                          if (!file) return true;

                          // 1kb = 1000 bytes, so 500KB = 500000 bytes
                          return (
                            file.size <= 500000 || "Max image size is 500 KB"
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
                  {errors?.image ? (
                    <InputErrorMessage>
                      {errors.image.message}
                    </InputErrorMessage>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end flex-wrap gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setOpenAddCategory(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <span className="animate-spin">
                    <Loader />
                  </span>
                )}
                {saveButtonText}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageAddCategory;
