"use client";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate, formatTime } from "@/lib/secApi";

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

const DesktopOrderCard = ({
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
    <TableRow className="">
      <TableCell className="font-medium">#{id}</TableCell>

      <TableCell>
        <div className="flex items-center justify-start gap-1">
          <span className="relative z-10 inline-block max-h-6 min-h-6 max-w-6 min-w-6 overflow-hidden rounded-full">
            <Avatar className="size-6">
              <AvatarImage
                alt="userImage"
                src={getImageUrlProduct(user?.image)}
              />
              <AvatarFallback>
                {receiverName?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </span>
          <div>
            <p className="font-medium">{receiverName}</p>
            <div className="flex flex-wrap items-center gap-x-2 text-[10px]">
              <p className="text-muted-foreground">{receiverEmail}</p>
              <p className="text-muted-foreground">{receiverPhone}</p>
            </div>
          </div>
        </div>
      </TableCell>

      {/* <TableCell>{user?.email ?? "N/A"}</TableCell> */}
      <TableCell>
        <p className="max-w-60 min-w-48 wrap-break-word whitespace-normal">
          {address ?? "N/A"}
        </p>
      </TableCell>
      <TableCell>{Number(_count.items)}</TableCell>

      <TableCell>৳{Number(total).toLocaleString()}</TableCell>

      <TableCell>
        <OrderStatusBadge status={status} />
      </TableCell>

      <TableCell>
        {formatDate(createdAt)} • {formatTime(createdAt)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            // onClick={() => setOpenEditOrder(true)}
            variant={"destructive"}
            size={"icon"}
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
              await deleteOrder({
                id: id,
              });
              console.log("Order Deleted!");
              // if (loadOrder) loadOrder();
              router.refresh();
            }}
            size={"icon"}
            variant={"default"}
            className="bg-green-primary cursor-pointer"
          >
            <RiDeleteBin6Fill />
          </Button>
          <Button asChild>
            <Link href={`/order/${publicId}`}>View</Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DesktopOrderCard;
