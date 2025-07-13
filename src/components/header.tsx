'use client'

//import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import { literata } from '@/app/fonts';



export function Header() {
  // const pathname = usePathname()

  return (
    <header className="rounded-sm py-2 px-4 md:px-8 mb-4">

      {/* {pathname !== '/' && ( здесь можно вставить то что показывать или нет )} */}
      <nav>
        <ul className='flex justify-between items-center gap-4'>

          <li className="relative">
            <Link href={'/'} className="absolute t-0 l-0 w-full h-full" aria-label="Перейти на главную страницу"></Link>
            <span className={`${literata.className} text-3xl md:text-4xl text-center text-white font-bold text-shadow-white`}>Всё обо всём</span>
          </li>

          {/* <li className="relative">
            <Link href="/" className="absolute t-0 l-0 w-full h-full" aria-label="Перейти на главную страницу"></Link>
            <Image
              src="/home-2-svgrepo-com-white.svg"
              width={30}
              height={30}
              quality={90}
              placeholder="blur"
              blurDataURL="/home-2-svgrepo-com-white.svg"
              loading="eager" alt="На главную"
            />
          </li> */}
         
          <li className="relative w-[45px] h-[45px] z-1">
            <Link
              href="/blog"
              className="absolute t-0 l-0 z-18"
              aria-label="Перейти в энциклопедию"
            >
            <Image
              src="/book-svgrepo-com-white.svg"
              width={45}
              height={45}
              quality={90}
              placeholder="blur"
              blurDataURL="/book-svgrepo-com-white.svg"
              loading="eager" alt="Книга знаний - Всё обо всём"
            />
            </Link>
          </li>

        </ul>
      </nav>

    </header>
  )
}