import DoorCard from '@/app/[locale]/(dashboard)/components/door-card';
import { AnimatePresence, motion } from 'framer-motion';
import { type DoorCard as DoorCardType } from '@/lib/data/doors';

type Props = {
  cards: DoorCardType[];
};

export default function DoorList({ cards }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 px-8 md:grid-cols-3 md:gap-x-4 lg:grid-cols-5 lg:gap-x-8 xl:grid-cols-6">
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full gap-x-2 lg:w-auto"
          >
            <DoorCard
              img={card.img}
              label={card.label}
              id={card.id}
              priority={card.id <= 4}
              price={card.price}
              salePrice={card.salePrice}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
