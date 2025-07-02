import { Hero } from '@/components/hero';
// import { SocialIcons } from '@/components/social-icons';
import { Categories } from '@/components/categories';
import { LatestPosts } from '@/components/latest-posts';
import { getCategories, getAllPosts } from '@/lib/queries';
import Link from 'next/link';

export default async function Home() {
  const categories = await getCategories();
  const { posts } = await getAllPosts();

  return (
    <section>
      <Hero />
      {/* <SocialIcons /> */}
      <div className="rounded-b-sm bg-[#fdf6ec] py-4 px-4 md:px-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Категории</h2>
        <Categories categories={categories} />
      </div>
      oooooo
      <LatestPosts posts={posts} />
      llllll
      <div className="text-center bg-[#fdf6ec] py-2">
        <Link href={`/blog`} className='button-74'>
          Читать далее...
        </Link>
      </div>
    </section>
  );
}