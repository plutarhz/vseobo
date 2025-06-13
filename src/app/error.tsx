'use client'

import { useEffect } from 'react'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Логирование ошибки (можно отправлять куда-то, если нужно
    console.error('Ошибка клиента:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-xl font-bold mb-2">Не удалось загрузить страницу</h2>
      <p className="mb-4 text-center">
        Произошла ошибка при загрузке ресурсов. Попробуйте перезагрузить страницу.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Перезагрузить страницу
      </button>
    </div>
  )
}