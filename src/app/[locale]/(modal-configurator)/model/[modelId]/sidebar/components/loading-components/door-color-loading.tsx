import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import SelectCustom from '@/components/select-custom';

const SKELETON_COLORS_COUNT = 8;

const typeColors = [
  { value: 'grey', label: 'Сірий' },
  { value: 'white', label: 'Білий' },
  { value: 'black', label: 'Чорний' },
  { value: 'brown', label: 'Коричневий' },
  { value: 'red', label: 'Червоний' },
];

const DoorColorLoading = () => {
  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
            Колір
          </h3>
          <Button
            type="button"
            variant="ghost"
            className="text-accent hover:text-none h-auto cursor-pointer px-0 py-0 font-sans shadow-none hover:bg-transparent"
          >
            Розширені налаштування
          </Button>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <Button
            type="button"
            variant="ghost"
            className="text-accent hover:text-none h-auto cursor-pointer px-0 py-0 font-sans shadow-none hover:bg-transparent"
            onClick={() => {}}
          >
            У чому різниця?
          </Button>
        </div>
      </div>
      <div className="mb-4 grid min-h-[50px] grid-cols-2 gap-x-2">
        <Button variant="sidebar" className="h-full w-full">
          ALUMINIUM
        </Button>
        <Button variant="sidebar" className="h-full w-full">
          HPL
        </Button>
      </div>
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <h3 className="text-textDark font-inter text-[14px] font-medium tracking-[0.06em] uppercase">
          Зсередини
        </h3>
        <SelectCustom
          value={''}
          onChange={() => {}}
          content={typeColors}
          placeholder="Назва кольору"
          className="max-h-[31px] w-[170px] rounded-none border border-[#E2E7ED] text-[14px] font-normal focus:outline-none lg:w-[270px]"
          classNameContent="text-[14px] font-normal font-inter text-textDark lg:w-[270px] w-[170px] rounded-none border border-[#E2E7ED] bg-white p-0"
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-x-2 gap-y-2">
        {Array.from({ length: SKELETON_COLORS_COUNT }).map((_, idx) => (
          <Skeleton key={idx} className="h-[60px] w-[60px] rounded" />
        ))}
      </div>
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <h3 className="text-textDark font-inter text-[14px] font-medium tracking-[0.06em] uppercase">
          Ззовні
        </h3>
        <SelectCustom
          value={''}
          onChange={() => {}}
          content={typeColors}
          placeholder="Назва кольору"
          className="max-h-[31px] w-[170px] rounded-none border border-[#E2E7ED] text-[14px] font-normal focus:outline-none lg:w-[270px]"
          classNameContent="text-[14px] font-normal font-inter text-textDark lg:w-[270px] w-[170px] rounded-none border border-[#E2E7ED] bg-white p-0"
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-x-2 gap-y-2">
        {Array.from({ length: SKELETON_COLORS_COUNT }).map((_, idx) => (
          <Skeleton key={idx} className="h-[60px] w-[60px] rounded" />
        ))}
      </div>
    </section>
  );
};

export default DoorColorLoading;
