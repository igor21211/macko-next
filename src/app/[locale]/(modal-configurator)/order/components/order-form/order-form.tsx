'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import CustomFormField from './components/custom-form-field';
import RadioGroupField from '@/app/[locale]/(modal-configurator)/order/components/order-form/components/radio-group-field';
import AddressForm from './components/adress-form';
import FileButton from './components/file-button';
import { useState } from 'react';
import { InputPromo } from './components/input-promo';
import { ImageBlock } from './components/image-block';
import { TableInfo } from './components/table-info';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ActionsButton } from './components/actions-button';

const installOptions = ['Потрібен монтаж', 'Монтаж виробу самостійно'];
const paymentOptions = ['Безготівковий', 'Карткою онлайн', 'Оплата частинами', 'Готівка'];

const orderSchema = z.object({
  firstName: z.string().min(2, "Введіть ім'я (мінімум 2 символи)").max(32),
  lastName: z.string().min(2, 'Введіть прізвище (мінімум 2 символи)').max(32),
  phone: z.string().min(10, 'Введіть коректний номер телефону').max(20),
  email: z.string().email('Введіть коректний email'),
  city: z.string().min(1, 'Оберіть місто доставки'),
  roomType: z.string().min(1, 'Оберіть тип приміщення'),
  street: z.string().min(2, 'Введіть вулицю'),
  apartment: z.string().min(1, 'Введіть квартиру/офіс'),
  house: z.string().min(1, 'Введіть номер будинку'),
  install: z.string().min(1, 'Оберіть варіант монтажу'),
  payment: z.string().min(1, 'Оберіть спосіб оплати'),
  comment: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
  promo: z.string().optional(),
  needCall: z.boolean().optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

const defaultValues: OrderFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  roomType: '',
  street: '',
  apartment: '',
  house: '',
  install: installOptions[0],
  payment: paymentOptions[0],
  comment: '',
  files: [],
  promo: '',
  needCall: false,
};

const OrderForm = () => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues,
  });
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const handleFormSubmit = (data: OrderFormValues) => {
    // Здесь будет отправка данных
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4 pt-4 pb-8"
        noValidate
      >
        <div className="mb-8 flex flex-col gap-3">
          <h1 className="text-sans text-textDark mb-8 text-[32px] font-medium tracking-[0.06em] uppercase">
            Надіслати запит
          </h1>
          <h4 className="text-textDark font-inter mb-7 text-[20px] leading-[1.4] font-[700]">
            Маєте обліковий запис? -{' '}
            <span className="text-accent font-inter cursor-pointer text-[20px] font-[700]">
              увійти
            </span>
          </h4>
          {/* Контактные данные */}
          <div>
            <h2 className="text-textDark font-inter mb-4 text-[20px] font-[700]">
              Ваші контактні дані
            </h2>
            <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
              <div className="flex w-full max-w-[542px] flex-col gap-4">
                <CustomFormField
                  className="w-full"
                  form={form}
                  value="phone"
                  placeholder="Мобільний телефон"
                />
                <CustomFormField
                  className="w-full"
                  form={form}
                  value="firstName"
                  placeholder="Ім'я"
                />
              </div>
              <div className="flex w-full max-w-[542px] flex-col gap-4">
                <CustomFormField
                  className="w-full"
                  form={form}
                  value="email"
                  placeholder="Електронна пошта"
                />
                <CustomFormField
                  className="w-full"
                  form={form}
                  value="lastName"
                  placeholder="Прізвище"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Монтаж */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-[#2D3748]">Монтаж</h2>
          <RadioGroupField<OrderFormValues>
            control={form.control}
            name="install"
            options={installOptions}
            label="Варіант монтажу"
            renderRight={(option, index, selected) => {
              if (index === 0 && selected === installOptions[0]) {
                return (
                  <div className="mt-2 flex items-center gap-2 text-sm text-[#718096]">
                    <span>Вартість монтажу:</span>
                    <span className="font-semibold text-[#2D3748]">€250</span>
                  </div>
                );
              }
              if (index === 1 && selected === installOptions[1]) {
                return (
                  <button className="flex cursor-pointer items-center gap-x-2" onClick={() => {}}>
                    <span className="text-body text-accent font-sans text-[11px] lg:text-[16px]">
                      Інформація про монтаж
                    </span>
                  </button>
                );
              }
              return null;
            }}
          />
        </div>
        <div className="mb-4">
          <h2 className="text-textDark font-inter mb-4 text-[20px] font-[700]">
            Адреса монтажу / доставки вибору
          </h2>
          <AddressForm form={form} />
        </div>
        {/* Оплата */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-[#2D3748]">Оплата</h2>
          <RadioGroupField<OrderFormValues>
            control={form.control}
            name="payment"
            options={paymentOptions}
            label="Спосіб оплати"
          />
        </div>

        {/* Кнопка додавання файлу */}
        <div className="mb-8">
          <FileButton form={form} />
        </div>
        <div className="mb-8">
          <button
            className="mb-4 flex items-center gap-x-2"
            onClick={() => setIsCommentOpen(!isCommentOpen)}
          >
            <span className="text-textDark font-sans text-[14px]">+</span>{' '}
            <span className="text-accent font-inter text-body cursor-pointer font-normal underline">
              Додати коментар до замовлення
            </span>
          </button>
          {isCommentOpen && (
            <CustomFormField
              className="w-full"
              form={form}
              value="comment"
              placeholder="Коментар"
            />
          )}
        </div>
        <div className="flex flex-col gap-4 bg-[#EBF0F4] lg:flex-row">
          <div className="w-full p-2 lg:p-5">
            <InputPromo form={form} name="promo" />
            <TableInfo />
            <Button
              type="submit"
              className="font-inter text-body mb-4 h-[50px] w-full cursor-pointer rounded-none bg-[#C7540F] text-white uppercase hover:bg-[#C7540F]/80"
            >
              замовлення підтверджую
            </Button>
            <div className="mb-8 flex items-center gap-2">
              <FormField
                control={form.control}
                name="needCall"
                render={({ field }) => (
                  <Checkbox
                    id="needCall"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:text-accent h-4 w-4 rounded-none border-none bg-white data-[state=checked]:bg-white data-[state=unchecked]:bg-white"
                  />
                )}
              />
              <Label
                htmlFor="needCall"
                className="font-inter text-textLight text-[14px] leading-[2] font-normal tracking-[0]"
              >
                не передзвонювати
              </Label>
            </div>
            <Separator className="my-8 w-full border border-[#718096]" />
            <ActionsButton />
          </div>
          <div className="w-full">
            <ImageBlock />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
