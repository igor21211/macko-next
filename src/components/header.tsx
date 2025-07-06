'use client';
import HeaderLogo from '@/components/header-logo';
import HeaderAction from '@/components/header-action';
import ModalProgress from '@/components/modal-progress';
import { useFullScreen } from '@/hooks/modal/use-full-screen';
import { useMedia } from 'react-use';
import MobileHeaderAction from './mobile-header-action';
import SearchInput from './search-input';
import { Separator } from './ui/separator';

export default function Header() {
  const { open } = useFullScreen();
  const isMobile = useMedia('(max-width: 1024px)', false);
  if (open) return null;

  return (
    <header className="h-[74px] w-full bg-white">
      <div className="flex h-full items-center justify-between px-3">
        <div className="flex flex-none items-center">
          <HeaderLogo />
        </div>
        <div className="flex items-center">
          <ModalProgress />
        </div>
        <div className="flex flex-row items-center">
          {isMobile ? (
            <>
              <div className="flex items-center">
                <Separator
                  orientation="vertical"
                  className="hidden h-[80px] border-r-2 border-[#EDF2F7] md:block lg:block"
                />
              </div>
              <div className="flex items-center">
                <SearchInput />
              </div>
              <div className="mr-3 flex items-center justify-center">
                <Separator
                  orientation="vertical"
                  className="hidden h-[80px] border-r-2 border-[#EDF2F7] md:block lg:block"
                />
              </div>
              <MobileHeaderAction />
            </>
          ) : (
            <HeaderAction />
          )}
        </div>
      </div>
    </header>
  );
}
