"use client";
import Link from "next/link";
import React from "react";

const ProductsAdmin = () => {
  return (
    <div>
      products
      <Link href={"/admin/products/add"}>Add</Link>
    </div>
  );
};

export default ProductsAdmin;
