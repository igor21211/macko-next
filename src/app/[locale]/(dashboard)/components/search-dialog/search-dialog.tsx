import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useOpenSearchModal } from '@/hooks/dashboard/use-open-search-modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchDialog() {
  const { open, onClose } = useOpenSearchModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const handleReset = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('search');
    router.push(`?${params.toString()}`);
    setSearch('');
    onClose();
  };

  const handleApply = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('search', search);
    router.push(`?${params.toString()}`);
    onClose();
    setSearch('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Пошук</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Пошук за назвою"
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DialogFooter>
          <div className="mt-4 flex w-full justify-between">
            <Button onClick={handleReset} variant="outline">
              Скинути
            </Button>
            <Button
              className="bg-[#23E5DC]"
              onClick={handleApply}
              disabled={search === ''}
              variant="default"
            >
              Застосувати
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
