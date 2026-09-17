"use client";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FindUserExists, uploadFile } from "@/lib/api";
import { ChevronLeftIcon, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserFormData } from "@/lib/formDataTypes";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { FaUserCircle } from "react-icons/fa";
import { allowedTypes } from "@/components/data/core";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";

const PageRegisterForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [callbackUrl, setCallbackUrl] = useState<string>("/");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { confirm } = useAlertDialog();
  const { status } = useSession();

  useEffect(() => {
    const callbackUrl = searchParams?.get("callbackUrl")?.toString() ?? "/";
    const a = () => {
      setCallbackUrl(callbackUrl);
    };
    a();
  }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({});

  const handleSubmitData = async (data: UserFormData) => {
    const {
      name,
      email,
      phone,
      gender,
      image,
      address,

      password,
      confirmPassword,
    } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", { message: "Password doesn't match!" });
      toast.error("Password doesn't match!");
      return;
    }

    if (image && image.length > 0) {
      const imagefile = image[0];

      // 1kb = 1000
      if (imagefile.size > 200000) {
        setError("image", { message: "Max image size 200 kb" });
        return;
      }

      if (!allowedTypes.includes(imagefile.type)) {
        setError("image", { message: "Image must be jpg, jpeg, png or webp" });
        return;
      }
    }

    const userExists = await FindUserExists({
      email: email.toLocaleLowerCase(),
      phone,
    });

    if (!userExists.success) {
      if (userExists.message.includes("Phone"))
        setError("phone", { message: "Phone already exists!" });
      if (userExists.message.includes("Email"))
        setError("email", { message: "Email already exists!" });
      toast.error(userExists?.message, {
        action: {
          label: "Log In",
          onClick() {
            router.push("/signin");
          },
        },
      });
      return;
    }

    let fileData = null;

    if (image && image[0] !== undefined) {
      fileData = await uploadFile(image[0], "r2upload/users/images");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name,
      email: email.toLocaleLowerCase(),
      phone,

      gender,
      image: fileData?.key,
      address,

      password,
    });

    const res = await fetch("/api/users", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });
    console.log("object");
    const createUser: { success: boolean; result?: object; message: string } =
      await res.json();
    if (createUser.success) {
      toast.success("User Created Successful!", {
        description: "Please check your email inbox to verify your email.",
        action: {
          label: "Log In Now",
          onClick() {
            router.push("/signin");
          },
        },
      });

      await confirm({
        title: "Please check your email inbox for verify your email.",
        description:
          "If you can't find the email at the inbox. Please check in your spam email.",
        confirmText: "Okey",
      });

      const redTimeout = setTimeout(() => {
        router.push("/signin");
        clearTimeout(redTimeout);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-lg sm:pt-10 mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to home
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-lg px-2 max-sm:px-0  mx-auto py-5">
        <div>
          <div className="">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign up with Google
              </button>
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg
                  width="21"
                  className="fill-current"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
                </svg>
                Sign up with X
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleSubmitData)}>
              <div className="space-y-1 w-full ">
                {/* sec1  */}
                <div className="flex items-start justify-between flex-col ">
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
                      type="email"
                      placeholder="Enter Your Email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is Required!",
                        },
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
                <div className="flex items-start justify-between  flex-col ">
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
                <div className="flex items-start justify-between  flex-col ">
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

                {/* sec 8 */}
                <div className="flex items-start justify-between  flex-col ">
                  <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                    <label htmlFor="password">Password:</label>
                    <div className="relative flex-center">
                      <Input
                        id="password"
                        type={showPass ? "text" : "password"}
                        placeholder="Enter Your Password"
                        {...register("password", {
                          required: {
                            value: true,
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
                          value: true,
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
                    {errors?.confirmPassword && (
                      <InputErrorMessage>
                        {errors.confirmPassword.message}
                      </InputErrorMessage>
                    )}
                  </div>
                </div>

                {/* <!-- Button --> */}
                <div className="w-full flex-center pt-4">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    {isSubmitting && (
                      <span className="animate-spin">
                        <Loader />
                      </span>
                    )}
                    Register Now
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Button asChild variant={"link"}>
                  <Link
                    href="/signin"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Sign In
                  </Link>
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageRegisterForm;
