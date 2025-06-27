"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[33px] w-[66px] shrink-0 items-center rounded-full border transition-all outline-none focus-visible:ring-[3px] focus-visible:border-accent focus-visible:ring-accent/50",
        "data-[state=checked]:border-accent data-[state=unchecked]:border-[#E6EAEF] bg-white",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "block size-[27px] rounded-full ring-0 transition-transform",
          "data-[state=checked]:bg-accent data-[state=unchecked]:bg-textLight",
          "data-[state=checked]:translate-x-[33px] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
