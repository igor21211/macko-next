"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useMedia } from 'react-use';
import { cn } from '@/lib/utils';

export default function DoorSize() {
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [touched, setTouched] = useState({ width: false, height: false });
    const isMobile = useMedia('(max-width: 580px)');

    // Мок-валидация
    const widthNum = Number(width);
    const heightNum = Number(height);
    const widthError =
        touched.width && (!width || isNaN(widthNum) || widthNum <= 0 || widthNum > 1200)
            ? 'Ширина должна быть числом от 1 до 1200'
            : '';
    const heightError =
        touched.height && (!height || isNaN(heightNum) || heightNum <= 0 || heightNum > 2300)
            ? 'Высота должна быть числом от 1 до 2300'
            : '';

    return (
        <section className="w-full px-6 pt-6 pb-10">
            <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase tracking-[0.06em]">
                    Розмір двери
                </h3>
                <Button
                    type="button"
                    variant="ghost"
                    className="font-sans text-accent hover:text-none cursor-pointer hover:bg-transparent px-0 py-0 h-auto  shadow-none"
                >
                    Як виміряти?
                </Button>
            </div>
            <div className={cn(
                "flex w-full bg-white py-2 lg:w-[538px] min-h-[60px]",
                isMobile ? "flex-col gap-y-6 px-6" : "flex-row gap-x-4"
            )}>
                <div className="flex flex-row items-center w-full gap-x-2">
                    <div className="relative min-w-[20px] min-h-[20px]">
                        <Image src="/figma-images/width-form.svg" alt="width" fill className="object-contain" />
                    </div>
                    <label htmlFor="door-width" className="text-primary font-sans text-body mr-2 whitespace-nowrap">Ширина:</label>
                    <div className={cn(
                        "relative flex flex-col",
                        isMobile ? "w-[250px] ml-auto" : "w-full"
                    )}>
                        <Input
                            id="door-width"
                            type="number"
                            min={0}
                            placeholder="900"
                            value={width}
                            onChange={e => setWidth(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, width: true }))}
                            className="min-h-[36px] text-base rounded-none bg-background  !border-[#E6EAEF] text-primary"
                            aria-invalid={!!widthError}
                        />
                        {widthError && (
                            <span className="absolute top-full left-0 mt-1 text-xs text-danger">
                                {widthError}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center w-full gap-x-2">
                    <div className="relative min-w-[20px] min-h-[20px]">
                        <Image src="/figma-images/height-form.svg" alt="height" fill className="object-contain" />
                    </div>
                    <label htmlFor="door-height" className="text-primary font-sans text-body mr-2 whitespace-nowrap">Довжина:</label>
                    <div className={cn(
                        "relative flex flex-col",
                        isMobile ? "w-[250px] ml-auto" : "w-full"
                    )}>
                        <Input
                            id="door-height"
                            type="number"
                            min={0}
                            placeholder="2000"
                            value={height}
                            onChange={e => setHeight(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, height: true }))}
                            className="min-h-[36px] text-base rounded-none bg-background  !border-[#E6EAEF] text-primary"
                            aria-invalid={!!heightError}
                        />
                        {heightError && (
                            <span className="absolute top-full left-0 mt-1 text-xs text-danger">
                                {heightError}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}