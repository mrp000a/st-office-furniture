"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

import { toast } from "sonner";
import { InputErrorMessage } from "../../uiComponent/uiCom";
import { FiLoader } from "react-icons/fi";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const MessageForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    phone,
    name,
    subject,
    message,
  }) => {
    try {
      const raw = { email, name, phone, subject, message };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const data = await fetch(`/api/messages`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow",
      });
      // if (!data.ok) {
      //   toast.error("Fetch failed not ok");
      //   return;
      // }
      const res = await data.json();
      if (res.success) {
        toast.success("Message Sent Successful.", {
          description: new Date().toDateString(),
        });
        reset();
      } else {
        toast.error("Message Not Sent!");
      }
    } catch (error: any) {
      toast.error(error.message ?? "Message Not Sent!");
    }
  };

  return (
    <div className="h-full w-full reveal">
      <div className="bg-background border-gray-secondary/80 shadow-foreground/20 mx-auto w-full max-w-384 rounded-md border p-3 shadow-lg lg:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-7">
            <h2 className="text-xl font-bold sm:text-2xl">Send an inquiry</h2>

            <p className="text-gray-primary mt-1 text-sm">
              {"Fill out the form and we'll get back to you."}
            </p>
          </div>

          <div className="w-full space-y-4">
            {/* name and email section  */}
            <div className="flex w-full flex-col items-start justify-between gap-3 md:flex-row">
              <div className="grid w-full flex-1 grid-cols-1 space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  className="h-10"
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  {...register("name", {
                    required: { value: true, message: "Name is required!" },
                  })}
                />
                {errors.name && (
                  <InputErrorMessage>{errors.name.message}</InputErrorMessage>
                )}
              </div>
              <div className="grid w-full flex-1 grid-cols-1 space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  className="h-10"
                  id="email"
                  type="text"
                  placeholder="Enter Phone "
                  autoComplete="phone"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone is required!",
                    },
                  })}
                />
                {errors.phone && (
                  <InputErrorMessage>{errors.phone.message}</InputErrorMessage>
                )}
              </div>
            </div>
            {/* email */}
            <div className="grid w-full flex-1 grid-cols-1 space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                className="h-10"
                id="email"
                type="email"
                placeholder="Enter Email"
                autoComplete="email"
                {...register("email", {
                  required: {
                    value: false,
                    message: "Email is required!",
                  },
                })}
              />
              {errors.email && (
                <InputErrorMessage>{errors.email.message}</InputErrorMessage>
              )}
            </div>
            {/* subject */}
            <div className="grid grid-cols-1 space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                className="h-10"
                id="subject"
                type="text"
                placeholder="Enter Subject"
                {...register("subject", {
                  required: { value: true, message: "Subject is required!" },
                })}
              />
              {errors.subject && (
                <InputErrorMessage>{errors.subject.message}</InputErrorMessage>
              )}
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <span className="text-gray-primary text-[11px] font-light">
                  Tell us what you need.
                </span>
              </div>
              <Textarea
                id="message"
                placeholder="Write a message"
                {...register("message", {
                  required: { value: true, message: "Message is required!" },
                })}
                className="h-36 max-h-36 overflow-auto"
              />
              {errors.message && (
                <InputErrorMessage>{errors.message.message}</InputErrorMessage>
              )}
            </div>
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant={"default"}
            className="bg-green-primary w-full text-white"
            size={"lg"}
          >
            <FiLoader
              className={`animate-spin ${isSubmitting ? "" : "hidden"}`}
            />
            Send Message
          </Button>
          <p className="text-gray-primary text-center text-[11px] leading-5">
            By submitting this form, you agree that we may use your information
            to respond to your inquiry.
          </p>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;
