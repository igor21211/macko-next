'use client';
import { DoorPreview } from './components/door-preview';
import { useMedia } from 'react-use';
import { cn } from '@/lib/utils';
import { useSideContext } from '@/providers/side-provider';

export default function ModalView() {
  const { inside } = useSideContext();
  const isDoorReduced = useMedia('(max-width: 510px) and (min-width: 320px)', false);

  // Определяем какую сторону показывать
  const currentSide = inside ? 'inside' : 'outside';

  return (
    <div
      className={cn(
        'z-10 order-1 flex h-full w-full flex-col lg:order-2 lg:min-h-0',
        isDoorReduced ? 'mx-auto min-h-[40vh] w-full' : 'min-h-[50vh]'
      )}
    >
      <DoorPreview isDoorReduced={isDoorReduced} side={currentSide} />
    </div>
  );
}
