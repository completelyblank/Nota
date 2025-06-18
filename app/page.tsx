import NotaLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from './ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="relative min-h-screen flex flex-col p-6 bg-black text-white overflow-hidden">
      {/* Background wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://c1.wallpaperflare.com/preview/663/246/485/thunder-moody-metropolitan-grey.jpg')`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Shape layer if needed */}
      <div className={`${styles.shape} absolute z-20`} />

      {/* Main content */}
      <div className="relative z-30 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-gray-800/70 p-4 md:h-52 shadow-lg">
          <NotaLogo />
        </div>

        {/* Body */}
        <div className="mt-6 flex grow flex-col gap-6 md:flex-row">
          {/* Text panel */}
          <div className="flex flex-col justify-center gap-6 rounded-2xl bg-white/10 backdrop-blur-md px-6 py-10 md:w-2/5 md:px-12 shadow-2xl border border-white/20">
            <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-white/60" />
            <p
              className={`${lusitana.className} text-xl text-white md:text-3xl md:leading-normal`}
            >
              <strong>Nota</strong>: For Students & Teachers
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>

          {/* Image panel */}
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            <Image
              src="/hero_try.png"
              width={1000}
              height={760}
              className="rounded-xl shadow-xl object-cover"
              alt="Who the app is for"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
