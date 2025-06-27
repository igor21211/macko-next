'use client';
import { Button } from '@/components/ui/button';
import { useOpenSearchModal } from '@/hooks/dashboard/use-open-search-modal';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useMedia } from 'react-use';

export default function HeaderAction() {
  const t = useTranslations('HeaderAction');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const isMobile = useMedia('(max-width: 1024px)', false);

  const { onOpen: onOpenSearch } = useOpenSearchModal();
  const languages = (process.env.LANGUAGES || 'ua,en,ru').split(',');
  const currencies = (process.env.CURRENCIES || 'uah,usd,eur').split(',');
  const [langOpen, setLangOpen] = useState(false);
  const [curOpen, setCurOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  if (isMobile) {
    return (
      <div className="flex h-[74px] flex-col items-center justify-center gap-y-5">
        <Button variant="nav" onClick={onOpenSearch} aria-label={t('search')} className="flex flex-row justify-center items-center gap-x-3">
          <span className="text-sm font-medium text-textDark">
            {t('search')}
          </span>
          <Image src="/figma-images/search_icon_1.svg" alt="Search" width={24} height={24} />
        </Button>
        <Separator orientation="horizontal" className=" border-accent w-full h-[1px]" />
        <div className="flex flex-row items-center gap-x-4">
        <Select value={locale} onValueChange={handleLocaleChange} open={langOpen} onOpenChange={setLangOpen}>
          <SelectTrigger className="flex h-[19px] min-w-[70px] items-center  border border-accent px-9 py-5 shadow-none focus:border-none focus:ring-0 ">
            <SelectValue
              placeholder={locale.toUpperCase()}
              className=" font-sans text-[18px] font-medium text-[#1A202C]"
            />
            {langOpen ? (
              <ChevronUpIcon className="ml-1" size={14} color="#23E5DC" />
            ) : (
              <ChevronDownIcon className="ml-1" size={14} color="#23E5DC" />
            )}
          </SelectTrigger>
          <SelectContent className="border-none z-50 bg-white w-[100px]">
            {languages.map((lang) => (
              <SelectItem
                key={lang}
                value={lang}
                className="font-sans text-[14px] font-medium text-[#1A202C] focus:bg-accent hover:bg-accent/50"
              >
                {lang.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue={currencies[0]} open={curOpen} onOpenChange={setCurOpen}>
          <SelectTrigger className="flex h-[19px] min-w-[70px] items-center  border border-accent px-9 py-5 shadow-none focus:border-none focus:ring-0 ">
            <SelectValue
              placeholder={currencies[0].toUpperCase()}
              className="font-sans text-[14px] font-medium text-textDark"
            />
            {curOpen ? (
              <ChevronUpIcon className="ml-1" size={14} color="#23E5DC" />
            ) : (
              <ChevronDownIcon className="ml-1" size={14} color="#23E5DC" />
            )}
          </SelectTrigger>
          <SelectContent className="border-none z-50 bg-white w-[100px]">
            {currencies.map((cur) => (
              <SelectItem
                key={cur}
                value={cur}
                className="font-sans text-[14px] font-medium text-[#1A202C] focus:bg-accent hover:bg-accent/50"
              >
                {cur.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
        <Separator orientation="horizontal" className="border-accent w-full h-[1px] " />
        <Button variant="nav" aria-label={t('login')} className="flex flex-row justify-center items-center mt-5 gap-x-3">
          <span className="text-sm font-medium text-textDark">{t('login')}</span>
        <Image src="/figma-images/login.svg" alt="Login" width={50} height={50} />
      </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[74px] flex-row items-center gap-2">
      <Separator orientation="vertical" className="border-[#EDF2F7]" />
      <Button variant="nav" onClick={onOpenSearch} aria-label={t('search')}>
        <Image src="/figma-images/search_icon_1.svg" alt="Search" width={30} height={30} />
      </Button>
      <Separator orientation="vertical" className="border-[#EDF2F7]" />
     <Select value={locale} onValueChange={handleLocaleChange} open={langOpen} onOpenChange={setLangOpen}>
          <SelectTrigger className="flex h-[19px] min-w-[70px] items-center  border-none px-3 py-2 shadow-none focus:border-none focus:ring-0 ">
            <SelectValue
              placeholder={locale.toUpperCase()}
              className=" font-sans text-[18px] font-medium text-[#1A202C]"
            />
            {langOpen ? (
              <ChevronUpIcon className="ml-1" size={14} color="#23E5DC" />
            ) : (
              <ChevronDownIcon className="ml-1" size={14} color="#23E5DC" />
            )}
          </SelectTrigger>
          <SelectContent className="border-none z-50 bg-white w-[100px]">
            {languages.map((lang) => (
              <SelectItem
                key={lang}
                value={lang}
                className="font-sans text-[14px] font-medium text-[#1A202C] focus:bg-accent hover:bg-accent/50"
              >
                {lang.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      <Separator orientation="vertical" className="border-[#EDF2F7]" />
    <Select defaultValue={currencies[0]} open={curOpen} onOpenChange={setCurOpen}>
          <SelectTrigger className="flex h-[19px] min-w-[70px] items-center  border-none px-3 py-2 shadow-none focus:border-none focus:ring-0 ">
            <SelectValue
              placeholder={currencies[0].toUpperCase()}
              className="font-sans text-[14px] font-medium text-textDark"
            />
            {curOpen ? (
              <ChevronUpIcon className="ml-1" size={14} color="#23E5DC" />
            ) : (
              <ChevronDownIcon className="ml-1" size={14} color="#23E5DC" />
            )}
          </SelectTrigger>
          <SelectContent className="border-none z-50 bg-white w-[100px]">
            {currencies.map((cur) => (
              <SelectItem
                key={cur}
                value={cur}
                className="font-sans text-[14px] font-medium text-[#1A202C] focus:bg-accent hover:bg-accent/50"
              >
                {cur.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      <Separator orientation="vertical" className="border-[#EDF2F7]" />
      <Button variant="nav" aria-label={t('login')}>
        <Image src="/figma-images/login.svg" alt="Login" width={30} height={30} />
      </Button>
    </div>
  );
}
