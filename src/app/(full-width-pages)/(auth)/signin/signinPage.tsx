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
    <div className="w-full min-h-[calc(100vh-300px)] flex-center  max-w-5xl mx-auto p-2 py-4 ">
      <div className="rounded-md bg-background outline-2 outline-gray-secondary shadow-2xl shadow-foreground/40 w-full flex-col sm:flex-row flex items-stretch overflow-hidden">
        <div className="w-full overflow-hidden relative hidden sm:flex">
          <div className="absolute w-full h-full flex-1 overflow-hidden ">
            <Image
              fill
              className={`object-cover object-center overflow-hidden relative`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={LoginAndRegisterPageImages.login}
              alt=""
            />
          </div>
          <div className="relative h-full pt-24 w-full bg-foreground/30 z-20  flex justify-end p-5 items-center flex-col text-background">
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <span className="text-center">
              Log in to enjoy your shopping experience.
            </span>
          </div>
        </div>
        <div className="w-full p-4">
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className=" gap-2">
              <h2 className="text-2xl font-bold flex items-center gap-3 ">
                <MdVerifiedUser className="text-red-primary" />{" "}
                <span>Log In!</span>
              </h2>
              <span className="text-center text-gray-secondary">
                Log in to enjoy your shopping experience.
              </span>
            </div>

            {/* sec 8 */}
            <div className="flex items-start justify-between gap-4 flex-col">
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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
                <div className="flex justify-between items-center flex-wrap">
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

                  <div className="text-xs text-gray-secondary">
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

            <div className="w-full flex-center pt-4">
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
          <div className="relative my-4 flex-center">
            <span className="bg-background relative z-20 px-2 ">Or</span>
            <div className="absolute top-0 w-full h-[0.10px] my-3 bg-gray-300"></div>
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
