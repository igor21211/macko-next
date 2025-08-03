import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { api } from '@/lib/axios';
import { DecodeResponse } from '@/types';

export const useDecode = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  // Получаем код из modelId параметра
  const code = useMemo(() => {
    return (params?.modelId as string) || (searchParams?.get('code') as string);
  }, [params?.modelId, searchParams]);

  return useQuery<DecodeResponse, Error>({
    queryKey: ['decode', code],
    queryFn: async () => {
      if (!code) {
        throw new Error('No code provided');
      }
      const response = await api.get<DecodeResponse>(`/decode/?code=${code}`);
      return response.data;
    },
    enabled: !!code, // Запрос выполняется только если есть код
    retry: (failureCount, error) => {
      // Не повторяем если код неверный
      if (error instanceof Error && error.message.includes('Invalid code')) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
