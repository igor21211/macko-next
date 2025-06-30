import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OrderFormValues } from "./order-form";

interface CustomFormFieldProps {
    form: UseFormReturn<OrderFormValues>;
    value: keyof OrderFormValues;
    label: string;
    placeholder: string;
}

export default function CustomFormField({ form,  value, label, placeholder }: CustomFormFieldProps) {
    return ( <FormField
              control={form.control}
              name={value}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />);
}