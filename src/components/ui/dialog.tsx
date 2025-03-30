import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";  // Assuming 'cn' is a utility function for class names

// Extend DialogProps to include `className`
type DialogProps = DialogPrimitive.DialogProps & {
  className?: string;
};

// Dialog component
export const Dialog: React.FC<DialogProps> = ({ children, className, ...props }) => (
  <DialogPrimitive.Root {...props}>
    <DialogPrimitive.Overlay className={cn("fixed inset-0 bg-black opacity-50", className)} />
    <DialogPrimitive.Content className={cn("fixed inset-0 bg-white", className)}>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Root>
);

// DialogTrigger Component
export const DialogTrigger = DialogPrimitive.Trigger;

// DialogContent Component
export const DialogContent = DialogPrimitive.Content;

// DialogHeader Component (custom header component)
export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DialogPrimitive.Title className="text-lg font-bold">{children}</DialogPrimitive.Title>
);

// DialogTitle Component (as fallback)
export const DialogTitle = DialogPrimitive.Title;
