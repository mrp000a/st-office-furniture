"use client";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { Button } from "@/components/ui/button";
// import {} from '@/components/providers/alert-dialog-provider'
import React from "react";

const TestPage = () => {
  const { confirm, alert } = useAlertDialog();
  const handleClick = async () => {
    const a = await confirm({
      title: "This action can't be undone. Sure?",
      confirmText: "Confirm",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae asperiores ut dolores.",
      cancelText: "No",
      destructive: true,
    });
    if (!a) return;
    console.log("object");
  };
  return (
    <div>
      <Button onClick={handleClick}>Confirm Product</Button>
    </div>
  );
};

export default TestPage;
