import { useDecode } from './use-decode';
import { useParams as useNextParams } from 'next/navigation';

export const useParams = () => {
  const { data: decode } = useDecode();
  const params = useNextParams();

  // Безпечная конверсия в строку
  const currentCode = params?.modelId && typeof params.modelId === 'string' ? params.modelId : '';

  return { decode, currentCode };
};
