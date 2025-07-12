'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/types'

type Props = {
  posts: Post[]
  currentPostId: number
}

// Функция для очистки HTML
function cleanExcerpt(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

export default function RelatedPosts({ posts, currentPostId }: Props) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])

  useEffect(() => {
    if (posts?.length > 0) {
      const filtered = posts.filter(post => post.id !== currentPostId)
      const shuffled = [...filtered].sort(() => 0.5 - Math.random())
      setRelatedPosts(shuffled.slice(0, 3))
    }
  }, [posts, currentPostId])

  if (relatedPosts.length === 0) return null

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-3">Читать ещё</h3>
      <div className="flex flex-col space-y-3">
        {relatedPosts.map((post) => (
          <article key={post.id} className="shadow-md p-3 rounded-md hover:shadow-md transition">
            <Link href={`/blog/${post.slug}`} className="block hover:underline">
              <h4 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: post.title }} />
            </Link>
            {post.excerpt && (
              <div className="text-gray-600 text-sm line-clamp-2 mb-1">
                {cleanExcerpt(post.excerpt)}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}