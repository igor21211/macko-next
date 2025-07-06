import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function MobileNameModel() {
  const t = useTranslations('ModalView');
  return (
    <section className="align-center flex h-[60px] w-full flex-row items-center justify-start border-b border-b-gray-200 px-6 shadow-sm">
      <span className="text-heading-sidebar text-dark font-sans font-medium uppercase">
        Модель:
      </span>
      <span className="text-textDark text-body ml-2 font-bold">Line 200</span>
      <button className="text-accent ml-6 cursor-pointer font-sans text-[14px]">
        <Link href="/">{t('change')}</Link>
      </button>
    </section>
  );
}
