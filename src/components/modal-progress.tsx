import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMedia } from 'react-use';

export default function ModalProgress() {
  const value = 10;
  const max = 100;
  const isMobile = useMedia('(max-width: 1024px)', false);
  return (
    <div className="flex flex-row">
      <div className="flex items-center">
        <ChevronLeft />
        <span className="flex items-center text-[16px] font-medium text-[#1A202C]">1 / 10</span>
        <ChevronRight className="text-accent" />
      </div>
      {!isMobile && (
      <div>
        <span className="mt-[2px] ml-2 font-['Inter'] text-[13px] leading-[100%] font-medium tracking-[0%] text-[#718096]">
          Вибір моделі
        </span>
        <Progress
          value={value}
          max={max}
          className="h-[3px] w-[400px] bg-[#DEE1E3] [&_[data-slot=progress-indicator]]:bg-accent"
        />
      </div>
      )}
    </div>
  );
}
