import type { PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";

import { RefreshContent } from "./RefreshContent";

export const PullToRefresh = ({ children }: PropsWithChildren) => {
  const ref = useRef<any>(null);
  const loading = useRef<any>(null);
  const touchStartY = useRef(0);
  const loadingHeight = useRef(0);
  const handleRefresh = useRef(() => {});
  const [animation, setAnimation] = useState(false);

  const MAX_HEIGHT = 60;

  const handleTouchStart = (e: TouchEvent) => {
    if (!ref.current || ref.current.scrollTop !== 0) return;
    touchStartY.current = e.changedTouches[0].screenY;
    const el = document.createElement("div");
    ref.current.append(el); // 스크롤되는 요소의 최상단에 추가해준다.
    loading.current = el;
  };
  const handleTouchMove = (e: any) => {
    if (loading.current) {
      const screenY = e.changedTouches[0].screenY;
      const height = Math.floor((screenY - touchStartY.current) * 0.3);
      if (height >= 0) {
        loadingHeight.current = height;
        setAnimation(true);
      }
    }
  };
  const handleTouchEnd = () => {
    setTimeout(() => {
      if (loading.current && loadingHeight.current >= MAX_HEIGHT) {
        handleRefresh.current();
        ref.current.removeChild(loading.current);
        loading.current = null;
        loadingHeight.current = 0;
        touchStartY.current = 0;
        setAnimation(false);
      } else if (loading.current) {
        setAnimation(false);
      }
    }, 1000);
  };
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <div ref={ref} />
      {animation && <RefreshContent />}
      <>{children}</>
    </>
  );
};
