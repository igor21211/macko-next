"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';   
import { useMedia } from 'react-use';
import { cn } from '@/lib/utils';


const directions = [
    {
      id:1,
    img: '/figma-images/left-in.svg',
    label: (
      <>
        Ліва<br />всередину
      </>
    ),
  },
    {
      id:2,
    img: '/figma-images/right-in.svg',
    label: (
      <>
        Права<br />всередину
      </>
    ),
  },
    {
      id:3,
    img: '/figma-images/left-out.svg',
    label: (
      <>
        Ліва<br />назовні
      </>
    ),
  },
    {
      id:4,
    img: '/figma-images/right-out.svg',
    label: (
      <>
        Права<br />назовні
      </>
      ),
    
  },
];

export default function OpenWaySection() {
    const [id, setId] = useState(1)
  const isMobile = useMedia('(max-width: 580px)');
    const handleClick = (id: number) => {
        setId(id)
    }
  return (
    <section className="w-full px-6 py-4">
      <h3 className="font-sans text-heading-sidebar font-medium text-textDark uppercase mb-4 tracking-wider">
        Напрямок відкривання
      </h3>
      <div
        className={cn(
          "flex gap-2 w-full",
          isMobile
            ? "overflow-x-auto max-w-[600px] h-[60px] px-2 scrollbar-hide"
            : "justify-center px-6 max-w-[537px] mx-auto"
        )}
        style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
      >
              {directions.map((item, idx) => (
          <Button
            key={idx}
            className={cn(
              "flex flex-col items-center h-[60px] bg-white rounded-none shadow-none justify-center hover:bg-accent/10 cursor-pointer border flex-shrink-0",
              isMobile ? "w-[128px]" : "w-[128px]",
              id === item.id ? "border-2 border-accent" : "border-transparent"
            )}
            onClick={() => handleClick(item.id)}
          >
            <div className="flex flex-row h-full w-full items-center gap-2">
              <div className="relative h-[40px] w-[40px] flex items-center justify-center">
              <Image
                src={item.img}
                alt="direction"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 flex items-center font-sans text-[0.75rem] text-textLight leading-[1.21em] font-medium text-left">
                {item.label}
            </div>
          </div>
          </Button>
        ))}
      </div>
    </section>
  );
}