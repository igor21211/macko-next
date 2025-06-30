"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const cities = ["Київ", "Львів", "Одеса", "Дніпро", "Харків"];
const roomTypes = ["Квартира", "Будинок", "Офіс", "Інше"];
const installOptions = ["Потрібен монтаж", "Монтаж виробу самостійно"];
const paymentOptions = ["Безготівковий", "Карткою онлайн", "Оплата частинами", "Готівка"];

const orderSchema = z.object({
  firstName: z.string().min(2, "Введіть ім'я (мінімум 2 символи)").max(32),
  lastName: z.string().min(2, "Введіть прізвище (мінімум 2 символи)").max(32),
  phone: z.string().min(10, "Введіть коректний номер телефону").max(20),
  email: z.string().email("Введіть коректний email"),
  city: z.string().min(1, "Оберіть місто доставки"),
  roomType: z.string().min(1, "Оберіть тип приміщення"),
  street: z.string().min(2, "Введіть вулицю"),
  apartment: z.string().min(1, "Введіть квартиру/офіс"),
  house: z.string().min(1, "Введіть номер будинку"),
  install: z.string().min(1, "Оберіть варіант монтажу"),
  payment: z.string().min(1, "Оберіть спосіб оплати"),
  comment: z.string().optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

const defaultValues: OrderFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  roomType: "",
  street: "",
  apartment: "",
  house: "",
  install: "",
  payment: "",
  comment: "",
};

const OrderForm = () => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setSubmitted(true);
    // Здесь будет отправка данных
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
        noValidate
      >
        {/* Контактные данные */}
        <div>
          <h2 className="text-xl font-bold text-[#2D3748] mb-4">Ваші контактні дані</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім&apos;я</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Введіть ім'я" {...field} />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Прізвище</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Введіть прізвище" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Мобільний телефон</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+380XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Електронна пошта</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Доставка */}
        <div>
          <h2 className="text-xl font-bold text-[#2D3748] mb-4">Адреса монтажу / доставки виробу</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Місто доставки</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть місто" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип приміщення</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть тип" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Вулиця</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Введіть вулицю" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Квартира/Офіс</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="№ квартири/офісу" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="house"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Будинок</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="№ будинку" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Монтаж */}
        <div>
          <h2 className="text-xl font-bold text-[#2D3748] mb-4">Монтаж</h2>
          <FormField
            control={form.control}
            name="install"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Варіант монтажу</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-2"
                  >
                    {installOptions.map((option) => (
                      <FormItem key={option} className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("install") === "Потрібен монтаж" && (
            <div className="mt-2 text-sm text-[#718096] flex items-center gap-2">
              <span>Вартість монтажу:</span>
              <span className="font-semibold text-[#2D3748]">€250</span>
            </div>
          )}
        </div>

        {/* Оплата */}
        <div>
          <h2 className="text-xl font-bold text-[#2D3748] mb-4">Оплата</h2>
          <FormField
            control={form.control}
            name="payment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Спосіб оплати</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-2"
                  >
                    {paymentOptions.map((option) => (
                      <FormItem key={option} className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Комментарий */}
        <div>
          <h2 className="text-xl font-bold text-[#2D3748] mb-4">Додати коментар до замовлення</h2>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Ваш коментар..." {...field} className="min-h-[80px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          className="bg-[#00ACA4] text-white rounded-lg px-6 py-3 font-semibold text-lg hover:bg-[#009a92] transition disabled:opacity-60"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Відправка..." : "Надіслати запит"}
        </button>
        {submitted && (
          <div className="text-green-600 text-sm mt-2">Форма успішно відправлена!</div>
        )}
      </form>
    </Form>
  );
};

export default OrderForm;