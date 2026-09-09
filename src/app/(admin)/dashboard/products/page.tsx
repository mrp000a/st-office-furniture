import React, { Suspense } from "react";
import DashProducts from "./DashProducts";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashProducts />
    </Suspense>
  );
};

export default page;
