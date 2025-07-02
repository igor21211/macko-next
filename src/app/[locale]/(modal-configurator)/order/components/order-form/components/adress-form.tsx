import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { OrderFormValues } from '../order-form';
import AutocompleteCityName from './autocomplete-city-name.tsx';
import SelectTypeBuilding from './select-type-building';
import CustomFormField from './custom-form-field';

interface AddressFormProps {
  form: UseFormReturn<OrderFormValues>;
}
const nameFields = [
  { value: 'street', label: 'Вулиця' },
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Будинок' },
];

export default function AddressForm({ form }: AddressFormProps) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <AutocompleteCityName value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage className="text-danger" />
          </FormItem>
        )}
      />
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
        <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SelectTypeBuilding value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage className="text-danger" />
            </FormItem>
          )}
        />
        {nameFields.map((item) => (
          <FormField
            key={item.value}
            control={form.control}
            name={item.value as keyof OrderFormValues}
            render={() => (
              <CustomFormField
                className="w-full"
                form={form}
                value={item.value as keyof OrderFormValues}
                placeholder={item.label}
              />
            )}
          />
        ))}
      </div>
    </div>
  );
}
