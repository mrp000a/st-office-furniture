"use client";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import registerImage from "@/components/images/Nature/atree standalone.jpeg";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { MdVerifiedUser } from "react-icons/md";
import { LoginAndRegisterPageImages } from "@/components/data/core";

const PageLogin = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl")?.toString() ?? "/";
  const router = useRouter();
  // const { status, data } = useSession();

  // useEffect(() => {
  //   const curl = searchParams.get("callbackUrl")?.toString() || "/wating";
  //   const toSet = decodeURI(curl);
  //   if (status === "authenticated") {
  //     router.replace(toSet);
  //   }
  // }, [searchParams, status, router]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>();

  const handleSubmitData = async (data: {
    email: string;
    password: string;
  }) => {
    const { email, password } = data;

    const result = await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    if (!result || result?.error) {
      if (result?.error === "Email not found!") {
        toast.error(result?.error);
        setError("email", {
          type: "manual",
          message: "Email not found!",
        });
      } else if (result?.error === "Incorrect password!") {
        toast.error(result?.error);
        setError("password", {
          type: "manual",
          message: "Invalid password!",
        });
      } else {
        toast.error("Server Error or db error!");
        return;
      }
    } else if (result?.ok) {
      router.refresh();
    } else {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="flex-center mx-auto min-h-[calc(100vh-300px)] w-full max-w-5xl p-2 py-4">
      <div className="bg-background outline-gray-secondary shadow-foreground/40 flex w-full flex-col items-stretch overflow-hidden rounded-md shadow-2xl outline-2 sm:flex-row">
        <div className="relative hidden w-full overflow-hidden sm:flex">
          <div className="absolute h-full w-full flex-1 overflow-hidden">
            <Image
              unoptimized
              fill
              className={`relative overflow-hidden object-cover object-center`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={LoginAndRegisterPageImages.login}
              alt=""
            />
          </div>
          <div className="bg-foreground/30 text-background relative z-20 flex h-full w-full flex-col items-center justify-end p-5 pt-24">
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <span className="text-center">
              Log in to enjoy your shopping experience.
            </span>
          </div>
        </div>
        <div className="w-full p-4">
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="gap-2">
              <h2 className="flex items-center gap-3 text-2xl font-bold">
                <MdVerifiedUser className="text-green-primary" />{" "}
                <span>Log In!</span>
              </h2>
              <span className="text-gray-secondary text-center">
                Log in to enjoy your shopping experience.
              </span>
            </div>

            {/* sec 8 */}
            <div className="flex flex-col items-start justify-between gap-4">
              <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                <label htmlFor="email">Phone / Email:</label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter Your Phone or Email"
                  {...register("email", {
                    required: { value: true, message: "Email is Required!" },
                  })}
                />
                {errors?.email && (
                  <InputErrorMessage>{errors.email.message}</InputErrorMessage>
                )}
              </div>
              <div className="grid w-full flex-1 grid-cols-1 space-y-1">
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
                <div className="flex flex-wrap items-center justify-between">
                  <div className="text-gray-secondary flex w-fit items-center gap-2 text-xs">
                    <input
                      name="showPass"
                      type="checkbox"
                      id="showPass"
                      onChange={(e) => setShowPass(() => e.target.checked)}
                    />
                    <label htmlFor="showPass" className="text-nowrap">
                      Show Password
                    </label>
                  </div>

                  <div className="text-gray-secondary text-xs">
                    <Button
                      variant={"link"}
                      className="text-blue-primary"
                      asChild
                    >
                      <Link href={"#"} className="">
                        Fotgot Password
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-center w-full pt-4">
              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting && (
                  <span className="animate-spin">
                    <Loader />
                  </span>
                )}
                Log In
              </Button>
            </div>
          </form>
          <div className="flex-center relative my-4">
            <span className="bg-background relative z-20 px-2">Or</span>
            <div className="absolute top-0 my-3 h-[0.10px] w-full bg-gray-300"></div>
          </div>
          <div className="text-gray-secondary">
            {"Don't"} have an account?
            <Button
              variant={"link"}
              className="text-blue-primary text-sm"
              asChild
            >
              <Link href={`/register?callbackUrl=${callbackUrl}`} className="">
                Register Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
