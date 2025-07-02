import { UseFormReturn } from 'react-hook-form';
import CustomFormField from './custom-form-field';
import { OrderFormValues } from '../order-form';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type InputPromoProps = {
  form: UseFormReturn<OrderFormValues>;
  name: 'promo';
};

export const InputPromo = ({ form, name }: InputPromoProps) => {
  const handleApplyPromo = () => {
    console.log('promo', form.getValues(name));
    form.setValue(name, '');
  };

  const handleDeletePromo = () => {
    form.setValue(name, '');
  };

  return (
    <div className="mb-4 flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-textDark font-inter text-[20px] font-semibold">Промокод</h2>
        <X onClick={handleDeletePromo} className="size-6 cursor-pointer" />
      </div>
      <div className="flex w-full items-center">
        <CustomFormField
          className="w-[50%] lg:w-[70%]"
          form={form}
          value={name}
          placeholder="Введіть промокод"
        />
        <Button
          onClick={handleApplyPromo}
          className="bg-accent font-inter lg:text-body hover:bg-accent/90 lg:text-body h-[44px] w-[30%] max-w-[166px] rounded-none text-xs font-medium text-white uppercase lg:h-[50px]"
        >
          Застосувати
        </Button>
      </div>
    </div>
  );
};
