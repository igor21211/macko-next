'use client';
import { useMedia } from 'react-use';
import { Separator } from '@/components/ui/separator';
import HeaderAction from '@/components/header-action';
import FiltersButton from '@/components/filters-button';

export default function NavAction() {
  const isMobile = useMedia('(max-width: 1024px)', false);

  if (isMobile) {
    return (
      <div className="flex flex-col items-start gap-y-5 mt-10">
        <div className="w-full">
          <HeaderAction />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-[74px] items-center space-x-6">
      <Separator orientation="vertical" className="border-[#EDF2F7]" />
      <FiltersButton />
      <HeaderAction />
    </div>
  );
}
