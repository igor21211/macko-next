"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const side = [
    { id: 1, name: 'Ззовні' },
    { id: 2, name: 'Зсередини'},
]

const furnitureColors = [
  { id: 1, image: '/figma-images/side-bar-colors/color-1.png' },
  { id: 2, image: '/figma-images/side-bar-colors/color-2.png' },
  { id: 3, image: '/figma-images/side-bar-colors/color-3.png' },
  { id: 4, image: '/figma-images/side-bar-colors/color-4.png' },
  { id: 5, image: '/figma-images/side-bar-colors/color-5.png' },
  { id: 6, image: '/figma-images/side-bar-colors/color-6.png' },
  { id: 7, image: '/figma-images/side-bar-colors/color-7.png' },
  { id: 8, image: '/figma-images/side-bar-colors/color-8.png' },
  { id: 9, image: '/figma-images/side-bar-colors/color-9.png' },
  { id: 10, image: '/figma-images/side-bar-colors/color-10.png' },
  { id: 11, image: '/figma-images/side-bar-colors/color-11.png' },
  { id: 12, image: '/figma-images/side-bar-colors/color-12.png' },
  { id: 13, image: '/figma-images/side-bar-colors/color-13.png' },
  { id: 14, image: '/figma-images/side-bar-colors/color-14.png' },
  { id: 15, image: '/figma-images/side-bar-colors/color-15.png' },
  { id: 16, image: '/figma-images/side-bar-colors/color-16.png' },
  { id: 17, image: '/figma-images/side-bar-colors/color-17.png' },
  { id: 18, image: '/figma-images/side-bar-colors/color-18.png' },
  { id: 19, image: '/figma-images/side-bar-colors/color-19.png' },
  { id: 20, image: '/figma-images/side-bar-colors/color-20.png' },
]

export const furnitureImages = [
  { id: 1, image: '/figma-images/furniture-sidebar/furniture-1.png', name: 'Серія 1' },
  { id: 2, image: '/figma-images/furniture-sidebar/furniture-2.png', name: 'Серія 2' },
  { id: 3, image: '/figma-images/furniture-sidebar/furniture-3.png', name: 'Серія 3' },
  { id: 4, image: '/figma-images/furniture-sidebar/furniture-4.png', name: 'Серія 4' },
  { id: 5, image: '/figma-images/furniture-sidebar/furniture-5.png', name: 'Серія 5' },
  { id: 6, image: '/figma-images/furniture-sidebar/furniture-6.png', name: 'Серія 6' },
  { id: 7, image: '/figma-images/furniture-sidebar/furniture-7.png', name: 'Серія 7' },
  { id: 8, image: '/figma-images/furniture-sidebar/furniture-8.png', name: 'Серія 8' },
];

const sizeImages = [{
    id: 1,
    value: '750 мм',
},
{
    id: 2,
    value: '950 мм',
},
{
    id: 3,
    value: '1100 мм',
},
{
    id: 4,
    value: '1400 мм',
},
{
    id: 5,
    value: '1500 мм',
},
{
    id: 6,
    value: '1600 мм',
},
{
    id: 7,
    value: '1700 мм',
},
{
    id: 8,
    value: '1800 мм',
},

]

export default function DoorFurniture() {
    const [selectedSide, setSelectedSide] = useState(1);
    const [selectedFurniture, setSelectedFurniture] = useState(1);
    const [selectedSize, setSelectedSize] = useState(1);
    const [selectedColor, setSelectedColor] = useState(1);
    const sizeScrollRef = useRef<HTMLDivElement>(null);
    const colorScrollRef = useRef<HTMLDivElement>(null);
    const [canScrollRightSize, setCanScrollRightSize] = useState(true);
    const [canScrollRightColor, setCanScrollRightColor] = useState(true);

    useEffect(() => {
        const checkScroll = (element: HTMLDivElement | null, setCanScroll: React.Dispatch<React.SetStateAction<boolean>>) => {
            if (element) {
                const { scrollLeft, scrollWidth, clientWidth } = element;
                setCanScroll(scrollLeft + clientWidth < scrollWidth - 1);
            }
        };

        const sizeElement = sizeScrollRef.current;
        const colorElement = colorScrollRef.current;

        const handleSizeScroll = () => checkScroll(sizeElement, setCanScrollRightSize);
        const handleColorScroll = () => checkScroll(colorElement, setCanScrollRightColor);

        if (sizeElement) {
            sizeElement.addEventListener('scroll', handleSizeScroll);
            handleSizeScroll(); // Initial check
        }

        if (colorElement) {
            colorElement.addEventListener('scroll', handleColorScroll);
            handleColorScroll(); // Initial check
        }

        return () => {
            if (sizeElement) {
                sizeElement.removeEventListener('scroll', handleSizeScroll);
            }
            if (colorElement) {
                colorElement.removeEventListener('scroll', handleColorScroll);
            }
        };
    }, []);

    const handleSelectSide = (id: number) => {
        setSelectedSide(id);
    }

    const handleSelectFurniture = (id: number) => {
        setSelectedFurniture(id);
    }

    const handleSelectSize = (id: number) => {
        setSelectedSize(id);
    }

    const handleSizeScrollLeft = () => {
        if (sizeScrollRef.current) {
            sizeScrollRef.current.scrollBy({ left: -130, behavior: 'smooth' });
        }
    };
    const handleSizeScrollRight = () => {
        if (sizeScrollRef.current) {
            sizeScrollRef.current.scrollBy({ left: 130, behavior: 'smooth' });
        }
    };
    const handleColorScrollLeft = () => {
        if (colorScrollRef.current) {
            colorScrollRef.current.scrollBy({ left: -130, behavior: 'smooth' });
        }
    };
    const handleColorScrollRight = () => {
        if (colorScrollRef.current) {
            colorScrollRef.current.scrollBy({ left: 130, behavior: 'smooth' });
        }
    };

    const handleSelectColor = (id: number) => {
        setSelectedColor(id);
    }

    return (
        <section className="w-full px-6 pt-6 pb-4">
            <div className="flex flex-row justify-between items-center mb-4 lg:mb-6">
                <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase tracking-[0.06em]">
                    Фурнітура
                </h3>
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
            <div className="flex flex-col items-start">
            <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase tracking-[0.06em]">
                Ручка
            </h3>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <Label htmlFor="black-edition-furniture" className="font-sans text-[14px] font-medium text-primary">
                       Black Edition
                    </Label>
                    <Switch id="black-edition-furniture" />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-x-2 min-h-[50px] mb-5">
                {side.map((item) => (
                    <Button variant="sidebar" key={item.id} className={cn(`h-full w-full ${selectedSide === item.id && 'border-2 border-accent'}`)} onClick={() => handleSelectSide(item.id)}>
                        {item.name}
                    </Button>
                ))}
            </div>  
            <div className="grid grid-cols-5 gap-x-2 min-h-[100px] gap-y-2 mb-4 [grid-auto-rows:130px]">
                {furnitureImages.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center h-full w-full cursor-pointer"
                      onClick={() => handleSelectFurniture(item.id)}
                    >
                      <div className={cn("relative w-full h-full aspect-square", selectedFurniture === item.id && "border-2 border-accent")}>
                        <Image
                          src={item.image}
                          alt={item.id.toString()}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Label
                        className="font-sans text-textLight justify-center w-full text-center mt-2"
                      >
                        {item.name}
                      </Label>
                    </div>
                ))}
            </div>  
            <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="font-sans text-[14px] font-medium text-primary">
                    Розмір
                </h3>
                <div className="flex flex-row items-center gap-x-2">
                    <ChevronLeftIcon size={25} className="text-primary cursor-pointer" onClick={handleSizeScrollLeft} />
                    <ChevronRightIcon
                        size={25}
                        className="cursor-pointer"
                        style={{ color: canScrollRightSize ? 'var(--accent)' : '#D1D5DB' }}
                        onClick={handleSizeScrollRight}
                        aria-label="Скролл вправо"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSizeScrollRight(); }}
                    />
                </div>
            </div>
            <div
                ref={sizeScrollRef}
                className="min-w-[600px] overflow-x-auto overflow-y-hidden scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="grid grid-flow-col auto-cols-[100px]   gap-x-3 mb-4">
                    {sizeImages.map((item) => (
                        <div key={item.id} className={cn("flex flex-col items-center h-full w-full min-w-[100px]", selectedSize === item.id && "border-3 border-accent")} onClick={() => handleSelectSize(item.id)}>
                            <Label className="font-sans text-[14px] font-medium text-primary w-full text-center bg-white border-none pt-2 pb-2 justify-center cursor-pointer">
                                {item.value}
                            </Label>
                        </div>
                    ))}
                    <div className="min-w-[4px]" aria-hidden="true" />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="font-sans text-[14px] font-medium text-primary">
                    Колір
                </h3>
                <div className="flex flex-row items-center gap-x-2">
                    <ChevronLeftIcon size={25} className="text-primary cursor-pointer" onClick={handleColorScrollLeft} />
                    <ChevronRightIcon
                        size={25}
                        className="cursor-pointer"
                        style={{ color: canScrollRightColor ? 'var(--accent)' : '#D1D5DB' }}
                        onClick={handleColorScrollRight}
                        aria-label="Скролл вправо"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleColorScrollRight(); }}
                    />
                </div>
            </div>
            <div
                ref={colorScrollRef}
                className="min-w-[600px] overflow-x-auto overflow-y-hidden scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="grid grid-flow-col min-h-[60px] auto-cols-[60px] gap-x-2 mb-4">
                    {furnitureColors.map((item) => (
                        <div key={item.id} className={cn("flex flex-col items-center h-full w-full min-w-[60px] relative cursor-pointer", selectedColor === item.id && "border-3 border-accent")} onClick={() => handleSelectColor(item.id)}>
                            <Image src={item.image} alt={item.id.toString()} fill className="object-cover" />
                        </div>
                    ))}
                    <div className="min-w-[4px]" aria-hidden="true" />
                </div>
            </div>
        </section>
    )
}