"use client";

import { useContext } from "react";

import { AlertDialogContext } from "@/components/providers/alert-dialog-provider";

export function useAlertDialog() {
  const context = useContext(AlertDialogContext);

  if (!context) {
    throw new Error(
      "useAlertDialog must be used inside AlertDialogProvider"
    );
  }

  return context;
}