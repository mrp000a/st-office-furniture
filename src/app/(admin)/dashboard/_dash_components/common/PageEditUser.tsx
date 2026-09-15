"use client";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFile } from "@/lib/api";
import { Info, Loader, SaveAllIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserFormData } from "@/lib/formDataTypes";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";

import { allowedTypes } from "@/components/data/core";
import { Gender, UserRole } from "@/generated/prisma";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PageEditUserAdmin = ({
  id,
  name,
  email,
  phone,
  gender,
  image,
  role,
  address,
  setOpen,
}: {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  gender?: Gender;
  image?: string;
  role?: UserRole;
  address?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const oldImage = image;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData & { role: UserRole }>({
    defaultValues: {
      name,
      email,
      phone,
      gender,
      role,
      address,
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmitData = async (data: UserFormData & { role: UserRole }) => {
    const {
      name,
      email,
      phone,
      gender,
      image,
      address,
      role,

      password,
      confirmPassword,
    } = data;
    try {
      if (password && password.length > 0) {
        if (password !== confirmPassword) {
          setError("confirmPassword", { message: "Password doesn't match!" });
          toast.error("Password doesn't match!");
          return;
        }
      }

      if (image && image.length > 0) {
        const imagefile = image[0];

        // 1kb = 1000
        if (imagefile.size > 200000) {
          setError("image", { message: "Max image size 200 kb" });
          return;
        }

        if (!allowedTypes.includes(imagefile.type)) {
          setError("image", {
            message: "Image must be jpg, jpeg, png or webp",
          });
          return;
        }
      }

      let fileData = null;

      if (image && image[0] !== undefined) {
        fileData = await uploadFile(image[0], "r2upload/users/images");
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        id: id,
        name,
        email,
        phone,
        role,

        gender,
        image: fileData?.key ?? oldImage ?? "",
        address,

        password,
      });

      const res = await fetch("/api/users", {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      });

      const updateUser: { success: boolean; result?: object; message: string } =
        await res.json();
      if (updateUser.success) {
        toast.success("User Updated!", {
          description: new Date().toDateString(),
        });
        router.refresh();
        setOpen(false);
      } else {
        toast.success(updateUser.message ?? "User Not Updated", {
          description: new Date().toDateString(),
        });
      }
    } catch (error: any) {
      toast.error(error.message ?? "User Not Updated", {
        description: "User not updated successful--server--err!",
      });
    }
  };

  return (
    <div className="w-full flex-center">
      <div className="rounded-md bg-background  w-full flex-col sm:flex-row flex items-stretch overflow-hidden">
        <div className="w-full p-4">
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="mt-3 flex flex-col gap-2">
              {/* <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <FaUserCircle className="text-red-primary" />
                  <span>Edit User!</span>
                </h2>
                <span className="text-center text-gray-secondary">
                  Create an account to enjoy your shopping experience.
                </span>
              </div> */}
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
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="email">Email:</label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter Your Email"
                    {...register("email", {
                      required: { value: true, message: "Email is Required!" },
                    })}
                  />
                  {errors?.email && (
                    <InputErrorMessage>
                      {errors.email.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>
              {/* sec2 */}
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="phone">Phone:</label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter Your Phone no."
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Phone Number is Required!",
                      },
                      minLength: {
                        value: 9,
                        message: "At least 10 characters.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Max 20 characters.",
                      },
                    })}
                  />
                  {errors?.phone && (
                    <InputErrorMessage>
                      {errors.phone.message}
                    </InputErrorMessage>
                  )}
                </div>
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="address">Address:</label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="House No, Road No, Area, District"
                    {...register("address", {
                      maxLength: {
                        value: 100,
                        message: "Max lenth 100 char!",
                      },
                    })}
                  />
                  {errors?.address && (
                    <InputErrorMessage>
                      {errors.address.message}
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
                    {...register("image")}
                  />
                  {errors?.image ? (
                    <InputErrorMessage>
                      {errors.image.message}
                    </InputErrorMessage>
                  ) : (
                    ""
                  )}
                </div>
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <div>Select Gender:</div>
                  <div className="flex items-center gap-x-8 bg-gray-secondary/5 rounded-md px-3 box-border flex-wrap outline outline-gray-primary/20">
                    <div className="flex-center w-fit gap-3 ">
                      <Input
                        id="male"
                        type="radio"
                        value={"MALE"}
                        {...register("gender", {
                          required: {
                            value: true,
                            message: "Gender is Required!",
                          },
                        })}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex-center w-fit gap-3 ">
                      <Input
                        id="female"
                        type="radio"
                        value={"FEMALE"}
                        {...register("gender", {
                          required: {
                            value: true,
                            message: "Gender is Required!",
                          },
                        })}
                      />
                      <label htmlFor="female">Female</label>
                    </div>{" "}
                    <div className="flex-center w-fit gap-3 ">
                      <Input
                        id="other"
                        type="radio"
                        value={"OTHER"}
                        placeholder="Enter Your Id"
                        {...register("gender", {
                          required: {
                            value: true,
                            message: "Gender is Required!",
                          },
                        })}
                      />
                      <label htmlFor="other">Other</label>
                    </div>
                  </div>
                  {errors?.gender && (
                    <InputErrorMessage>
                      {errors.gender.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>

              {/* sec 6 role */}
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                <label htmlFor="address">{"Role:"} </label>
                <Controller
                  control={control}
                  {...register("role", {
                    required: {
                      value: true,
                      message: "Role is required!",
                    },
                  })}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          {["USER", "ADMIN", "SUPER_ADMIN"].map(
                            (item, index) => (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.role && (
                  <InputErrorMessage>{errors.role.message}</InputErrorMessage>
                )}
              </div>

              {/* sec 8 */}
              <hr />
              <span className="text-xs text-gray-secondary">
                Enter Password if you want to change password.
              </span>
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="password">Password:</label>
                  <div className="relative flex-center">
                    <Input
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Enter Your Password"
                      {...register("password", {
                        required: {
                          value: false,
                          message: "Password is Required!",
                        },
                        maxLength: {
                          value: 15,
                          message: "Max 15 character allowed!",
                        },
                        minLength: {
                          value: 8,
                          message: "At least 8 character!",
                        },
                      })}
                    />
                    <button
                      onClick={() => setShowPass((e) => !e)}
                      className="absolute right-2 cursor-pointer"
                      type="button"
                    >
                      {showPass ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors?.password && (
                    <InputErrorMessage>
                      {errors.password.message}
                    </InputErrorMessage>
                  )}
                </div>
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <Input
                    id="confirmPassword"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter Your Password"
                    {...register("confirmPassword", {
                      required: {
                        value: false,
                        message: "Password is Required!",
                      },
                      maxLength: {
                        value: 15,
                        message: "Max 15 character allowed!",
                      },
                      minLength: { value: 8, message: "At least 8 character!" },
                    })}
                  />
                  {errors?.confirmPassword && (
                    <InputErrorMessage>
                      {errors.confirmPassword.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end items-center flex-wrap gap-2 pt-4">
              <Button
                onClick={() => setOpen(false)}
                variant={"destructive"}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit" className="">
                {isSubmitting && (
                  <span className="animate-spin">
                    <Loader />
                  </span>
                )}
                <SaveAllIcon />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageEditUserAdmin;
