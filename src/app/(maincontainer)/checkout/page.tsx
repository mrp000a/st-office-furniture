"use client";
import {
  InputErrorMessage,
  NoItemsFound,
  SpeacialOrderButton,
} from "@/components/uiComponent/uiCom";
import { Input } from "@/components/ui/input";
import { Handbag, Loader, Truck, Wallet } from "lucide-react";
import { GrRadialSelected } from "react-icons/gr";
import { useSession } from "next-auth/react";

import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CartProductItemOrder } from "@/components/uiComponent/CartRelated";
import { DeliveryAreas, ProductDefaultImage } from "@/components/data/core";
import { deleteCart, handleDeleteCartItem, loadCart } from "@/lib/api";
import { RiLockFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { OrderFormData, PaymentMethodsInfo } from "@/lib/formDataTypes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { useEffect } from "react";
import CouponForm from "@/components/common/forms/coupon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const { confirm } = useAlertDialog();
  // const [deliveryCharge, setDeliveryCharge] = useState<number>(0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    defaultValues: {
      receiverName: user?.name ?? "",
      receiverPhone: user?.phone ?? "",
      address: user?.address ?? "",
      receiverEmail: user?.email ?? "",
      customerNote: "",
      deliveryArea: "",
    },
  });

  const deliveryArea = useWatch({
    control: control,
    name: "deliveryArea",
  });

  const deliveryCharge =
    DeliveryAreas.find((item) => item.value === deliveryArea)?.charge ?? 0;

  useEffect(() => {
    reset({
      receiverName: user?.name ?? "",
      receiverPhone: user?.phone ?? "",
      address: user?.address ?? "",
      receiverEmail: user?.email ?? "",
      customerNote: "",
    });
  }, [user, reset]);

  const handleSubmitData = async (data: OrderFormData) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      receiverName: data.receiverName,
      receiverPhone: data.receiverPhone,
      deliveryArea: data.deliveryArea,
      address: data.address,
      receiverEmail: data.receiverEmail,
      customerNote: data.customerNote,

      items: cart?.items,
      userId: session.data?.user?.id ? Number(session.data?.user?.id) : null,
      userEmail: session.data?.user?.email ?? null,
    });

    // return;
    const res = await fetch("/api/order", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const CreateOrder = await res.json();

    if (CreateOrder.success) {
      console.log({ CreateOrder });
      toast.success(CreateOrder.message ?? "Your Order added successfully!", {
        description: new Date().toDateString(),
        action: {
          label: "View now!",
          onClick: () => {
            router.push(`/order/${CreateOrder.result?.id}`);
          },
        },
      });

      if (session && session.data?.user?.id) {
        await deleteCart({ userId: Number(session.data.user.id) });
        await loadCart({
          userId: Number(session.data.user.id),
          dispatch: dispatch,
        });
      } else {
        localStorage.removeItem("stcart");
        dispatch(clearCart());
      }
      dispatch(clearCart());
      reset();
      const view = await confirm({
        confirmText: "View Now",
        title: `Ordered Successful! Your order Id is "${CreateOrder.result?.id}" .`,
        description: "Please, Remember you order id for track your order",
      });
      if (view) router.push(`/order/${CreateOrder.result?.id}`);
    } else {
      toast.error(CreateOrder.message ?? "Error on order adding!");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-300px)] flex-center  max-w-7xl mx-auto p-2">
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="rounded-md  h-full max-h-full p-2 gap-5 box-border flex-col-reverse   w-full md:flex-row flex  overflow-hidden"
      >
        {/* left side  */}
        <div className="w-full flex-1 flex flex-col gap-5">
          {/* user form */}
          <div className="w-full bg-background pb-5 shadow-lg shadow-foreground/20 py-2 gap-3 flex-1 flex flex-col px-3 border border-gray-secondary/40 rounded-md">
            <div className="gap-3 flex flex-col">
              <div className="py-3 gap-2 border-b border-b-gray-secondary">
                <h2 className="text-xl text-blue-secondary dark:text-gray-primary font-bold flex items-center gap-2">
                  <Truck className="text-green-primary" />
                  <span>Shipping and Billing Information</span>
                </h2>
              </div>

              {/* sec a */}
              <div className="flex items-start justify-between gap-4 flex-col">
                <div className="flex w-full gap-3">
                  <div className="flex flex-col space-y-1 flex-1 w-full">
                    <label htmlFor="receiverName">{"Receiver's Name:*"}</label>
                    <Input
                      className="h-10 text-lg"
                      id="receiverName"
                      type="text"
                      placeholder="Enter Name"
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

                  <div className="flex flex-col space-y-1 flex-1 w-full">
                    <label htmlFor="receiverPhone">
                      {"Receiver's Phone:*"}
                    </label>
                    <Input
                      className="h-10 text-lg"
                      id="receiverPhone"
                      placeholder="Enter Phone.(eg: 01700000000)"
                      {...register("receiverPhone", {
                        required: {
                          value: true,
                          message: "Phone is Required!",
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
                    {errors?.receiverPhone && (
                      <InputErrorMessage>
                        {errors.receiverPhone.message}
                      </InputErrorMessage>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="email">{"Receiver's Email (optimal):"}</label>
                  <Input
                    className="h-10 text-lg"
                    id="email"
                    type="email"
                    placeholder="Enter Receiver Email"
                    {...register("receiverEmail", {})}
                  />
                  {errors?.receiverEmail && (
                    <InputErrorMessage>
                      {errors.receiverEmail.message}
                    </InputErrorMessage>
                  )}
                </div>

                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="address">
                    {"Receiver's Full Address:*"}{" "}
                  </label>
                  <Input
                    className="h-10 text-lg"
                    id="address"
                    placeholder="House No, Road No, Area, District"
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
                  <label htmlFor="address">{"Delivery Area:*"} </label>
                  <Controller
                    control={control}
                    name="deliveryArea"
                    rules={{
                      required: "Delivery Area is required!",
                    }}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full h-10!">
                          <SelectValue placeholder="Select Delivery Area" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Delivery Areas</SelectLabel>

                            {DeliveryAreas.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value ?? ""}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors?.deliveryArea && (
                    <InputErrorMessage>
                      {errors.deliveryArea.message}
                    </InputErrorMessage>
                  )}
                </div>

                <div className="grid grid-cols-1 space-y-1 flex-1 w-full">
                  <label htmlFor="customerNote">Note (optimal):</label>
                  <Textarea
                    id="customerNote"
                    placeholder="Enter your note..."
                    {...register("customerNote", {
                      maxLength: {
                        value: 200,
                        message: "Max 200 characters!",
                      },
                    })}
                    className="max-h-16"
                  />
                  {errors?.customerNote && (
                    <InputErrorMessage>
                      {errors.customerNote.message}
                    </InputErrorMessage>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment methods add */}
          <div className="w-full py-2 bg-background shadow-lg pb-5 shadow-foreground/20 gap-3 flex-1 flex flex-col px-3 border border-gray-secondary/40 rounded-md">
            <div className="gap-3 flex flex-col">
              <div className="py-3 gap-2 border-b border-b-gray-secondary">
                <h2 className="text-xl text-blue-secondary dark:text-gray-primary font-bold flex items-center gap-2">
                  <Wallet className="text-green-primary" />
                  <span>Select Payment Method</span>
                </h2>
              </div>
              {PaymentMethodsInfo &&
                PaymentMethodsInfo.length > 0 &&
                PaymentMethodsInfo.map(
                  ({ label, description, icon: Icon, value }, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => console.log(value)}
                      className="flex bg-violet-primary/20 justify-between cursor-pointer items-center border-2 px-3 py-1 rounded-md  border-green-primary"
                    >
                      <div className="flex items-center justify-start gap-2">
                        <span className="text-4xl">
                          <Icon />
                        </span>

                        <span className="flex flex-col justify-center items-start ">
                          <span className="text-2xl font-bold">{label}</span>
                          <span className="text-sm text-gray-secondary">
                            {description}
                          </span>
                        </span>
                      </div>
                      <span>
                        <GrRadialSelected />
                      </span>
                    </button>
                  ),
                )}
            </div>
          </div>

          {/* order button */}
          <div className={`w-full flex-center flex-col gap-2 flex md:hidden`}>
            <button
              className="w-full disabled:invert-25"
              disabled={isSubmitting || cart?.items.length === 0 || !cart}
              type="submit"
              onClick={() => console.log("object")}
            >
              <SpeacialOrderButton>
                <div className="flex items-center w-fit gap-2">
                  {isSubmitting && (
                    <span className="animate-spin">
                      <Loader />
                    </span>
                  )}
                  <span>Confirm Order</span> <RiVerifiedBadgeFill />
                </div>
              </SpeacialOrderButton>
            </button>
            {(!cart || cart?.items.length === 0) && (
              <InputErrorMessage>
                Please Add Item to Your Cart
              </InputErrorMessage>
            )}
            <span className="flex items-center text-gray-secondary text-sm">
              <RiLockFill />
              <span>100% Secure Checkout Process</span>
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/3 h-fit shadow-lg shadow-foreground/20 lg:max-w-2/5  bg-background py-3  overflow-x-hidden overflow-y-auto scrollbar-thumb-gray-secondary/50 px-3  flex flex-col border border-gray-secondary/40 rounded-md ">
          <div className="border-b border-b-gray-secondary">
            <div>
              <div className="flex justify-between items-center text-blue-secondary dark:text-gray-primary">
                <span className="text-xl py-3 font-bold flex items-center gap-2">
                  <Handbag className="text-green-primary " />
                  <span>Order Summery</span>
                </span>
                <div></div>
              </div>
            </div>
          </div>
          <div className="py-3  h-full max-h-110 w-full  overflow-x-hidden overflow-y-auto  max-w-full  flex flex-col  gap-3 box-border">
            {cart && cart.items.length > 0 ? (
              cart.items.map(({ title, product, qty, id }, index) => (
                <div key={index} className="w-full flex flex-col">
                  <CartProductItemOrder
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
                </div>
              ))
            ) : (
              <>
                <NoItemsFound />
                <Button asChild className="w-fit mx-auto">
                  <Link href={"/products"}>Continue Shopping</Link>
                </Button>
              </>
            )}
          </div>
          <CouponForm />

          <hr className="py-1" />

          <div className=" flex flex-col gap-2 ">
            <div className="flex justify-between items-center flex-col">
              {/* sub total */}
              <div className=" space-x-2 flex w-full justify-between items-center">
                <span className="text-gray-secondary font-semibold">
                  Sub Total
                </span>
                <span className="text-gray-primary font-bold">
                  ৳
                  {cart?.items.length
                    ? cart?.items.reduce(
                        (total, item) =>
                          total +
                          (item.product.discount && item.product.discountPrice
                            ? item.product?.discountPrice
                            : item.price) *
                            item.qty,
                        0,
                      )
                    : 0}
                </span>
              </div>
              {/* Delivery */}
              <div className=" space-x-2 flex w-full justify-between items-center">
                <span className="text-gray-secondary font-semibold">
                  Delivery Charge
                </span>
                <span className="text-gray-primary font-bold">
                  ৳{deliveryCharge}
                </span>
              </div>

              <hr className="w-full bg-foreground text-foreground" />
              {/* total  */}
              <div className=" space-x-2 flex w-full justify-between items-center text-lg text-blue-secondary dark:text-gray-primary py-2">
                <span className=" font-bold">Grand Total</span>
                <span className="font-bold">
                  ৳
                  {(cart?.items.reduce(
                    (total, item) =>
                      total +
                      (item.product.discount && item.product.discountPrice
                        ? item.product?.discountPrice
                        : item.price) *
                        item.qty,
                    0,
                  ) ?? 0) + deliveryCharge}
                </span>
              </div>
            </div>
          </div>
          {/* order button */}
          <div className={`w-full flex-center flex-col gap-2 hidden md:flex`}>
            <button
              className="w-full disabled:invert-25"
              disabled={isSubmitting || cart?.items.length === 0 || !cart}
              type="submit"
              onClick={() => console.log("object")}
            >
              <SpeacialOrderButton>
                <div className="flex items-center w-fit gap-2">
                  {isSubmitting && (
                    <span className="animate-spin">
                      <Loader />
                    </span>
                  )}
                  <span>Confirm Order</span> <RiVerifiedBadgeFill />
                </div>
              </SpeacialOrderButton>
            </button>
            {(!cart || cart?.items.length === 0) && (
              <InputErrorMessage>
                Please Add Item to Your Cart
              </InputErrorMessage>
            )}
            <span className="flex items-center text-gray-secondary text-sm">
              <RiLockFill />
              <span>100% Secure Checkout Process</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
