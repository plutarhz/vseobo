import type { Metadata, ResolvingMetadata } from 'next'
import { getPostsBySlug } from '@/lib/queries'
import Link from 'next/link'

import RelatedPosts from '@/components/RelatedPosts'
import { getAllPosts } from '@/lib/queries' 

type Props = {
  params: Promise<{ slug: string }>
}

// Функция для удаления HTML-тегов
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostsBySlug(slug)

  if (!post) {
    // Вернуть дефолтные метаданные
    return {
      title: 'Всё обо всём',
      description: 'Энциклопедия знаний о мире и Вселенной',
      openGraph: {
        images: ['/open-graph.jpg'],
        title: 'Всё обо всём',
        description: 'Энциклопедия знаний о мире и Вселенной',
        url: '/',
        siteName: 'Всё обо всём',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Всё обо всём',
        description: 'Энциклопедия знаний о мире и Вселенной',
        images: ['/open-graph.jpg'],
      },
    }
  }

  const cleanContent = post?.content ? stripHtml(post.content) : ''

  const description = cleanContent.slice(0, 155) + (cleanContent.length > 155 ? '...' : '')

  const previousImages = (await parent).openGraph?.images || []


  // URL статьи
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vse-o-vsem.ru' 
  const url = `${siteUrl}/category/${slug}`

  // Изображение для OG и Twitter
  const imageUrl = post.featuredImage?.node?.sourceUrl || `${siteUrl}/open-graph.jpg`


  return {
    title: post?.title || 'Всё обо всём',
    description: description,
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: 'Всё обо всём',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: post.title,
        },
        ...previousImages,
      ],
      locale: 'ru_RU',
      type: 'article',
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await getPostsBySlug(slug)

  if (!post) {
    return <div>Пост не найден</div>
  }

  const formattedDate = new Date(post.date)
  const date = formattedDate.toLocaleString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const categories = post.categories?.nodes.filter(
    (cat): cat is { name: string; slug: string } => Boolean(cat?.slug && cat?.name)
  ) || []

  // Получаем все посты для RelatedPosts
  const allPosts = await getAllPosts()

  // --- Здесь мы добавляем безопасную проверку на content ---
  const content = typeof post.content === 'string' ? post.content : ''

  return (
    <div className="px-4 flex-1 rounded-t-sm bg-[#fdf6ec] p-4 md:p-8">
      <h1
        className="font-bold text-xl md:text-2xl mb-4"
        dangerouslySetInnerHTML={{ __html: post.title }}
      />
      <div className="mb-4 flex flex-col gap-4">
        <span>Добавлено: <b>{date}</b></span>
        {categories.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {categories.map((cat, index) => (
              <li key={index}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="px-3 py-1 bg-blue-950 text-white rounded-full text-sm hover:shadow-md transition"
                >
                  {cat.name.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Безопасное использование dangerouslySetInnerHTML */}
      <div
        className="article md:text-lg text-base text-justify font-medium md:leading-relaxed text-[#3a3127] antialiased"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {/* Блок "Читать ещё" */}
      <RelatedPosts posts={allPosts.posts} currentPostId={post.id} />
    </div>

    
  )
}