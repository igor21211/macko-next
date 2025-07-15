import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useMedia } from 'react-use';

export default function OpenWaySectionSkeleton() {
  const isMobile = useMedia('(max-width: 580px)');
  const skeletons = Array.from({ length: 4 });

  return (
    <section className="w-full border-b border-b-gray-200 px-6 py-4 shadow-sm">
      <h3 className="text-heading-sidebar text-textDark mb-4 font-sans font-medium tracking-wider uppercase">
        Напрямок відкривання
      </h3>
      <div
        className={cn(
          'flex w-full gap-2',
          isMobile
            ? 'scrollbar-hide h-[60px] max-w-[600px] overflow-x-auto px-2'
            : 'mx-auto max-w-[537px] justify-center px-6'
        )}
        style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
      >
        {skeletons.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'flex h-[60px] w-[128px] flex-shrink-0 flex-col items-center justify-center rounded-none border-none bg-white shadow-none'
            )}
          >
            <div className="flex h-full w-full flex-row items-center gap-2">
              <Skeleton className="h-[40px] w-[40px] rounded" />
              <Skeleton className="h-4 flex-1 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
