import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const side = [
  { id: 1, name: 'Ззовні' },
  { id: 2, name: 'Зсередини' },
];

const SKELETON_DECOR_COUNT = 4;

const DoorDecorLoading = () => {
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
          <Button variant="sidebar" key={item.id} className="h-full w-full" disabled>
            {item.name}
          </Button>
        ))}
      </div>
      <div className="grid min-h-[128px] grid-cols-4 gap-x-2">
        {Array.from({ length: SKELETON_DECOR_COUNT }).map((_, idx) => (
          <Skeleton key={idx} className="h-full w-full rounded" />
        ))}
      </div>
    </section>
  );
};

export default DoorDecorLoading;
