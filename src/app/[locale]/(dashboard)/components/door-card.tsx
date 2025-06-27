import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
  img: string;
  label: string;
  id: number;
  priority?: boolean;
};

export default function DoorCard({ img, label, id, priority = false }: Props) {
  const t = useTranslations('DoorCard');
  return (
    <Link href={`/model/${id}`}>
      <div className="group flex w-56 cursor-pointer flex-col items-center justify-center">
        <div className="relative h-[400px] w-[200px] overflow-hidden rounded-md bg-white transition-all duration-200 group-hover:border-6 group-hover:border-accent">
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
      </div>
    </Link>
  );
}
