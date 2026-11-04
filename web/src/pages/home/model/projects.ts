const generateProjectImages = (folderName: string, count: number, imageName: string) =>
  Array.from({ length: count }, (_, i) => {
    return {
      src: `/${folderName}/${imageName} (${i}).webp`,
      alt: `Изображение проекта ${folderName}`,
    };
  });

export const projects = [
  {
    id: 1,
    name: 'Проект «Willow Breeze»',
    area: 291.1,
    price: 'от 34 900 000 ₽',
    images: generateProjectImages('WillowBreeze', 26, 'Willow Breeze'),
  },
  {
    id: 2,
    name: 'Проект «Serenity»',
    area: 147.3,
    price: 'от 17 600 000 ₽',
    images: generateProjectImages('Serenity', 16, 'Serenity'),
  },
  {
    id: 3,
    name: 'Проект «Sunnybrook»',
    area: 152,
    price: 'от 18 200 000 ₽',
    images: generateProjectImages('Sunnybrook', 33, 'Sunnybrook'),
  },
  {
    id: 4,
    name: 'Проект «Hilltop»',
    area: 265.4,
    price: 'от 25 800 000 ₽',
    images: generateProjectImages('Hilltop', 19, 'Hilltop'),
  },
  {
    id: 5,
    name: 'Проект «Neo»',
    area: 455.59,
    price: 'от 42 060 000 ₽',
    images: generateProjectImages('Neo', 16, 'Neo'),
  },
];
