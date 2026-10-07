"use client";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";
import { Edit3Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Gender,
  OrderStatus,
  PaymentMethods,
  PaymentStatus,
  UserRole,
} from "@/generated/prisma";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getImageUrlProduct } from "@/lib/getImageUrl";
import { deleteOrder } from "@/lib/api";
import { formatDate } from "@/lib/secApi";

type ordersType = {
  subtotal: number;
  discountAmount: number | null;
  total: number | null;
  shippingCost: number | null;
  user: {
    id: number;
    name: string;
    role: UserRole;
    phone: string | null;
    email: string;
    password: string;
    image: string | null;
    gender: Gender | null;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  _count: {
    items: number;
  };
  id: number;
  status: OrderStatus;
  receiverName: string;
  receiverEmail: string | null;
  receiverPhone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethods;
  publicId: string | null;
};

const MobileOrderCard = ({
  order: {
    id,
    receiverName,
    receiverEmail,
    receiverPhone,
    address,
    user,
    status,
    total,
    _count,
    createdAt,
    publicId,
  },
}: {
  order: ordersType;
}) => {
  const router = useRouter();
  const { confirm } = useAlertDialog();
  return (
    <Card key={id} className="overflow-hidden rounded-xl border shadow-sm">
      {/* Header */}
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-muted-foreground text-xs">Order</p>
            <p className="font-semibold">#{id}</p>
          </div>

          <OrderStatusBadge status={status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* Customer */}
        <div className="flex items-center gap-3">
          <Avatar className="size-10 shrink-0">
            <AvatarImage
              alt="userImage"
              src={getImageUrlProduct(user?.image)}
            />
            <AvatarFallback>
              {receiverName?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{receiverName}</p>

            <p className="text-muted-foreground truncate text-xs">
              {receiverEmail}
            </p>

            <p className="text-muted-foreground text-xs">{receiverPhone}</p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-muted/40 rounded-lg p-3">
          <p className="text-muted-foreground mb-1 text-xs font-medium">
            Delivery Address
          </p>

          <p className="text-sm leading-5">{address ?? "N/A"}</p>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-3 gap-1">
          <div className="rounded-lg border p-2.5">
            <p className="text-muted-foreground text-[11px]">Items</p>
            <p className="mt-0.5 font-semibold">{Number(_count.items)}</p>
          </div>

          <div className="rounded-lg border p-2.5">
            <p className="text-muted-foreground text-[11px]">Total</p>
            <p className="mt-0.5 font-semibold">
              ৳{Number(total).toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border p-2.5">
            <p className="text-muted-foreground text-[11px]">Date</p>
            <p className="mt-0.5 truncate text-xs font-medium">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="destructive"
            size="icon"
            className="shrink-0"
            asChild
          >
            <Link href={`/dashboard/orders/${id}`}>
              <Edit3Icon />
            </Link>
          </Button>

          <Button
            onClick={async () => {
              const isConfirm = await confirm({
                confirmText: "Delete",
                description: "Are you sure? The item will be deleted!",
                title: "This action can't be undone!",
              });

              if (!isConfirm) return;

              await deleteOrder({ id });

              router.refresh();
            }}
            size="icon"
            variant="default"
            className="bg-green-primary shrink-0 cursor-pointer"
          >
            <RiDeleteBin6Fill />
          </Button>

          <Button asChild className="flex-1">
            <Link href={`/order/${publicId}`}>View Order</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileOrderCard;
