import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    SITE_URL_FALLBACK: process.env.SITE_URL_FALLBACK,
    VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF,
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
    LOCALHOST_FALLBACK: 'https://vsbvsm.ru ',
  }

  return NextResponse.json(envVars)
}