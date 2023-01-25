import { useEffect, useRef } from "react";

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

export const useIntersect = (onIntersect: IntersectHandler, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callbackRef.current, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return ref;
};
