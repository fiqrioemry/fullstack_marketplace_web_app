import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "border-2 border-primary font-medium  uppercase transition-colors  transition-all duration-300 ",
  {
    variants: {
      variant: {
        default:
          "relative bg-transparent text-primary hover:text-background before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:hover:scale-x-100 before:bg-primary before:transition-transform before:duration-300  ",

        primary:
          "bg-primary  hover:bg-white hover:text-primary text-background tracking-[1.5px]",
        secondary: "",
      },
      size: {
        default: "py-2 px-4",
        primary: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
