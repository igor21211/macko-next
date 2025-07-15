const BASE_IMAGE_URL = 'https://macko-doors.md-design.pw/';

/**
 * Возвращает корректный src для изображения
 * @param image - имя файла, относительный путь или полный URL
 */
export const getImageSrc = (image: string): string => {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  if (image.startsWith('/')) return `${BASE_IMAGE_URL}${image.slice(1)}`;
  return `${BASE_IMAGE_URL}${image}`;
};
