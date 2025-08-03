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

      // Формируем тело запроса, объединяя текущие данные с обновлениями
      const requestBody = {
        model: Number(decode.model?.id),
        shape: Number(decode.shape?.id),
        colors: {
          outside: Number(updates.colors?.outside?.id || decode.colors?.outside?.id),
          inside: Number(updates.colors?.inside?.id || decode.colors?.inside?.id),
        },
        colors_frame: {
          outside: Number(updates.colors_frame?.outside?.id || decode.colors_frame?.outside?.id),
          inside: Number(updates.colors_frame?.inside?.id || decode.colors_frame?.inside?.id),
        },
        glass: Number(updates.glass?.id || decode.glass?.id),
        decor: {
          outside: Number(updates.decor?.outside?.id || decode.decor?.outside?.id),
          inside: Number(updates.decor?.inside?.id || decode.decor?.inside?.id),
        },
        furniture: {
          outside: Number(updates.furniture?.outside?.id || decode.furniture?.outside?.id),
          inside: Number(updates.furniture?.inside?.id || decode.furniture?.inside?.id),
        },
        view: Number(updates.view?.id || decode.view?.id),
        handles: {
          outside: {
            id: Number(updates.handles?.outside?.id || decode.handles?.outside?.id),
            size: Number(updates.handles?.outside?.size || decode.handles?.outside?.size),
            color: Number(updates.handles?.outside?.color || decode.handles?.outside?.color),
          },
          inside: {
            id: Number(updates.handles?.inside?.id || decode.handles?.inside?.id),
            size: Number(updates.handles?.inside?.size || decode.handles?.inside?.size),
            color: Number(updates.handles?.inside?.color || decode.handles?.inside?.color),
          },
        },
        black: Number(updates.black !== undefined ? updates.black : decode.black),
        mirrored: Number(
          updates.model?.mirrored !== undefined ? updates.model.mirrored : decode.model?.mirrored
        ),
        safeglass: Number(
          updates.glass?.safeglass !== undefined ? updates.glass.safeglass : decode.glass?.safeglass
        ),
      };

      const response = await api.post('/code', requestBody);
      return response.data.code;
    },
    onSuccess: (newCode: string) => {
      router.replace(`/model/${newCode}`);
    },
  });
};
