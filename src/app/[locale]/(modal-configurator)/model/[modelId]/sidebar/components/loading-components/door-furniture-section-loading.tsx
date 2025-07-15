import { Skeleton } from '@/components/ui/skeleton';

export default function DoorFurnitureSectionLoading() {
  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between lg:mb-6">
        <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Фурнітура
        </h3>
      </div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
            Ручка
          </h3>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <label className="text-primary font-sans text-[14px] font-medium">Black Edition</label>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>
      <div className="mb-5 grid min-h-[50px] grid-cols-2 gap-x-2">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
      <div className="mb-4 grid min-h-[100px] [grid-auto-rows:130px] grid-cols-5 gap-x-2 gap-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex h-full w-full flex-col items-center">
            <Skeleton className="relative aspect-square h-full w-full" />
            <Skeleton className="mt-2 h-4 w-16" />
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-primary font-sans text-[14px] font-medium">Розмір</h3>
        <div className="flex flex-row items-center gap-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <div className="scrollbar-hide min-w-[600px] overflow-x-auto overflow-y-hidden">
        <div className="mb-4 grid auto-cols-[100px] grid-flow-col gap-x-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-[100px] rounded" />
          ))}
          <div className="min-w-[4px]" aria-hidden="true" />
        </div>
      </div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-primary font-sans text-[14px] font-medium">Колір</h3>
        <div className="flex flex-row items-center gap-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <div className="scrollbar-hide min-w-[600px] overflow-x-auto overflow-y-hidden">
        <div className="mb-4 grid min-h-[60px] auto-cols-[60px] grid-flow-col gap-x-2">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-[60px] w-[60px] rounded-full" />
          ))}
          <div className="min-w-[4px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
