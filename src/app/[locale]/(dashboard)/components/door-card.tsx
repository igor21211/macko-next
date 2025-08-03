import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
  img: string;
  label: string;
  priority?: boolean;
  price: string;
  salePrice?: string;
  code: string;
};

export default function DoorCard({ img, label, priority = false, price, salePrice, code }: Props) {
  const t = useTranslations('DoorCard');
  const showSale = salePrice !== undefined && salePrice !== null;

  return (
    <Link href={`/model/${code}`}>
      <div className="group flex cursor-pointer flex-col items-center justify-center">
        <div className="group-hover:border-accent relative h-[200px] w-[100px] overflow-hidden rounded-md bg-white transition-all duration-200 group-hover:border-6 lg:h-[400px] lg:w-[200px]">
          <Image
            src={img}
            alt={t('door_alt', { label })}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain"
            priority={priority}
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-md opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xl font-bold text-cyan-400">{t('select')}</span>
          </div>
        </div>
        <div className="mt-2 text-center text-lg font-bold text-gray-800">{label}</div>
        <div className="mt-1 flex items-center justify-center gap-2 text-center">
          {showSale ? (
            <>
              <span className="text-danger text-xl font-bold">€{salePrice?.toLocaleString()}</span>
              <span className="text-textDark text-base font-semibold line-through">
                €{price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">€{price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
