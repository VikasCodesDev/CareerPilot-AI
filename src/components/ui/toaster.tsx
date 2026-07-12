"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "workspace-toast group !rounded-2xl !border !border-white/[0.08] !bg-zinc-950/90 !backdrop-blur-xl !shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
          title: "!text-sm !font-semibold !text-foreground",
          description: "!text-sm !text-muted-foreground",
          actionButton:
            "!rounded-xl !bg-primary/15 !text-primary !border !border-primary/25",
          cancelButton:
            "!rounded-xl !bg-white/[0.05] !text-muted-foreground",
          closeButton:
            "!rounded-lg !bg-white/[0.05] !border-white/[0.08] !text-muted-foreground hover:!text-foreground",
          success: "!border-success/25",
          error: "!border-destructive/25",
          warning: "!border-warning/25",
          info: "!border-primary/25",
        },
      }}
    />
  );
}
