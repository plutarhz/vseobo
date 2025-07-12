import { Category } from "@/lib/types"
import Link from "next/link"

export function Categories({ categories }: { categories: Category[] }) {
  // Сортируем категории по убыванию количества постов
  const sortedCategories = [...categories].sort((a, b) => {
    // Проверяем, что count определён, иначе ставим на конец
    const countA = typeof a.count === 'number' ? a.count : 0
    const countB = typeof b.count === 'number' ? b.count : 0

    return countB - countA // по убыванию
  })

  return (
    <ul className="text-sm uppercase flex gap-2 flex-wrap">
      {sortedCategories.map((category) => (
        <li key={category.id} className="flex flex-shrink-0 border rounded-md relative group">
          <Link href={`/category/${category.slug}`} className="absolute top-0 left-0 right-0 bottom-0 z-20" />
          <span className="px-2 py-1 relative z-10">{category.name}</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#171717] group-hover:w-full group-hover:transition-all" />
          {typeof category.count === 'number' && (
            <span className="px-2 py-1 border-l-1 font-bold">
              {category.count}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
