'use client';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface Profile {
  id: string;
  size: string;
  image: string;
}

const colorsProfline = [
  {
    id: 1,
    name: 'в колір дверей',
  },
  {
    id: 2,
    name: 'Білий',
  },
];

const sides = [
  {
    id: 1,
    name: 'Зліва',
  },
  {
    id: 2,
    name: 'Зверху',
  },
  {
    id: 3,
    name: 'Справа',
  },
];
const profiles: Profile[] = [
  {
    id: 'profile-1',
    size: '40 мм',
    image: '/figma-images/profiles-sidebar/profile-1.png',
  },
  {
    id: 'profile-2',
    size: '100 мм',
    image: '/figma-images/profiles-sidebar/profile-2.png',
  },
];

export default function DoorProfiles() {
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(['profile-1']);
  const [selectedColors, setSelectedColors] = useState<number[]>([1]);

  const handleSelect = (id: number) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((colorId) => colorId !== id) : [...prev, id]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, sideId: number) => {
    console.log(e.target.value, sideId);
  };

  const handleProfileSelect = (id: string) => {
    setSelectedProfiles((prev) =>
      prev.includes(id) ? prev.filter((profileId) => profileId !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full px-6 pt-6 pb-20 md:pb-4">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-body font-inter font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Додаткові профілі
        </h3>
      </div>
      <div className="mb-5 grid min-h-[50px] grid-cols-2 gap-x-2">
        {colorsProfline.map((item) => (
          <div
            key={item.id}
            className={cn(
              `text-textDark flex h-full w-full cursor-pointer items-center justify-center rounded border text-[14px] font-medium uppercase transition ${selectedColors.includes(item.id) ? 'border-accent bg-accent/5 border-2' : 'border-gray-200 bg-white'}`
            )}
            onClick={() => handleSelect(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleProfileSelect(profile.id)}
            className={`flex cursor-pointer items-center rounded-none border-none bg-white px-4 py-2 transition ${selectedProfiles.includes(profile.id) ? 'border-accent' : 'border-transparent'}`}
          >
            <Image
              src={profile.image}
              alt={profile.size}
              width={40}
              height={40}
              className={`h-10 w-10 rounded border-2 object-contain ${selectedProfiles.includes(profile.id) ? 'border-accent' : 'border-gray-200'}`}
            />
            <span className="text-textLight ml-3 text-[14px] font-medium">{profile.size}</span>
            <div className="flex flex-1 justify-end gap-x-6">
              {sides.map((side) => (
                <div key={side.id} className="flex min-w-[70px] flex-row items-center gap-x-1">
                  <Separator orientation="vertical" className="border-[#E6EAEF]" />
                  <span className="text-textDark font-inter text-[14px] font-medium">
                    {side.name}:
                  </span>
                  <Input
                    type="string"
                    className={cn(
                      'h-[37px] w-[39px] rounded-none border-[#E6EAEF] bg-[#F7FAFC]',
                      selectedProfiles.includes(profile.id) ? 'text-textDark' : 'text-textLight'
                    )}
                    defaultValue={selectedProfiles.includes(profile.id) ? 1 : 0}
                    onChange={(e) => handleChange(e, side.id)}
                  />
                  <span className="text-textDark text-xs font-medium"> шт</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
