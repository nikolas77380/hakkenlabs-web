"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

const CardContext = React.createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  collapsible: boolean;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
  collapsible: false,
});

function Card({
  className,
  variant = "default",
  collapsible = false,
  defaultCollapsed = false,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "transparent";
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const variantClasses =
    variant === "transparent"
      ? "bg-black/50 border border-white/50"
      : "bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[1px]";

  return (
    <CardContext.Provider value={{ isCollapsed, setIsCollapsed, collapsible }}>
      <div
        data-slot="card"
        className={cn(
          "text-card-foreground flex flex-col rounded-lg py-6",
          variantClasses,
          className,
        )}
        {...props}
      />
    </CardContext.Provider>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-center px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { isCollapsed, setIsCollapsed, collapsible } =
    React.useContext(CardContext);

  const handleToggle = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold text-xl flex transition-all duration-200 items-center justify-between",
        collapsible && "cursor-pointer",
        !isCollapsed && "mb-3",
        className,
      )}
      onClick={handleToggle}
      {...props}
    >
      {children}
      {collapsible && (
        <ChevronUp
          className={cn(
            "w-6 h-6 text-[#fdf500] transition-transform duration-200",
            isCollapsed && "rotate-180",
          )}
        />
      )}
    </div>
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  const { isCollapsed } = React.useContext(CardContext);

  return (
    <div
      data-slot="card-content"
      className={cn(
        " px-6 transition-all duration-300 ease-in-out overflow-hidden",
        isCollapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
