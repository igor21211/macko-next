import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function ModelGroupCheckbox() {
  const t = useTranslations('DialogFilters');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [model, setModel] = useState<string>(searchParams.get('model') || 'all');

  useEffect(() => {
    setModel(searchParams.get('model') || 'all');
  }, [searchParams]);

  const handleChange = (value: string) => {
    if (value === model) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete('model');
      router.push(`?${params.toString()}`);
      return;
    } else {
      setModel(value);
    }
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === 'all') {
      params.delete('model');
    } else {
      params.set('model', value);
    }
    router.push(`?${params.toString()}`);
  };

  const modelOptions = [
    { value: 'all', label: t('models.all') },
    { value: 'base', label: t('models.base') },
    { value: 'vertical', label: t('models.vertical') },
    { value: 'horizontal', label: t('models.horizontal') },
    { value: 'classic', label: t('models.classic') },
    { value: 'square', label: t('models.square') },
  ];

  return (
    <>
      <Separator className="my-4" />
      <h3 className="text-lg font-medium">{t('model')}</h3>
      <div className="flex flex-wrap gap-4">
        {modelOptions.map((item) => (
          <div className="flex items-center gap-2" key={item.value}>
            <Checkbox
              id={`model-${item.value}`}
              checked={model === item.value}
              onCheckedChange={() => handleChange(item.value)}
              className="data-[state=checked]:border-[#23E5DC] data-[state=checked]:bg-[#23E5DC] data-[state=checked]:text-white"
            />
            <Label htmlFor={`model-${item.value}`}>{item.label}</Label>
          </div>
        ))}
      </div>
    </>
  );
}
