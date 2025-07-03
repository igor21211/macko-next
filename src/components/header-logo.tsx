import Image from 'next/image';
import Link from 'next/link';

export default function MainLogo() {
  return (
    <Link href="/">
      <div className="relative flex h-[15px] w-[80px] items-center gap-x-2 md:h-[18px] md:w-[120px] lg:h-[23px] lg:w-[160px]">
        <Image src="/figma-images/header_vector.svg" alt="Logo" fill className="object-contain" />
      </div>
    </Link>
  );
}
