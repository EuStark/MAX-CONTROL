import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 active:shadow-neu-in-sm",
  { variants: {
      variant: { default: "bg-primary text-primary-foreground shadow-neu-sm hover:brightness-110", outline: "bg-background text-primary shadow-neu-sm hover:text-primary/80", ghost: "hover:bg-accent hover:text-accent-foreground" },
      size: { default: "h-11 px-4", sm: "h-9 px-3", lg: "h-12 px-6 text-base" } },
    defaultVariants: { variant: "default", size: "default" } });
export const Button = React.forwardRef(({ className, variant, size, ...p }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...p} />));
