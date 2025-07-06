"use client";

import Image from "next/image";
import { useState } from "react";

interface Lock {
  id: string;
  title: string;
  description: string;
  image: string;
}

const locks: Lock[] = [
  {
    id: "lock-1",
    title: "ВТ-5",
    description: "5-точковий замок з круглими ригелями та засувкою з нержавіючої сталі",
    image: "/figma-images/lock-sidebar/lock-1.png",
  },
  {
    id: "lock-2",
    title: "ВТ 670",
    description: "INOSMART - 5-точковий замок з електричним замиканням та відмиканням",
    image: "/figma-images/lock-sidebar/lock-2.png",
  },
  {
    id: "lock-3",
    title: "ВТ 680",
    description: "INOSMART - 5-точковий замок з електроприводом. Замикання та відмикання",
    image: "/figma-images/lock-sidebar/lock-3.png",
  },
  {
    id: "lock-4",
    title: "ВТ 660",
    description: "INOSMART - 5-точковий замок з електроприводом. Замикання та відмикання",
    image: "/figma-images/lock-sidebar/lock-4.png",
  },
];

export default function DoorLock() {
  const [selectedLock, setSelectedLock] = useState<string>("lock-1");

  return (
    <section className="w-full px-6 pt-6 pb-4 border-b border-b-gray-200 shadow-sm">
      <div className="flex flex-row justify-between items-center mb-4">
        <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase tracking-[0.06em]">
          Замок
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {locks.map((lock) => (
          <div
            key={lock.id}
            onClick={() => setSelectedLock(lock.id)}
            className="cursor-pointer"
          >
            <div
              className={`relative aspect-square overflow-hidden border-2 transition-all ${
                selectedLock === lock.id
                  ? "border-2 border-accent"
                  : "border-transparent hover:border-accent/50"
              }`}
            >
              <Image
                src={lock.image}
                alt={lock.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-3 flex flex-col min-h-[80px]">
              <h4 className="font-bold text-[14px] leading-[17px] text-[#1A202C] mb-1">
                {lock.title}
              </h4>
              <p className="font-medium text-[12px] leading-[15px] text-[#718096] break-words">
                {lock.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}