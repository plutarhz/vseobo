import "./globals.css";
import type { Metadata } from "next";
import { opensans } from '@/app/fonts';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import LazyStarBackground from '@/components/lazy-stars';
import LazySpeedInsights from '@/components/lazy-speed-insights';
import { Analytics } from '@vercel/analytics/next';
import { ProgressBarProvider } from './providers';
import Script from 'next/script'


export const metadata: Metadata = {
  title: "Всё обо всём - энциклопедия",
  description: "Книга подготовлена при участии Центра гуманитарных наук при факультете журналистики МГУ им. М. В. Ломоносова",
  openGraph: {
    title: "Всё обо всём - энциклопедия",
    description: "Книга подготовлена при участии Центра гуманитарных наук при факультете журналистики МГУ им. М. В. Ломоносова",
    url: "https://example.com",  // ← замени на свой домен
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  const GA_MEASUREMENT_ID = 'G-V9GB6PBB04'

  return (
    <html lang="en" className="relative w-full">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="vseovsem" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${opensans.className} antialiased overflow-x-hidden overflow-y-scroll`}>

        <div className="max-w-[1024px] p-4 mx-auto min-h-screen z-9 flex flex-col">
          <Header />
          <ProgressBarProvider>{children}</ProgressBarProvider>
          <Analytics />
          <LazySpeedInsights />
          <Footer />
        </div>
        <LazyStarBackground />
        
        <Script
          src={` https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V9GB6PBB04');
          `}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m, e, t, r, i, k, a) {
            m[i] = m[i] || function () {
              (m[i].a = m[i].a || []).push(arguments)
            };
            m[i].l = 1 * new Date();
            k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1; k.src = r; a.parentNode?.insertBefore(k, a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")

          if (typeof ym === 'function') {
            ym(103197597, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          }
        `}
      </Script>
      </body>
    </html>
  );
}
