// import { NextResponse } from 'next/server'
// import { getAllPostSlugsAndDates, getAllCategoriesSlugs } from '@/lib/queries'

// export async function GET() {
//   // Получаем SITE_URL из переменной окружения
//   // const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://vsbvsm.ru'
//   const siteUrl = 'https://vsbvsm.ru'

//   // Получаем данные
//   const [postsData, categorySlugs] = await Promise.all([
//     getAllPostSlugsAndDates(),
//     getAllCategoriesSlugs()
//   ])

//   // Формируем XML
//   const xml = `
//     <?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       <!-- Главная -->
//       <url>
//         <loc>${siteUrl}</loc>
//         <lastmod>${new Date().toISOString()}</lastmod>
//         <changefreq>daily</changefreq>
//         <priority>1.0</priority>
//       </url>

//       <!-- Блог -->
//       <url>
//         <loc>${siteUrl}/blog</loc>
//         <lastmod>${new Date().toISOString()}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//       </url>

//       <!-- Посты -->
//       ${postsData.map(({ slug, date }) => `
//         <url>
//           <loc>${siteUrl}/blog/${slug}</loc>
//           <lastmod>${date}</lastmod>
//           <changefreq>monthly</changefreq>
//           <priority>0.5</priority>
//         </url>
//       `).join('')}

//       <!-- Категории -->
//       ${categorySlugs.map(slug => `
//         <url>
//           <loc>${siteUrl}/category/${slug}</loc>
//           <lastmod>${new Date().toISOString()}</lastmod>
//           <changefreq>weekly</changefreq>
//           <priority>0.7</priority>
//         </url>
//       `).join('')}
//     </urlset>
//   `.trim()

//   return new NextResponse(xml, {
//     headers: {
//       'Content-Type': 'application/xml',
//     },
//   })
// }

import { NextResponse } from 'next/server'
import { getAllPostSlugsAndDates, getAllCategoriesSlugs } from '@/lib/queries'

export async function GET() {
  // const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://vsbvsm.ru'
  const siteUrl = 'https://vsbvsm.ru' //

  const [postsData, categorySlugs] = await Promise.all([
    getAllPostSlugsAndDates(),
    getAllCategoriesSlugs()
  ])

  // Функция форматирования даты
  const formatW3CDate = (date: string | Date): string => {
    const parsedDate = new Date(date)
    return parsedDate.toISOString()
  }

  const now = formatW3CDate(new Date())

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Главная -->
      <url>
        <loc>${siteUrl}</loc>
        // <lastmod>${now}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>

      <!-- Блог -->
      <url>
        <loc>${siteUrl}/blog</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>

      <!-- Посты -->
      ${postsData.map(({ slug, date }) => `
        <url>
          <loc>${siteUrl}/blog/${slug}</loc>
          <lastmod>${formatW3CDate(date)}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
        </url>
      `).join('')}

      <!-- Категории -->
      ${categorySlugs.map(slug => `
        <url>
          <loc>${siteUrl}/category/${slug}</loc>
          <lastmod>${now}</lastmod>
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