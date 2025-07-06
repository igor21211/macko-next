'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { title: 'Профайл клієнта', path: '/account-settings/profile-info' },
  { title: 'Мої замовлення', path: '/account-settings/my-orders' },
  {
    title: 'Збережені конфігурації',
    path: '/account-settings/saved-configurations',
    isActive: false,
  },
  { title: 'Зв’язатися з менеджером', path: '/account-settings/contact-manager' },
];

export default function AccountSideBar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full max-w-[45%] flex-col bg-white px-8 py-10 shadow-md md:max-w-[30%] lg:max-w-[20%]">
      <nav className="flex flex-col items-end gap-10">
        {menuItems.map((item) => (
          <Link
            href={item.path}
            key={item.title}
            tabIndex={0}
            aria-label={item.title}
            className={cn(
              'font-inter text-body text-textDark text-right leading-[1.4] transition-colors focus:outline-none',
              pathname.endsWith(item.path) ? 'font-bold' : 'font-normal'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
