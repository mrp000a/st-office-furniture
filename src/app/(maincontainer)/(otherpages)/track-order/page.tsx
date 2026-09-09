import React, { Suspense } from "react";
import PageTrackOrder from "./trackpage";

const page = () => {
  return (
    <Suspense>
      <PageTrackOrder />
    </Suspense>
  );
};

export default page;
