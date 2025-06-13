import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import StarBackground from "@/components/stars-bg";
import { opensans } from '@/app/fonts';


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
  return (
    <html lang="en" className="relative w-full">
      <body className={`${opensans.className} antialiased overflow-x-hidden overflow-y-scroll`}>

        <div className="max-w-[1024px] p-4 mx-auto min-h-screen z-9 flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
        <StarBackground />
      </body>
    </html>
  );
}
