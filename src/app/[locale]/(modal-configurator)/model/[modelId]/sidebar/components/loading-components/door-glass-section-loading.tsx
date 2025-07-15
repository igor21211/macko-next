import { Skeleton } from '@/components/ui/skeleton';

export default function DoorGlassSectionLoading() {
  return (
    <section className="w-full border-none px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
            Скло
          </h3>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <label className="text-primary font-sans text-[14px] font-medium">Безпечне скло</label>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>
      <div className="mb-5 grid min-h-[50px] grid-cols-2 gap-x-2">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
      <div className="mb-4 grid min-h-[128px] [grid-auto-rows:128px] grid-cols-4 gap-x-2 gap-y-2 pb-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="relative h-full w-full" />
        ))}
      </div>
    </section>
  );
}
