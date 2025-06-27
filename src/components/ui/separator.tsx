"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  punktir = false,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & { punktir?: boolean }) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal"
          ? "border-t w-full h-0"
          : "border-l h-full w-0",
        punktir && "border-dashed",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
