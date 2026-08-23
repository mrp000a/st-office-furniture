export type CartProduct = {
  images: string[];
  productCode: string;
  price: number;
  discount: number | null;
  discountPrice: number | null;
};

export type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
  productId: number;
  cartId?: number;

  createdAt?: string;
  updatedAt?: string;

  product: CartProduct;
};

export type CartItemInput = {
  productId: number;
  title: string;
  price: number;
  qty: number;

  product: CartProduct;
};

export type Cart = {
  id?: number;
  userId?: number;

  createdAt?: string;
  updatedAt?: string;

  items: CartItem[];

  _count: {
    items: number;
  };
};