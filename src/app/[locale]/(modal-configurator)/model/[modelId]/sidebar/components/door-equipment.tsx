"use client"
import { Button } from "@/components/ui/button";
import { useInfoEquipmentDoor } from "@/hooks/modal/use-info-equipmet-door";
import { cn } from "@/lib/utils";
import { useState } from "react";

const equipment = [
    { id: 1, name: 'Економ', price: 1000 },
    { id: 2, name: 'Стандарт', price: 2000 },
    { id: 3, name: 'Супер', price: 3000 },
]

export default function DoorEquipment() {
    const [selected, setSelected] = useState(1);
    const {  onOpen } = useInfoEquipmentDoor();

    const handleSelect = (id: number) => {
        setSelected(id);
    }

    return (
           <section className="w-full px-6 pt-6 pb-4">
            <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase tracking-[0.06em]">
                    Комплектація
                </h3>
                <Button
                    type="button"
                    variant="ghost"
                    className="font-sans text-accent hover:text-none cursor-pointer hover:bg-transparent px-0 py-0 h-auto  shadow-none"
                    onClick={() => onOpen()}
                >
                    У чому різниця?
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-x-2 min-h-[50px]">
                {equipment.map((item) => (
                    <Button variant="sidebar" key={item.id} className={cn(`h-full w-full ${selected === item.id && 'border border-accent'}`)} onClick={() => handleSelect(item.id)}>
                        {item.name}
                    </Button>
                ))}
            </div>
        </section>
    )
}