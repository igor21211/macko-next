"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

const side = [
    { id: 1, name: 'Ззовні' },
    { id: 2, name: 'Зсередини'},
]
const decor = [
  { id: 1, image: '/figma-images/decor-sidebar/decor-inox.png' },
  { id: 2, image: '/figma-images/decor-sidebar/decor-molding.png' },
  { id: 3, image: '/figma-images/decor-sidebar/decor-paz.png' },
  { id: 4, image: '/figma-images/decor-sidebar/decor-none.png' },
]

export default function DoorDecor() {
    const [selected, setSelected] = useState(1);
    const [selectedDecor, setSelectedDecor] = useState(1);

    const handleSelect = (id: number) => {
        setSelected(id);
    }

    const handleSelectDecor = (id: number) => {
        setSelectedDecor(id);
    }

    return (
        <section className="w-full px-6 pt-6 pb-4">
            <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase tracking-[0.06em]">
                Декор
            </h3>
              <Button
                    type="button"
                    variant="ghost"
                    className="font-sans text-accent hover:text-none cursor-pointer hover:bg-transparent px-0 py-0 h-auto  shadow-none"
                >
                    У чому різниця?
            </Button>
            </div>
            <div className="grid grid-cols-2 gap-x-2 min-h-[50px] mb-5">
                {side.map((item) => (
                    <Button variant="sidebar" key={item.id} className={cn(`h-full w-full ${selected === item.id && 'border border-accent'}`)} onClick={() => handleSelect(item.id)}>
                        {item.name}
                    </Button>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-x-2 min-h-[128px]">
                {decor.map((item) => (
                    <div key={item.id} className={cn(`h-full w-full relative cursor-pointer ${selectedDecor === item.id && 'border-3 border-accent'}`)} onClick={() => handleSelectDecor(item.id)}>
                        <Image src={item.image} alt={item.id.toString()} fill className="object-cover" />
                    </div>
                ))}
            </div>
        </section>
    )
}