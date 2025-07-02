import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { OrderFormValues } from '../order-form';
import { cn } from '@/lib/utils';

interface CustomFormFieldProps {
  form: UseFormReturn<OrderFormValues>;
  value: keyof OrderFormValues;
  placeholder: string;
  className?: string;
}

export default function CustomFormField({
  form,
  value,
  placeholder,
  className,
}: CustomFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={value}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormControl>
            <Input
              type="text"
              variant="order"
              placeholder={placeholder}
              {...field}
              value={field.value as string}
            />
          </FormControl>
          <FormMessage className="text-danger" />
        </FormItem>
      )}
    />
  );
}
