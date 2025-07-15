import { Skeleton } from '@/components/ui/skeleton';

export default function DoorFormSectionLoading() {
  return (
    <section className="h-[200px] w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-x-2">
        <h3 className="text-heading-sidebar mb-4 font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Форма дверей
        </h3>
        <div className="flex items-center justify-center gap-x-2">
          <Skeleton className="h-[25px] w-[25px] rounded" />
          <Skeleton className="h-[25px] w-[25px] rounded" />
        </div>
      </div>
      <div className="h-[70%] w-full">
        <div
          className="scrollbar-hide flex h-full w-full gap-x-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="group relative flex aspect-[5/7] h-full min-w-[90px] flex-1 items-center justify-center rounded-none border-none bg-white p-0 py-3"
            >
              <Skeleton className="relative h-[90px] w-full lg:h-[70px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
