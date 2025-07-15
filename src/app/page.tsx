import { Hero } from '@/components/hero';
import type { Metadata } from "next";
// import { SocialIcons } from '@/components/social-icons';
import { Categories } from '@/components/categories';
import { LatestPosts } from '@/components/latest-posts';
import { getCategories, getAllPosts } from '@/lib/queries';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Всё обо всём - энциклопедия",
  description: "Книга подготовлена при участии Центра гуманитарных наук при факультете журналистики МГУ им. М. В. Ломоносова",
  openGraph: {
    title: "Всё обо всём - энциклопедия",
    description: "Книга подготовлена при участии Центра гуманитарных наук при факультете журналистики МГУ им. М. В. Ломоносова",
    url: "https://vsbvsm.ru",  // ← замени на свой домен
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

export default async function Home() {
  const categories = await getCategories();
  const { posts } = await getAllPosts();

  return (
    <section>
      <Hero />
      {/* <SocialIcons /> */}
      <div className="rounded-b-sm bg-[#fdf6ec] py-3 md:px-6 mb-3">
        <h2 className="text-xl font-semibold mb-3">Категории</h2>
        <Categories categories={categories} />
      </div>
      <LatestPosts posts={posts} />
      <div className="text-center bg-[#fdf6ec] p-6 pb-3">
        <Link href={`/blog`} className='button-74'>
          Читать далее....
        </Link>
      </div>
    </section>
  );
}