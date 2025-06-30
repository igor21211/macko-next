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
>(({ className = "", ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={
      "w-5 h-5 rounded-full border border-gray-300 bg-white data-[state=checked]:bg-[#00ACA4] data-[state=checked]:border-[#00ACA4] flex items-center justify-center transition-colors " +
      className
    }
    {...props}
  >
    <span className="block w-2.5 h-2.5 rounded-full bg-white data-[state=checked]:bg-white" />
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem"; 