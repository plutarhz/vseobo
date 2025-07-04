// 'use client'


// import { useEffect } from 'react'

// export default function YandexMetrika({ ymID }: { ymID: number }) {
//   useEffect(() => {
//     // Проверяем, что сайт работает не в dev-режиме
//     if (process.env.NODE_ENV === 'production') {
//       const script = document.createElement('script')
//       script.type = 'text/javascript'
//       script.innerHTML = `
//         (function(m,e,t,r,i,k,a){m[k]=m[k]||function(){(m[k].a=m[k].a||[]).push(arguments)};
//         m[i]=m[i]||{host:'mc.yandex.ru'};
//         k='ym'; i='yandex_metrika_callbacks'; 
//         a=document.createElement(r); 
//         var s=document.getElementsByTagName(r)[0]; 
//         a.async=1; 
//         a.src=t; 
//         a.type="text/javascript"; 
//         s.parentNode.insertBefore(a,s)
//         })(window, document, "https://mc.yandex.ru/metrika/tag.js ", "script", "ym");
        
//         ym(${ymID}, "init", {
//           clickmap: true,
//           trackLinks: true,
//           accurateTrackBounce: true,
//           webvisor: true
//         });
//       `
//       document.head.appendChild(script)

//       const noscript = document.createElement('noscript')
//       const div = document.createElement('div')
//       const img = document.createElement('img')
//       img.src = `https://mc.yandex.ru/watch/${ymID}`
//       img.alt = 'Yandex Metrika'
//       img.style.position = 'absolute'
//       img.style.left = '-9999px'
//       div.appendChild(img)
//       noscript.appendChild(div)
//       document.body.appendChild(noscript)
//     }
//   }, [ymID])

//   return null
// }

// 'use client'

// import { useEffect } from 'react'

// declare global {
//   interface Window {
//     ym: any
//     yandex_metrika_callbacks: any[]
//   }
// }

// const METRIKA_ID = 103197597 // ← замени на свой

// export default function YandexMetrika() {
//   useEffect(() => {
//     if (process.env.NODE_ENV !== 'production') return

//     // Проверяем, не загружен ли уже счётчик
//     if (window.ym) {
//       console.warn('Яндекс.Метрика уже загружена')
//       return
//     }

//     const script = document.createElement('script')
//     script.async = true
//     script.type = 'text/javascript'
//     script.id = 'yandex-metrika'
//     script.text = `
//       (function(m,e,t,r,i,k,a){m[k]=m[k]||function(){(m[k].a=m[k].a||[]).push(arguments)}
//       m[i]=m[i]||{host:'mc.yandex.ru'};
//       a=document.createElement(r);
//       var s=document.getElementsByTagName(r)[0];
//       a.src=t;
//       a.type="text/javascript";
//       s.parentNode.insertBefore(a,s)
//       })(window, document, "https://mc.yandex.ru/metrika/tag.js ", "script", "ym");

//       // После загрузки тега инициализируем метрику
//       window.addEventListener("load", function() {
//         if (typeof ym === 'function') {
//           ym(${METRIKA_ID}, "init", {
//             clickmap: true,
//             trackLinks: true,
//             accurateTrackBounce: true,
//             webvisor: true
//           });
//         } else {
//           console.error('Ошибка: ym не является функцией')
//         }
//       });
//     `
//     document.head.appendChild(script)

//     const noscript = document.createElement('noscript')
//     const img = document.createElement('img')
//     img.src = `https://mc.yandex.ru/watch/${METRIKA_ID}`
//     img.alt = 'Yandex Metrika counter'
//     img.style.position = 'absolute'
//     img.style.left = '-9999px'
//     img.style.top = '-9999px'
//     noscript.appendChild(img)
//     document.body.appendChild(noscript)

//     return () => {
//       document.head.removeChild(script)
//       document.body.removeChild(noscript)
//     }
//   }, [])

//   return null
// }