import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

interface RadioGroupFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: string[];
  label?: string;
  itemClassName?: string;
  groupClassName?: string;
  labelClassName?: string;
  renderRight?: (option: string, index: number, selected: string) => React.ReactNode;
}

const RadioGroupField = <T extends FieldValues>({
  control,
  name,
  options,
  label,
  itemClassName = '',
  groupClassName = '',
  labelClassName = '',
  renderRight,
}: RadioGroupFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className={`flex flex-col gap-2 ${groupClassName}`}
          >
            {options.map((option, index) => (
              <div
                key={option}
                className={`flex min-h-[60px] items-center justify-between border border-[#E2E7ED] bg-white p-4 ${itemClassName}`}
              >
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value={option} />
                  </FormControl>
                  <FormLabel
                    className={`text-textLight cursor-pointer text-[16px] font-[400] ${labelClassName}`}
                  >
                    {option}
                  </FormLabel>
                </FormItem>
                {renderRight && renderRight(option, index, field.value)}
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default RadioGroupField;
