import * as React from "react";
import * as T from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";
export const Tabs = T.Root;
export const TabsList = React.forwardRef(({ className, ...p }, ref) => <T.List ref={ref} className={cn("inline-flex items-center rounded-xl bg-background p-1.5 shadow-neu-in-sm", className)} {...p} />);
export const TabsTrigger = React.forwardRef(({ className, ...p }, ref) => <T.Trigger ref={ref} className={cn("rounded-lg px-3.5 py-1.5 text-sm font-semibold text-muted-foreground transition-colors data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-neu-sm", className)} {...p} />);
export const TabsContent = React.forwardRef(({ className, ...p }, ref) => <T.Content ref={ref} className={cn("focus-visible:outline-none", className)} {...p} />);
