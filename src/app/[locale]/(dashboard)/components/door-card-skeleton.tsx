import React from 'react';

const DoorCardSkeleton = () => {
  return (
    <div className="group flex animate-pulse flex-col items-center justify-center">
      <div className="relative h-[200px] w-[100px] overflow-hidden rounded-md bg-gray-200 lg:h-[400px] lg:w-[200px]">
        {/* Скелетон для изображения */}
        <div className="absolute inset-0 bg-gray-300" />
        {/* Скелетон для overlay */}
        <div className="absolute inset-0 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100" />
      </div>
      {/* Скелетон для названия */}
      <div className="mt-2 h-6 w-24 rounded bg-gray-200" />
      {/* Скелетон для цены */}
      <div className="mt-1 flex items-center justify-center gap-2">
        <div className="h-6 w-16 rounded bg-gray-200" />
        <div className="h-5 w-12 rounded bg-gray-100" />
      </div>
    </div>
  );
};

export default DoorCardSkeleton;
