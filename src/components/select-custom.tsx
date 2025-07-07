import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SelectCustomProps {
  value: string;
  onChange: (value: string) => void;
  content: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  className?: string;
  classNameContent?: string;
  classNameValue?: string;
}

export default function SelectCustom({
  value,
  onChange,
  content,
  placeholder,
  className,
  classNameContent,
}: SelectCustomProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn('focus:outline-none', className)}>
        <SelectValue placeholder={placeholder}/>
        <Image
          src="/figma-images/order/tringle.svg"
          alt="triangle"
          width={10}
          height={6}
          className="text-accent size-2"
        />
      </SelectTrigger>
      <SelectContent className={classNameContent}>
        {content.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
