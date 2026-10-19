import * as React from "react";
import * as S from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
export const Select = S.Root;
export const SelectValue = S.Value;
export const SelectTrigger = React.forwardRef(({ className, children, ...p }, ref) => (
  <S.Trigger ref={ref} className={cn("flex h-11 w-full items-center justify-between rounded-xl border-0 bg-background px-4 text-base shadow-neu-in focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:opacity-50 data-[placeholder]:text-muted-foreground", className)} {...p}>
    {children}<S.Icon asChild><ChevronDown className="h-4 w-4 opacity-60" /></S.Icon>
  </S.Trigger>));
export const SelectContent = React.forwardRef(({ className, children, ...p }, ref) => (
  <S.Portal><S.Content ref={ref} position="popper" sideOffset={4} className={cn("z-50 max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border-0 bg-popover text-popover-foreground shadow-neu", className)} {...p}>
    <S.Viewport className="p-1">{children}</S.Viewport></S.Content></S.Portal>));
export const SelectItem = React.forwardRef(({ className, children, ...p }, ref) => (
  <S.Item ref={ref} className={cn("relative flex w-full cursor-pointer select-none items-center rounded-lg py-2.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:text-primary data-[highlighted]:shadow-neu-in-sm", className)} {...p}>
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center"><S.ItemIndicator><Check className="h-4 w-4" /></S.ItemIndicator></span>
    <S.ItemText>{children}</S.ItemText></S.Item>));
