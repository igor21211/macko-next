import { Button } from './ui/button';
import Image from 'next/image';
import { useOpenSearchModal } from '@/hooks/dashboard/use-open-search-modal';
import { useTranslations } from 'next-intl';
import { useMedia } from 'react-use';

export default function SearchInput() {
  const { onOpen: onOpenSearch } = useOpenSearchModal();
  const t = useTranslations('Header');

  const isMobile = useMedia('(max-width: 1024px)', false);

  if (isMobile) {
    return <Image src="/figma-images/search_icon_1.svg" alt="Search" width={18} height={18} />;
  }

  return (
    <Button variant="nav" onClick={onOpenSearch} aria-label={t('search')}>
      <Image src="/figma-images/search_icon_1.svg" alt="Search" width={30} height={30} />
    </Button>
  );
}
