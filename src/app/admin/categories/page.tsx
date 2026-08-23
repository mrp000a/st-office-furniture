"use client";
import { InputErrorMessage, MaxHeader } from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FindCategoryExists, uploadFile } from "@/lib/api";
import { Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CategoryFormData, UserFormData } from "@/lib/formDataTypes";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";

import registerImage from "@/components/images/Nature/hassan-nizam-cnL7ebMpuSo-unsplash.jpg";
import { Textarea } from "@/components/ui/textarea";

const PageAddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({});

  const handleSubmitData = async (data: CategoryFormData) => {
    const { name, image, description } = data;

    const userExists = await FindCategoryExists({ name });

    if (!userExists.success) {
      toast.error(userExists?.message);
      return;
    }

    let fileData = null;

    if (image && image[0] !== undefined) {
      fileData = await uploadFile(image[0]);
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
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-300px)] flex-center max-w-5xl mx-auto p-2">
      <div className="rounded-md outline-2 outline-gray-secondary shadow-2xl shadow-foreground/40 w-full flex-col sm:flex-row flex items-stretch overflow-hidden">
        {/* <div className="w-full overflow-hidden relative hidden sm:flex">
          <div className="absolute w-full h-full flex-1 overflow-hidden ">
            <Image
              fill
              className={`object-cover object-center overflow-hidden relative`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={registerImage}
              alt=""
            />
          </div>
          <div className="relative h-full pt-24 w-full bg-foreground/20 z-20 backdrop-blur-xs flex justify-end p-5 items-center flex-col text-background">
            <h2 className="text-2xl font-bold">Join Us Today!</h2>
            <span className="text-center">
              Create an account to enjoy your shopping experience with us.
            </span>
          </div>
        </div> */}
        <div className="w-full p-4">
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="mt-3 flex flex-col gap-2">
              <div>
                <h2 className="text-2xl font-bold">Add Category!</h2>
                <span className="text-center text-gray-secondary">
                  Create an account to enjoy your shopping experience.
                </span>
              </div>
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

                          const allowedTypes = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                            "image/webp",
                          ];

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
            <div className="w-full flex-center pt-4">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <span className="animate-spin">
                    <Loader />
                  </span>
                )}
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageAddCategory;
