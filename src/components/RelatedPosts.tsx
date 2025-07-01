'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/types'

type Props = {
  posts: Post[]
  currentPostId: number
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
      <h3 className="text-xl font-bold mb-4">Читать ещё</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article key={post.id} className="border p-4 rounded shadow hover:shadow-md transition">
            <Link href={`/blog/${post.slug}`} className="block hover:underline">
              <h4 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: post.title }} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}