// app/providers.tsx
'use client'
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}