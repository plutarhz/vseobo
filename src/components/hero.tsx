import Image from "next/image";

export function Hero() {
  return (
    <div className="rounded-sm bg-[#fdf6ec] ">
      <div className="p-4 md:p-8">
        <h1 className="font-bold text-xl md:text-2xl mb-4">Энциклопедия дл детей и взрослых</h1>
        <p className="text-base md:text-lg">
          Книга подготовлена при участии Центра гуманитарных наук 
        </p>
        <p className="text-base md:text-lg mb-4">
          при факультете журналистики МГУ им. М. В. Ломоносова.
        </p>
        <p className="text-base">
          Здесь каждый найдёт что-то интересное для себя — будь то любознательный школьник, студент, преподаватель или просто человек с жаждой узнавать новое. Наша энциклопедия охватывает самые разные области знаний: от науки и техники до искусства и истории.
          Мы верим, что знание — это ключ к миру , и стремимся сделать его доступным каждому. Листайте статьи, углубляйтесь в темы, удивляйтесь фактам и расширяйте горизонты — вместе с нами!  
        </p>
      </div>
      <Image src="/hero-img.webp" width={1024} height={400} quality={90} placeholder="blur" blurDataURL="/hero-img.webp" loading="eager" alt="Freelance web dev..." />
    </div>
  )
}