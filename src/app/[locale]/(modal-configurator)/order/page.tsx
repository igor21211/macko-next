import OrderForm from './components/order-form/order-form';

export default function OrderPage() {
  return (
    <div className="mx-auto flex w-[90%] flex-col pt-20 md:w-[90%] lg:w-[50%]">
      <OrderForm />
    </div>
  );
}
