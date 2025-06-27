'use client';
import Image from 'next/image';
import { NavButton } from '@/app/[locale]/(dashboard)/components/nav-bar/components/nav-button';
import { useMedia } from 'react-use';
import { Button } from '@/components/ui/button';
import { useOpenModalFilters } from '@/hooks/dashboard/use-open-modal-filters';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import HeaderAction from '@/components/header-action';

export default function NavAction() {
  const isMobile = useMedia('(max-width: 1024px)', false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const model = searchParams.get('model') || 'all';
  const glass = searchParams.get('glass') || 'all';
  const isActiveFilters = model !== 'all' || glass !== 'all';
  const { onOpen } = useOpenModalFilters();

  const handleReset = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('model');
    params.delete('glass');
    router.push(`?${params.toString()}`);
  };


  if (isMobile) {
    return (
      <div className="flex flex-col items-start gap-y-5">
        <div>
          <Button
            variant="nav"
            className={cn(
              'w-full justify-start space-x-2 rounded-none border-none font-sans text-[16px] uppercase transition-all duration-300  lg:w-auto',
              isActiveFilters && 'text-accent'
            )}
            onClick={isActiveFilters ? handleReset : onOpen}
          >
            {isActiveFilters ? 'Скинути' : 'Фільтрувати'}
            <Image
              src="/figma-images/header_vector_2.svg"
              alt="Vector2"
              width={28}
              height={30}
              className="ml-4"
            />
          </Button>
        </div>
          <Separator orientation="vertical" className="border-[#EDF2F7]" />
        <div className="w-full">
          <HeaderAction />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-[74px] items-center space-x-6">
      <Separator orientation="vertical" className="border-[#EDF2F7]" />
      <NavButton
        label={isActiveFilters ? 'Скинути' : 'Фільтрувати'}
        isActive={isActiveFilters}
        onClick={isActiveFilters ? handleReset : onOpen}
      />
      <HeaderAction />
    </div>
  );
}
