"use client";

import { Separator } from "@/components/ui/separator";
import { useCostConfiguration } from "@/hooks/modal/use-cost-configuration";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMedia } from "react-use";
import { useRouter } from "next/navigation";
import { useFullScreen } from "@/hooks/modal/use-full-screen";

export const TopBar = () => {
  const t = useTranslations('ModalView');
  const router = useRouter();
  const { onOpen } = useCostConfiguration();
  const isMobile = useMedia('(max-width: 1024px)', false);
  const isTablet = useMedia('(max-width: 1680px)', false);
  const {open} = useFullScreen();

  const handleOrder = () => {
    router.push('/order');
  }


  if(open) return null;

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 w-full z-50 bg-primary h-[74px] flex">
        <div className="flex lg:flex-row flex-col justify-center items-center p-2 lg:p-0  w-1/2 h-full pl-2 lg:pl-4" onClick={onOpen}>
          <div className="flex flex-col items-start gap-y-2">
            <span className="lg:text-body md:text-body text-[13px] font-sans text-accent">{t('cost')}:</span>
            <span className="lg:text-body md:text-body text-[13px] font-sans text-white">€2 499</span>
          </div>
         
        </div>
        <div className="flex items-center justify-end w-1/2 h-full pr-0">
          <button className="bg-[#C7540F] w-full h-full flex items-center justify-center gap-x-2 lg:gap-x-4 cursor-pointer hover:bg-[#C7540F]/80 transition-all duration-300" onClick={handleOrder}>
            <Image src="/figma-images/modal-view/basket.svg" alt={t('order')} width={30} height={26} />
            <span className="text-body font-sans text-white uppercase">{t('order')}</span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-[98%] bg-primary mx-auto min-h-[74px] flex items-center mt-2 lg:mt-4">
      <div className={`flex-1 flex items-center justify-between px-2 lg:px-[30px]`}>
        { !isTablet && (
        <div className="flex items-center gap-x-2 lg:gap-x-3">
          <span className="text-body font-sans text-white">{t('model')}:</span>
          <span className="text-body font-sans text-white">Line 200</span>
          <button className="text-[14px] font-sans text-accent lg:ml-6 cursor-pointer">
            <Link href="/">
              {t('change')}
            </Link>
          </button>
        </div>
        )}
        <div className="flex justify-center gap-x-10">
          <div className="flex items-center justify-center gap-2">
            <button className="flex items-center gap-x-2 cursor-pointer" onClick={onOpen}>
              <span className="text-body font-sans text-accent text-[11px] lg:text-[16px]">
              {t('cost')}:
              </span> 
              <span className="text-body font-sans text-white text-[11px] lg:text-[16px]">
                €2 499
              </span>
            </button>
          </div>
      {!isTablet && (
          <div className="flex items-center gap-x-6">
            <Separator orientation="vertical" className="h-full bg-[#EDEFF233]" />
            <button className="flex items-center gap-x-3 cursor-pointer">
              <Image
                src="/figma-images/modal-view/save-configuration.svg"
                alt={t('save')}
                width={22}
                height={26}
              />
              <span className="text-body font-sans text-white">
                {t('save')}
              </span>
            </button>
          </div>
          )}
        </div>
      </div> 
      <button className="bg-[#C7540F] h-[74px] px-8 flex items-center gap-x-4 ml-auto cursor-pointer hover:bg-[#C7540F]/80 transition-all duration-300" onClick={handleOrder}>
        <Image src="/figma-images/modal-view/basket.svg" alt={t('order')} width={30} height={26} />
        <span className="text-body font-sans text-white uppercase">
          {t('order')}
        </span>
      </button>
    </div>
  );
}; 