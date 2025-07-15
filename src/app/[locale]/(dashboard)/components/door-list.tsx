import DoorCard from '@/app/[locale]/(dashboard)/components/door-card';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal } from '@/hooks/dashboard/api-hooks/useGetModals';
import DoorCardSkeleton from './door-card-skeleton';
import { getImageSrc } from '@/lib/utils/useImageSrc';

type Props = {
  cards: Modal[];
  isLoading: boolean;
};

export default function DoorList({ cards, isLoading }: Props) {
  // Количество скелетонов (например, 6)
  const skeletonCount = 12;

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 px-8 md:grid-cols-3 md:gap-x-4 lg:grid-cols-5 lg:gap-x-8 xl:grid-cols-6">
      <AnimatePresence>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <motion.div
                key={`skeleton-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full gap-x-2 lg:w-auto"
              >
                <DoorCardSkeleton />
              </motion.div>
            ))
          : cards?.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full gap-x-2 lg:w-auto"
              >
                <DoorCard
                  img={getImageSrc(card.image)}
                  label={card.title}
                  id={card.id}
                  priority={card.id <= 4}
                  price={card.price}
                  salePrice={card.old_price}
                />
              </motion.div>
            ))}
      </AnimatePresence>
    </div>
  );
}
