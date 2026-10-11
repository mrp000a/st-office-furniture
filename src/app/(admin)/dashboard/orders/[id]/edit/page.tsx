"use client";

import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  CreditCard,
  Loader,
  MapPin,
  Minus,
  Package,
  Plus,
  Save,
  Search,
  ShoppingBag,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import {
  DeliveryAreas as DeliveryAreaOptions,
  orderStatuses2,
} from "@/components/data/core";
import {
  DeliveryAreas,
  PaymentMethods,
  PaymentStatus,
} from "@/generated/prisma";

type ProductOption = {
  id: number;
  title: string;
  productCode: string;
  price: number;
  discountPrice: number | null;
  discount: number | null;
};

type EditOrderForm = {
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  address: string;
  deliveryArea: DeliveryAreas;
  customerNote: string;
  paymentMethod: PaymentMethods;
  paymentStatus: PaymentStatus;
  status: string;
  shippingCost: number;
  discountAmount: number;
  paidAmount: number;
  items: { productId: number; qty: number }[];
};

const money = (value: number) =>
  `৳${Number(value || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const inputClass =
  "h-11 rounded-xl bg-background shadow-none focus-visible:ring-2 focus-visible:ring-primary/20";
const selectClass =
  "border-input bg-background h-11 w-full min-w-0 rounded-xl border px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

function Field({
  label,
  error,
  className = "",
  hint,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`min-w-0 space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium">{label}</label>
      {children}
      {hint && !error && (
        <p className="text-muted-foreground text-xs">{hint}</p>
      )}
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
  trailing,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <h2 className="font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-0.5 text-sm">{description}</p>
        </div>
      </div>
      {trailing}
    </div>
  );
}

export default function EditOrderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [productSearch, setProductSearch] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<EditOrderForm>({
    defaultValues: {
      deliveryArea: "INSIDE_DHAKA",
      paymentMethod: "COD",
      paymentStatus: "PENDING",
      status: "PENDING",
      shippingCost: 0,
      discountAmount: 0,
      paidAmount: 0,
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const values = useWatch({ control });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [orderResponse, productResponse] = await Promise.all([
          fetch(`/api/order/id?orderId=${encodeURIComponent(id)}`),
          fetch("/api/products?limit=1000"),
        ]);

        const orderData = await orderResponse.json();
        const productData = await productResponse.json();

        if (!orderResponse.ok || !orderData.success) {
          throw new Error(orderData.message ?? "Unable to load order.");
        }
        if (!productResponse.ok) {
          throw new Error(
            "Order loaded, but the product list could not be loaded.",
          );
        }
        if (!active) return;

        setProducts(productData.result ?? []);
        const order = orderData.result;
        reset({
          receiverName: order.receiverName ?? "",
          receiverPhone: order.receiverPhone ?? "",
          receiverEmail: order.receiverEmail ?? "",
          address: order.address ?? "",
          deliveryArea: order.deliveryArea,
          customerNote: order.customerNote ?? "",
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          status: order.status,
          shippingCost: Number(order.shippingCost ?? 0),
          discountAmount: Number(order.discountAmount ?? 0),
          paidAmount: Number(order.paidAmount ?? 0),
          items: (order.items ?? []).map(
            (item: { productId: number | null; qty: number }) => ({
              productId: item.productId ?? 0,
              qty: item.qty,
            }),
          ),
        });
      } catch (error) {
        if (active) {
          const message =
            error instanceof Error ? error.message : "Unable to load order.";
          setLoadError(message);
          toast.error(message);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [id, reset]);

  const getProductPrice = (product?: ProductOption) => {
    if (!product) return 0;
    return product.discountPrice != null &&
      product.discountPrice < product.price
      ? Number(product.discountPrice)
      : Number(product.price);
  };

  const subtotal = useMemo(
    () =>
      (values.items ?? []).reduce((sum, item) => {
        const product = products.find(
          (option) => option.id === Number(item.productId),
        );
        return (
          sum + getProductPrice(product) * Math.max(0, Number(item.qty || 0))
        );
      }, 0),
    [products, values.items],
  );

  const shippingCost = Math.max(0, Number(values.shippingCost || 0));
  const discountAmount = Math.max(0, Number(values.discountAmount || 0));
  const paidAmount = Math.max(0, Number(values.paidAmount || 0));
  const total = Math.max(0, subtotal + shippingCost - discountAmount);
  const dueAmount = Math.max(0, total - paidAmount);
  const itemCount = (values.items ?? []).reduce(
    (sum, item) => sum + Math.max(0, Number(item.qty || 0)),
    0,
  );

  const availableProducts = useMemo(() => {
    const query = productSearch.trim().toLowerCase();
    return products
      .filter((product) =>
        `${product.title} ${product.productCode}`.toLowerCase().includes(query),
      )
      .slice(0, 8);
  }, [products, productSearch]);

  function addProduct(product: ProductOption) {
    const existingIndex = fields.findIndex(
      (field) => field.productId === product.id,
    );
    if (existingIndex >= 0) {
      const currentQty = Number(values.items?.[existingIndex]?.qty ?? 0);
      setValue(`items.${existingIndex}.qty`, currentQty + 1, {
        shouldDirty: true,
        shouldValidate: true,
      });
      toast.success("Quantity increased for existing product.");
    } else {
      append({ productId: product.id, qty: 1 });
      toast.success("Product added to order.");
    }
    setProductSearch("");
  }

  async function submit(data: EditOrderForm) {
    if (data.items.length === 0) {
      toast.error("Add at least one product before saving.");
      return;
    }
    if (
      data.items.some(
        (item) => !item.productId || item.qty < 1 || !Number.isFinite(item.qty),
      )
    ) {
      toast.error("Check product selections and quantities.");
      return;
    }
    if (data.paidAmount > total) {
      toast.error("Paid amount cannot exceed the order total.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id), ...data, subtotal, total }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Unable to save order.");
      }
      toast.success("Order updated successfully.");
      router.push(`/dashboard/orders/${id}`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to save order.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center p-6">
        <div className="bg-card flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-sm">
          <Loader className="text-primary size-5 animate-spin" />
          <div>
            <p className="font-medium">Loading order details</p>
            <p className="text-muted-foreground text-sm">
              Preparing the editor…
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="mx-auto max-w-3xl p-4 sm:p-6">
        <div className="border-destructive/30 bg-destructive/5 rounded-2xl border p-6">
          <CircleAlert className="text-destructive mb-3 size-8" />
          <h1 className="text-xl font-semibold">Could not open this order</h1>
          <p className="text-muted-foreground mt-2 text-sm">{loadError}</p>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 size-4" /> Go back
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1500px] space-y-5 px-3 pt-4 pb-28 sm:space-y-6 sm:px-6 sm:pb-8 lg:px-8">
      <header className="bg-card overflow-hidden rounded-2xl border shadow-sm">
        <div className="from-primary/[0.10] via-primary/[0.04] bg-gradient-to-br to-transparent p-4 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="bg-background mt-0.5 size-10 shrink-0 rounded-xl"
                onClick={() => router.back()}
                aria-label="Go back"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
                    Order management
                  </span>
                  <span className="bg-background/80 rounded-full border px-2.5 py-1 text-xs font-medium">
                    #{id}
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Edit order
                </h1>
                <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
                  Update customer details, items, fulfillment, and payment in
                  one place.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" form="edit-order-form" disabled={saving}>
                {saving ? (
                  <Loader className="mr-2 size-4 animate-spin" />
                ) : (
                  <Save className="mr-2 size-4" />
                )}
                Save changes
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x border-t sm:grid-cols-4">
          <div className="p-4 sm:px-5">
            <p className="text-muted-foreground text-xs">Order total</p>
            <p className="mt-1 text-lg font-bold tabular-nums sm:text-xl">
              {money(total)}
            </p>
          </div>
          <div className="p-4 sm:px-5">
            <p className="text-muted-foreground text-xs">Items</p>
            <p className="mt-1 text-lg font-bold tabular-nums sm:text-xl">
              {itemCount}
            </p>
            <p className="text-muted-foreground text-xs">
              {fields.length} product lines
            </p>
          </div>
          <div className="border-t p-4 sm:border-t-0 sm:px-5">
            <p className="text-muted-foreground text-xs">Paid</p>
            <p className="mt-1 text-lg font-bold text-emerald-600 tabular-nums sm:text-xl">
              {money(paidAmount)}
            </p>
          </div>
          <div className="border-t p-4 sm:border-t-0 sm:px-5">
            <p className="text-muted-foreground text-xs">Balance due</p>
            <p
              className={`mt-1 text-lg font-bold tabular-nums sm:text-xl ${dueAmount > 0 ? "text-amber-600" : "text-emerald-600"}`}
            >
              {money(dueAmount)}
            </p>
          </div>
        </div>
      </header>

      <form
        id="edit-order-form"
        onSubmit={handleSubmit(submit)}
        className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_370px] xl:gap-6"
      >
        <div className="min-w-0 space-y-5">
          <section className="bg-card min-w-0 rounded-2xl border p-4 shadow-sm sm:p-6">
            <SectionHeading
              icon={UserRound}
              title="Customer & delivery"
              description="Who receives the order and where it should go."
            />
            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              <Field label="Customer name" error={errors.receiverName?.message}>
                <Input
                  className={inputClass}
                  placeholder="Enter full name"
                  autoComplete="name"
                  {...register("receiverName", {
                    required: "Name is required.",
                  })}
                />
              </Field>
              <Field
                label="Phone number"
                error={errors.receiverPhone?.message}
                hint="Use the number the delivery team can reach."
              >
                <Input
                  className={inputClass}
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  autoComplete="tel"
                  {...register("receiverPhone", {
                    required: "Phone is required.",
                  })}
                />
              </Field>
              <Field
                label="Email address"
                error={errors.receiverEmail?.message}
              >
                <Input
                  className={inputClass}
                  type="email"
                  placeholder="customer@example.com"
                  autoComplete="email"
                  {...register("receiverEmail")}
                />
              </Field>
              <Field label="Delivery area" error={errors.deliveryArea?.message}>
                <select className={selectClass} {...register("deliveryArea")}>
                  {DeliveryAreaOptions.map((area) => (
                    <option key={area.value} value={area.value}>
                      {area.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Delivery address"
                error={errors.address?.message}
                className="sm:col-span-2"
              >
                <Textarea
                  className="min-h-24 resize-y rounded-xl"
                  placeholder="House, road, area, city and any delivery directions"
                  {...register("address", { required: "Address is required." })}
                />
              </Field>
              <Field
                label="Customer note"
                error={errors.customerNote?.message}
                hint="Optional instructions or requests from the customer."
                className="sm:col-span-2"
              >
                <Textarea
                  className="min-h-20 resize-y rounded-xl"
                  placeholder="Add a note for the order…"
                  {...register("customerNote")}
                />
              </Field>
            </div>
          </section>

          <section className="bg-card min-w-0 rounded-2xl border p-4 shadow-sm sm:p-6">
            <SectionHeading
              icon={ShoppingBag}
              title="Order items"
              description="Search the catalogue and adjust products and quantities."
              trailing={
                <span className="bg-muted shrink-0 rounded-full px-3 py-1 text-xs font-medium">
                  {fields.length} {fields.length === 1 ? "line" : "lines"}
                </span>
              }
            />

            <div className="relative mb-4">
              <div className="relative">
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  className={`${inputClass} pl-9`}
                  value={productSearch}
                  onChange={(event) => setProductSearch(event.target.value)}
                  placeholder="Search by product name or product code…"
                  aria-label="Search products"
                />
              </div>
              {productSearch.trim() && (
                <div className="bg-popover absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border p-1 shadow-xl">
                  {availableProducts.length ? (
                    availableProducts.map((product) => {
                      const alreadyAdded = fields.some(
                        (field) => field.productId === product.id,
                      );
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => addProduct(product)}
                          className="hover:bg-muted flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium">
                              {product.title}
                            </span>
                            <span className="text-muted-foreground mt-0.5 block text-xs">
                              {product.productCode}
                            </span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2 text-sm font-semibold">
                            {money(getProductPrice(product))}
                            {alreadyAdded ? (
                              <Plus className="text-primary size-4" />
                            ) : (
                              <span className="text-primary">Add</span>
                            )}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-muted-foreground px-3 py-4 text-center text-sm">
                      No matching products found.
                    </p>
                  )}
                  {availableProducts.length === 8 && (
                    <p className="text-muted-foreground border-t px-3 py-2 text-xs">
                      Showing the first 8 matches. Refine your search for more
                      specific results.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => {
                const selectedId = Number(values.items?.[index]?.productId);
                const product = products.find(
                  (option) => option.id === selectedId,
                );
                const qty = Math.max(
                  0,
                  Number(values.items?.[index]?.qty || 0),
                );
                const unitPrice = getProductPrice(product);
                const lineTotal = unitPrice * qty;

                return (
                  <div
                    key={field.id}
                    className="bg-background rounded-xl border p-3 sm:p-4"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-xl">
                        <Package className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold break-words">
                          {product?.title ?? "Select a product"}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-xs">
                          {product?.productCode ??
                            "Choose an item from the catalogue"}
                        </p>
                        <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_112px]">
                          <Field
                            label="Product"
                            error={errors.items?.[index]?.productId?.message}
                          >
                            <Controller
                              control={control}
                              name={`items.${index}.productId`}
                              rules={{
                                validate: (value) =>
                                  value > 0 || "Select a product.",
                              }}
                              render={({ field }) => (
                                <Select
                                  value={
                                    field.value > 0 ? String(field.value) : ""
                                  }
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                >
                                  <SelectTrigger className="h-11 w-full rounded-xl">
                                    <SelectValue placeholder="Select a product…" />
                                  </SelectTrigger>

                                  <SelectContent>
                                    {products.map((option) => (
                                      <SelectItem
                                        key={option.id}
                                        value={String(option.id)}
                                      >
                                        {option.title} —{" "}
                                        {money(getProductPrice(option))}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </Field>

                          <Field
                            label="Quantity"
                            error={errors.items?.[index]?.qty?.message}
                          >
                            <div className="flex h-11 items-center rounded-xl border">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                className="text-muted-foreground hover:bg-muted flex h-full w-9 shrink-0 items-center justify-center disabled:opacity-40"
                                disabled={qty <= 1}
                                onClick={() =>
                                  setValue(
                                    `items.${index}.qty`,
                                    Math.max(1, qty - 1),
                                    { shouldDirty: true, shouldValidate: true },
                                  )
                                }
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <input
                                type="number"
                                min={1}
                                className="h-full w-full min-w-0 bg-transparent text-center text-sm font-semibold outline-none"
                                {...register(`items.${index}.qty`, {
                                  valueAsNumber: true,
                                  min: { value: 1, message: "At least 1." },
                                  required: "Quantity is required.",
                                })}
                              />
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                className="text-muted-foreground hover:bg-muted flex h-full w-9 shrink-0 items-center justify-center"
                                onClick={() =>
                                  setValue(`items.${index}.qty`, qty + 1, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  })
                                }
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                          </Field>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive size-9 shrink-0"
                        onClick={() => remove(index)}
                        aria-label={`Remove ${product?.title ?? "product"}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3 border-t pt-3 text-sm">
                      <span className="text-muted-foreground">
                        {money(unitPrice)}{" "}
                        <span className="text-xs">× {qty}</span>
                      </span>
                      <span className="font-semibold tabular-nums">
                        {money(lineTotal)}
                      </span>
                    </div>
                  </div>
                );
              })}

              {fields.length === 0 && (
                <div className="rounded-xl border border-dashed px-4 py-10 text-center">
                  <div className="bg-muted mx-auto flex size-12 items-center justify-center rounded-2xl">
                    <ShoppingBag className="text-muted-foreground size-5" />
                  </div>
                  <p className="mt-3 font-medium">No products in this order</p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Search above to add the first item.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="bg-card rounded-2xl border p-4 shadow-sm sm:p-6">
            <SectionHeading
              icon={ClipboardList}
              title="Fulfillment & payment"
              description="Keep the order status and payment records up to date."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Order status" error={errors.status?.message}>
                <select className={selectClass} {...register("status")}>
                  {orderStatuses2.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Payment method"
                error={errors.paymentMethod?.message}
              >
                <select className={selectClass} {...register("paymentMethod")}>
                  {Object.values(PaymentMethods).map((method) => (
                    <option key={method} value={method}>
                      {method.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Payment status"
                error={errors.paymentStatus?.message}
              >
                <select className={selectClass} {...register("paymentStatus")}>
                  {Object.values(PaymentStatus).map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Paid amount (৳)"
                error={errors.paidAmount?.message}
                hint="Amount already received from the customer."
              >
                <Input
                  className={inputClass}
                  type="number"
                  min={0}
                  step="0.01"
                  {...register("paidAmount", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Cannot be negative." },
                  })}
                />
              </Field>
            </div>
            <div className="bg-muted/60 text-muted-foreground mt-4 flex items-start gap-2 rounded-xl p-3 text-xs">
              <BadgeCheck className="mt-0.5 size-4 shrink-0" />
              <p>
                Make sure the payment status matches the actual payment record
                before saving. Changing the status here does not itself collect
                a payment.
              </p>
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-5">
          <section className="bg-card rounded-2xl border p-4 shadow-sm sm:p-5">
            <SectionHeading
              icon={CreditCard}
              title="Price summary"
              description="Charges update as you edit the order."
            />

            <div className="space-y-4">
              <Field
                label="Delivery charge (৳)"
                error={errors.shippingCost?.message}
              >
                <Input
                  className={inputClass}
                  type="number"
                  min={0}
                  step="0.01"
                  {...register("shippingCost", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Cannot be negative." },
                  })}
                />
              </Field>
              <Field
                label="Order discount (৳)"
                error={errors.discountAmount?.message}
              >
                <Input
                  className={inputClass}
                  type="number"
                  min={0}
                  step="0.01"
                  {...register("discountAmount", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Cannot be negative." },
                  })}
                />
              </Field>
            </div>

            <div className="mt-5 space-y-3 border-t pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Items subtotal</span>
                <span className="font-medium tabular-nums">
                  {money(subtotal)}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Truck className="size-4" /> Delivery
                </span>
                <span className="font-medium tabular-nums">
                  {money(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium text-emerald-600 tabular-nums">
                  −{money(discountAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t pt-4">
                <span className="font-semibold">Order total</span>
                <span className="text-xl font-bold tabular-nums">
                  {money(total)}
                </span>
              </div>
            </div>

            <div className="bg-muted/70 mt-4 rounded-xl p-4">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Banknote className="size-4" /> Paid so far
                </span>
                <span className="font-semibold tabular-nums">
                  {money(paidAmount)}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Outstanding</span>
                <span
                  className={`text-lg font-bold tabular-nums ${dueAmount > 0 ? "text-amber-600" : "text-emerald-600"}`}
                >
                  {money(dueAmount)}
                </span>
              </div>
              {paidAmount > total ? (
                <p className="text-destructive mt-2 flex items-center gap-1.5 text-xs">
                  <CircleAlert className="size-3.5" /> Paid amount exceeds the
                  order total.
                </p>
              ) : dueAmount === 0 ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
                  <CheckCircle2 className="size-3.5" /> No remaining balance.
                </p>
              ) : null}
            </div>

            {discountAmount > subtotal + shippingCost && (
              <p className="mt-3 flex items-start gap-2 text-xs text-amber-600">
                <CircleAlert className="mt-0.5 size-4 shrink-0" />
                Discount is greater than the current subtotal plus delivery. The
                total is capped at ৳0.
              </p>
            )}
            <Button
              className="mt-5 hidden w-full rounded-xl sm:flex"
              type="submit"
              disabled={saving}
            >
              {saving ? (
                <Loader className="mr-2 size-4 animate-spin" />
              ) : (
                <Save className="mr-2 size-4" />
              )}
              {saving ? "Saving order…" : "Save order changes"}
            </Button>
            <p className="text-muted-foreground mt-3 hidden text-center text-xs sm:block">
              {isDirty
                ? "You have unsaved changes."
                : "Changes will be saved when you submit."}
            </p>
          </section>

          <section className="bg-card rounded-2xl border p-4 shadow-sm sm:p-5">
            <div className="flex items-start gap-3">
              <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-xl">
                <MapPin className="text-muted-foreground size-5" />
              </div>
              <div>
                <h3 className="font-semibold">Before you save</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Review the delivery contact, selected products, quantities,
                  and outstanding balance. Confirm that the order and payment
                  statuses reflect the real order.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </form>

      <div className="bg-background/95 fixed inset-x-0 bottom-0 z-30 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-xs">Order total</p>
            <p className="truncate text-lg font-bold tabular-nums">
              {money(total)}
            </p>
          </div>
          <Button
            type="submit"
            form="edit-order-form"
            disabled={saving}
            className="h-11 shrink-0 rounded-xl px-5"
          >
            {saving ? (
              <Loader className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            Save order
          </Button>
        </div>
      </div>
    </main>
  );
}
