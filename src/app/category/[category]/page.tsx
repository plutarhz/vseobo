import { LatestPosts } from '@/components/latest-posts'
import { getCategories, getPostsByCategorySlug } from '@/lib/queries'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props) {
  const category = (await params).category

  return {
    title: `Категория: ${category}`,
    description: `Посты по теме "${category}"`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const { after } = await searchParams

  // Получаем список всех категорий
  const categories = await getCategories()

  // Находим категорию по slug
  const currentCategory = categories.find(cat => cat.slug === category)

  if (!currentCategory) {
  notFound() // если есть поддержка next/navigation
}

  // Если категория не найдена — можно показать ошибку или просто заголовок с slug
  const categoryName = currentCategory?.name || category

  // Получаем посты по slug категории + передаём after для пагинации
  const { posts, pageInfo } = await getPostsByCategorySlug(category, 10, after as string | null)

  return (
    <section>
      <h2 className="text-2xl font-bold rounded-t-sm bg-[#fdf6ec] -mb-2 pt-6 py-2 px-4 md:px-8">
        Категория: {categoryName}
      </h2>
      <LatestPosts posts={posts} pageInfo={pageInfo} category={category} currentPage="category" />
    </section>
  )
}