import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMedia } from "react-use";

export default function MobileNameModel() {
    const t = useTranslations('ModalView');
    const isMobile = useMedia('(max-width: 1024px)');
    if(isMobile) {
    return (
              <section className="flex flex-row items-center justify-start align-center px-6 py-4">
         <span className="text-heading-sidebar font-sans  font-medium text-dark uppercase">Модель:</span>
          <span className="text-body font-[Inter] font-bold text-dark ml-2">Line 200</span>
          <button className="text-[14px] font-sans text-accent ml-6 cursor-pointer">
            <Link href="/">
              {t('change')}
            </Link>
          </button>
        </section>
    )
    }
    return null;
}