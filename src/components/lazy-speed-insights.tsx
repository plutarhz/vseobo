'use client';
import dynamic from 'next/dynamic';

const DynamicSpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function LazySpeedInsights() {
  return <DynamicSpeedInsights />;
}