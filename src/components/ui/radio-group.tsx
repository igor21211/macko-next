import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className = "", ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={"flex flex-col gap-2 " + className} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className = "", disabled, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={
      [
        "w-6 h-6 flex items-center justify-center rounded-full border transition-colors duration-150 group",
        disabled
          ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
          : "border-[#E2E7ED] bg-transparent cursor-pointer focus-visible:ring-2 focus-visible:ring-[#00ACA4] focus-visible:ring-offset-2",
        className,
      ].join(" ")
    }
    disabled={disabled}
    tabIndex={0}
    aria-checked={props['aria-checked']}
    aria-label={props['aria-label']}
    {...props}
  >
    <span
      className={
        [
          "block rounded-full transition-all duration-150",
          "w-2.5 h-2.5", // 10px
          "bg-[#00ACA4]",
          "group-data-[state=checked]:scale-100 group-data-[state=checked]:opacity-100",
          "group-data-[state=unchecked]:scale-0 group-data-[state=unchecked]:opacity-0"
        ].join(" ")
      }
    />
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem"; 