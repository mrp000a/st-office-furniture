import { Gender, PaymentMethods, ProductDescription } from "@/generated/prisma";

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
  keyFeatures:{ value: string }[];
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
  paymentMethod: PaymentMethods;

  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  customerNote: string;
};

export type MessageFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
