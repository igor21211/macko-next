'use client';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { useOpenModalFilters } from '@/hooks/dashboard/use-open-modal-filters';
import ModelGroupCheckbox from './components/modal-group-checkbox';
import GlassGroupCheckbox from './components/glass-group-checkbox';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function DialogFilters() {
  const t = useTranslations('DialogFilters');
  const { open, onClose } = useOpenModalFilters();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleReset = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('model');
    params.delete('glass');
    router.push(`?${params.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{t('filters')}</DialogTitle>
        </DialogHeader>
        <ModelGroupCheckbox />
        <GlassGroupCheckbox />
        <DialogFooter>
          <div className="mt-4 flex w-full justify-between">
            <Button onClick={handleReset} variant="outline">
              {t('reset')}
            </Button>
            <Button className="bg-[#23E5DC]" onClick={onClose}>
              {t('apply')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
