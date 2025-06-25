'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import { literata } from '@/app/fonts';


export function Header() {
  const pathname = usePathname()

  return (
    <header className="flex justify-between items-center rounded-sm py-2 mb:py-4 px-4 md:px-8 mb-4">
      <div className="font-bold text-xl flex flex-col items-center sm:flex-row space-x-4 relative">
        <Image
          src="/book-svgrepo-com.svg"
          width={70}
          height={70}
          quality={90}
          placeholder="blur"
          blurDataURL="/book-svgrepo-com.svg"
          loading="eager" alt="Книга знаний - Всё обо всём"
        />
        <Link href={'/'} className="absolute t-0 l-0 w-full h-full" aria-label="Перейти на главную страницу"></Link>
        <span className={`${literata.className} text-3xl text-white`}>Всё обо всём</span>
      </div>

      <nav>
        <ul className='flex flex-col sm:flex-row gap-4'>
          {pathname !== '/' && (
            <li>
              <Link href="/">Главная</Link>
            </li>
          )}
          {pathname !== '/blog' && (
          <li>
            <Link href={'/blog'}>Энциклопедия</Link>
          </li>
          )}
        </ul>
      </nav>

    </header>
  )
}