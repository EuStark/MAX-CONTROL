import * as React from "react";
import { cn } from "../../lib/utils";
const base = "flex w-full rounded-xl border-0 bg-background px-4 shadow-neu-in text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50";
export const Input = React.forwardRef(({ className, ...p }, ref) => <input ref={ref} className={cn(base, "h-11", className)} {...p} />);
export const Textarea = React.forwardRef(({ className, ...p }, ref) => <textarea ref={ref} className={cn(base, "min-h-[72px] py-2.5", className)} {...p} />);
