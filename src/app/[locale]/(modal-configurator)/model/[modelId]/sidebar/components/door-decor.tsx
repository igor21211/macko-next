'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useGetInox } from '@/hooks/modal/api-hooks/decor/useGetInox';
import { useGetMolding } from '@/hooks/modal/api-hooks/decor/useGetMolding';
import DoorDecorLoading from './loading-components/door-decor-loading';
import { getImageSrc } from '@/lib/utils/useImageSrc';
import { useSideContext } from '@/providers/side-provider';
import { useDecodeContext } from '@/providers/decode-provider';

const side = [
  { id: 1, name: 'Ззовні' },
  { id: 2, name: 'Зсередини' },
];

export default function DoorDecor() {
  const { decodedData } = useDecodeContext();
  const { inside, onOpenInside, onOpenOutside } = useSideContext();
  const activeSide = inside ? 2 : 1;
  const activeDecor = decodedData?.decor[inside ? 'inside' : 'outside'].id;
  const { data: inox, isLoading: isLoadingInox } = useGetInox(Number(decodedData?.model?.id));
  const { data: molding, isLoading: isLoadingMolding } = useGetMolding(
    Number(decodedData?.model?.id)
  );
  const decor = [...(inox || []), ...(molding || [])];

  if (isLoadingInox || isLoadingMolding) return <DoorDecorLoading />;

  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Декор
        </h3>
        <Button
          type="button"
          variant="ghost"
          className="text-accent hover:text-none h-auto cursor-pointer px-0 py-0 font-sans shadow-none hover:bg-transparent"
        >
          У чому різниця?
        </Button>
      </div>
      <div className="mb-5 grid min-h-[50px] grid-cols-2 gap-x-2">
        {side.map((item) => (
          <Button
            variant="sidebar"
            key={item.id}
            className={cn(`h-full w-full ${activeSide === item.id && 'border-accent border-2'}`)}
            onClick={() => {
              if (item.id === 1) {
                onOpenOutside();
              } else {
                onOpenInside();
              }
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="grid min-h-[200px] [grid-auto-rows:140px] grid-cols-3 gap-x-2 gap-y-4 lg:grid-cols-4">
        {decor.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div
              className={cn(
                `relative h-full w-full cursor-pointer ${activeDecor === item.id && 'border-accent border-2'}`
              )}
              onClick={() => {}}
            >
              <Image
                src={getImageSrc(item.image)}
                alt={item.id.toString()}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="mb-1 text-[14px] leading-[17px] font-bold text-[#1A202C]">
              {item.title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
