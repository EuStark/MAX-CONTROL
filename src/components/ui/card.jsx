import * as React from "react";
import { cn } from "../../lib/utils";
export const Card = ({ className, ...p }) => <div className={cn("rounded-2xl bg-card text-foreground shadow-neu", className)} {...p} />;
export const CardHeader = ({ className, ...p }) => <div className={cn("flex items-center justify-between px-4 pt-4", className)} {...p} />;
export const CardTitle = ({ className, ...p }) => <h2 className={cn("text-xs font-semibold uppercase tracking-wider text-muted-foreground", className)} {...p} />;
export const CardContent = ({ className, ...p }) => <div className={cn("space-y-3 p-4", className)} {...p} />;
