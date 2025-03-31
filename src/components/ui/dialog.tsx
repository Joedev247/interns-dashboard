import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";  

type DialogProps = DialogPrimitive.DialogProps & {
  className?: string;
};

export const Dialog: React.FC<DialogProps> = ({ children, className, ...props }) => (
  <DialogPrimitive.Root {...props}>
    <DialogPrimitive.Overlay className={cn("fixed inset-0 bg-black opacity-50", className)} />
    <DialogPrimitive.Content className={cn("fixed inset-0 bg-white", className)}>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Root>
);

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = DialogPrimitive.Content;

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DialogPrimitive.Title className="text-lg font-bold">{children}</DialogPrimitive.Title>
);

export const DialogTitle = DialogPrimitive.Title;
