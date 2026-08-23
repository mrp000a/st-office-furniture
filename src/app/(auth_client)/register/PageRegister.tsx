"use client";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FindUserExists, uploadFile } from "@/lib/api";
import { Info, Loader } from "lucide-react";
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

import registerImage from "@/components/images/Nature/hassan-nizam-cnL7ebMpuSo-unsplash.jpg";

const PageRegister = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [callbackUrl, setCallbackUrl] = useState<string>("/");
  const searchParams = useSearchParams();
  const router = useRouter();
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
      // console.log({
      //   name: imagefile.name,
      //   size: imagefile.size,
      //   type: imagefile.type,
      // });

      // 1kb = 1000
      if (imagefile.size > 200000) {
        setError("image", { message: "Max image size 200 kb" });
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(imagefile.type)) {
        setError("image", { message: "Image must be jpg, jpeg, png or webp" });
        return;
      }
    }

    const userExists = await FindUserExists({ email, phone });

    if (!userExists.success) {
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
      fileData = await uploadFile(image[0]);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name,
      email,
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

    const createUser: { success: boolean; result?: object; message: string } =
      await res.json();
    if (createUser.success) {
      toast.info("Message", {
        description: "Now you can Log In!",
        action: {
          label: "Log In",
          onClick() {
            router.push("/signin");
          },
        },
        actionButtonStyle: { borderRadius: "22px" },
      });

      const redTimeout = setTimeout(() => {
        router.push("/signin");
        clearTimeout(redTimeout);
      }, 2000);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-300px)] flex-center max-w-5xl mx-auto p-2">
      <div className="rounded-md outline-2 outline-gray-secondary shadow-2xl shadow-foreground/40 w-full flex-col sm:flex-row flex items-stretch overflow-hidden">
        <div className="w-full overflow-hidden relative hidden sm:flex">
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
        </div>
        <div className="w-full p-4">
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="mt-3 flex flex-col gap-2">
              <div>
                <h2 className="text-2xl font-bold">Register Now!</h2>
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
                    placeholder="Enter Your Address"
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

              {/* sec 8 */}
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="password">Password:</label>
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
                      minLength: { value: 8, message: "At least 8 character!" },
                    })}
                  />
                  {errors?.password && (
                    <InputErrorMessage>
                      {errors.password.message}
                    </InputErrorMessage>
                  )}
                  <div className="flex items-center w-fit gap-2 text-xs text-gray-secondary">
                    <input
                      name="showPass"
                      type="checkbox"
                      id="showPass"
                      onChange={(e) => setShowPass(() => e.target.checked)}
                    />
                    <label htmlFor="showPass" className="text-nowrap ">
                      Show Password
                    </label>
                  </div>
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
          <div className="relative my-4 flex-center">
            <span className="bg-background relative z-20 px-2 ">Or</span>
            <div className="absolute top-0 w-full h-[0.10px] my-3 bg-gray-300"></div>
          </div>
          <div className="text-gray-secondary">
            {"Don't"} have an account?{" "}
            <Link
              className="text-blue-primary/50 hover:underline"
              href={`/signin?callbackUrl=${callbackUrl}`}
            >
              Log In Now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageRegister;
