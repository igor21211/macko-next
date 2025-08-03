import { useMutation } from '@tanstack/react-query';
import { useParams } from './use-params';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { DecodeResponse } from '@/types';

type UpdateFunction = (decode: DecodeResponse) => Partial<DecodeResponse>;

export const usePostCode = () => {
  const { decode } = useParams();
  const router = useRouter();

  return useMutation({
    mutationFn: async (updateFn: UpdateFunction) => {
      if (!decode) {
        throw new Error('No decode data available');
      }

      // Применяем функцию обновления к текущим данным
      const updates = updateFn(decode);

      // Вспомогательная функция для безопасной конверсии в число
      const safeNumber = (value: unknown, fallback: number = 0): number => {
        const num = Number(value);
        return isNaN(num) ? fallback : num;
      };

      // Формируем тело запроса с валидацией
      const requestBody = {
        model: safeNumber(decode.model?.id),
        shape: safeNumber(decode.shape?.id),
        colors: {
          outside: safeNumber(updates.colors?.outside?.id || decode.colors?.outside?.id),
          inside: safeNumber(updates.colors?.inside?.id || decode.colors?.inside?.id),
        },
        colors_frame: {
          outside: safeNumber(
            updates.colors_frame?.outside?.id || decode.colors_frame?.outside?.id
          ),
          inside: safeNumber(updates.colors_frame?.inside?.id || decode.colors_frame?.inside?.id),
        },
        glass: safeNumber(updates.glass?.id || decode.glass?.id),
        decor: {
          outside: safeNumber(updates.decor?.outside?.id || decode.decor?.outside?.id),
          inside: safeNumber(updates.decor?.inside?.id || decode.decor?.inside?.id),
        },
        furniture: {
          outside: safeNumber(updates.furniture?.outside?.id || decode.furniture?.outside?.id),
          inside: safeNumber(updates.furniture?.inside?.id || decode.furniture?.inside?.id),
        },
        view: safeNumber(updates.view?.id || decode.view?.id),
        handles: {
          outside: {
            id: safeNumber(updates.handles?.outside?.id || decode.handles?.outside?.id),
            size: safeNumber(updates.handles?.outside?.size || decode.handles?.outside?.size),
            color: safeNumber(updates.handles?.outside?.color || decode.handles?.outside?.color),
          },
          inside: {
            id: safeNumber(updates.handles?.inside?.id || decode.handles?.inside?.id),
            size: safeNumber(updates.handles?.inside?.size || decode.handles?.inside?.size),
            color: safeNumber(updates.handles?.inside?.color || decode.handles?.inside?.color),
          },
        },
        black: safeNumber(updates.black !== undefined ? updates.black : decode.black),
        mirrored: safeNumber(
          updates.model?.mirrored !== undefined ? updates.model.mirrored : decode.model?.mirrored
        ),
        safeglass: safeNumber(
          updates.glass?.safeglass !== undefined ? updates.glass.safeglass : decode.glass?.safeglass
        ),
      };

      // Проверяем, что все обязательные поля присутствуют
      if (!requestBody.model || !requestBody.shape) {
        throw new Error('Missing required fields: model or shape');
      }

      const response = await api.post('/code', requestBody);
      return response.data.code;
    },
    onSuccess: (newCode: string) => {
      router.replace(`/model/${newCode}`);
    },
  });
};
