"use client";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MdVerifiedUser } from "react-icons/md";
import { LoginAndRegisterPageImages } from "@/components/data/core";
import { checkSingleOrder } from "@/lib/api";

const PageTrackOrder = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ phone: string; invoiceId: number }>();

  const handleSubmitData = async ({
    phone,
    invoiceId,
  }: {
    phone: string;
    invoiceId: number;
  }) => {
    const order = await checkSingleOrder({
      orderId: Number(invoiceId),
      phone: phone,
    });
    if (order.success) {
      //   toast.success(email, { description: new Date().toDateString() });
      router.push(`/order/${order.result}`);
    } else {
      toast.error("Not found your order.", {
        description: new Date().toDateString(),
      });
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
            <h2 className="text-2xl font-bold">Track Your Order!</h2>
            <span className="font-bangla text-center">
              কোথাও যাওয়ার প্রয়োজন নেই। ঘরে বসেই এক ক্লিকে জানুন আপনার পণ্য এখন
              কোথায় আছে।
            </span>
          </div>
        </div>
        <div className="w-full p-4">
          <form onSubmit={handleSubmit(handleSubmitData)} className="space-y-8">
            <div className="gap-2">
              <h2 className="flex items-center gap-3 text-2xl font-bold">
                <MdVerifiedUser className="text-green-primary" />{" "}
                <span>Track Order!</span>
              </h2>
              <span className="text-gray-secondary text-center">
                Enjoy your shopping experience.
              </span>
            </div>

            {/* sec 8 */}
            <div className="flex flex-col items-start justify-between gap-12">
              <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                <label htmlFor="phone">Phone:</label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Enter Your Phone "
                  {...register("phone", {
                    required: { value: true, message: "Phone is Required!" },
                  })}
                  className="h-12 text-base md:text-base"
                />
                {errors?.phone && (
                  <InputErrorMessage>{errors.phone.message}</InputErrorMessage>
                )}
              </div>
              <div className="grid w-full flex-1 grid-cols-1 space-y-1">
                <label htmlFor="password">Invoice Id:</label>
                <Input
                  id="invoiceId"
                  type={"number"}
                  placeholder="Enter InvoiceId. i.e. 29838"
                  {...register("invoiceId", {
                    required: {
                      value: true,
                      message: "Invoice Id is Required!",
                    },
                    maxLength: {
                      value: 30,
                      message: "Max 15 character allowed!",
                    },
                    minLength: { value: 1, message: "At least 1 character!" },
                  })}
                  className="h-12 text-base md:text-base"
                />
                {errors?.invoiceId && (
                  <InputErrorMessage>
                    {errors.invoiceId.message}
                  </InputErrorMessage>
                )}
              </div>
            </div>

            <div className="flex-center w-full pt-4">
              <Button
                disabled={isSubmitting}
                size={"lg"}
                variant={"default"}
                type="submit"
                className="bg-green-primary w-full"
              >
                {isSubmitting && (
                  <span className="animate-spin">
                    <Loader />
                  </span>
                )}
                Track Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageTrackOrder;
