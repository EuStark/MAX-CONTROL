import * as React from "react";
import * as L from "@radix-ui/react-label";
import { cn } from "../../lib/utils";
export const Label = React.forwardRef(({ className, ...p }, ref) => <L.Root ref={ref} className={cn("text-xs font-semibold text-muted-foreground", className)} {...p} />);
