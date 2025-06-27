"use client";

import Image from "next/image";
import { useState } from "react";

interface Profile {
  id: string;
  size: string;
  image: string;
}

const profiles: Profile[] = [
  {
    id: "profile-1",
    size: "26 мм",
    image: "/figma-images/profiles-sidebar/profile-1.png",
  },
  {
    id: "profile-2",
    size: "44 мм",
    image: "/figma-images/profiles-sidebar/profile-2.png",
  },
  {
    id: "profile-3",
    size: "100 мм",
    image: "/figma-images/profiles-sidebar/profile-3.png",
  },
];

export default function DoorProfiles() {
  const [selectedProfile, setSelectedProfile] = useState<string>("profile-1");

  return (
    <section className="w-full px-6 pt-6 pb-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase tracking-[0.06em]">
          Додаткові профілі
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => setSelectedProfile(profile.id)}
            className="cursor-pointer"
          >
            <div
              className={`relative aspect-square overflow-hidden border-2 transition-all ${
                selectedProfile === profile.id
                  ? "border-3 border-accent"
                  : "border-transparent hover:border-[#EDF2F7]"
              }`}
            >
              <Image
                src={profile.image}
                alt={profile.size}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="font-medium text-[14px] leading-[17px] text-[#718096]">
                {profile.size}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}