import MainLogo from '@/components/header-logo';
import Navbar from '@/app/[locale]/(dashboard)/components/nav-bar/navbar';
import NavAction from '@/app/[locale]/(dashboard)/components/nav-bar/components/nav-action';

export default function Header() {
  return (
    <header className="h-[74px] w-full bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-8">
        <div className="flex flex-none items-center">
          <MainLogo />
        </div>
        <Navbar />
        <div className="hidden lg:flex">
          <NavAction />
        </div>
      </div>
    </header>
  );
}
