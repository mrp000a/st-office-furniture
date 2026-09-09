"use client";

import React, {
  createContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type AlertOptions = {
  title?: string;
  description?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
};

type DialogState =
  | {
      type: "alert";
      options: AlertOptions;
      resolve: () => void;
    }
  | {
      type: "confirm";
      options: AlertOptions;
      resolve: (value: boolean) => void;
    }
  | null;

type AlertDialogContextType = {
  alert: (options?: AlertOptions) => Promise<void>;
  confirm: (options?: AlertOptions) => Promise<boolean>;
};

export const AlertDialogContext = createContext<AlertDialogContextType | null>(
  null,
);

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>(null);

  const alert = useCallback((options: AlertOptions = {}) => {
    return new Promise<void>((resolve) => {
      setDialog({
        type: "alert",
        options,
        resolve,
      });
    });
  }, []);

  const confirm = useCallback((options: AlertOptions = {}) => {
    return new Promise<boolean>((resolve) => {
      setDialog({
        type: "confirm",
        options,
        resolve,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (!dialog) return;

    if (dialog.type === "alert") {
      dialog.resolve();
    } else {
      dialog.resolve(true);
    }

    setDialog(null);
  }, [dialog]);

  const handleCancel = useCallback(() => {
    if (!dialog) return;

    if (dialog.type === "confirm") {
      dialog.resolve(false);
    }

    setDialog(null);
  }, [dialog]);

  return (
    <AlertDialog
      open={dialog !== null}
      onOpenChange={(open) => {
        if (!open) {
          handleCancel();
        }
      }}
    >
      <AlertDialogContext.Provider
        value={{
          alert,
          confirm,
        }}
      >
        {children}

        {dialog && (
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {dialog.options.title ??
                  (dialog.type === "confirm" ? "Are you sure?" : "Notice")}
              </AlertDialogTitle>

              {dialog.options.description && (
                <AlertDialogDescription>
                  {dialog.options.description}
                </AlertDialogDescription>
              )}
            </AlertDialogHeader>

            <AlertDialogFooter>
              {dialog.type === "confirm" && (
                <AlertDialogCancel onClick={handleCancel}>
                  {dialog.options.cancelText ?? "Cancel"}
                </AlertDialogCancel>
              )}

              <AlertDialogAction
                onClick={handleConfirm}
                className={
                  dialog.options.destructive
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : undefined
                }
              >
                {dialog.options.confirmText ?? "OK"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialogContext.Provider>
    </AlertDialog>
  );
}
