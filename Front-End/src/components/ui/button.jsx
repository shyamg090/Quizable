import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 glow-primary",
        hero: "bg-primary text-primary-foreground hover:bg-primary-glow hover:scale-105 glow-primary text-lg font-bold px-8 py-4 rounded-full",
        success: "bg-success text-success-foreground hover:bg-success/90 hover:scale-105 glow-success",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 glow-destructive",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 hover:scale-105",
        outline: "border-2 border-input bg-background/50 hover:bg-accent hover:text-accent-foreground hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline",
        quiz: "bg-warning text-warning-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-base font-semibold border-2 border-transparent hover:border-primary hover:scale-105",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-xl px-3",
        lg: "h-14 rounded-2xl px-8",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef((props, ref) => {
  const { className, variant, size, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...rest} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
