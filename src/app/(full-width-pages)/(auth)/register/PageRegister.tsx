"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ChevronLeftIcon, Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { FindUserExists } from "@/lib/api";
import { UserFormData } from "@/lib/formDataTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import GoogleRegButton from "@/components/sec_lib/google-register-button";

const PageRegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { confirm } = useAlertDialog();
  const { status } = useSession();

  const callbackUrl = searchParams?.get("callbackUrl")?.toString() ?? "/";

  useEffect(() => {
    if (status === "authenticated") router.replace(callbackUrl);
  }, [callbackUrl, router, status]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>();

  const handleSubmitData = async (data: UserFormData) => {
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match." });
      toast.error("Passwords do not match.");
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await FindUserExists({ email: normalizedEmail });

    if (!userExists.success) {
      setError("email", { message: "Email already exists." });
      toast.error(userExists.message, {
        action: { label: "Log In", onClick: () => router.push("/signin") },
      });
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: normalizedEmail,
        password,
        phone: data.phone?.trim() || undefined,
        address: data.address?.trim() || undefined,
      }),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      toast.error(result.message ?? "Unable to create your account.");
      return;
    }

    await confirm({
      title: "Check your email to verify your account.",
      description:
        "We sent a verification link to your email. Check your spam folder if you cannot find it.",
      confirmText: "Okay",
    });
    router.push("/signin");
  };

  return (
    <div className="no-scrollbar flex w-full flex-1 flex-col overflow-y-auto lg:w-1/2">
      <div className="mx-auto w-full max-w-lg sm:pt-10">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500">
          <ChevronLeftIcon /> Back to home
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-2 py-5">
        <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold">Create your account</h1>
        <p className="mb-5 text-sm text-gray-500">
          Sign up with Google or use your name, email, password, and contact details.
        </p>

        <GoogleRegButton />
        <div className="relative py-5 text-center text-sm text-gray-400">
          <span className="bg-background relative z-10 px-3">Or register with email</span>
          <div className="absolute inset-x-0 top-1/2 border-t" />
        </div>

        <form onSubmit={handleSubmit(handleSubmitData)} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required." })}
            />
            {errors.name && <InputErrorMessage>{errors.name.message}</InputErrorMessage>}
          </div>

          <div className="space-y-1">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
            {errors.email && <InputErrorMessage>{errors.email.message}</InputErrorMessage>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="phone">Phone</label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="e.g. +880 1XXX-XXXXXX"
                {...register("phone", {
                  validate: (value) =>
                    !value?.trim() ||
                    /^[+]?[\d\s().-]{7,20}$/.test(value.trim()) ||
                    "Enter a valid phone number.",
                })}
              />
              {errors.phone && <InputErrorMessage>{errors.phone.message}</InputErrorMessage>}
            </div>

            <div className="space-y-1 sm:col-span-1">
              <label htmlFor="address">Address</label>
              <Textarea
                id="address"
                autoComplete="street-address"
                placeholder="City or delivery address"
                maxLength={250}
                rows={2}
                className="resize-none"
                {...register("address", {
                  maxLength: {
                    value: 250,
                    message: "Address must be 250 characters or fewer.",
                  },
                })}
              />
              {errors.address && <InputErrorMessage>{errors.address.message}</InputErrorMessage>}
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="At least 8 characters"
                {...register("password", {
                  required: "Password is required.",
                  minLength: { value: 8, message: "At least 8 characters." },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass((value) => !value)}
                className="absolute top-1/2 right-2 -translate-y-1/2"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && <InputErrorMessage>{errors.password.message}</InputErrorMessage>}
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword">Confirm password</label>
            <Input
              id="confirmPassword"
              type={showPass ? "text" : "password"}
              placeholder="Repeat your password"
              {...register("confirmPassword", { required: "Please confirm your password." })}
            />
            {errors.confirmPassword && (
              <InputErrorMessage>{errors.confirmPassword.message}</InputErrorMessage>
            )}
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting && <Loader className="animate-spin" />}
            Create account
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Button asChild variant="link">
            <Link href="/signin">Sign in</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default PageRegisterForm;
