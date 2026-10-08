"use client";

import {
  ArrowLeft,
  Check,
  Handbag,
  Loader,
  LockKeyhole,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { RootState } from "@/redux/store";

import { deleteCart, handleDeleteCartItem, loadCart } from "@/lib/api";

import { clearCart } from "@/redux/features/cart/cartSlice";

import { DeliveryAreas, ProductDefaultImage } from "@/components/data/core";

import {
  InputErrorMessage,
  NoItemsFound,
} from "@/components/uiComponent/uiCom";

import { CartProductItemOrder } from "@/components/uiComponent/CartRelated";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";

import { OrderFormData, PaymentMethodsInfo } from "@/lib/formDataTypes";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import CouponForm from "@/components/common/forms/coupon";
import {
  handleBkashPayment,
  handleSSLCPayment,
  handleStripePayment,
} from "@/components/actions/Payment/Buttons";
import { BiMoney } from "react-icons/bi";

const CheckoutClientPage = () => {
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

  const [paymentMethod, setPaymentMethod] = useState(
    PaymentMethodsInfo[0]?.value ?? "",
  );

  const selectedPayment = PaymentMethodsInfo.find(
    (item) => item.value === paymentMethod,
  );

  const subtotal = useMemo(() => {
    if (!cart?.items?.length) return 0;

    return cart.items.reduce((total, item) => {
      const price =
        item.product.discount && item.product.discountPrice
          ? Number(item.product.discountPrice)
          : Number(item.price);

      return total + price * Number(item.qty);
    }, 0);
  }, [cart]);

  const deliveryArea = useWatch({
    control: control,
    name: "deliveryArea",
  });

  const deliveryCharge =
    DeliveryAreas.find((item) => item.value === deliveryArea)?.charge ?? 0;

  const grandTotal = subtotal + deliveryCharge;

  // after user load or reset form
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

      paymentMethod,

      items: cart?.items,

      userId: session.data?.user?.id ? Number(session.data.user.id) : null,

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
            router.push(`/order/${CreateOrder.result?.publicId}`);
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

      if (paymentMethod !== "COD") {
        if (paymentMethod === "BKASH")
          await handleBkashPayment({ orderId: CreateOrder.result?.id });
        if (paymentMethod === "SSLCOMMERZ")
          await handleSSLCPayment({ orderId: CreateOrder.result?.id });
        if (paymentMethod === "STRIPE")
          await handleStripePayment({ orderId: CreateOrder.result?.id });
      } else {
        const view = await confirm({
          confirmText: "View Now",
          title: `Ordered Successful! Your order Id is "${CreateOrder.result?.id}" .`,
          description: "Please, Remember you order id for track your order",
        });

        if (view) router.push(`/order/${CreateOrder.result?.publicId}`);
      }
    } else {
      toast.error(CreateOrder.message ?? "Error on order adding!");
    }
  };

  return (
    <main className="bg-muted/30 min-h-screen">
      <form id="checkout-form" onSubmit={handleSubmit(handleSubmitData)}>
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          {/* ===================================================== */}
          {/* HEADER                                                */}
          {/* ===================================================== */}

          <header className="mb-6 flex items-center justify-between">
            <div>
              <button
                type="button"
                onClick={() => router.back()}
                className="group text-muted-foreground hover:text-foreground mb-3 flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Back to cart
              </button>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Checkout
              </h1>

              <p className="text-muted-foreground mt-1 text-sm">
                Complete your order securely.
              </p>
            </div>

            <div className="bg-background hidden items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium sm:flex">
              <LockKeyhole className="size-4 text-emerald-600" />
              Secure checkout
            </div>
          </header>

          {/* ===================================================== */}
          {/* CHECKOUT GRID                                         */}
          {/* ===================================================== */}

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* =================================================== */}
            {/* LEFT                                                 */}
            {/* =================================================== */}

            <div className="space-y-5">
              {/* DELIVERY CARD */}

              <section className="bg-background overflow-hidden rounded-2xl border shadow-sm">
                <div className="flex items-start gap-4 border-b px-5 py-5 sm:px-6">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <Truck className="size-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-xs font-bold">
                        STEP 1
                      </span>

                      <Check className="hidden size-4 text-emerald-600" />
                    </div>

                    <h2 className="mt-1 text-lg font-bold">
                      Delivery information
                    </h2>

                    <p className="text-muted-foreground text-sm">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  {/* NAME + PHONE */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="receiverName"
                        className="text-sm font-semibold"
                      >
                        Full name
                      </label>

                      <Input
                        id="receiverName"
                        placeholder="Your full name"
                        autoComplete="name"
                        {...register("receiverName", {
                          required: "Please enter your name.",
                        })}
                      />

                      {errors.receiverName && (
                        <InputErrorMessage>
                          {errors.receiverName.message}
                        </InputErrorMessage>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="receiverPhone"
                        className="text-sm font-semibold"
                      >
                        Phone number
                      </label>

                      <Input
                        id="receiverPhone"
                        placeholder="01XXXXXXXXX"
                        inputMode="tel"
                        autoComplete="tel"
                        {...register("receiverPhone", {
                          required: "Please enter your phone number.",
                          minLength: {
                            value: 8,
                            message: "Please enter a valid phone number.",
                          },
                        })}
                      />

                      {errors.receiverPhone && (
                        <InputErrorMessage>
                          {errors.receiverPhone.message}
                        </InputErrorMessage>
                      )}
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div className="space-y-2">
                    <label
                      htmlFor="receiverEmail"
                      className="text-sm font-semibold"
                    >
                      Email
                      <span className="text-muted-foreground ml-1 font-normal">
                        (optional)
                      </span>
                    </label>

                    <Input
                      id="receiverEmail"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...register("receiverEmail")}
                    />
                  </div>

                  {/* ADDRESS */}

                  <div className="space-y-2">
                    <label
                      htmlFor="address"
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <MapPin className="text-muted-foreground size-4" />
                      Delivery address
                    </label>

                    <Textarea
                      id="address"
                      placeholder="House / flat, road, area, landmark..."
                      autoComplete="street-address"
                      className="min-h-24 resize-none"
                      {...register("address", {
                        required: "Please enter your delivery address.",
                      })}
                    />

                    {errors.address && (
                      <InputErrorMessage>
                        {errors.address.message}
                      </InputErrorMessage>
                    )}
                  </div>

                  {/* DELIVERY AREA */}

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">
                      Delivery area
                    </label>

                    <Controller
                      control={control}
                      name="deliveryArea"
                      rules={{
                        required: "Please select a delivery area.",
                      }}
                      render={({ field }) => (
                        <Select
                          value={field.value ?? ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-11 w-full">
                            <SelectValue placeholder="Select your delivery area" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Delivery areas</SelectLabel>

                              {DeliveryAreas.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  <div className="flex w-full items-center justify-between gap-8">
                                    <span>{item.label}</span>

                                    <span className="text-muted-foreground text-xs">
                                      ৳{item.charge}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {errors.deliveryArea && (
                      <InputErrorMessage>
                        {errors.deliveryArea.message}
                      </InputErrorMessage>
                    )}
                  </div>
                </div>
              </section>

              {/* ================================================= */}
              {/* PAYMENT                                            */}
              {/* ================================================= */}

              <section className="bg-background overflow-hidden rounded-2xl border shadow-sm">
                <div className="flex items-start gap-4 border-b px-5 py-5 sm:px-6">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <Wallet className="size-5" />
                  </div>

                  <div>
                    <p className="text-primary text-xs font-bold">STEP 2</p>

                    <h2 className="mt-1 text-lg font-bold">Payment method</h2>

                    <p className="text-muted-foreground text-sm">
                      {"Choose how you'd like to pay."}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 p-5 sm:p-6">
                  {PaymentMethodsInfo.map(
                    ({ label, description, icon: Icon, value }) => {
                      const selected = paymentMethod === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setPaymentMethod(value)}
                          className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                            selected
                              ? "border-primary bg-primary/5 ring-primary/20 ring-2"
                              : "hover:border-primary/40 hover:bg-muted/40"
                          }`}
                        >
                          <div
                            className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                              selected
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {Icon ? (
                              <Icon className="size-6" />
                            ) : (
                              <BiMoney className="size-6" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{label}</span>

                              {selected && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px]"
                                >
                                  Selected
                                </Badge>
                              )}
                            </div>

                            <p className="text-muted-foreground mt-1 text-xs">
                              {description}
                            </p>
                          </div>

                          <div
                            className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              selected
                                ? "border-primary"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {selected && (
                              <div className="bg-primary size-2.5 rounded-full" />
                            )}
                          </div>
                        </button>
                      );
                    },
                  )}

                  {/* NOTE */}

                  <div className="pt-3">
                    <label
                      htmlFor="customerNote"
                      className="text-sm font-semibold"
                    >
                      Delivery note
                      <span className="text-muted-foreground ml-1 font-normal">
                        (optional)
                      </span>
                    </label>

                    <Textarea
                      id="customerNote"
                      placeholder="Any special delivery instructions?"
                      maxLength={200}
                      className="mt-2 min-h-20 resize-none"
                      {...register("customerNote", {
                        maxLength: {
                          value: 200,
                          message: "Maximum 200 characters.",
                        },
                      })}
                    />
                  </div>
                </div>
              </section>

              {/* TRUST */}

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="bg-background flex items-center gap-3 rounded-xl border p-4">
                  <ShieldCheck className="size-5 text-emerald-600" />

                  <div>
                    <p className="text-xs font-semibold">Secure checkout</p>

                    <p className="text-muted-foreground text-[11px]">
                      Your information is protected
                    </p>
                  </div>
                </div>

                <div className="bg-background flex items-center gap-3 rounded-xl border p-4">
                  <Truck className="text-primary size-5" />

                  <div>
                    <p className="text-xs font-semibold">Reliable delivery</p>

                    <p className="text-muted-foreground text-[11px]">
                      Delivered to your address
                    </p>
                  </div>
                </div>

                <div className="bg-background flex items-center gap-3 rounded-xl border p-4">
                  <Phone className="text-primary size-5" />

                  <div>
                    <p className="text-xs font-semibold">Need help?</p>

                    <p className="text-muted-foreground text-[11px]">
                      Contact our support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================== */}
            {/* RIGHT — ORDER SUMMARY                                  */}
            {/* ===================================================== */}

            <aside className="lg:sticky lg:top-5 lg:self-start">
              <section className="bg-background overflow-hidden rounded-2xl border shadow-sm">
                <div className="flex items-center justify-between border-b px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                      <Handbag className="size-5" />
                    </div>

                    <div>
                      <h2 className="font-bold">Your order</h2>

                      <p className="text-muted-foreground text-xs">
                        {cart?.items?.length ?? 0} product(s)
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/profile/cart"
                    className="text-primary text-xs font-semibold hover:underline"
                  >
                    Edit
                  </Link>
                </div>

                {/* PRODUCTS */}

                <div className="max-h-90 divide-y overflow-y-auto">
                  {cart?.items?.length ? (
                    cart.items.map(({ title, product, qty, id }) => (
                      <div key={id} className="p-4">
                        <CartProductItemOrder
                          deleteCartItem={handleDeleteCartItem}
                          id={id ?? 0}
                          image={product.images[0] ?? ProductDefaultImage}
                          price={Number(
                            product.discount
                              ? product.discountPrice
                              : product.price,
                          )}
                          productCode={product.productCode}
                          qty={qty}
                          title={title}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4 p-6 text-center">
                      <NoItemsFound />

                      <Button asChild>
                        <Link href="/products">Continue shopping</Link>
                      </Button>
                    </div>
                  )}
                </div>

                {/* COUPON */}

                {cart?.items?.length ? (
                  <div className="border-t p-4">
                    <CouponForm />
                  </div>
                ) : null}

                {/* TOTAL */}

                <div className="border-t p-5">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>

                      <span className="font-medium">
                        ৳{subtotal.toLocaleString("en-BD")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>

                      <span className="font-medium">৳{deliveryCharge}</span>
                    </div>

                    <Separator />

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-bold">Total</p>

                        <p className="text-muted-foreground text-xs">
                          Including delivery
                        </p>
                      </div>

                      <p className="text-2xl font-bold">
                        ৳{grandTotal.toLocaleString("en-BD")}
                      </p>
                    </div>
                  </div>

                  {/* DESKTOP CTA */}

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-5 hidden h-12 w-full text-base font-bold md:flex"
                    disabled={
                      isSubmitting || !cart?.items?.length || !paymentMethod
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="mr-2 size-4 animate-spin" />
                        Placing order...
                      </>
                    ) : (
                      <>
                        <LockKeyhole className="mr-2 size-4" />
                        Place order · ৳{grandTotal.toLocaleString("en-BD")}
                      </>
                    )}
                  </Button>

                  <p className="text-muted-foreground mt-3 hidden items-center justify-center gap-1.5 text-center text-[11px] md:flex">
                    <LockKeyhole className="size-3" />
                    Secure checkout
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </form>
      {/* ========================================================= */}
      {/* MOBILE STICKY CHECKOUT BAR                                */}
      {/* ========================================================= */}

      <div className="bg-background/95 sticky bottom-12 z-40 border-t p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-[11px]">Total</p>

            <p className="truncate text-lg font-bold">
              ৳{grandTotal.toLocaleString("en-BD")}
            </p>
          </div>

          <Button
            type="submit"
            form="checkout-form"

            size="lg"
            className="h-12 min-w-42 font-bold"
            disabled={isSubmitting || !cart?.items?.length || !paymentMethod}
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 size-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <LockKeyhole className="mr-2 size-4" />
                Place Order
              </>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutClientPage;

// useful functions for this page
