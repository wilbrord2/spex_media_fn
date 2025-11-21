"use client";
import React, { useEffect, useRef, useState } from "react";

interface StatItemProps {
  value: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          animateCount(value);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const animateCount = (endValue: number) => {
    const duration = 1500; 
    const start = 0;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentVal = Math.floor(progress * endValue);

      setCount(currentVal);

      if (progress < 1) requestAnimationFrame(step);
      else setCount(endValue);
    };

    requestAnimationFrame(step);
  };

  return (
    <div ref={ref} className="flex flex-col items-center">
      <h3 className="text-6xl font-semibold text-primary">{count}+</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-base">{label}</p>
    </div>
  );
};

export default StatItem;
