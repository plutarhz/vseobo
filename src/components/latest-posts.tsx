'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/types'
import { SearchBar } from '@/components/search-bar'
import Image from 'next/image';



type LatestPostsProps = {
  posts: Post[]
  title?: string
  searchTerm?: string
  pageInfo?: {
    startCursor: string | null
    endCursor: string | null
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  category?: string
  currentPage?: 'blog' | 'category' // ← Новый пропс также в деструктуре где экспорт
}

const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}

// Функция для очистки HTML
function cleanExcerpt(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

export function LatestPosts({ title, posts, searchTerm, pageInfo, category, currentPage }: LatestPostsProps) {
  const [mounted, setMounted] = useState(false)

  // Чтобы избежать гидратации — монтируем дату только после загрузки клиента
  useEffect(() => {
    setMounted(true)
  }, [])

  if (posts?.length === 0) {
    return <div className="bg-[#fdf6ec] p-4 md:p-8">Нет записей</div>
  }

  return (
    <div className="rounded-t-sm bg-[#fdf6ec]  pb-0 p-3 md:pt-6 md:px-6">
      <div className="flex justify-between items-center mb-3 md:mb-6 px-3">
        <h2 className="text-xl font-semibold">{title || 'Искать по слову'}</h2>
        <SearchBar />
      </div>

      <div className="flex flex-col space-y-3  mb-4">
        {posts.map((post) => (
          <div key={post.id} className="shadow-md p-3 rounded-md">
            <Link href={`/blog/${post.slug}`} className="block rounded hover:underline">
              <h3
                className="font-bold text-lg mb-1"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </Link>

            {/* Безопасный вывод excerpt */}
            {post.excerpt && (
              <div className="text-gray-600 text-sm line-clamp-2 mb-1">
                {cleanExcerpt(post.excerpt)}
              </div>
            )}

            {/* Вывод даты после монтирования */}
            {mounted && (
              <div className="text-sm font-bold">
                {new Date(post.date).toLocaleDateString('ru-RU', options)}
              </div>
            )}
          </div>
        ))}
      </div>



      <div className="flex justify-between">
        <div>
          {pageInfo?.hasPreviousPage && (

            <Link
              href={{
                pathname:
                  currentPage === 'category'
                    ? `/category/${category}`
                    : '/blog',
                query: {
                  before: pageInfo.startCursor,
                  ...(searchTerm && { searchTerm }),
                  ...(category && { category }),
                },
              }}
              className="text-blue-800 hover:underline block p-1"
            >
              <Image
                src="/free-icon-right-arrow-64604.png"
                width={40}
                height={40}
                quality={90}
                placeholder="blur"
                blurDataURL="/free-icon-right-arrow-64604.png"
                loading="eager" alt="Книга знаний - Всё обо всём"
              />
            </Link>

          )}
        </div>

        <div>
          {pageInfo?.hasNextPage && (
            <Link
              href={{
                pathname:
                  currentPage === 'category'
                    ? `/category/${category}`
                    : '/blog',
                query: {
                  after: pageInfo.endCursor,
                  ...(searchTerm && { searchTerm }),
                  ...(category && { category }),
                },
              }}
              className="text-blue-800 hover:underline block p-1"
            >
               <Image
                src="/free-icon-right-arrow-64604-fwd.png"
                width={40}
                height={40}
                quality={90}
                placeholder="blur"
                blurDataURL="/free-icon-right-arrow-64604-fwd.png"
                loading="eager" alt="Книга знаний - Всё обо всём"
              />
            </Link>

          )}
        </div>
      </div>
    </div>
  )
}