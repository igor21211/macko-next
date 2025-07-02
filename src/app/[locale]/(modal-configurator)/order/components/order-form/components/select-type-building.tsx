import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

interface SelectTypeBuildingProps {
  value: string;
  onChange: (value: string) => void;
}

const typeBuildingOptions = [
  {
    value: '1',
    label: 'Квартира',
  },
  {
    value: '2',
    label: 'Будинок',
  },
];

export default function SelectTypeBuilding({ value, onChange }: SelectTypeBuildingProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[218px] rounded-none border border-gray-200 bg-[#EDF2F7] p-6 text-[16px] font-[400] hover:bg-[#EDF2F7]/80">
        <SelectValue placeholder="Тип приміщення" />
        <Image
          src="/figma-images/order/tringle.svg"
          alt="triangle"
          width={10}
          height={6}
          className="text-accent size-2"
        />
      </SelectTrigger>
      <SelectContent className="w-[218px] rounded-none border border-gray-200 bg-white p-0">
        {typeBuildingOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
