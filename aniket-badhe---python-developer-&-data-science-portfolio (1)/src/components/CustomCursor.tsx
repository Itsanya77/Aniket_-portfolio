import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, input, textarea, [role="button"], .tilt-card')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    let animId: number;
    const updateCursor = () => {
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.2;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x - 4}px, ${posRef.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px, 0)`;
      }

      animId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-sky-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(56,189,248,0.9)] transition-transform duration-100 ${
          isHovered ? 'scale-150' : 'scale-100'
        }`}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[9998] shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-150 ${
          isHovered ? 'scale-125 border-sky-400' : 'scale-100 border-sky-400/50'
        }`}
      />
    </>
  );
};

