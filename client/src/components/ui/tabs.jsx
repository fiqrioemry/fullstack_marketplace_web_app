"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Root Tabs tetap sama
const Tabs = TabsPrimitive.Root;

// Variants dan Sizes untuk TabsList
const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground transition-all",
  {
    variants: {
      variant: {
        default: "bg-muted p-1",
        outline: "border border-input bg-background p-1",
        ghost: "p-1 bg-transparent",
      },
      size: {
        sm: "h-8 px-2",
        md: "h-20 px-2",
        lg: "h-12 px-4",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

const TabsList = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, size, className }))}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

// Variants dan Sizes untuk TabsTrigger
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        outline: "border border-input data-[state=active]:border-primary",
        none: "data-[state=active]:text-primary data-[state=active]:border-primary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary",
      },
      size: {
        sm: "px-4 py-1 text-xs",
        md: "px-8 py-1 text-sm",
        lg: "px-12 py-1 text-base",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "lg",
    },
  }
);

const TabsTrigger = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, size, className }))}
      {...props}
    />
  )
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// TabsContent tetap sama
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
