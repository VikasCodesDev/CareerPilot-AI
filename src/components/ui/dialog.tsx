"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within Dialog");
  }
  return context;
}

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

function Dialog({ open, onOpenChange, children }: DialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  return (
    <DialogContext.Provider value={{ open, onOpenChange, titleId }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogContent({
  children,
  className,
  showClose = true,
}: {
  children: ReactNode;
  className?: string;
  showClose?: boolean;
}) {
  const { open, onOpenChange, titleId } = useDialogContext();
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "workspace-dialog fixed top-1/2 left-1/2 z-[calc(var(--z-modal)+1)] w-[min(calc(100%-2rem),32rem)] -translate-x-1/2 -translate-y-1/2",
              className
            )}
          >
            {showClose ? (
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-3 right-3"
                onClick={close}
                aria-label="Close"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            ) : null}
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5 border-b border-white/[0.05] px-6 py-5", className)}>
      {children}
    </div>
  );
}

function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  const { titleId } = useDialogContext();
  return (
    <h2 id={titleId} className={cn("text-lg font-semibold tracking-tight", className)}>
      {children}
    </h2>
  );
}

function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

function DialogBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-6 py-5", className)}>{children}</div>;
}

function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-white/[0.05] px-6 py-4 sm:flex-row sm:justify-end",
        className
      )}
    >
      {children}
    </div>
  );
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
};
