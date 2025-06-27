import Image from 'next/image';
import Link from 'next/link';

export default function MainLogo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2">
        <Image src="/figma-images/header_vector.svg" alt="Logo" width={160} height={23} />
      </div>
    </Link>
  );
}
