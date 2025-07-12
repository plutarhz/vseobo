import { LatestPosts } from '@/components/latest-posts';
import { getAllPosts } from '@/lib/queries';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница всех записей энциклопедии Все обо всем",
  description: "Здесь вы найдете все записи этой увлекательной энциклопедии",
  openGraph: {
    title: "Страница всех записей энциклопедии Все обо всем",
    description: "Здесь вы найдете все записи этой увлекательной энциклопедии",
    url: "https://vsbvsm.ru/blog",  // ← замени на свой домен
    siteName: "Всё обо всём",
    images: [
      {
        url: "/catty.jpg", // ← можно сгенерировать автоматически или указать статичное из public/
        width: 800,
        height: 600,
        alt: "Обложка энциклопедии «Всё обо всём»",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Всё обо всём - энциклопедия",
    description: "Книга подготовлена при участии Центра гуманитарных наук при факультете журналистики МГУ им. М. В. Ломоносова",
    images: ["/catty.jpg"], // ← ссылка на изображение
  },
};

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams;
  const searchTerm = typeof searchParams.search === 'string' ? searchParams.search : '';
  const category = typeof searchParams.categories === 'string' ? searchParams.categories : '';
  const before = searchParams.before as string || null;
  const after = searchParams.after as string || null;

  // Get All Pots
  const { posts, pageInfo } = await getAllPosts(searchTerm, category, {before, after});
  
  const latestPostProps = {
    posts,
    pageInfo,
    category,
    searchTerm,
    currentPage: 'blog' as const, //// новое
  }

  return (
    <section>
      <LatestPosts {...latestPostProps} />
    </section>
  )
}