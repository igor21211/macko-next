import { useDecode } from './use-decode';
import { useParams as useNextParams } from 'next/navigation';

export const useParams = () => {
  const { data: decode } = useDecode();
  const params = useNextParams();

  const currentCode = params?.modelId as string;

  return { decode, currentCode };
};
