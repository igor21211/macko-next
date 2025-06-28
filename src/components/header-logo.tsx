import Image from 'next/image';
import Link from 'next/link';

export default function MainLogo() {
  return (
    <Link href="/">
      <div className="relative flex items-center gap-x-2 w-[80px] h-[15px] lg:w-[160px] lg:h-[23px] md:w-[120px] md:h-[18px]">
        <Image src="/figma-images/header_vector.svg" alt="Logo" fill className="object-contain" />
      </div>
    </Link>
  );
}
