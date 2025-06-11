// import { MetadataRoute } from 'next'
// import { getAllPostsSlugs, getAllCategoriesSlugs } from '@/lib/queries'

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vse-o-vsem.ru' 

//   const [postSlugs, categorySlugs] = await Promise.all([
//     getAllPostsSlugs(),
//     getAllCategoriesSlugs()
//   ])

//   return [
//     {
//       url: `${siteUrl}`,
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 1.0,
//     },
//     {
//       url: `${siteUrl}/blog`,
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.8,
//     },
//     ...postSlugs.map(slug => ({
//       url: `${siteUrl}/category/${slug}`,
//       lastModified: new Date(),
//       changeFrequency: 'monthly' as const, // ✅ Строго указываем тип
//       priority: 0.5,
//     })),
//     ...categorySlugs.map(slug => ({
//       url: `${siteUrl}/category/${slug}`,
//       lastModified: new Date(),
//       changeFrequency: 'weekly' as const, // ✅ Строго указываем тип
//       priority: 0.7,
//     })),
//   ]
// }

import { NextResponse } from 'next/server'
import { getAllPostSlugsAndDates, getAllCategoriesSlugs } from '@/lib/queries'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vse-o-vsem.ru' 

  // Получаем данные
  const [postsData, categorySlugs] = await Promise.all([
    getAllPostSlugsAndDates(),
    getAllCategoriesSlugs()
  ])

  // Формируем XML
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Главная -->
      <url>
        <loc>${siteUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>

      <!-- Блог -->
      <url>
        <loc>${siteUrl}/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>

      <!-- Посты -->
      ${postsData
        .map(({ slug, date }) => `
        <url>
          <loc>${siteUrl}/category/${slug}</loc>
          <lastmod>${date}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
        </url>
      `).join('')}

      <!-- Категории -->
      ${categorySlugs.map(slug => `
        <url>
          <loc>${siteUrl}/category/${slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>
  `.trim()

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}