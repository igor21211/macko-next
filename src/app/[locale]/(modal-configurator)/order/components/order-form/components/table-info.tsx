import { Separator } from '@/components/ui/separator';

export const TableInfo = () => {
  const tableRows = [
    { label: 'Модель', value: 'Line 200', price: '€2 499', bg: 'bg-[#E1E8EE]' },
    { label: 'Напрямок відкривання', value: 'Ліва всередену', price: '€20', bg: 'bg-[#EBF0F4]' },
    { label: 'Розмір', value: '900 х 2100 мм', price: '€20', bg: 'bg-[#E1E8EE]' },
    { label: 'Комплектація', value: 'Стандарт', price: '€20', bg: 'bg-[#EBF0F4]' },
    { label: 'Колір рами', value: 'RAL 7016 MATT', price: '€20', bg: 'bg-[#E1E8EE]' },
    { label: 'Колір панелі', value: 'RAL 7016 MATT', price: '€20', bg: 'bg-[#EBF0F4]' },
    { label: 'Колір декору', value: '-', price: '€20', bg: 'bg-[#E1E8EE]' },
    { label: 'Скло', value: 'Сатін біле', price: '€20', bg: 'bg-[#EBF0F4]' },
    { label: 'Замок', value: 'ВТ 5', price: '€20', bg: 'bg-[#E1E8EE]' },
    { label: 'Ручка', value: 'GA 11', price: '€20', bg: 'bg-[#EBF0F4]' },
  ];
  const total = '€2 999';

  return (
    <div className="mb-8 w-full">
      <h3 className="font-inter mb-4 text-[20px] font-medium text-[#2D3748]">Разом</h3>
      <div className="flex flex-col gap-3">
        {tableRows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center justify-between rounded px-4 py-2 ${row.bg}`}
          >
            <span className="text-[14px] font-normal text-[#718096]">{row.label}</span>
            <span className="text-[14px] font-bold text-[#2D3748]">{row.value}</span>
            <span className="text-[14px] font-bold text-[#2D3748]">{row.price}</span>
          </div>
        ))}
      </div>
      <Separator className="my-4 w-full border-2 border-t border-[#718096]" />
      <button className="mb-4 flex items-center gap-x-2" onClick={() => {}}>
        <span className="text-textDark font-sans text-[14px]">+</span>{' '}
        <span className="text-accent font-inter text-body cursor-pointer font-normal underline">
          Детальна специфікація
        </span>
      </button>
      <div className="mt-6 flex items-center justify-between pt-4">
        <span className="text-[14px] font-semibold text-[#2D3748]">До сплати:</span>
        <span className="text-[26px] font-semibold text-[#00ACA4]">{total}</span>
      </div>
    </div>
  );
};
