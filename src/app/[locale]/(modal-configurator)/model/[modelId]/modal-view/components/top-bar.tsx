'use client';

import { Separator } from '@/components/ui/separator';
import { useCostConfiguration } from '@/hooks/modal/use-cost-configuration';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMedia } from 'react-use';
import { useParams, useRouter } from 'next/navigation';
import { useFullScreen } from '@/hooks/modal/use-full-screen';

export const TopBar = () => {
  const t = useTranslations('ModalView');
  const router = useRouter();
  const { onOpen } = useCostConfiguration();
  const isMobile = useMedia('(max-width: 1024px)', false);
  const isTablet = useMedia('(max-width: 1680px)', false);
  const { open } = useFullScreen();
  const { modelId } = useParams();

  const handleOrder = () => {
    router.push(`/order?code=${modelId}`);
  };

  if (open) return null;

  if (isMobile) {
    return (
      <div className="bg-primary fixed bottom-0 left-0 z-50 flex h-[74px] w-full">
        <div
          className="flex h-full w-1/2 flex-col items-center justify-center p-2 pl-2 lg:flex-row lg:p-0 lg:pl-4"
          onClick={onOpen}
        >
          <div className="flex flex-col items-start gap-y-2">
            <span className="lg:text-body md:text-body text-accent font-sans text-[13px]">
              {t('cost')}:
            </span>
            <span className="lg:text-body md:text-body font-sans text-[13px] text-white">
              €2 499
            </span>
          </div>
        </div>
        <div className="flex h-full w-1/2 items-center justify-end pr-0">
          <button
            className="flex h-full w-full cursor-pointer items-center justify-center gap-x-2 bg-[#C7540F] transition-all duration-300 hover:bg-[#C7540F]/80 lg:gap-x-4"
            onClick={handleOrder}
          >
            <Image
              src="/figma-images/modal-view/basket.svg"
              alt={t('order')}
              width={30}
              height={26}
            />
            <span className="text-body font-sans text-white uppercase">{t('order')}</span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-primary mx-auto mt-2 flex min-h-[74px] w-[98%] items-center lg:mt-4">
      <div className={`flex flex-1 items-center justify-between px-2 lg:px-[30px]`}>
        <div>
          <div className="flex items-center justify-center gap-2">
            <button className="flex cursor-pointer items-center gap-x-2" onClick={onOpen}>
              <span className="text-body text-accent font-sans text-[11px] lg:text-[16px]">
                {t('cost')}:
              </span>
              <span className="text-body font-sans text-[11px] text-white lg:text-[16px]">
                €2 499
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-x-10">
          {!isTablet && (
            <div className="flex items-center gap-x-6">
              <Separator orientation="vertical" className="h-[74px] border-[#EDEFF233]" />
              <button className="flex cursor-pointer items-center gap-x-3">
                <Image
                  src="/figma-images/modal-view/save-configuration.svg"
                  alt={t('save')}
                  width={22}
                  height={26}
                />
                <span className="text-body font-sans text-white">{t('save')}</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-x-6">
            <button className="flex cursor-pointer items-center gap-x-3">
              <Image
                src="/figma-images/modal-view/share-icon.svg"
                alt={t('save')}
                width={22}
                height={26}
              />
              <span className="text-body font-sans text-white">{t('share')}</span>
            </button>
          </div>
        </div>
      </div>
      <button
        className="ml-auto flex h-[74px] cursor-pointer items-center gap-x-4 bg-[#C7540F] px-8 transition-all duration-300 hover:bg-[#C7540F]/80"
        onClick={handleOrder}
      >
        <Image src="/figma-images/modal-view/basket.svg" alt={t('order')} width={30} height={26} />
        <span className="text-body font-sans text-white uppercase">{t('order')}</span>
      </button>
    </div>
  );
};
