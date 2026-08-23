import { Product } from "@/generated/prisma";
import { addItem, removeItem, setCart } from "@/redux/features/cart/cartSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { SessionContextValue } from "next-auth/react";
import { useRouter } from "next/router";
import { SetStateAction, useCallback } from "react";
import { toast } from "sonner";

interface UploadReturnType {
  success: boolean;
  key?: string;
  message?: string;
}

export async function uploadFile(
  file: File,
  path: string = "users/avatar",
): Promise<UploadReturnType> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("path", path);

  const res = await fetch("/api/r2/upload", {
    method: "POST",
    body: formData,
  });

  const data: UploadReturnType = await res.json();

  return data;
}

// batch related -------------------------------------------------------------------------------------------------------

// is the batch exists?
export async function FindProductExists({
  productCode,
}: {
  productCode: string;
}) {
  const res = await fetch(`/api/products/check?productCode=${productCode}`, {
    method: "GET",
    redirect: "follow",
  });
  const data = await res.json();
  return data;
}

// get all products
export async function getProducts() {
  const res = await fetch(`/api/products`, {
    method: "GET",
    redirect: "follow",
  });
  if (!res.ok) {
    return { success: false, message: "Server Error-" };
  }
  const data = await res.json();
  return data;
}

// Category related -------------------------------------------------------------------------------------------------------
export async function FindCategoryExists({ name }: { name: string }) {
  const res = await fetch(`/api/categories/check?name=${name}`, {
    method: "GET",
    redirect: "follow",
  });
  const data = await res.json();
  return data;
}

export async function getCategories() {
  const res = await fetch(`/api/categories`, {
    method: "GET",
    redirect: "follow",
  });
  if (!res.ok) {
    return { success: false, message: "Server Error-" };
  }
  const data = await res.json();
  return data;
}

// Users related -------------------------------------------------------------------------------------------------------
export async function FindUserExists({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) {
  const res = await fetch(`/api/users/check?email=${email}&phone=${phone}`, {
    method: "GET",
    redirect: "follow",
  });
  const data = await res.json();
  return data;
}
// Cart related -------------------------------------------------------------------------------------------------------

export async function getCart({ userId }: { userId: number }) {
  const res = await fetch(`/api/cart?userId=${userId}`, {
    method: "GET",
    redirect: "follow",
  });

  if (!res.ok) {
    return { success: false, message: "Server Error-" };
  }
  const data = await res.json();
  return data;
}

export const loadCart = async ({
  userId,
  dispatch,
}: {
  userId: number;
  dispatch: Dispatch<UnknownAction>;
}) => {
  if (!userId) return;
  // if (!userId) throw new Error("User id Required");
  const cartData = await getCart({ userId });

  if (!cartData.success) return;
  if (cartData.result && cartData.result.items) {
    // return
    dispatch(setCart(cartData.result));
  }
};

export async function AddToCart({
  title,
  price,
  qty,
  productId,
  userId,
}: {
  title: string;
  price: number;
  qty: number;
  productId: number;
  userId: number;
}) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title,
    price,
    qty,
    productId,
    userId,
  });

  const data = await fetch("/api/cart", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  });

  const res = await data.json();

  return res;
}

export const handleDeleteCartItem = async ({
  itemId,
  session,
  dispatch,
}: {
  dispatch: Dispatch;
  session: SessionContextValue;
  itemId: number;
}) => {
  if (!session || !session.data?.user?.id) {
    dispatch(removeItem(itemId));
    return;
  }
  const data = await fetch(`/api/cart?itemId=${itemId}`, {
    method: "DELETE",
    redirect: "follow",
  });

  if (!data.ok) {
    toast.error("Something went wrong");

    return;
  }
  const res = await data.json();
  if (!res.success) {
    toast.error("Something went wrong");
    return;
  } else {
    if (session && session.data?.user?.id) {
      loadCart({ userId: Number(session.data?.user.id), dispatch });
    }
    toast.success("Cart item deleted");
  }
};

export const HandleAddToCart = async ({
  title,
  price,
  qty,
  productId,
  userId,
  dispatch,
  // setShakeCart,
}: {
  title: string;
  price: number;
  qty: number;
  productId: number;
  userId: number;
  dispatch: Dispatch;
  // setShakeCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const res = await AddToCart({
    title,
    price,
    qty,
    productId,
    userId,
  });

  if (!res.success) {
    toast.error(res.message ?? "Error on adding to cart!");
    return null;
  }
  console.log(res.message);
  toast.success(res.message ?? "Product added to cart!");
  loadCart({ userId, dispatch });

  return true;
};

export const HandleAddToLocalCart = ({
  images,
  discount,
  discountPrice,
  price,
  productCode,
  id,
  title,
  qty,
  //--
  dispatch,
}: Product & { qty: number; dispatch: Dispatch }) => {
  const product = {
    images,
    discount: discount ? Number(discount) : null,
    discountPrice: discountPrice ? Number(discountPrice) : null,
    price: Number(price),
    productCode,
    title,
    id,
  };

  dispatch(
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      qty: qty ? qty : 1,

      product: {
        images: product.images,
        productCode: product.productCode,
        price: product.price,
        discount: product.discount,
        discountPrice: product.discountPrice,
      },
    }),
  );

  toast.success("Item added to Cart!");
};
