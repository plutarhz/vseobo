'use client'

import { useEffect } from 'react'

const GA_MEASUREMENT_ID = 'G-WYN8VMWMLP' // ← замени на свой

export default function GoogleAnalytics() {
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    if (!isProduction) return

    // Можно использовать window.gtag или просто загрузить скрипт
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    const inlineScript = document.createElement('script')
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date())
      gtag('config', '${GA_MEASUREMENT_ID}')
    `
    document.head.appendChild(inlineScript)

    return () => {
      document.head.removeChild(script)
      document.head.removeChild(inlineScript)
    }
  }, [isProduction])

  return null
}