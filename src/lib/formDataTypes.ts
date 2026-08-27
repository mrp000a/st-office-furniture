import {
  DeliveryAreas,
  Gender,
  PaymentMethods,
  ProductDescription,
} from "@/generated/prisma";
import { TbTruckDelivery } from "react-icons/tb";
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

  stock: boolean;
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
  email: string;

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

export const CategoriesNav = [
  { label: "All Categories", href: "/products" },
  { label: "Executive Chair", href: "/products?category=executive-chair" },
  { label: "Manager Chair", href: "/products?category=manager-chair" },
  { label: "Boss Chair", href: "/products?category=boss-chair" },
  { label: "Visitors Chair", href: "/products?category=visitors-chair" },
  { label: "Wooden Chair", href: "/products?category=wooden-chair" },
  { label: "All Kinds of Sofa", href: "/products?category=all-kinds-of-sofa" },
  { label: "Chair Accessories", href: "/products?category=chair-accessories" },
  // { label: "Test Page", href: "/test" },
];
