'use client';
import DialogFilters from '@/app/[locale]/(dashboard)/components/dialog-filters/dialog-filters';
import SearchDialog from '@/app/[locale]/(dashboard)/components/search-dialog/search-dialog';
import { useMountedState } from 'react-use';

export const ModalProviders = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <DialogFilters />
      <SearchDialog />
    </>
  );
};
