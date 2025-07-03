import { Category } from "@/lib/types"
import Link from "next/link";

export function Categories({ categories }: { categories: Category[] }) {
  return (
    <ul className="text-sm uppercase flex gap-2 flex-wrap">
      {categories.map((category: Category) => (
        <li key={category.id} className="flex flex-shrink-0 border rounded-md relative border group">
          <Link href={`/category/${category.slug}`}
            // <Link href={`/blog?categories=${category.slug}`}
            className="absolute top-0 left-0 right-0 bottom-0">
          </Link>
          <span className="px-2 py-1">{category.name}</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#171717] group-hover:w-full group-hover:transition-all"></span>
          {typeof category.count === 'number' && (
            <span className="px-2 py-1 border-l-1 font-bold bg-[#171717] text-[#fdf6ec]">
              {category.count}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

