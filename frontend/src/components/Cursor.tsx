import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
      }
    };

    const animateRing = () => {
      rx += (mx - rx - 17) * 0.12;
      ry += (my - ry - 17) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        width: 10, height: 10,
        background: 'var(--accent)',
        borderRadius: '50%',
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }} />
      <div ref={ringRef} style={{
        width: 34, height: 34,
        border: '1px solid var(--accent)',
        borderRadius: '50%',
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0.4,
      }} />
    </>
  );
}
