import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function GlassGroupCheckbox() {
  const t = useTranslations('DialogFilters');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [glass, setGlass] = useState<string>(searchParams.get('glass') || 'all');

  useEffect(() => {
    setGlass(searchParams.get('glass') || 'all');
  }, [searchParams]);

  const handleChange = (value: string) => {
    if (value === glass) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete('glass');
      router.push(`?${params.toString()}`);
      return;
    } else {
      setGlass(value);
    }
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === 'all') {
      params.delete('glass');
    } else {
      params.set('glass', value);
    }
    router.push(`?${params.toString()}`);
  };

  const glassOptions = [
    { value: 'all', label: t('glasses.all') },
    { value: 'transparent', label: t('glasses.transparent') },
    { value: 'matte', label: t('glasses.matte') },
    { value: 'glossy', label: t('glasses.glossy') },
    { value: 'frosted', label: t('glasses.frosted') },
  ];

  return (
    <>
      <Separator className="my-4" />
      <h3 className="text-lg font-medium">{t('glass')}</h3>
      <div className="flex flex-wrap gap-4">
        {glassOptions.map((item) => (
          <div className="flex items-center gap-2" key={item.value}>
            <Checkbox
              id={`glass-${item.value}`}
              checked={glass === item.value}
              onCheckedChange={() => handleChange(item.value)}
              className="data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white"
            />
            <Label htmlFor={`glass-${item.value}`}>{item.label}</Label>
          </div>
        ))}
      </div>
    </>
  );
}
