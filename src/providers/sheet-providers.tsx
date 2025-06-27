'use client';

import { CostSheets } from '@/app/[locale]/(modal-configurator)/model/[modelId]/modal-view/sheets/cost-sheets';
import { InfoEquipmentSheet } from '@/app/[locale]/(modal-configurator)/model/[modelId]/modal-view/sheets/info-equipmet-sheet';
import { useMountedState } from 'react-use';

export const SheetProviders = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <CostSheets />
      <InfoEquipmentSheet />
    </>
  );
};
