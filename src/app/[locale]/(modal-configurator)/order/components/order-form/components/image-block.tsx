'use client';
import Image from 'next/image';
import { useExportDoor } from '@/hooks/modal/use-export-door';
import { useEffect, useState } from 'react';

interface Card {
  title: string;
  bg: string;
  door: string;
}

export const ImageBlock = () => {
  const { exportDoors, isReady } = useExportDoor();
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isReady) {
      setIsLoading(true);
      setError(null);

      exportDoors({ format: 'png', width: 400, height: 300 })
        .then((result) => {
          if (result) {
            setCards([
              {
                title: 'Ззовні',
                bg: '/figma-images/modal-view/sheet/background.jpg',
                door: result.outside,
              },
              {
                title: 'Зсередини',
                bg: '/figma-images/modal-view/sheet/background.jpg',
                door: result.inside,
              },
            ]);
          } else {
            setError('Не вдалося експортувати двері');
          }
        })
        .catch((error) => {
          console.error('Помилка експорту дверей:', error);
          setError('Помилка при експорті дверей. Спробуйте пізніше.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isReady, exportDoors]);
  if (error) {
    return (
      <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 p-4">
        <div className="text-center text-red-500">
          <p className="font-medium">Помилка:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 p-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
          <span>Генерація зображень...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 p-4">
      <div className="relative mb-4 flex h-full w-full max-w-[400px] flex-col justify-center sm:max-w-[320px] md:max-w-[400px] lg:max-w-[460px]">
        {cards.map((card) => (
          <div
            key={card.title}
            className="relative mb-4 flex aspect-[460/477] w-full max-w-[460px] justify-center"
          >
            <div className="relative h-full w-full">
              <Image
                src={card.bg}
                alt="background"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 460px"
              />
              <Image
                src={card.door}
                alt="door"
                width={100}
                height={200}
                className="absolute top-1/2 left-1/2 h-auto w-[20vw] max-w-[100px] min-w-[40px] -translate-x-[80%] -translate-y-[25%] object-contain lg:-translate-y-[25%]"
              />
              <div className="font-inter absolute top-8 left-1/2 z-10 -translate-x-1/2 text-[18px] leading-[1.2] font-medium tracking-[0.06em] text-[#1A202C] uppercase">
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
