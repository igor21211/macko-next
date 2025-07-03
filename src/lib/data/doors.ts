export interface DoorCard {
  id: number;
  img: string;
  label: string;
  glass: string[];
  model: string;
  type: string[];
  price: number;
  salePrice?: number;
}

export function getCardsData(): DoorCard[] {
  const images = [
    '/figma-images/image_1.png',
    '/figma-images/image_2.png',
    '/figma-images/image_3.png',
    '/figma-images/image_4.png',
    '/figma-images/image_5.png',
    '/figma-images/image_6.png',
    '/figma-images/image_7.png',
    '/figma-images/image_8.png',
    '/figma-images/image_9.png',
    '/figma-images/image_10.png',
    '/figma-images/image_11.png',
    '/figma-images/image_12.png',
  ];

  return [
    {
      id: 1,
      img: images[0],
      label: 'ААЕ 1093',
      glass: ['transparent', 'matte'],
      model: 'base',
      type: ['offers', 'leaders'],
      price: 3200,
      salePrice: 2499,
    },
    {
      id: 2,
      img: images[1],
      label: 'ААЕ 1096',
      glass: ['transparent', 'glossy'],
      model: 'vertical',
      type: ['popular'],
      price: 3100,
    },
    {
      id: 3,
      img: images[2],
      label: 'ААЕ 1131',
      glass: ['matte', 'frosted', 'glossy'],
      model: 'classic',
      type: ['offers', 'popular'],
      price: 3500,
      salePrice: 2999,
    },
    {
      id: 4,
      img: images[3],
      label: 'ААЕ 1132',
      glass: ['transparent'],
      model: 'base',
      type: ['leaders'],
      price: 2800,
    },
    {
      id: 5,
      img: images[4],
      label: 'ААЕ 1133',
      glass: ['matte', 'frosted'],
      model: 'vertical',
      type: ['popular', 'leaders', 'offers'],
      price: 3300,
      salePrice: 2799,
    },
    {
      id: 6,
      img: images[5],
      label: 'ААЕ 1612',
      glass: ['glossy'],
      model: 'base',
      type: ['popular'],
      price: 2950,
    },
    {
      id: 7,
      img: images[6],
      label: 'ААЕ 1093',
      glass: ['matte', 'glossy'],
      model: 'horizontal',
      type: ['popular', 'offers'],
      price: 3400,
      salePrice: 2899,
    },
    {
      id: 8,
      img: images[7],
      label: 'ААЕ 1096',
      glass: ['transparent', 'frosted'],
      model: 'base',
      type: ['leaders'],
      price: 3100,
    },
    {
      id: 9,
      img: images[8],
      label: 'ААЕ 1138',
      glass: ['frosted'],
      model: 'vertical',
      type: ['leaders'],
      price: 3000,
    },
    {
      id: 10,
      img: images[9],
      label: 'ААЕ 1139',
      glass: ['matte', 'glossy'],
      model: 'base',
      type: ['popular', 'offers'],
      price: 2850,
      salePrice: 2399,
    },
    {
      id: 11,
      img: images[10],
      label: 'ААЕ 11423',
      glass: ['transparent', 'frosted', 'glossy'],
      model: 'vertical',
      type: ['leaders'],
      price: 3250,
    },
    {
      id: 12,
      img: images[11],
      label: 'ААЕ 1612',
      glass: ['matte', 'frosted'],
      model: 'horizontal',
      type: ['leaders'],
      price: 3150,
    },
  ];
}
