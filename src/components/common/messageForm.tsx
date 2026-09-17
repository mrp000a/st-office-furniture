"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

import { toast } from "sonner";
import { InputErrorMessage } from "../uiComponent/uiCom";
import { FiLoader } from "react-icons/fi";

type Inputs = {
  name: string;
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
    name,
    subject,
    message,
  }) => {
    try {
      const raw = { email, name, subject, message };
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
    <div className=" h-full w-full">
      <div className="w-full max-w-384 mx-auto p-4  rounded-md bg-background border-red/30 border">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex-center flex-col reveal"
        >
          <h3 className=" text-center font-bold">Feel Free To Reach Out</h3>

          <div className="space-y-4 w-full">
            {/* name and email section  */}
            <div className="flex flex-col md:flex-row items-start justify-between w-full gap-3">
              <div className="grid grid-cols-1 space-y-2 w-full flex-1">
                <label htmlFor="name" className="text-sm font-light">
                  Name
                </label>
                <Input
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
              <div className="grid grid-cols-1 space-y-2 w-full flex-1">
                <label htmlFor="email" className="text-sm font-light">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required!",
                    },
                  })}
                />
                {errors.email && (
                  <InputErrorMessage>{errors.email.message}</InputErrorMessage>
                )}
              </div>
            </div>
            {/* subject */}
            <div className="grid grid-cols-1 space-y-2">
              <label htmlFor="subject" className="text-sm font-light">
                Subject
              </label>
              <Input
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
              <label htmlFor="message" className="text-sm font-light">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Write a message"
                {...register("message", {
                  required: { value: true, message: "Message is required!" },
                })}
              />
              {errors.message && (
                <InputErrorMessage>{errors.message.message}</InputErrorMessage>
              )}
            </div>
          </div>
          <Button disabled={isSubmitting} type="submit">
            <FiLoader
              className={`animate-spin ${isSubmitting ? "" : "hidden"}`}
            />
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;
