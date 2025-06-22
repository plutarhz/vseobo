export function fixMixedContentImages(html: string): string {
  // Парсим HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Находим все <img>
  const images = doc.querySelectorAll('img');

  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src && src.startsWith('http://')) {
      // Заменяем http → https
      const secureSrc = src.replace(/^http:/, 'https:');
      
      // Или отправляем через наш прокси
      img.setAttribute(
        'src',
        `/api/image?url=${encodeURIComponent(secureSrc)}`
      );
    }
  });

  // Возвращаем изменённый HTML
  return doc.documentElement.innerHTML;
}