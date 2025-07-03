'use client';
import { useMedia } from 'react-use';
import { useSearchParams, useRouter } from 'next/navigation';
import { useOpenModalFilters } from '@/hooks/dashboard/use-open-modal-filters';
import { NavButton } from '@/app/[locale]/(dashboard)/components/nav-bar/components/nav-button';
import Image from 'next/image';

export default function FiltersButton() {
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
      <>
        <Image
          src="/figma-images/header_vector_2.svg"
          alt="Vector2"
          width={18}
          height={20}
          onClick={onOpen}
          className="cursor-pointer"
        />
      </>
    );
  }

  return (
    <>
      <Image src="/figma-images/header_vector_2.svg" alt="Vector2" width={28} height={30} />
      <NavButton
        label={isActiveFilters ? 'Скинути' : 'Фільтрувати'}
        isActive={isActiveFilters}
        onClick={isActiveFilters ? handleReset : onOpen}
      />
    </>
  );
}
