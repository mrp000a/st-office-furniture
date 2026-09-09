import {
  Category,
  DeliveryAreas,
  Gender,
  PaymentMethods,
  Product,
  ProductDescription,
} from "@/generated/prisma";
import { PiMoneyWavyFill } from "react-icons/pi";

export type UserFormData = {
  name: string;
  email: string;
  password: string;

  image: File[] | null;
  phone: string;
  gender?: Gender;

  address?: string;

  confirmPassword: string;
};

export type CategoryFormData = {
  name: string;
  description?: string;
  image: File[] | null;
};

export type CartFormData = {
  name: string;
  description?: string;
  image: File[] | null;
};

export type ProductFormData = {
  title: string;
  productCode: string;
  images: {
    file: FileList;
  }[];

  brand?: string;
  keyFeatures: { value: string }[];
  descriptions: { title: string; description: string }[];

  price: number;
  discountPrice?: number;
  discount?: number;

  stock: number;
  categoryId?: string;
};

export type ProReviewFormData = {
  rating: number;
  note?: string;
};

export type OrderFormData = {
  receiverName: string;
  receiverPhone: string;
  address: string;
  customerNote: string;
  receiverEmail: string;

  deliveryArea: DeliveryAreas;
  shippingCost: number;

  paymentMethod: PaymentMethods;
};

export const PaymentMethodsInfo = [
  {
    label: "Cash on Delivery",
    description: "Pay with cash upon delivery.",
    icon: PiMoneyWavyFill,
    value: "CASH_ON_DELIVERY",
  },
];

export type MessageFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};


export type ProductTypeAdmin = Product & {
  category: Category;
  descriptions: ProductDescription[];
  _count: {
    descriptions: number;
    reviews: number;
    orderItems: number;
    cartItems: number;
  };
};
