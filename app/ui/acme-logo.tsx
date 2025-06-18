import { lusitana } from '@/app/ui/fonts';
import notaLogo from '@/app/ui/notaLogo.png';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src={notaLogo} alt="Nota Logo" width={40} height={40} className="mr-2" />
      <p className="text-[44px]">Nota</p>
    </div>
  );
}
