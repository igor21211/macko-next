'use client';
import HeaderLogo from '@/components/header-logo';
import HeaderAction from '@/components/header-action';
import ModalProgress from '@/components/modal-progress';
import { useFullScreen } from '@/hooks/modal/use-full-screen';
import { useMedia } from 'react-use';
import MobileHeaderAction from './mobile-header-action';

export default function Header() {
  const { open } = useFullScreen();
  const isMobile = useMedia('(max-width: 1024px)', false);
  if (open) return null;
  

  return (
    <header className="h-[74px] w-full bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-8">
        <div className="flex flex-none items-center">
          <HeaderLogo />
        </div>
        <div className="flex items-center">
          <ModalProgress />
        </div>
        <div>
          {isMobile ? (
            <MobileHeaderAction />
          ) : (
            <HeaderAction />
          )}
        </div>
      </div>
    </header>
  );
}
