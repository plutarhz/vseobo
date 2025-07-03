import { NextResponse } from 'next/server'

export async function GET() {
  const env = process.env.NEXT_PUBLIC_SITE_URL || 'Не задан'
  return NextResponse.json({ NEXT_PUBLIC_SITE_URL: env })
}