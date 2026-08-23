"use client";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleMinus, CirclePlus, Loader, RotateCcw } from "lucide-react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartItem } from "@/redux/features/cart/cartTypes";
import { CartProductItem } from "@/components/uiComponent/CartRelated";
import { ProductDefaultImage } from "@/components/data/core";
import { handleDeleteCartItem, loadCart } from "@/lib/api";
import { updateQuantity } from "@/redux/features/cart/cartSlice";

const Page = () => {
  const session = useSession();
  const user = session.data?.user;
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    receiverName: string;
    receiverPhone: string;
    address: string;
    email: string | null;
    customerNote: string | null;
  }>({
    defaultValues: {
      receiverName: user?.name ? user.name : "",
    },
    values: {
      receiverName: user?.name ?? "",
      receiverPhone: user?.phone ?? "",
      address: user?.address ?? "",
      email: user?.email ?? "",
      customerNote: "",
    },
  });

  const handleSubmitData = async (data: {
    receiverName: string;
    receiverPhone: string;
    address: string;
    email: string | null;
    customerNote: string | null;
  }) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    type NewOrderInput = {
      receiverName: string;
      receiverPhone: string;
      address: string;
      email: string | null;
      customerNote: string | null;
      items: CartItem[] | undefined;
      userId: number | null;
    };

    const raw: NewOrderInput = {
      receiverName: data.receiverName,
      receiverPhone: data.receiverPhone,
      address: data.address,
      email: data.email,
      customerNote: data.customerNote,

      items: cart?.items,
      userId: session.data?.user?.id ? Number(session.data?.user?.id) : null,
    };

    console.log(raw);

    return;
    const dataFetch = await fetch(`so`);
    const res = await dataFetch.json();

    if (res.success) {
      // make cart empty

      toast.success(res.message ?? "Ordered Successful!");
    } else {
      toast.error(res.message ?? "Something Went Wrong!");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-300px)] flex-center  max-w-5xl mx-auto p-2">
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="rounded-md outline-2 h-full max-h-full p-2 gap-2 box-border outline-gray-secondary shadow-2xl shadow-foreground/40 w-full flex-col sm:flex-row flex items-stretch overflow-hidden"
      >
        {/* Left side */}
        <div className="w-full  min-h-140 flex-1 overflow-x-hidden overflow-y-auto scrollbar-thumb-gray-secondary/50 h-full px-3 py-2 flex flex-col border border-gray-secondary/40 rounded-md ">
          <div className="border-b border-b-gray-secondary">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Order Items</span>
                <div>
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={async () =>
                      await loadCart({
                        userId: Number(session.data?.user.id),
                        dispatch,
                      })
                    }
                  >
                    <RotateCcw />
                  </Button>
                </div>
              </div>
            </div>
            <span className="w-full text-gray-secondary ">
              All your cart items are shown below.
            </span>
          </div>
          <div className="flex-1 h-full max-h-110 min-h-110 w-full p-2 overflow-x-hidden overflow-y-auto  max-w-full  flex flex-col gap-3 box-border">
            {cart && cart.items.length > 0 ? (
              cart.items.map(({ title, product, qty, id }, index) => (
                <div key={index} className="w-full flex flex-col">
                  <CartProductItem
                    deleteCartItem={handleDeleteCartItem}
                    id={id ? id : 0}
                    image={product.images[0] ?? ProductDefaultImage}
                    price={Number(
                      product.discount ? product.discountPrice : product.price,
                    )}
                    productCode={product.productCode}
                    qty={qty}
                    title={title}
                  />
                  {/* Buttons */}
                  <div className="flex-center justify-end  gap-1 text-sm w-fit p-1 rounded-md bg-gray-secondary/10 outline">
                    Qty:
                    <Button
                      disabled={cart.items[index].qty === 1}
                      onClick={() => {
                        dispatch(
                          updateQuantity({ itemId: id ? id : 0, qty: qty - 1 }),
                        );
                      }}
                      type="button"
                      variant={"outline"}
                      size={"icon-sm"}
                    >
                      <CircleMinus />
                    </Button>
                    <span>{1}</span>
                    <Button
                      onClick={() => {
                        dispatch(
                          updateQuantity({ itemId: id ? id : 0, qty: qty + 1 }),
                        );
                      }}
                      type="button"
                      variant={"outline"}
                      size={"icon-sm"}
                    >
                      <CirclePlus />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-center p-3 rounded-md outline-2 outline-gray-secondary box-border">
                No Items Found
              </span>
            )}
          </div>
          <div className="border-t py-2 border-gray-secondary">
            <div className="flex justify-between items-center">
              <div className=" space-x-2">
                <span className="text-gray-secondary font-semibold">
                  Total Price:
                </span>
                <span className="text-gray-primary font-bold">
                  ৳
                  {cart?.items.reduce(
                    (total, item) =>
                      total +
                      (item.product.discount && item.product.discountPrice
                        ? item.product?.discountPrice
                        : item.price) *
                        item.qty,
                    0,
                  )}
                </span>
              </div>{" "}
              <div className="space-x-2 flex flex-wrap">
                <span className="text-gray-secondary font-semibold">
                  Total Qty:
                </span>
                <span className="text-gray-primary font-bold">
                  {cart?.items.reduce((total, item) => total + item.qty, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side  */}
        <div className="w-full py-2 flex-1 flex flex-col px-3 border border-gray-secondary/40 rounded-md">
          <div>
            <div className=" gap-2">
              <h2 className="text-lg font-bold">Place order!</h2>
              <span className="text-center text-gray-secondary">
                enjoy shopping experience with st office furniture.
              </span>
            </div>

            {/* sec a */}
            <div className="flex items-start justify-between gap-4 flex-col">
              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                <label htmlFor="receiverName">{"Receiver's Name:"}</label>
                <Input
                  id="receiverName"
                  type="text"
                  placeholder="Enter Receiver Name"
                  {...register("receiverName", {
                    required: { value: true, message: "Name is Required!" },
                  })}
                />
                {errors?.receiverName && (
                  <InputErrorMessage>
                    {errors.receiverName.message}
                  </InputErrorMessage>
                )}
              </div>

              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                <label htmlFor="receiverPhone">{"Receiver's Phone:"}</label>
                <Input
                  id="receiverPhone"
                  placeholder="Enter Receiver Phone"
                  {...register("receiverPhone", {
                    required: {
                      value: true,
                      message: "Phone is Required!",
                    },
                    maxLength: {
                      value: 15,
                      message: "Max 15 character allowed!",
                    },
                    minLength: { value: 8, message: "At least 8 character!" },
                  })}
                />
                {errors?.receiverPhone && (
                  <InputErrorMessage>
                    {errors.receiverPhone.message}
                  </InputErrorMessage>
                )}
              </div>

              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                <label htmlFor="email">{"Receiver's Email:"}</label>
                <Input
                  id="email"
                  placeholder="Enter Receiver Email"
                  {...register("email", {})}
                />
                {errors?.email && (
                  <InputErrorMessage>{errors.email.message}</InputErrorMessage>
                )}
              </div>

              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                <label htmlFor="address">{"Receiver's Full Address:"} </label>
                <Input
                  id="address"
                  placeholder="Enter Receiver address"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is Required!",
                    },
                  })}
                />
                {errors?.address && (
                  <InputErrorMessage>
                    {errors.address.message}
                  </InputErrorMessage>
                )}
              </div>

              <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                <label htmlFor="customerNote">Note:</label>
                <Textarea
                  id="customerNote"
                  placeholder="Enter your note"
                  {...register("customerNote", {
                    maxLength: {
                      value: 200,
                      message: "Max 200 characters!",
                    },
                  })}
                />
                {errors?.customerNote && (
                  <InputErrorMessage>
                    {errors.customerNote.message}
                  </InputErrorMessage>
                )}
              </div>
            </div>

            <div className="w-full flex-center flex-col pt-4">
              <Button
                disabled={isSubmitting || cart?.items.length === 0 || !cart}
                type="submit"
                variant={"default"}
                className="w-full "
              >
                {isSubmitting && (
                  <span className="animate-spin">
                    <Loader />
                  </span>
                )}
                Place Order
              </Button>
              {cart?.items.length === 0 && (
                <InputErrorMessage>
                  At least one item is required!
                </InputErrorMessage>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
