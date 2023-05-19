import { useEffect, useRef, useState } from "react";

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

export const useIntersect = (onIntersect: IntersectHandler, options?: IntersectionObserverInit) => {
  const [ref, setRef] = useState<Element | null>(null);
  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onIntersect(entry, observer);
    });
  };
  const observerRef = useRef(
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver(callback, options),
  );

  useEffect(() => {
    const observer = observerRef.current;
    if (!ref || !observer) return;
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return setRef;
};
