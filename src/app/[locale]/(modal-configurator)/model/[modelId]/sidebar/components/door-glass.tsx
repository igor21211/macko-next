"use client"

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const glassImages = [
  { id: 1, image: '/figma-images/glass-sidebar/glass-1.png' },
  { id: 2, image: '/figma-images/glass-sidebar/glass-2.png' },
  { id: 3, image: '/figma-images/glass-sidebar/glass-3.png' },
  { id: 4, image: '/figma-images/glass-sidebar/glass-4.png' },
  { id: 5, image: '/figma-images/glass-sidebar/glass-5.png' },
  { id: 6, image: '/figma-images/glass-sidebar/glass-6.png' },
];

export default function DoorGlass() {
    const [selectedGlass, setSelectedGlass] = useState(1);

    const handleSelectGlass = (id: number) => {
        setSelectedGlass(id);
    }

    return (
        <section className="w-full px-6 pt-6 pb-4">
                  <div className="flex flex-row justify-between items-center mb-4">
            <div className="flex flex-col items-start">
            <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase tracking-[0.06em]">
                Скло
            </h3>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <Label htmlFor="safe-glass" className="font-sans text-[14px] font-medium text-primary">
                       Безпечне скло
                    </Label>
                    <Switch id="safe-glass" />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-x-2 pb-4 min-h-[128px] gap-y-2 mb-4 [grid-auto-rows:128px] ">
                {glassImages.map((image) => (
                    <div key={image.id} className={cn('w-full h-full relative cursor-pointer', selectedGlass === image.id && 'border-3 border-accent')} onClick={() => handleSelectGlass(image.id)}>
                        <Image key={image.id} src={image.image} alt={image.id.toString()} fill className="object-cover" />
                    </div>
                ))}
            </div>
        </section>
    )
}