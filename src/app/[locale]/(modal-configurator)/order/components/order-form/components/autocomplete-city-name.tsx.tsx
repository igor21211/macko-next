'use client';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AutocompleteCityNameProps {
  value: string;
  onChange: (value: string) => void;
}

const cityNames = [
  {
    value: 'Kyiv',
    label: 'Київ',
  },
  {
    value: 'Lviv',
    label: 'Львів',
  },
  {
    value: 'Odesa',
    label: 'Одеса',
  },
  {
    value: 'Kharkiv',
    label: 'Харків',
  },
  {
    value: 'Dnipro',
    label: 'Дніпро',
  },
];

export default function AutocompleteCityName({ value, onChange }: AutocompleteCityNameProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-[1300px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-full cursor-pointer justify-between rounded-none border border-gray-200 bg-[#EDF2F7] p-6 text-[16px] font-[400] hover:bg-[#EDF2F7]/80"
          >
            {value ? cityNames.find((city) => city.value === value)?.label : 'Місто доставки'}
            {open ? (
              <Image
                src="/figma-images/order/tringle.svg"
                alt="triangle"
                width={10}
                height={6}
                className="text-accent size-2"
              />
            ) : (
              <Image
                src="/figma-images/order/tringle.svg"
                alt="triangle"
                width={10}
                height={6}
                className="text-accent size-2"
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[1300px] min-w-[var(--radix-popover-trigger-width)] bg-white p-0">
          <Command>
            <CommandInput placeholder="Введіть назву міста..." className="h-9" />
            <CommandList>
              <CommandEmpty>Нічого не знайдено.</CommandEmpty>
              <CommandGroup>
                {cityNames.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    {city.label}
                    <Check
                      className={cn('ml-auto', value === city.value ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
