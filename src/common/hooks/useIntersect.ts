import { useEffect, useRef, useState } from "react";

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

export const useIntersect = (onIntersect: IntersectHandler, options?: IntersectionObserverInit) => {
  const [ref, setRef] = useState<Element | null>(null);
  const callbackRef = useRef(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
  );

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(callbackRef.current, options);
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return setRef;
};
