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
      router.push(`/order/${invoiceId}`);
    } else {
      toast.error("Not found your order.", {
        description: new Date().toDateString(),
      });
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-300px)] flex-center  max-w-5xl mx-auto p-2 py-4 ">
      <div className="rounded-md bg-background outline-2 outline-gray-secondary shadow-2xl shadow-foreground/40 w-full flex-col sm:flex-row flex items-stretch overflow-hidden">
        <div className="w-full overflow-hidden relative hidden sm:flex">
          <div className="absolute w-full h-full flex-1 overflow-hidden ">
            <Image
              unoptimized
              fill
              className={`object-cover object-center overflow-hidden relative`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={LoginAndRegisterPageImages.login}
              alt=""
            />
          </div>
          <div className="relative h-full pt-24 w-full bg-foreground/30 z-20  flex justify-end p-5 items-center flex-col text-background">
            <h2 className="text-2xl font-bold">Track Your Order!</h2>
            <span className="text-center font-bangla">
              কোথাও যাওয়ার প্রয়োজন নেই। ঘরে বসেই এক ক্লিকে জানুন আপনার পণ্য এখন
              কোথায় আছে।
            </span>
          </div>
        </div>
        <div className="w-full p-4">
          <form onSubmit={handleSubmit(handleSubmitData)} className="space-y-8">
            <div className=" gap-2">
              <h2 className="text-2xl font-bold flex items-center gap-3 ">
                <MdVerifiedUser className="text-green-primary" />{" "}
                <span>Track Order!</span>
              </h2>
              <span className="text-center text-gray-secondary">
                Enjoy your shopping experience.
              </span>
            </div>

            {/* sec 8 */}
            <div className="flex items-start justify-between gap-12 flex-col ">
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
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

            <div className="w-full flex-center pt-4">
              <Button
                disabled={isSubmitting}
                size={"lg"}
                variant={"default"}
                type="submit"
                className="w-full bg-green-primary"
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
