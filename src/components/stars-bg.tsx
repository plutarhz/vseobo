'use client';
import { useEffect } from 'react';

export default function StarBackground() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      function generateBoxShadows(n: number) {
        const shadows = [];
        for (let i = 0; i < n; i++) {
          const x = Math.floor(Math.random() * 2000);
          const y = Math.floor(Math.random() * 2000);
          shadows.push(`${x}px ${y}px #FFF`);
        }
        return shadows.join(', ');
      }

      const stars = document.getElementById('stars');
      const stars2 = document.getElementById('stars2');
      const stars3 = document.getElementById('stars3');

      if (stars) stars.style.boxShadow = generateBoxShadows(700);
      if (stars2) stars2.style.boxShadow = generateBoxShadows(200);
      if (stars3) stars3.style.boxShadow = generateBoxShadows(100);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div id="stars" className="star-layer" />
      <div id="stars2" className="star-layer medium" />
      <div id="stars3" className="star-layer large" />
    </>
  );
}