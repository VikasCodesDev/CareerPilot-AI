import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent text-sm font-semibold whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_25px_rgba(217,70,239,0.45)] hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-border bg-white/[0.02] text-white hover:bg-white/[0.08] hover:border-white/[0.15] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-gradient-to-r from-secondary to-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.18)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "text-muted-foreground hover:bg-white/[0.05] hover:text-white transition-colors",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-4 py-2 text-sm",
        xs: "h-7 gap-1 rounded-lg px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1.5 rounded-lg px-3.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-6 text-base rounded-2xl",
        icon: "size-10 rounded-xl",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8.5 rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
