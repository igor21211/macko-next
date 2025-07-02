import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const ActionsButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
      <Button
        onClick={handleGoBack}
        className="font-inter text-body text-textDark border-accent text-body h-[50px] w-[50%] cursor-pointer rounded-none border bg-[#EBF0F4] font-medium uppercase hover:bg-white/80"
      >
        <ChevronLeftIcon className="text-textDark h-4 w-4" />
        назад до конфігуратора
      </Button>
      <Button className="font-inter text-body text-textDark h-[50px] w-[50%] cursor-pointer rounded-none border-none bg-[#EBF0F4] uppercase shadow-none hover:bg-[#EBF0F4]/80">
        <Image
          src="/figma-images/modal-view/save-configuration.svg"
          alt="save"
          width={20}
          height={20}
        />
        Зберегти
      </Button>
    </div>
  );
};
