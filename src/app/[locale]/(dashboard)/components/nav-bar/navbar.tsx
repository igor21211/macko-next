'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { NavButton } from './components/nav-button';
import { useState } from 'react';
import { useMedia } from 'react-use';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavAction from './components/nav-action';
import { useTranslations } from 'next-intl';
import SearchInput from '@/components/search-input';
import { Separator } from '@/components/ui/separator';
import FiltersButton from '@/components/filters-button';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'all';
  const isMobile = useMedia('(max-width: 1024px)', false);

  const  t  = useTranslations('HeaderAction');

const routes = [
  { label: t('offers'), value: 'offers', isActive: true },
  { label: t('popular'), value: 'popular', isActive: false },
  { label: t('leaders'), value: 'leaders', isActive: false },
];

  const handleChange = (value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === 'all') {
      params.delete('tab');
    } else {
      params.set('tab', value);
    }
    router.push(`?${params.toString()}`);
  };

  if (isMobile) {
    return (
      <div className="flex flex-row gap-x-6 items-center">
        <div className="flex items-center ">
        <Separator orientation="vertical" className="border-[#EDF2F7] border-r-2 h-[80px]" />
        </div>
        <div>
          <FiltersButton />
        </div>
        <div className="flex items-center ">
        <Separator orientation="vertical" className="border-[#EDF2F7] border-r-2 h-[80px]" />
        </div>
      <div>
        <SearchInput />
        </div>
        <div className="flex items-center ">
        <Separator orientation="vertical" className="border-[#EDF2F7] border-r-2 h-[80px]" />
        </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="w-16 h-16">
            <Menu className="size-12 text-dark" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full md:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Меню</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-y-6">
            {routes.map((route) => (
              <Button
                key={route.label}
                onClick={() => handleChange(route.value)}
                variant="nav"
                className={cn(
                  'w-full justify-start rounded-none border-none font-sans text-[16px] uppercase transition-all duration-300 hover:text-[#23E5DC]/60 lg:w-auto',
                  tab === route.value && 'font-bold text-[#23E5DC]'
                )}
              >
                {route.label}
              </Button>
            ))}
            <NavAction />
          </div>
        </SheetContent>
      </Sheet>
      </div>
    );
  }
  return (
    <nav className="flex justify-center">
      <div className="flex items-center space-x-12 text-base font-medium">
        {routes.map((route) => (
          <NavButton
            key={route.label}
            label={route.label}
            isActive={tab === route.value}
            onClick={() => handleChange(route.value)}
          />
        ))}
      </div>
    </nav>
  );
}
