'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const StarBackground = dynamic(() => import('./stars-bg'), {
  ssr: false,
  loading: () => null,
});

export default function LazyStarBackground() {
  return (
    <Suspense fallback={null}>
      <StarBackground />
    </Suspense>
  );
}