import * as React from "react";
import * as G from "@radix-ui/react-toggle-group";
import { cn } from "../../lib/utils";
export const ToggleGroup = React.forwardRef(({ className, ...p }, ref) => <G.Root ref={ref} className={cn("grid grid-cols-2 gap-2", className)} {...p} />);
export const ToggleGroupItem = React.forwardRef(({ className, ...p }, ref) => (
  <G.Item ref={ref} className={cn("flex min-h-[52px] items-center gap-2 rounded-xl bg-background px-3 py-2 shadow-neu-sm text-left text-sm font-semibold text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:text-primary data-[state=on]:shadow-neu-in-sm data-[state=on]:ring-1 data-[state=on]:ring-primary/40", className)} {...p} />));
