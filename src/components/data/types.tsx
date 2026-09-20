import { Gender, OrderStatus, PaymentMethods, PaymentStatus, UserRole } from "@/generated/prisma";




export type ordersType = {
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
};
