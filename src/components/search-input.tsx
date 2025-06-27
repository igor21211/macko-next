import { Button } from "./ui/button";
import Image from "next/image";
import { useOpenSearchModal } from "@/hooks/dashboard/use-open-search-modal";
import { useTranslations } from "next-intl";

export default function SearchInput() {
  const { onOpen: onOpenSearch } = useOpenSearchModal();
  const t = useTranslations('Header');

  return ( <Button variant="nav" onClick={onOpenSearch}  aria-label={t('search')}>
        <Image src="/figma-images/search_icon_1.svg" alt="Search" width={30} height={30} />
      </Button>);
}