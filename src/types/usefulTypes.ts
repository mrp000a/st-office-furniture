import {
  DeliveryAreas,
  OrderStatus,
  PaymentMethods,
  PaymentStatus,
} from "@/generated/prisma";



export type sanitizeOrder = {
  id: number;

  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  paidAmount: number;

  receiverName: string;
  receiverPhone: string;
  receiverEmail: string | null;
  customerNote: string | null;

  transactionId: string | null;
  paidAt: Date | null;

  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
  publicId: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethods;
  paymentStatus: PaymentStatus;
  paymentId: string | null;

  deliveryArea: DeliveryAreas;
  items: {
    product: { productCode?: string | null; image?: string | null };
    price: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    productId: number | null;
    qty: number;
    orderId: number;
  }[];
  logs: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: OrderStatus;
    note: string | null;
    orderId: number;
    updatedBy: string | null;
  }[];
};
