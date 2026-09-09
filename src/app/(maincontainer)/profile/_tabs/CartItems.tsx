import { Button } from "@/components/ui/button";
import React from "react";

const CartItems = () => {
  return (
    <div>
      <div className="space-y-1">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-lg font-bold">Cart Items</h2>
          <div className="flex gap-1 items-center flex-wrap">
            {/* <Button>Add</Button>
            <Button>Now</Button> */}
          </div>
        </div>
        <hr />
        <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. At repudiandae nulla dolorum.
        </div>
      </div>
    </div>
  );
};

export default CartItems;
