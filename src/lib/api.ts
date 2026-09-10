import { OrderStatus, Product } from "@/generated/prisma";
import { addItem, removeItem, setCart } from "@/redux/features/cart/cartSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { SessionContextValue } from "next-auth/react";
import { toast } from "sonner";

interface UploadReturnType {
  success: boolean;
  key?: string;
  message?: string;
}

// r2 storage -----------------------------------------------------------------------------------------------------
export async function uploadFile(
  file: File,
  path: string = "r2upload/others/images",
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

export async function deleteFile(key: string) {
  const res = await fetch("/api/r2/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key }),
  });

  return await res.json();
}

// products related -------------------------------------------------------------------------------------------------------

// is the product exists?
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
export async function getProducts({
  searchString = "",
  category = "",
  limit = 25,
  order = "desc",
}: {
  searchString?: string;
  category?: string;
  limit?: number;
  order?: "asc" | "desc";
}) {
  try {
    const res = await fetch(
      `/api/products?search=${searchString}&category=${category}&limit=${limit}&order=${order}`,
      {
        method: "GET",
        redirect: "follow",
      },
    );
    if (!res.ok) return { success: false, message: "Server Error-" };

    const data = await res.json();
    if (!data.success) return { success: false, message: "Server Error-" };
    return { success: true, message: "Products Loaded", result: data.result };
  } catch (error) {
    return {
      success: false,
      message: "Error on products loading!",
      error: error,
    };
  }
}

// delete a product
export async function deleteProduct({
  id,
  productCode,
}: {
  productCode: string;
  id: number;
}) {
  try {
    const res = await fetch(
      `/api/products?id=${id}&productCode=${productCode}`,
      {
        method: "DELETE",
        redirect: "follow",
      },
    );
    if (!res.ok) return { success: false, message: "Server Error-" };

    const data = await res.json();
    if (!data.success) return { success: false, message: "Server Error-" };
    return { success: true, message: "Products Deleted!", result: data.result };
  } catch (error) {
    return {
      success: false,
      message: "Error on products Delete!",
      error: error,
    };
  }
}

// Category related -------------------------------------------------------------------------------------------------------
export async function FindCategoryExists({
  name,
  id,
}: {
  name: string;
  id?: number;
}) {
  const res = await fetch(`/api/categories/check?name=${name}&id=${id}`, {
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

export async function deleteCategories({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const res = await fetch(`/api/categories?id=${id}&name=${name}`, {
    method: "DELETE",
    redirect: "follow",
  });
  if (!res.ok) {
    toast.error("Server Error-", {
      description: "The item deleted unsuccessful!",
    });
    return;
  }
  const data = await res.json();
  if (!data.success) {
    toast.error("Server Error-", {
      description: "The item deleted unsuccessful!",
    });
    return;
  }
  toast.success("Item deleted!", {
    description: "The item deleted successful!",
  });
  return;
}

export async function editCategories({
  id,
  name,
  description,
  image,
}: {
  id: number;
  name: string;
  description?: string;
  image?: string;
}) {
  const res = await fetch(`/api/categories`, {
    method: "PUT",
    redirect: "follow",
  });
  if (!res.ok) {
    return { success: false, message: "Server Error-" };
  }
  const data = await res.json();
  return data;
}

// Users related -------------------------------------------------------------------------------------------------------
export async function getUsers({
  email,
  phone,
  name,
  limit = 100,
}: {
  email?: string;
  phone?: string;
  name?: string;
  limit?: number;
}) {
  const res = await fetch(
    `/api/users?email=${email}&phone=${phone}&name=${name}&limit=${limit}`,
    {
      method: "GET",
      redirect: "follow",
    },
  );

  const data: { success: boolean; message: null | string; result: any } =
    await res.json();
  return data;
}

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

export async function deleteUser({
  id,
  email,
  image,
}: {
  id: number;
  image?: string;
  email?: string;
}) {
  const res = await fetch(`/api/users?id=${id}&email=${email}`, {
    method: "DELETE",
    redirect: "follow",
  });
  const data = await res.json();

  if (data.success) {
    if (image) await deleteFile(image);
    toast.success("User Deleted Successfully!", {
      description: `${new Date().toISOString()}`,
    });
  } else {
    toast.error("User Not Deleted!", {
      description: `${new Date().toISOString()}`,
    });
  }
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

export async function deleteCart({ userId }: { userId: number }) {
  const res = await fetch(`/api/cart?userId=${userId}`, {
    method: "PUT",
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

// order related --------------------------------------------------------------------------------------------
export async function getOrders({
  userId,
  status = "PENDING",
  email,
  name,
  limit = 100,
}: {
  email?: string;
  status?: OrderStatus;
  name?: string;
  limit?: number;
  userId?: number;
}) {
  const res = await fetch(
    `/api/order?userId=${userId}&email=${email}&status=${status}&name=${name}&limit=${limit}`,
    {
      method: "GET",
      redirect: "follow",
    },
  );

  const data: { success: boolean; message: null | string; result: any } =
    await res.json();
  return data;
}
export async function getUsersOrders({
  userId,
  status = "PENDING",
  name,
  limit = 100,
}: {
  status?: OrderStatus;
  name?: string;
  limit?: number;
  userId: number;
}) {
  const res = await fetch(
    `/api/order/userOrders?userId=${userId}&status=${status}&name=${name}&limit=${limit}`,
    {
      method: "GET",
      redirect: "follow",
    },
  );

  const data: { success: boolean; message: null | string; result: any } =
    await res.json();
  return data;
}
export async function getSingleOrder({ orderId }: { orderId?: number }) {
  if (!orderId)
    return { success: false, message: "order id is required", result: null }; //toast.error("Order Id is required!");
  const res = await fetch(`/api/order/id?orderId=${orderId}`, {
    method: "GET",
    redirect: "follow",
  });

  const data: { success: boolean; message: null | string; result: any } =
    await res.json();
  return data;
}
export async function checkSingleOrder({
  orderId,
  phone,
}: {
  orderId: number;
  phone: string;
}) {
  if (!orderId || !phone)
    return { success: false, message: "order id is required", result: null }; //toast.error("Order Id is required!");
  const res = await fetch(
    `/api/order/check?orderId=${orderId}&phone=${phone}`,
    {
      method: "GET",
      redirect: "follow",
    },
  );

  const data: { success: boolean; message: null | string; result: any } =
    await res.json();
  return data;
}

export async function deleteOrder({ id }: { id: number }) {
  const res = await fetch(`/api/order?id=${id}`, {
    method: "DELETE",
    redirect: "follow",
  });
  const data = await res.json();

  if (data.success) {
    toast.success("Order Deleted Successfully!", {
      description: `${new Date().toISOString()}`,
    });
  } else {
    toast.error("Order Not Deleted!", {
      description: `${new Date().toISOString()}`,
    });
  }
}
